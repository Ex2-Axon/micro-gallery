from __future__ import annotations

import json
import re
import shutil
import base64
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen


SUPPORTED_IMAGE_EXTENSIONS = {".avif", ".webp", ".png", ".jpg", ".jpeg"}
SVG_NAMESPACE = "http://www.w3.org/2000/svg"
FRAMEWORK_BADGES = {
    "Vite": ("vite.svg", "Vite"),
    "Next.js": ("next.svg", "Next.js"),
    "Special (Vite + database)": ("vite.svg", "Vite"),
}
LANGUAGE_BADGES = {
    "css": "css.svg",
    "html": "html.svg",
    "java": "java.svg",
    "javascript": "javascript.svg",
    "python": "python.svg",
    "typescript": "typescript.svg",
}
TEMPLATE_KINDS = {
    "Vite": ("x-template-", 2500, False),
    "Next.js": ("x-template-next-", 3500, False),
    "Special (Vite + database)": ("x-template-special-", 5000, True),
}


class RegistrationError(ValueError):
    pass


@dataclass(frozen=True)
class TemplateDetails:
    name: str
    framework: str
    framework_version: str
    languages: tuple[str, ...]
    technologies: tuple[str, ...]
    database: str
    database_icon: str
    source_repository: str
    deployment_platform: str
    deployed_url: str
    description: str


@dataclass(frozen=True)
class GitHubConfig:
    token: str
    owner: str
    repository: str
    branch: str
    commit_name: str
    commit_email: str


