# คู่มือใช้งานตัวลงทะเบียนเว็บเทมเพลต

ใช้คู่มือนี้หลังสร้างเทมเพลตเสร็จแล้ว เพื่อเพิ่มเทมเพลตพร้อมภาพและข้อมูลที่ตรวจสอบได้ลง Axon Template Gallery

## ข้อกำหนดก่อนเริ่ม

1. เปิดโฟลเดอร์โปรเจกต์ `Micro-Gallery` ใน VS Code
2. ตรวจจากไฟล์ของเทมเพลตที่สร้างเสร็จแล้ว ไม่เดา framework, version, ภาษา, ฐานข้อมูล หรือ URL
3. เตรียมภาพ screenshot ของเทมเพลตเป็นไฟล์ `.avif`, `.webp`, `.png`, `.jpg` หรือ `.jpeg`
4. เตรียม URL ของ source repository, เว็บไซต์ที่ deploy แล้ว และชื่อแพลตฟอร์มที่ deploy
5. ตรวจว่า Python พร้อมใช้งาน และมี Tkinter หากไม่มีคำสั่ง Run หรือเปิดหน้าต่างไม่ได้ ให้ติดตั้ง/เปิดใช้ Python extension ใน VS Code, เลือก Python interpreter และติดตั้ง Tkinter ของ Python ที่เลือกก่อน
6. การลงทะเบียนในเครื่องไม่ต้องใช้ GitHub token ขณะนี้ยังไม่ควรเลือก push จาก UI เพราะขั้นตอน push ยังไม่ส่ง framework badge ที่สร้างใหม่ ให้ผู้ดูแลยืนยัน/แก้ขั้นตอนเผยแพร่ก่อน

### การตั้งค่า GitHub สำหรับ push (หลังผู้ดูแลยืนยันว่าขั้นตอนรองรับ badge แล้ว)

1. คัดลอก `python-tools/.env.example` เป็น `python-tools/.env.local`
2. เปิด `.env.local` ใน VS Code และกรอก `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPOSITORY`, `GITHUB_BRANCH`, `GITHUB_COMMIT_NAME` และ `GITHUB_COMMIT_EMAIL`
3. ใส่ token จริงเฉพาะใน `.env.local` บนเครื่อง ห้ามใส่ token ใน `.env.example`, source code, commit หรือแชท
4. `.env.local` ถูก ignore โดย Git; ตรวจให้แน่ใจว่าอย่าเปลี่ยนกฎ ignore นี้
5. บัญชีที่เป็นผู้ push คือเจ้าของบัญชี GitHub ของ token ส่วนชื่อ/email ผู้เขียน commit มาจาก `GITHUB_COMMIT_NAME` และ `GITHUB_COMMIT_EMAIL`

ตัวอย่างไฟล์พร้อมค่า placeholder อยู่ที่ [`python-tools/.env.example`](./.env.example). ไฟล์นี้ไม่ใช่ token ที่ใช้ได้ และไม่ต้องส่ง token ให้ผู้ช่วยหรือ AI

## เปิดโปรแกรมลงทะเบียน

1. เปิดโฟลเดอร์ `Micro-Gallery` ใน VS Code
2. คลิกไอคอน **Run and Debug** ที่แถบด้านซ้าย
3. เลือก **Run Template Registrar (No Terminal)** ที่แถบด้านบน
4. กดปุ่มสามเหลี่ยมสีเขียว **Start Debugging** โปรแกรมลงทะเบียนจะเปิดเป็นหน้าต่าง desktop โดยไม่เปิด Terminal

มีไฟล์ shortcut อยู่ที่ root ของโครงการ: `run_template_registrar.py` โดยใช้ launch configuration ข้างต้นเพื่อเปิดหน้าต่างโดยไม่ใช้ Terminal หากต้องการใช้เมนูคลิกขวาแทน ให้คลิกขวาที่ไฟล์นี้หรือ `python-tools/template_registrar_ui.py` แล้วเลือก **Run Python File in Terminal** (วิธีนี้เปิด Terminal ตามการทำงานปกติของ Python extension)

หากไม่เห็น Python interpreter หรือ Run and Debug configuration ให้ติดตั้ง/เปิดใช้ Python extension ของ VS Code แล้วเลือก Python interpreter ที่มี Tkinter

