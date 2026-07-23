# PassSapa - Master UX/UI Design System & CI Brand Guidelines

**เวอร์ชัน**: v1.6.1 (Official CI Standard Release)  
**แนวคิดหลัก**: สุภาพ ทางการ เป็นทางการเหมือนตำราสภาการแพทย์แผนไทย (Formal Academic Identity) ผสมผสานความทันสมัยระดับสากล

---

## 🎨 1. ระบบคู่สีมาตรฐาน (Dual CI Color Palette Tokens)

### ☀️ Light Mode Theme: "Sage Herbal Ivory" (โหมดสว่างงาช้างสมุนไพร - คอนทราสต์คมกริบ AAA)
ถูกออกแบบมาเพื่อแก้ปัญหาสายตาและความแสบตาโดยเฉพาะ คลายความเมื่อยล้าเมื่อต้องอ่านตำราและทำข้อสอบยาวๆ

* **Page Background (`--bg-primary`)**: `#EEF3F0` (ขาวงาช้างอุ่นผสมแร่ธาตุธรรมชาติ 0% แสบตา)
* **Card Surface (`--bg-surface`)**: `#FFFFFF` (ขาวกระดาษนุ่มละมุน พร้อมขอบ `#D4E2DC`)
* **Primary Text (`--text-main`)**: `#0B1915` (เขียวดำป่าลึก คอนทราสต์สูง อ่านโจทย์คมกริบ 100%)
* **Secondary Text (`--text-muted`)**: `#3D5850` / `#1E332C` (เขียวมรกตอุ่น อ่านสบายตา ไม่จางหาย)
* **Primary Emerald Action (`--primary-green`)**: `#0D7A5F` / `#095945` (เขียวมรกตลุ่มลึก มีพลัง)
* **Scripture Gold Accent (`--accent-gold`)**: `#C27803` (ทองตำราคัมภีร์ คมชัดบนพื้นสว่าง)

### 🌙 Night Mode Theme: "Obsidian Jade & Scripture Gold" (โหมดมืดหยกมรกต - 0% Glare)
ถูกออกแบบมาเพื่อการติวสอบยามค่ำคืน ถนอมสายตาสูงสุด ลอยมิติสวยงาม

* **Page Background (`--bg-primary`)**: `#060A09` (ดำหยกมรกตลึก 0% แสงสะท้อน)
* **Card Surface (`--bg-surface`)**: `#0C1412` (ดำมรกตซ้อนมิติ ไร้เส้นขอบซ้ำซ้อน)
* **Primary Text (`--text-main`)**: `#F3F4F6` (ขาวนวล อ่านสบายตา)
* **Secondary Text (`--text-muted`)**: `#9CA3AF` (เทาสว่างนุ่มตา)
* **Primary Emerald Action (`--primary-green`)**: `#10B981` (เขียวมรกตเรืองแสงนวล)
* **Scripture Gold Accent (`--accent-gold`)**: `#F59E0B` (ทองคัมภีร์นำทาง / VIP)

---

## ✒️ 2. ระบบแบบอักษรทางการ (Formal Typography System)

* **ฟอนต์เนื้อหาข้อสอบ & คัมภีร์หลัก (Body Text & Scriptures)**: **`Sarabun` (TH Sarabun New)**
  * *การใช้งาน*: ตัวหนังสือมีหัว อ่านโจทย์ยาวๆ ข้อสอบสภาฯ กฎหมาย และคัมภีร์ตักกศิลา ได้อย่างสบายตา
* **ฟอนต์หัวข้อและปุ่มกด (Headings & UI Buttons)**: **`Prompt` / `Kanit`**
  * *การใช้งาน*: หัวข้อหลัก หัวข้อย่อย ปุ่มกด และตัวเลขสถิติ หนักแน่น ทันสมัย สุภาพ

---

## 📐 3. รูปทรงเรขาคณิตมาตรฐาน (Standard Geometry & Component Rules)

* **การ์ดและพื้นที่แสดงผล (Cards & Containers)**: **`rounded-2xl` (20px)** ถึง **`rounded-3xl` (24px)**
* **ปุ่มกดและแท็บเมนู (Buttons & Navigation Tabs)**: **`rounded-full` (ทรงแคปซูล 9999px)**
* **แถบนิวบาร์ (Top Navbar Sitemap)**: **บังคับบรรทัดเดียว (Single-Line Layout 100%)**
  * ห้ามตกเป็น 2 บรรทัด
  * ย้ายเครื่องมือผู้เรียน (`คลังข้อสอบ`, `บัตรคำ`) ไปเก็บไว้ใน `📊 ห้องเรียนผู้เรียน` (Student Dashboard Hub)

---

## 🔒 4. คำสั่งกำกับการพัฒนาในอนาคต (Engineering Governance Directive)
นักพัฒนาทุกคนหรือ AI Assistant ในอนาคต **ต้องปฏิบัติตามระบบสีและเรขาคณิตในเอกสารนี้โดยเคร่งครัด** ห้ามปรับเปลี่ยนสีพื้นหลังเป็นขาวล้วน `#FFFFFF` หรือเปลี่ยนตัวหนังสือใน Light Mode เป็นสีอ่อนจางเด็ดขาด
