from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from template_registrar import (
    GitHubConfig,
    RegistrationError,
    TemplateDetails,
    commit_and_push,
    load_github_config,
    next_template_name,
    register_template,
)


class TemplateRegistrarTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.repo_root = Path(self.temporary_directory.name)
        (self.repo_root / "data").mkdir()
        (self.repo_root / "public").mkdir()
        (self.repo_root / "data" / "templates.json").write_text(
            json.dumps(
                [
                    {"name": "x-template-003"},
                    {"name": "x-template-next-011"},
                    {"name": "x-template-special-002"},
                ]
            ),
            encoding="utf-8",
        )
        self.screenshot = self.repo_root / "source.png"
        self.screenshot.write_bytes(b"png content")

    def tearDown(self) -> None:
        self.temporary_directory.cleanup()

    def test_next_template_name_uses_sequence_for_selected_kind(self) -> None:
        self.assertEqual(next_template_name(self.repo_root, "Vite"), "x-template-004")
        self.assertEqual(next_template_name(self.repo_root, "Next.js"), "x-template-next-012")
        self.assertEqual(
            next_template_name(self.repo_root, "Special (Vite + database)"),
            "x-template-special-003",
        )

    def test_register_appends_metadata_and_copies_image(self) -> None:
        details = TemplateDetails(
            name="x-template-next-012",
            framework="Next.js",
            framework_version="16.4.2",
            languages=("TypeScript", "CSS"),
            technologies=("Tailwind CSS",),
            database="",
            database_icon="",
            source_repository="https://github.com/example/template",
            deployment_platform="Vercel",
            deployed_url="https://example.vercel.app",
            description="A verified template description.",
        )

        destination = register_template(self.repo_root, details, self.screenshot)
        saved = json.loads(
            (self.repo_root / "data" / "templates.json").read_text(encoding="utf-8")
        )[-1]

        self.assertEqual(destination.read_bytes(), b"png content")
        self.assertEqual(saved["image"], "/screenshots/x-template-next-012.png")
        self.assertEqual(saved["salePrice"], 3500)
        self.assertFalse(saved["usesDatabase"])
        self.assertEqual(saved["languages"], ["TypeScript", "CSS"])
        self.assertEqual(saved["technologies"], ["Tailwind CSS"])
        self.assertEqual(len(saved["badges"]), 3)

    def test_special_template_requires_and_records_database(self) -> None:
        details = TemplateDetails(
            name="x-template-special-003",
            framework="Special (Vite + database)",
            framework_version="5.4.0",
            languages=("JavaScript",),
            technologies=("React",),
            database="Supabase",
            database_icon="supabase",
            source_repository="https://github.com/example/special-template",
            deployment_platform="Vercel",
            deployed_url="https://special-example.vercel.app",
            description="A verified database-backed template.",
        )

        destination = register_template(self.repo_root, details, self.screenshot)
        saved = json.loads(
            (self.repo_root / "data" / "templates.json").read_text(encoding="utf-8")
        )[-1]

        self.assertEqual(destination.name, "x-template-special-003.png")
        self.assertEqual(saved["salePrice"], 5000)
        self.assertTrue(saved["usesDatabase"])
        self.assertEqual(saved["database"], "Supabase")
        self.assertEqual(len(saved["badges"]), 3)

    def test_rejects_duplicate_and_wrong_framework_prefix(self) -> None:
        details = TemplateDetails(
            name="x-template-next-011",
            framework="Next.js",
            framework_version="16.4.2",
            languages=("TypeScript",),
            technologies=(),
            database="",
            database_icon="",
            source_repository="https://github.com/example/template",
            deployment_platform="Vercel",
            deployed_url="https://example.vercel.app",
            description="Description",
        )
        with self.assertRaisesRegex(RegistrationError, "มีชื่อเทมเพลต"):
            register_template(self.repo_root, details, self.screenshot)

        invalid = TemplateDetails(
            **{**details.__dict__, "name": "x-template-011"}
        )
        with self.assertRaisesRegex(RegistrationError, "ชื่อเทมเพลตต้องขึ้นต้น"):
            register_template(self.repo_root, invalid, self.screenshot)

    def test_github_config_is_loaded_from_local_env_file(self) -> None:
        tools_directory = self.repo_root / "python-tools"
        tools_directory.mkdir()
        (tools_directory / ".env.local").write_text(
            "\n".join(
                [
                    "GITHUB_TOKEN=local-secret",
                    "GITHUB_OWNER=Ex2-Axon",
                    "GITHUB_REPOSITORY=micro-gallery",
                    "GITHUB_BRANCH=main",
                    "GITHUB_COMMIT_NAME=Template Registrar",
                    "GITHUB_COMMIT_EMAIL=registrar@example.com",
                ]
            ),
            encoding="utf-8",
        )

        config = load_github_config(self.repo_root)

        self.assertEqual(config.token, "local-secret")
        self.assertEqual(config.owner, "Ex2-Axon")
        self.assertEqual(config.branch, "main")

    def test_github_config_rejects_wrong_repository_or_example_token(self) -> None:
        tools_directory = self.repo_root / "python-tools"
        tools_directory.mkdir()
        env_path = tools_directory / ".env.local"
        values = [
            "GITHUB_TOKEN=PASTE_FINE_GRAINED_TOKEN_HERE",
            "GITHUB_OWNER=Ex2-Axon",
            "GITHUB_REPOSITORY=micro-gallery",
            "GITHUB_BRANCH=main",
            "GITHUB_COMMIT_NAME=Registrar",
            "GITHUB_COMMIT_EMAIL=registrar@example.com",
        ]
        env_path.write_text("\n".join(values), encoding="utf-8")
        with self.assertRaisesRegex(RegistrationError, "placeholder"):
            load_github_config(self.repo_root)

        values[0] = "GITHUB_TOKEN=fine-grained-token"
        values[2] = "GITHUB_REPOSITORY=another-project"
        env_path.write_text("\n".join(values), encoding="utf-8")
        with self.assertRaisesRegex(RegistrationError, "Ex2-Axon/micro-gallery"):
            load_github_config(self.repo_root)

    def test_push_creates_github_commit_with_only_template_files(self) -> None:
        details = TemplateDetails(
            name="x-template-next-012",
            framework="Next.js",
            framework_version="16.4.2",
            languages=("TypeScript",),
            technologies=(),
            database="",
            database_icon="",
            source_repository="https://github.com/example/template",
            deployment_platform="Vercel",
            deployed_url="https://example.vercel.app",
            description="A verified template description.",
        )
        screenshot_path = register_template(self.repo_root, details, self.screenshot)
        remote_templates = [
            {"name": "x-template-003"},
            {"name": "x-template-next-011"},
            {"name": "x-template-special-002"},
        ]
        config = GitHubConfig(
            token="test-token",
            owner="Ex2-Axon",
            repository="micro-gallery",
            branch="main",
            commit_name="Registrar",
            commit_email="registrar@example.com",
        )

        def api_response(
            _config: GitHubConfig,
            method: str,
            endpoint: str,
            payload: dict[str, object] | None = None,
            **_kwargs: object,
        ) -> dict[str, object]:
            if method == "GET" and endpoint.endswith("/git/ref/heads/main"):
                return {"object": {"sha": "base-commit"}}
            if method == "GET" and endpoint.endswith("/git/commits/base-commit"):
                return {"tree": {"sha": "base-tree"}}
            if method == "POST" and endpoint.endswith("/git/blobs"):
                return {"sha": f"blob-{payload['encoding']}-{len(payload['content'])}"}
            if method == "POST" and endpoint.endswith("/git/trees"):
                self.assertEqual(
                    [entry["path"] for entry in payload["tree"]],
                    ["data/templates.json", "public/screenshots/x-template-next-012.png"],
                )
                return {"sha": "new-tree"}
            if method == "POST" and endpoint.endswith("/git/commits"):
                self.assertEqual(payload["parents"], ["base-commit"])
                self.assertEqual(payload["author"]["name"], "Registrar")
                return {"sha": "new-commit"}
            if method == "PATCH" and endpoint.endswith("/git/refs/heads/main"):
                self.assertEqual(payload, {"sha": "new-commit", "force": False})
                return {"object": {"sha": "new-commit"}}
            self.fail(f"Unexpected mocked GitHub request: {method} {endpoint}")
            return {}

        with (
            patch("template_registrar._github_api_request", side_effect=api_response) as api_mock,
            patch(
                "template_registrar._github_contents",
                side_effect=[
                    (json.dumps(remote_templates).encode("utf-8"), "remote-json-sha"),
                    None,
                ],
            ),
        ):
            commit_sha = commit_and_push(
                self.repo_root, screenshot_path, details.name, config
            )

        self.assertEqual(commit_sha, "new-commit")
        self.assertTrue(any(call.args[1] == "PATCH" for call in api_mock.call_args_list))


if __name__ == "__main__":
    unittest.main()