ทางเลือกสำหรับผู้ที่เปิด Terminal ที่ root ของโปรเจกต์อยู่แล้ว:

```bash
python3 run_template_registrar.py
```

คำสั่งนี้เปิดหน้าต่าง UI ของ Tkinter ไม่ใช่หน้าเว็บ และต้องรันจาก root ของโปรเจกต์ `python-tools/template_registrar.py` เป็นโมดูลฟังก์ชัน ไม่มี CLI สำหรับรับ argument; การรันไฟล์นั้นโดยตรงจะไม่ลงทะเบียนเทมเพลต

## กรอกข้อมูลและลงทะเบียน

ทำตามลำดับนี้ในหน้าต่างโปรแกรม:

1. **ประเภท** — เลือกประเภทให้ตรงกับเทมเพลตจริง:
   - `Vite`: ชื่อ `x-template-###`; ราคา 2,500 บาท; ไม่มีฐานข้อมูล
   - `Next.js`: ชื่อ `x-template-next-###`; ราคา 3,500 บาท; ไม่มีฐานข้อมูล
   - `Special (Vite + database)`: ชื่อ `x-template-special-###`; ราคา 5,000 บาท; ต้องใช้ฐานข้อมูลจริงและระบุชื่อฐานข้อมูล
   
   โปรแกรมสร้าง Template ID ถัดไปให้เองตามรายการในแกลเลอรี อย่าเปลี่ยน prefix หรือเลือกประเภทจากราคาอย่างเดียว
2. **Framework version** — กรอกเวอร์ชันที่ตรวจจาก `package.json`, lockfile หรือไฟล์ตั้งค่าของเทมเพลตต้นฉบับ
3. **ภาษาโปรแกรม** — กรอกภาษาที่ใช้จริง คั่นหลายค่าด้วย comma เช่น `TypeScript, CSS` อย่าใส่ชื่อ framework ในช่องภาษา
4. **Technologies เพิ่มเติม** — กรอก framework/library/tool อื่นที่ตรวจพบจริง คั่นด้วย comma เช่น `React, Tailwind CSS`; เว้นว่างได้
5. **ฐานข้อมูล** — กรอกชื่อจริงเฉพาะประเภท Special; ประเภท Vite และ Next.js ทั่วไปต้องเว้นว่าง ช่อง Database badge filename ต้องตรงกับไฟล์ SVG ใน `public/badges/` ที่ระบุฐานข้อมูลนั้น ปัจจุบันมี `supabase` และ `neon`
6. **Source repository URL** — URL repository ของเทมเพลต ไม่ใช่ repository ของ Gallery เว้นแต่เป็น source จริง
7. **Deployment platform** — ชื่อแพลตฟอร์มที่ deploy จริง เช่น Vercel
8. **Deployed URL / Demo URL** — URL เว็บไซต์ที่เปิดใช้งานได้จริง ต้องขึ้นต้นด้วย `https://` หรือ `http://`
9. **คำอธิบาย** — สรุปหน้าที่และเนื้อหาของเทมเพลตสั้น ๆ ตามของจริง
10. **Screenshot** — กด `เลือกไฟล์...` แล้วเลือกภาพของเทมเพลตที่จะเผยแพร่ ตรวจให้แน่ใจว่าเป็นภาพถูกเว็บและไม่มีข้อมูลลับ
11. ตรวจประเภท, ID, ข้อมูล และราคาที่โปรแกรมแสดงอีกครั้ง
12. ขณะนี้ให้ **ไม่เลือก** ตัวเลือก push: โค้ด push ปัจจุบันส่ง `data/templates.json` กับ screenshot แต่ไม่ได้ส่ง framework badge ที่สร้างใหม่ จึงอาจทำให้ badge บนเว็บไซต์ไม่พบไฟล์ รอผู้ดูแลแก้/ตรวจขั้นตอน publish ก่อน
13. กด **ส่ง / Register** และรอข้อความแจ้งผล

## ลงทะเบียนโดยไม่ใช้ UI

ไม่มีคำสั่ง CLI โดยตรง แต่เรียกฟังก์ชัน `next_template_name()` และ `register_template()` จาก Python ได้ ให้เปิด Terminal ที่ root ของโปรเจกต์ แล้วแทนค่าตัวอย่างให้เป็นข้อมูลที่ตรวจสอบจากเทมเพลตจริงก่อนรัน:

