from __future__ import annotations

import tkinter as tk
from pathlib import Path
from tkinter import filedialog, messagebox, ttk

from template_registrar import (
    TEMPLATE_KINDS,
    TemplateDetails,
    commit_and_push,
    load_github_config,
    next_template_name,
    register_template,
)
from template_registrar import RegistrationError


REPOSITORY_ROOT = Path(__file__).resolve().parents[1]


class TemplateRegistrarWindow:
    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        root.title("Axon Template Gallery - Template Registrar")
        root.geometry("900x900")
        root.minsize(720, 700)

        self.kind = tk.StringVar(value="Next.js")
        self.name = tk.StringVar()
        self.framework_version = tk.StringVar()
        self.languages = tk.StringVar()
        self.technologies = tk.StringVar()
        self.database = tk.StringVar()
        self.database_icon = tk.StringVar()
        self.source_repository = tk.StringVar()
        self.deployment_platform = tk.StringVar()
        self.deployed_url = tk.StringVar()
        self.screenshot = tk.StringVar()
        self.push_to_github = tk.BooleanVar(value=False)
        self.price_text = tk.StringVar()

        self._build_form()
        self._refresh_template_defaults()

    def _build_form(self) -> None:
        container = ttk.Frame(self.root, padding=20)
        container.pack(fill="both", expand=True)
        container.columnconfigure(1, weight=1)
        container.rowconfigure(12, weight=1)

        ttk.Label(
            container,
            text="ลงทะเบียนเทมเพลตใหม่",
            font=("TkDefaultFont", 17, "bold"),
        ).grid(row=0, column=0, columnspan=3, sticky="w", pady=(0, 4))
        ttk.Label(
            container,
            text="กรอกข้อมูลที่ตรวจสอบแล้ว รูปจะถูกจัดเก็บใน public/screenshots/",
        ).grid(row=1, column=0, columnspan=3, sticky="w", pady=(0, 16))

        self._label(container, 2, "ประเภท")
        kind_menu = ttk.Combobox(
            container,
            textvariable=self.kind,
            values=tuple(TEMPLATE_KINDS),
            state="readonly",
        )
        kind_menu.grid(row=2, column=1, columnspan=2, sticky="ew", pady=4)
        kind_menu.bind("<<ComboboxSelected>>", self._on_kind_changed)

        self._entry(container, 3, "ชื่อ / Template ID", self.name)
        self._entry(container, 4, "Framework version", self.framework_version)
        self._entry(
            container,
            5,
            "ภาษาโปรแกรม (คั่นด้วย comma)",
            self.languages,
        )
        self._entry(
            container,
            6,
            "Technologies เพิ่มเติม (คั่นด้วย comma)",
            self.technologies,
        )
        self._entry(container, 7, "ฐานข้อมูล (เฉพาะ Special)", self.database)
        self._entry(
            container,
            8,
            "Database logo ID (เช่น supabase)",
            self.database_icon,
        )
        self._entry(container, 9, "Source repository URL", self.source_repository)
        self._entry(container, 10, "Deployment platform", self.deployment_platform)
        self._entry(container, 11, "Deployed URL / Demo URL", self.deployed_url)

        ttk.Label(container, text="คำอธิบาย").grid(row=12, column=0, sticky="nw", pady=4)
        self.description = tk.Text(container, height=5, wrap="word")
        self.description.grid(row=12, column=1, columnspan=2, sticky="nsew", pady=4)

        self._label(container, 13, "Screenshot")
        ttk.Entry(container, textvariable=self.screenshot, state="readonly").grid(
            row=13, column=1, sticky="ew", pady=4
        )
        ttk.Button(container, text="เลือกไฟล์...", command=self._choose_screenshot).grid(
            row=13, column=2, sticky="ew", padx=(8, 0), pady=4
        )

        ttk.Label(container, text="ราคาตามกฎ").grid(row=14, column=0, sticky="w", pady=4)
        ttk.Label(container, textvariable=self.price_text).grid(
            row=14, column=1, columnspan=2, sticky="w", pady=4
        )

        ttk.Checkbutton(
            container,
            text="บันทึก, commit และ push ไป GitHub หลังตรวจสอบ",
            variable=self.push_to_github,
        ).grid(row=15, column=0, columnspan=3, sticky="w", pady=(12, 4))
        ttk.Label(
            container,
            text="หากไม่เลือก จะบันทึกไฟล์ในเครื่องเท่านั้น; Vercel deploy เมื่อ push สำเร็จ",
            wraplength=820,
        ).grid(row=16, column=0, columnspan=3, sticky="w")
        ttk.Button(
            container,
            text="ส่ง / Register",
            command=self._submit,
        ).grid(row=17, column=0, columnspan=3, sticky="ew", pady=(18, 0), ipady=7)

    @staticmethod
    def _label(parent: ttk.Frame, row: int, label: str) -> None:
        ttk.Label(parent, text=label).grid(row=row, column=0, sticky="w", pady=4)

    def _entry(
        self,
        parent: ttk.Frame,
        row: int,
        label: str,
        variable: tk.StringVar,
    ) -> None:
        self._label(parent, row, label)
        ttk.Entry(parent, textvariable=variable).grid(
            row=row, column=1, columnspan=2, sticky="ew", pady=4
        )

    def _on_kind_changed(self, _event: tk.Event[tk.Misc]) -> None:
        self._refresh_template_defaults()

    def _refresh_template_defaults(self) -> None:
        try:
            self.name.set(next_template_name(REPOSITORY_ROOT, self.kind.get()))
        except RegistrationError as error:
            messagebox.showerror("ไม่สามารถเตรียมข้อมูล", str(error), parent=self.root)
            return
        _, price, uses_database = TEMPLATE_KINDS[self.kind.get()]
        self.price_text.set(f"{price:,} บาท — {'ใช้ฐานข้อมูล' if uses_database else 'ไม่มีฐานข้อมูล'}")

    def _choose_screenshot(self) -> None:
        selected = filedialog.askopenfilename(
            parent=self.root,
            title="เลือกภาพ screenshot",
            filetypes=[
                ("Supported images", "*.avif *.webp *.png *.jpg *.jpeg"),
                ("All files", "*.*"),
            ],
        )
        if selected:
            self.screenshot.set(selected)

    def _details(self) -> TemplateDetails:
        languages = tuple(
            language.strip()
            for language in self.languages.get().split(",")
            if language.strip()
        )
        technologies = tuple(
            technology.strip()
            for technology in self.technologies.get().split(",")
            if technology.strip()
        )
        return TemplateDetails(
            name=self.name.get().strip(),
            framework=self.kind.get(),
            framework_version=self.framework_version.get().strip(),
            languages=languages,
            technologies=technologies,
            database=self.database.get().strip(),
            database_icon=self.database_icon.get().strip(),
            source_repository=self.source_repository.get().strip(),
            deployment_platform=self.deployment_platform.get().strip(),
            deployed_url=self.deployed_url.get().strip(),
            description=self.description.get("1.0", "end").strip(),
        )

    def _submit(self) -> None:
        details = self._details()
        screenshot_path = Path(self.screenshot.get())
        should_push = self.push_to_github.get()
        github_config = None
        if should_push:
            try:
                github_config = load_github_config(REPOSITORY_ROOT)
            except RegistrationError as error:
                messagebox.showerror("ตั้งค่า GitHub ไม่ครบ", str(error), parent=self.root)
                return
        if should_push and not messagebox.askyesno(
            "ยืนยันการ push",
            "จะบันทึกภาพและข้อมูล, สร้าง commit และ push ไปยัง repository/branch "
            "ที่กำหนดใน python-tools/.env.local "
            "เพื่อเริ่ม deployment ต้องการดำเนินการหรือไม่?",
            parent=self.root,
        ):
            return

        try:
            screenshot_destination = register_template(
                REPOSITORY_ROOT,
                details,
                screenshot_path,
            )
            if should_push:
                if github_config is None:
                    raise RegistrationError("ไม่พบการตั้งค่า GitHub")
                commit_sha = commit_and_push(
                    REPOSITORY_ROOT,
                    screenshot_destination,
                    details.name,
                    github_config,
                )
        except (RegistrationError, OSError) as error:
            messagebox.showerror("ลงทะเบียนไม่สำเร็จ", str(error), parent=self.root)
            return

        status = (
            f"และ push ไป GitHub แล้ว (commit {commit_sha[:7]}); รอ deployment"
            if should_push
            else "ในเครื่องแล้ว"
        )
        messagebox.showinfo(
            "ลงทะเบียนสำเร็จ",
            f"บันทึก {details.name} {status}\n"
            f"Screenshot: {screenshot_destination.relative_to(REPOSITORY_ROOT)}",
            parent=self.root,
        )


def main() -> None:
    root = tk.Tk()
    TemplateRegistrarWindow(root)
    root.mainloop()


if __name__ == "__main__":
    main()
