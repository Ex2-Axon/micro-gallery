# คู่มือ AI / พนักงาน: ลงทะเบียนเว็บเทมเพลต

ใช้คู่มือนี้หลังสร้างเทมเพลตเสร็จแล้ว เพื่อเพิ่มเทมเพลตพร้อมภาพและข้อมูลที่ตรวจสอบได้ลง Axon Template Gallery

## ข้อกำหนดก่อนเริ่ม

1. เปิดโฟลเดอร์โปรเจกต์ `Micro-Gallery` ใน VS Code
2. ตรวจจากไฟล์ของเทมเพลตที่สร้างเสร็จแล้ว ไม่เดา framework, version, ภาษา, ฐานข้อมูล หรือ URL
3. เตรียมภาพ screenshot ของเทมเพลตเป็นไฟล์ `.avif`, `.webp`, `.png`, `.jpg` หรือ `.jpeg`
4. เตรียม URL ของ source repository, เว็บไซต์ที่ deploy แล้ว และชื่อแพลตฟอร์มที่ deploy
5. ตรวจว่า Python พร้อมใช้งาน และมี Tkinter หากไม่มีคำสั่ง Run หรือเปิดหน้าต่างไม่ได้ ให้ติดตั้ง/เปิดใช้ Python extension ใน VS Code, เลือก Python interpreter และติดตั้ง Tkinter ของ Python ที่เลือกก่อน
6. หากต้องการ push จากโปรแกรม ให้เตรียม GitHub fine-grained personal access token ที่จำกัดสิทธิ์เฉพาะ repository `Ex2-Axon/micro-gallery` และมี **Contents: Read and write**

### ตั้งค่า GitHub token สำหรับ push

1. คัดลอก `python-tools/.env.example` เป็น `python-tools/.env.local`
2. เปิด `.env.local` ใน VS Code และกรอก `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPOSITORY`, `GITHUB_BRANCH`, `GITHUB_COMMIT_NAME` และ `GITHUB_COMMIT_EMAIL`
3. ใส่ token จริงเฉพาะใน `.env.local` บนเครื่อง ห้ามใส่ token ใน `.env.example`, source code, commit หรือแชท
4. `.env.local` ถูก ignore โดย Git; ตรวจให้แน่ใจว่าอย่าเปลี่ยนกฎ ignore นี้
5. บัญชีที่เป็นผู้ push คือเจ้าของบัญชี GitHub ของ token ส่วนชื่อ/email ผู้เขียน commit มาจาก `GITHUB_COMMIT_NAME` และ `GITHUB_COMMIT_EMAIL`

ตัวอย่างไฟล์พร้อมค่า placeholder อยู่ที่ [`python-tools/.env.example`](./.env.example). ไฟล์นี้ไม่ใช่ token ที่ใช้ได้ และไม่ต้องส่ง token ให้ผู้ช่วยหรือ AI

## เปิดโปรแกรมแบบไม่ใช้ Terminal ใน VS Code

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
5. **ฐานข้อมูล** — กรอกชื่อจริงเฉพาะประเภท Special; ประเภท Vite และ Next.js ทั่วไปต้องเว้นว่าง ช่อง Database logo ID ต้องเป็นชื่อ icon ที่บริการ Micro-Badged-Tags รองรับ เช่น `supabase`
6. **Source repository URL** — URL repository ของเทมเพลต ไม่ใช่ repository ของ Gallery เว้นแต่เป็น source จริง
7. **Deployment platform** — ชื่อแพลตฟอร์มที่ deploy จริง เช่น Vercel
8. **Deployed URL / Demo URL** — URL เว็บไซต์ที่เปิดใช้งานได้จริง ต้องขึ้นต้นด้วย `https://` หรือ `http://`
9. **คำอธิบาย** — สรุปหน้าที่และเนื้อหาของเทมเพลตสั้น ๆ ตามของจริง
10. **Screenshot** — กด `เลือกไฟล์...` แล้วเลือกภาพของเทมเพลตที่จะเผยแพร่ ตรวจให้แน่ใจว่าเป็นภาพถูกเว็บและไม่มีข้อมูลลับ
11. ตรวจประเภท, ID, ข้อมูล และราคาที่โปรแกรมแสดงอีกครั้ง
12. เลือกว่าจะ push หรือไม่:
    - **ไม่เลือก**: บันทึกข้อมูลและภาพลง working tree ในเครื่องเท่านั้น ยังไม่เผยแพร่
    - **เลือก**: โปรแกรมอ่านค่าจาก `python-tools/.env.local` เท่านั้น, ขอให้ยืนยัน, แล้วใช้ GitHub API สร้าง commit และอัปเดต branch ที่ระบุในไฟล์นั้น โดยส่งเฉพาะ `data/templates.json` และ screenshot ที่เลือก โปรแกรมไม่อ่าน `origin`, Git credentials, GitHub CLI login หรือ environment variables จาก shell
13. กด **ส่ง / Register** และรอข้อความแจ้งผล

## ไฟล์ที่โปรแกรมแก้ไข

- เพิ่ม metadata ใน `data/templates.json`
- คัดลอก screenshot ไปที่ `public/screenshots/<template-id>.<นามสกุล>`
- บันทึก path รูปใน metadata เช่น `/screenshots/x-template-next-012.png`
- การ์ดแกลเลอรีและหน้ารายละเอียดอ่าน metadata เหล่านี้ตอน build; ไม่ต้องแก้ source code เพื่อเพิ่มเทมเพลตแต่ละรายการ

## หลังลงทะเบียน

- ถ้าเลือก push ให้ตรวจว่าโปรแกรมแจ้ง commit SHA แล้วรอ GitHub/Vercel build และ deploy branch ที่ตั้งไว้ให้เสร็จ หาก deployment ไม่เริ่มหรือไม่ผ่าน ให้แจ้งผู้ดูแลพร้อม error จาก GitHub/Vercel อย่ารายงานว่าเผยแพร่แล้วก่อนตรวจ URL จริง
- ถ้าไม่ได้ push ให้ผู้ดูแลตรวจ diff และ commit/push ตามขั้นตอนโครงการก่อน เทมเพลตจะยังไม่ปรากฏบนเว็บไซต์ที่ deploy จนกว่า build/deploy ที่มีไฟล์ใหม่จะสำเร็จ
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