```bash
python3 - <<'PY'
import sys
from pathlib import Path

sys.path.insert(0, str(Path.cwd() / "python-tools"))

from template_registrar import TemplateDetails, next_template_name, register_template

root = Path.cwd()
kind = "Vite"

details = TemplateDetails(
    name=next_template_name(root, kind),
    framework=kind,
    framework_version="REPLACE_WITH_VERIFIED_VERSION",
    languages=("TypeScript", "HTML"),
    technologies=("React",),
    database="",
    database_icon="",
    source_repository="https://github.com/OWNER/REPOSITORY",
    deployment_platform="Vercel",
    deployed_url="https://REPLACE_WITH_REAL_DEMO_URL",
    description="REPLACE_WITH_A_VERIFIED_TEMPLATE_DESCRIPTION",
)

screenshot = Path("/absolute/path/to/template-screenshot.png")
saved_image = register_template(root, details, screenshot)
print(f"Registered {details.name}: {saved_image}")
PY
```

ก่อนรันให้แก้ `framework_version`, source URL, demo URL, คำอธิบาย และตำแหน่ง screenshot ให้ครบ; ต้องระบุ path ของ screenshot ที่มีอยู่จริง รองรับ `.avif`, `.webp`, `.png`, `.jpg`, `.jpeg` ชื่อและราคาจะคำนวณจาก `kind` และรายการใน `data/templates.json`:

- ใช้ `kind = "Vite"` สำหรับ `x-template-###` (2,500 บาท)
- ใช้ `kind = "Next.js"` สำหรับ `x-template-next-###` (3,500 บาท)
- ใช้ `kind = "Special (Vite + database)"` สำหรับ `x-template-special-###` (5,000 บาทและต้องระบุฐานข้อมูลจริง)

กรณี Special ให้กรอก `database` เช่น `"Supabase"` และ `database_icon` เป็นชื่อ asset โดยไม่ใส่นามสกุล เช่น `"supabase"`; ต้องมีไฟล์ `public/badges/supabase.svg` อยู่จริง ช่อง languages รองรับเฉพาะภาษาที่มี local badge ได้แก่ CSS, HTML, Java, JavaScript, Python และ TypeScript ตัว registrar จะสร้างหรือใช้ framework badge ร่วมกันตาม framework และเวอร์ชันไว้ใน `public/badges/` และลงทะเบียน path ของมันใน JSON

คำสั่งนี้บันทึกข้อมูลและ screenshot ในเครื่องเท่านั้น **ยังไม่ push หรือ deploy** ตรวจสิ่งที่จะเปลี่ยนก่อน:

```bash
git status --short
git diff -- data/templates.json
```

เมื่อจะเผยแพร่ ต้องให้ผู้ดูแล review และรวมทั้ง `data/templates.json`, screenshot ที่ได้ และ framework badge ที่ JSON อ้างถึงใน `public/badges/` เข้ากระบวนการ publish ที่ได้รับอนุมัติ อย่าใช้ตัวเลือก push ของ UI ในขณะที่ implementation ยังไม่ส่ง framework badge

## ไฟล์ที่โปรแกรมแก้ไข

- เพิ่ม metadata ใน `data/templates.json`
- คัดลอก screenshot ไปที่ `public/screenshots/<template-id>.<นามสกุล>`
- สร้างหรือใช้ framework badge ร่วมกันตาม framework/version ไว้ที่ `public/badges/<framework>-<version>.svg` และอ้าง badge ทั้งหมดด้วย path ภายใน `/badges/`
- บันทึก path รูปใน metadata เช่น `/screenshots/x-template-next-012.png`
- การ์ดแกลเลอรีและหน้ารายละเอียดอ่าน metadata เหล่านี้ตอน build; ไม่ต้องแก้ source code เพื่อเพิ่มเทมเพลตแต่ละรายการ

## หลังลงทะเบียน

