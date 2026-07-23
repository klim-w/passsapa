# PassSapa - System Change Log & Development Checkpoints

เอกสารบันทึกประวัติการปรับปรุง แก้ไข และเพิ่มฟังก์ชันใหม่ของระบบ PassSapa ตามมาตรฐาน Keep a Changelog

---

## [v1.6.1-sage-herbal-ivory-light-theme] - 2026-07-23 (Phase 3: Sage Herbal Ivory AAA Light Mode Palette)

### 📌 Development Checkpoint Status
- [x] วิเคราะห์สาเหตุความแสบตาและตัวหนังสือจางในโหมด Light Mode จากรูปภาพแคปเจอร์จริง (`passsapa.vercel.app`)
- [x] ออกแบบชุดสีใหม่ **"Sage Herbal Ivory" (โหมดสว่างงาช้างสมุนไพร)** สุภาพ อบอุ่น คลายความเมื่อยล้าของสายตา คอนทราสต์ระดับ AAA
- [x] เปลี่ยนพื้นหลังเพจจากขาวแสบตา เป็น **สีขาวงาช้างอุ่นอ่อน (`#EEF3F0`)** พร้อมปรับข้อความภาษาไทยทุกบรรทัดเป็น **สีเขียวดำลึกคมกริบ (`#0B1915` / `#1E332C`)**
- [x] ผลักดันโค้ดขึ้น `feature/v1.6.0-dev` branch เรียบร้อยแล้ว

### 🛠️ Modified
- `app/globals.css` - ปรับชุดสี Light Mode Tokens ใหม่ทั้งหมด
- `src/components/Navbar.tsx` - ปรับคอนทราสต์ตัวหนังสือในนิวบาร์ให้เข้มคมกริบ
- `src/features/landing/LandingPage.tsx` - ปรับสีข้อความการ์ดและโจทย์ข้อสอบให้คมชัด อ่านสบายตา
- `index.html` & `preview.html` - อัปเดตพรีวิวชุดสี Sage Herbal Ivory 100%
