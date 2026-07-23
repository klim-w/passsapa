# PassSapa - System Change Log & Development Checkpoints

เอกสารบันทึกประวัติการปรับปรุง แก้ไข และเพิ่มฟังก์ชันใหม่ของระบบ PassSapa ตามมาตรฐาน Keep a Changelog

---

## [v1.6.6-minimalist-top-navbar-optimization] - 2026-07-23 (Phase 3: Minimalist Top Navbar Optimization)

### 📌 Development Checkpoint Status
- [x] วิเคราะห์ความซ้ำซ้อนของเมนู `🌿 5 สาขาวิชา` บน Top Navbar ตามหลัก UX Simplification
- [x] นำเมนู `🌿 5 สาขาวิชา` บน Top Navbar ออก เพื่อลดความซ้ำซ้อน เนื่องจากเนื้อหานี้ถูกแสดงผลอย่างสวยงามโดดเด่นอยู่บนหน้าแรก (Landing Page) และใน Student Dashboard แล้ว
- [x] สรุปสitemap นิวบาร์ให้มินิมอลและโปร่งสบายที่สุด:
  - **สำหรับ Guest**: `🏠 หน้าแรก` | `💳 ราคาแพ็กเกจ`
  - **สำหรับ Logged In**: `🏠 หน้าแรก` | `📊 ห้องเรียนผู้เรียน` | `💳 ราคาแพ็กเกจ`
- [x] อัปเดตไฟล์ `Navbar.tsx`, `index.html` และ `preview.html` 100%
- [x] Commit และ Push ขึ้น GitHub Branch **`feature/v1.6.0-dev`** เรียบร้อยแล้ว

### 🛠️ Modified
- `src/components/Navbar.tsx` - ปรับนิวบาร์ให้มินิมอล ตัดเมนูซ้ำซ้อนออก
- `index.html` & `preview.html` - ปรับพรีวิวสitemap บนตัวไฟล์สแตนด์อโลน