- ตรวจ `git status --short`, diff ของ JSON, screenshot และ framework badge ที่ถูกสร้างหรือใช้ร่วมกัน ก่อนส่งให้ผู้ดูแลตรวจและเผยแพร่
- การบันทึกในเครื่องไม่ได้เผยแพร่เว็บไซต์ เทมเพลตจะแสดงหลังไฟล์ทั้งหมดถูกรวมใน branch ที่ deploy และ build/deploy สำเร็จเท่านั้น
- เปิด Gallery ตรวจการ์ด, badge, ภาพ screenshot, URL demo และหน้ารายละเอียดของ Template ID ที่เพิ่ม

## ความปลอดภัยและการแก้ปัญหา

- โปรแกรมไม่แสดงหรือบันทึก token ลง log; token จะถูกอ่านจากไฟล์ `python-tools/.env.local` และส่งใน HTTPS Authorization header ไป GitHub API เท่านั้น
- `.gitignore` กันไฟล์ `.env.local` และ Python cache ออกจาก Git; ยกเว้นเฉพาะ `.env.example` ที่มีค่า placeholder สำหรับคู่มือ ห้ามเพิ่ม token จริงลงไฟล์ตัวอย่าง
- `.vercelignore` กัน `python-tools/`, `run_template_registrar.py` และ `.vscode/` ออกจากไฟล์ที่อัปโหลดไป Vercel; ไฟล์ Python ยังคงอยู่ใน GitHub repository สำหรับพนักงานเปิดใช้งานในเครื่อง แต่ไม่ถูกนำไป deploy/serve เป็นเว็บไซต์
- ปลายทาง repository และ branch มาจาก `.env.local`; ตรวจค่าสองช่องนี้ให้ถูกต้องก่อนกดยืนยัน
- โปรแกรมไม่ยอมเขียนทับ screenshot ชื่อซ้ำ และหยุดหาก metadata บน GitHub ไม่ตรงกับรายการเดิมใน working copy เพื่อป้องกันการทับการเปลี่ยนแปลงจากผู้อื่น
- หาก GitHub API ปฏิเสธคำขอ ให้ตรวจ token, สิทธิ์ Contents Read and write, repository และ branch ใน `.env.local` ข้อมูลที่บันทึกในเครื่องยังอยู่ อย่ารายงานว่า push สำเร็จถ้าไม่มีข้อความสำเร็จ/commit SHA
- หากขึ้นว่ามีการแก้ไขไฟล์เป้าหมายค้างอยู่ ให้หยุดและตรวจ `data/templates.json` กับ screenshot ที่ระบุ อย่าทับงานเดิม
- หากข้อมูลไม่ครบหรือยืนยันจาก source ไม่ได้ ให้หยุดการลงทะเบียนและถามผู้ดูแล ห้ามเติมข้อมูลโดยคาดเดา

## ทดสอบตัวลงทะเบียน

จาก root ของโปรเจกต์:

```bash
python3 -m unittest discover -s python-tools -p 'test_*.py'
```

คำสั่งพิเศษ

```bash
cd /home/neon13/workspace/services/next/00-MAIN-WEB/Micro-Gallery
python3 << 'PY'
import sys
from pathlib import Path

sys.path.insert(0, "python-tools")

from template_registrar import TemplateDetails, next_template_name, register_template

root = Path.cwd()

# ลงทะเบียนจาก 002 ถึง 054
for i in range(2, 55):  # 2 ถึง 54
    num = f"{i:03d}"
    name = f"x-template-{num}"
    print(f"กำลังลงทะเบียน {name}...")

    details = TemplateDetails(
        name=name,
        framework="Vite",
        framework_version="8.3.5",
        languages=("TypeScript", "HTML"),
        technologies=("React",),
        database="",
        database_icon="",
        source_repository=f"https://github.com/Ex2-Axon/x-template-{num}",
        deployment_platform="GitHub",
        deployed_url=f"https://ex2-axon.github.io/x-template-{num}/",
        description=f"template example# {i}",
    )

    screenshot = Path(f"/home/neon13/workspace/services/next/00-MAIN-WEB/Micro-Gallery/public/x-template-{num}.png")
    try:
        saved_image = register_template(root, details, screenshot)
        print(f"✓ ลงทะเบียนแล้ว: {name} -> {saved_image}")
    except Exception as e:
        print(f"✗ ผิดพลาด {name}: {e}")
        break

print("\nเสร็จสิ้น")
PY
```