def _is_http_url(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def load_github_config(repo_root: Path) -> GitHubConfig:
    env_path = repo_root / "python-tools" / ".env.local"
    try:
        lines = env_path.read_text(encoding="utf-8").splitlines()
    except OSError as error:
        raise RegistrationError(
            "ไม่พบ python-tools/.env.local; คัดลอกไฟล์ตัวอย่าง .env.example "
            "เป็น .env.local แล้วกรอกค่า GitHub"
        ) from error

    values: dict[str, str] = {}
    for line_number, line in enumerate(lines, start=1):
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if "=" not in stripped:
            raise RegistrationError(
                f"รูปแบบ .env.local ไม่ถูกต้องที่บรรทัด {line_number}"
            )
        key, value = stripped.split("=", 1)
        key = key.strip()
        value = value.strip()
        if value.startswith(("'", '"')) and value.endswith(value[0]) and len(value) >= 2:
            value = value[1:-1]
        values[key] = value

    required = (
        "GITHUB_TOKEN",
        "GITHUB_OWNER",
        "GITHUB_REPOSITORY",
        "GITHUB_BRANCH",
        "GITHUB_COMMIT_NAME",
        "GITHUB_COMMIT_EMAIL",
    )
    missing = [key for key in required if not values.get(key)]
    if missing:
        raise RegistrationError(
            "กรุณากรอกค่าใน python-tools/.env.local ให้ครบ: "
            + ", ".join(missing)
        )
    if values["GITHUB_TOKEN"] == "PASTE_FINE_GRAINED_TOKEN_HERE":
        raise RegistrationError(
            "กรุณาแทนค่า placeholder ของ GITHUB_TOKEN ด้วย fine-grained token ใน .env.local"
        )
    if (
        values["GITHUB_OWNER"] != "Ex2-Axon"
        or values["GITHUB_REPOSITORY"] != "micro-gallery"
    ):
        raise RegistrationError(
            "กำหนดปลายทางได้เฉพาะ repository Ex2-Axon/micro-gallery"
        )
    return GitHubConfig(
        token=values["GITHUB_TOKEN"],
        owner=values["GITHUB_OWNER"],
        repository=values["GITHUB_REPOSITORY"],
        branch=values["GITHUB_BRANCH"],
        commit_name=values["GITHUB_COMMIT_NAME"],
        commit_email=values["GITHUB_COMMIT_EMAIL"],
    )


def _local_badge_path(repo_root: Path, filename: str) -> str:
    badge_path = repo_root / "public" / "badges" / filename
    if not badge_path.is_file():
        raise RegistrationError(f"ไม่พบ badge asset ใน public/badges/{filename}")
    return f"/badges/{filename}"


def _write_framework_badge(
    repo_root: Path,
    framework: str,
    framework_version: str,
) -> Path:
    try:
        source_filename, framework_label = FRAMEWORK_BADGES[framework]
    except KeyError as error:
        raise RegistrationError("ไม่พบ badge asset สำหรับ framework ที่เลือก") from error

    source_path = repo_root / "public" / "badges" / source_filename
    if not source_path.is_file():
        raise RegistrationError(f"ไม่พบ badge asset ใน public/badges/{source_filename}")

    version_slug = re.sub(r"[^a-zA-Z0-9.-]+", "-", framework_version.strip()).strip(".-")
    if not version_slug:
        raise RegistrationError("เวอร์ชัน framework ใช้สร้างชื่อ badge ไม่ได้")
    framework_slug = Path(source_filename).stem
    destination = repo_root / "public" / "badges" / f"{framework_slug}-{version_slug}.svg"

    label = f"{framework_label} {framework_version}"
    try:
        tree = ET.parse(source_path)
    except (OSError, ET.ParseError) as error:
        raise RegistrationError(f"อ่าน badge asset {source_filename} ไม่สำเร็จ") from error

    root = tree.getroot()
    title = root.find(f"{{{SVG_NAMESPACE}}}title")
    text = root.find(f"{{{SVG_NAMESPACE}}}text")
    if title is None or text is None:
        raise RegistrationError(f"รูปแบบ badge asset {source_filename} ไม่ถูกต้อง")
    if title.text == label and text.text == label:
        return source_path

    if destination.exists():
        try:
            existing_root = ET.parse(destination).getroot()
        except (OSError, ET.ParseError) as error:
            raise RegistrationError(f"อ่าน badge asset {destination.name} ไม่สำเร็จ") from error
        existing_title = existing_root.find(f"{{{SVG_NAMESPACE}}}title")
        existing_text = existing_root.find(f"{{{SVG_NAMESPACE}}}text")
        if (
            existing_title is None
            or existing_text is None
            or existing_title.text != label
            or existing_text.text != label
        ):
            raise RegistrationError(
                f"badge {destination.name} มีอยู่แล้วแต่ข้อมูลไม่ตรงกับ {label}"
            )
        return destination

    title.text = label
    text.text = label
    temporary_path = destination.with_suffix(".svg.tmp")
    ET.register_namespace("", SVG_NAMESPACE)
    try:
        tree.write(temporary_path, encoding="utf-8", xml_declaration=False)
        temporary_path.replace(destination)
    except OSError as error:
        temporary_path.unlink(missing_ok=True)
        raise RegistrationError(f"สร้าง badge {destination.name} ไม่สำเร็จ") from error
    return destination


def next_template_name(repo_root: Path, framework: str) -> str:
    try:
        prefix, _, _ = TEMPLATE_KINDS[framework]
    except KeyError as error:
        raise RegistrationError("เลือกประเภทเทมเพลตไม่ถูกต้อง") from error

    templates_path = repo_root / "data" / "templates.json"
    try:
        templates = json.loads(templates_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise RegistrationError("อ่าน data/templates.json ไม่สำเร็จ") from error
    if not isinstance(templates, list):
        raise RegistrationError("รูปแบบ data/templates.json ต้องเป็นรายการเทมเพลต")

    pattern = re.compile(rf"^{re.escape(prefix)}(\d+)$")
    numbers = [
        int(match.group(1))
        for item in templates
        if isinstance(item, dict)
        and isinstance(item.get("name"), str)
        and (match := pattern.fullmatch(item["name"]))
    ]
    return f"{prefix}{max(numbers, default=0) + 1:03d}"


def validate_details(details: TemplateDetails) -> tuple[int, bool]:
    try:
        prefix, price, uses_database = TEMPLATE_KINDS[details.framework]
    except KeyError as error:
        raise RegistrationError("เลือกประเภทเทมเพลตไม่ถูกต้อง") from error

    if not re.fullmatch(rf"{re.escape(prefix)}\d{{3,}}", details.name):
        raise RegistrationError(f"ชื่อเทมเพลตต้องขึ้นต้นด้วย {prefix} ตามด้วยตัวเลขอย่างน้อย 3 หลัก")
    if not details.framework_version.strip():
        raise RegistrationError("กรุณาระบุเวอร์ชันของ framework")
    if not details.languages:
        raise RegistrationError("กรุณาระบุภาษาโปรแกรมอย่างน้อย 1 ภาษา")
    unsupported_languages = [
        language
        for language in details.languages
        if language.strip().lower() not in LANGUAGE_BADGES
    ]
    if unsupported_languages:
        raise RegistrationError(
            "ยังไม่มี badge icon สำหรับภาษา: " + ", ".join(unsupported_languages)
        )
    if uses_database and not details.database.strip():
        raise RegistrationError("เทมเพลต Special ต้องระบุชื่อฐานข้อมูลที่ตรวจสอบแล้ว")
    if uses_database and not re.fullmatch(r"[a-z0-9-]+", details.database_icon.strip()):
        raise RegistrationError("กรุณาระบุชื่อไฟล์ badge ฐานข้อมูลเป็น a-z, ตัวเลข หรือ -")
    if not uses_database and details.database.strip():
        raise RegistrationError("ตามกฎราคา เทมเพลต Vite/Next.js ทั่วไปต้องไม่มีฐานข้อมูล")
    if not details.source_repository.strip() or not _is_http_url(details.source_repository.strip()):
        raise RegistrationError("กรุณาระบุ Source repository URL ที่ขึ้นต้นด้วย http:// หรือ https://")
    if not details.deployment_platform.strip():
        raise RegistrationError("กรุณาระบุแพลตฟอร์มที่ deploy")
    if not details.deployed_url.strip() or not _is_http_url(details.deployed_url.strip()):
        raise RegistrationError("กรุณาระบุ Deployed URL ที่ขึ้นต้นด้วย http:// หรือ https://")
    if not details.description.strip():
        raise RegistrationError("กรุณาระบุคำอธิบายเทมเพลต")
    return price, uses_database


def register_template(
    repo_root: Path,
    details: TemplateDetails,
    screenshot_path: Path,
) -> Path:
    repo_root = repo_root.resolve()
    price, uses_database = validate_details(details)
    image_source = screenshot_path.expanduser().resolve()
    if not image_source.is_file():
        raise RegistrationError("ไม่พบไฟล์ screenshot ที่เลือก")
    extension = image_source.suffix.lower()
    if extension not in SUPPORTED_IMAGE_EXTENSIONS:
        raise RegistrationError("รองรับรูป AVIF, WebP, PNG, JPG และ JPEG เท่านั้น")

    templates_path = repo_root / "data" / "templates.json"
    screenshot_directory = repo_root / "public" / "screenshots"
    screenshot_destination = screenshot_directory / f"{details.name}{extension}"
    if screenshot_destination.exists():
        raise RegistrationError(f"มีไฟล์ {screenshot_destination.name} อยู่แล้ว จะไม่เขียนทับ")

    try:
        templates = json.loads(templates_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise RegistrationError("อ่าน data/templates.json ไม่สำเร็จ") from error
    if not isinstance(templates, list) or any(
        not isinstance(item, dict) for item in templates
    ):
        raise RegistrationError("รูปแบบ data/templates.json ไม่ถูกต้อง")
    if any(item.get("name") == details.name for item in templates):
        raise RegistrationError(f"มีชื่อเทมเพลต {details.name} อยู่แล้ว")

    badges = [
        {
            "label": language,
            "url": _local_badge_path(
                repo_root,
                LANGUAGE_BADGES[language.strip().lower()],
            ),
        }
        for language in details.languages
    ]
    if uses_database:
        badges.append(
            {
                "label": details.database.strip(),
                "url": _local_badge_path(
                    repo_root,
                    f"{details.database_icon.strip()}.svg",
                ),
            }
        )

    record = {
        "name": details.name,
        "url": details.deployed_url.strip(),
        "image": f"/screenshots/{screenshot_destination.name}",
        "frameworkVersion": details.framework_version.strip(),
        "languages": list(details.languages),
        "technologies": list(details.technologies),
        "usesDatabase": uses_database,
        "sourceRepository": details.source_repository.strip(),
        "deploymentPlatform": details.deployment_platform.strip(),
        "deployedUrl": details.deployed_url.strip(),
        "salePrice": price,
        "salePriceCurrency": "THB",
        "about": details.description.strip(),
        "badges": badges,
    }
    framework_badge = _write_framework_badge(
        repo_root,
        details.framework,
        details.framework_version.strip(),
    )
    badges.insert(
        0,
        {
            "label": f"{FRAMEWORK_BADGES[details.framework][1]} {details.framework_version.strip()}",
            "url": f"/badges/{framework_badge.name}",
        },
    )

    if uses_database:
        record["database"] = details.database.strip()

    updated_templates = [*templates, record]
    temporary_path = templates_path.with_suffix(".json.tmp")
    try:
        screenshot_directory.mkdir(parents=True, exist_ok=True)
        shutil.copy2(image_source, screenshot_destination)
        temporary_path.write_text(
            json.dumps(updated_templates, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        temporary_path.replace(templates_path)
    except OSError as error:
        screenshot_destination.unlink(missing_ok=True)
        framework_badge.unlink(missing_ok=True)
        temporary_path.unlink(missing_ok=True)
        raise RegistrationError("บันทึกข้อมูลเทมเพลตไม่สำเร็จ") from error
    return screenshot_destination


def _github_api_request(
    config: GitHubConfig,
    method: str,
    endpoint: str,
    payload: dict[str, Any] | None = None,
    *,
    allow_not_found: bool = False,
) -> dict[str, Any] | None:
    body = None if payload is None else json.dumps(payload).encode("utf-8")
    request = Request(
        f"https://api.github.com{endpoint}",
        data=body,
        method=method,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {config.token}",
            "Content-Type": "application/json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    try:
        with urlopen(request, timeout=30) as response:
            response_body = response.read()
    except HTTPError as error:
        if allow_not_found and error.code == 404:
            return None
        raise RegistrationError(
            f"GitHub API ตอบกลับ HTTP {error.code}; ตรวจ token, permission และ branch ใน .env.local"
        ) from error
    except URLError as error:
        raise RegistrationError("เชื่อมต่อ GitHub API ไม่สำเร็จ") from error

    try:
        result = json.loads(response_body)
    except (json.JSONDecodeError, UnicodeDecodeError) as error:
        raise RegistrationError("GitHub API ส่งข้อมูลกลับมาในรูปแบบที่อ่านไม่ได้") from error
    if not isinstance(result, dict):
        raise RegistrationError("GitHub API ส่งข้อมูลกลับมาในรูปแบบที่ไม่ถูกต้อง")
    return result


def _github_contents(
    config: GitHubConfig, path: str
) -> tuple[bytes, str] | None:
    encoded_path = quote(path, safe="/")
    encoded_branch = quote(config.branch, safe="")
    result = _github_api_request(
        config,
        "GET",
        f"/repos/{quote(config.owner, safe='')}/{quote(config.repository, safe='')}"
        f"/contents/{encoded_path}?ref={encoded_branch}",
        allow_not_found=True,
    )
    if result is None:
        return None
    if result.get("type") != "file" or not isinstance(result.get("content"), str):
        raise RegistrationError(f"GitHub path {path} ไม่ใช่ไฟล์ที่อ่านได้")
    try:
        content = base64.b64decode(result["content"], validate=False)
    except (ValueError, TypeError) as error:
        raise RegistrationError(f"อ่านไฟล์ {path} จาก GitHub ไม่สำเร็จ") from error
    return content, str(result.get("sha", ""))


def commit_and_push(
    repo_root: Path,
    screenshot_path: Path,
    template_name: str,
    config: GitHubConfig,
) -> str:
    repo_root = repo_root.resolve()
    templates_path = repo_root / "data" / "templates.json"
    relative_screenshot = screenshot_path.resolve().relative_to(repo_root).as_posix()
    if relative_screenshot != f"public/screenshots/{screenshot_path.name}":
        raise RegistrationError("ตำแหน่ง screenshot ไม่ถูกต้อง")

    try:
        local_templates = json.loads(templates_path.read_text(encoding="utf-8"))
        image_bytes = screenshot_path.read_bytes()
    except (OSError, json.JSONDecodeError) as error:
        raise RegistrationError("อ่านข้อมูลที่เตรียมไว้สำหรับ push ไม่สำเร็จ") from error
    if not isinstance(local_templates, list) or any(
        not isinstance(item, dict) for item in local_templates
    ):
        raise RegistrationError("รูปแบบ data/templates.json ไม่ถูกต้อง")
    registered = [
        item for item in local_templates if item.get("name") == template_name
    ]
    if len(registered) != 1 or registered[0].get("image") != f"/screenshots/{screenshot_path.name}":
        raise RegistrationError("ไม่พบข้อมูลเทมเพลตหรือ path รูปที่ตรงกันใน templates.json")

    base_path = (
        f"/repos/{quote(config.owner, safe='')}/{quote(config.repository, safe='')}"
    )
    branch_ref = quote(config.branch, safe="")
    ref_result = _github_api_request(
        config,
        "GET",
        f"{base_path}/git/ref/heads/{branch_ref}",
    )
    if ref_result is None or not isinstance(ref_result.get("object"), dict):
        raise RegistrationError("อ่าน branch จาก GitHub ไม่สำเร็จ")
    base_commit_sha = ref_result["object"].get("sha")
    if not isinstance(base_commit_sha, str):
        raise RegistrationError("GitHub ไม่ส่ง commit SHA ของ branch กลับมา")

    commit_result = _github_api_request(
        config,
        "GET",
        f"{base_path}/git/commits/{quote(base_commit_sha, safe='')}",
    )
    if commit_result is None or not isinstance(commit_result.get("tree"), dict):
        raise RegistrationError("อ่าน Git tree ปัจจุบันจาก GitHub ไม่สำเร็จ")
    base_tree_sha = commit_result["tree"].get("sha")
    if not isinstance(base_tree_sha, str):
        raise RegistrationError("GitHub ไม่ส่ง tree SHA กลับมา")

    remote_metadata = _github_contents(config, "data/templates.json")
    if remote_metadata is None:
        raise RegistrationError("ไม่พบ data/templates.json บน branch ปลายทาง")
    try:
        remote_templates = json.loads(remote_metadata[0].decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise RegistrationError("อ่าน metadata จาก branch ปลายทางไม่สำเร็จ") from error
    expected_templates = [
        item for item in local_templates if item.get("name") != template_name
    ]
    if remote_templates != expected_templates:
        raise RegistrationError(
            "ข้อมูลใน GitHub เปลี่ยนไปจาก working copy; ซิงก์โปรเจกต์ล่าสุด "
            "แล้วลงทะเบียนใหม่เพื่อป้องกันข้อมูลเทมเพลตทับกัน"
        )
    if _github_contents(config, relative_screenshot) is not None:
        raise RegistrationError("มี screenshot ชื่อนี้อยู่บน GitHub แล้ว จะไม่เขียนทับ")

    files = (
        ("data/templates.json", templates_path.read_bytes()),
        (relative_screenshot, image_bytes),
    )
    tree_entries: list[dict[str, str]] = []
    for path, content in files:
        blob = _github_api_request(
            config,
            "POST",
            f"{base_path}/git/blobs",
            {
                "content": base64.b64encode(content).decode("ascii"),
                "encoding": "base64",
            },
        )
        if blob is None or not isinstance(blob.get("sha"), str):
            raise RegistrationError(f"สร้าง Git blob สำหรับ {path} ไม่สำเร็จ")
        tree_entries.append(
            {
                "path": path,
                "mode": "100644",
                "type": "blob",
                "sha": blob["sha"],
            }
        )

    tree_result = _github_api_request(
        config,
        "POST",
        f"{base_path}/git/trees",
        {"base_tree": base_tree_sha, "tree": tree_entries},
    )
    if tree_result is None or not isinstance(tree_result.get("sha"), str):
        raise RegistrationError("สร้าง Git tree ไม่สำเร็จ")

    commit_result = _github_api_request(
        config,
        "POST",
        f"{base_path}/git/commits",
        {
            "message": f"Register template {template_name}",
            "tree": tree_result["sha"],
            "parents": [base_commit_sha],
            "author": {"name": config.commit_name, "email": config.commit_email},
            "committer": {"name": config.commit_name, "email": config.commit_email},
        },
    )
    if commit_result is None or not isinstance(commit_result.get("sha"), str):
        raise RegistrationError("สร้าง Git commit ไม่สำเร็จ")

    _github_api_request(
        config,
        "PATCH",
        f"{base_path}/git/refs/heads/{branch_ref}",
        {"sha": commit_result["sha"], "force": False},
    )
    return commit_result["sha"]
