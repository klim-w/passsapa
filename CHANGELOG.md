# PassSapa - System Change Log & Development Checkpoints

เอกสารบันทึกประวัติการปรับปรุง แก้ไข และเพิ่มฟังก์ชันใหม่ของระบบ PassSapa ตามมาตรฐาน Keep a Changelog

---

## [v2.3.0-topbar-demo-quiz-dropdown-released] - 2026-08-06 (Phase 9: Topbar Demo Quiz 5-Subject Dropdown Upgrade)

### 📌 Development Checkpoint Status
- [x] อัปเดตเมนู **`🧪 ตัวอย่างข้อสอบ`** บน Topbar ให้กลายเป็น **Dropdown Menu แสดงรายวิชาทั้ง 5 สาขา** 100%
- [x] ออกแบบหน้าตา Dropdown Panel ด้วยดีไซน์ Glassmorphism แสดงไอคอน ชื่อสาขาวิชา และหัวข้อคัมภีร์ย่อ ครบ 5 สาขา:
  1. 📜 **เวชกรรมไทย** — (คัมภีร์ตักกศิลา, ฉันทศาสตร์)
  2. 🧪 **เภสัชกรรมไทย** — (รสยา 9 รส, เภสัชวัตถุ)
  3. 👶 **ผดุงครรภ์ไทย** — (คัมภีร์ปฐมจินดารัตน์, อาการแพ้มาศ)
  4. 🙌 **นวดไทย** — (เส้นประธานสิบ, จุดกดราชสำนัก)
  5. ⚖️ **กฎหมายและจรรยาบรรณวิชาชีพ** — (พ.ร.บ. วิชาชีพ 2556)
- [x] **สำหรับผู้ใช้ทั่วไป (Guest)**: เมื่อกดเลือกวิชาใน Dropdown ระบบจะเลื่อนหน้าจอไปยังส่วน Demo Quiz และ **สลับโจทย์ข้อสอบตัวอย่างให้ตรงตามวิชาที่เลือกทันที**
- [x] **สำหรับผู้เรียนที่เป็นสมาชิกแล้ว (Member)**: เมื่อกดเลือกวิชาใน Dropdown ระบบจะเปิดวาร์ปเข้าสู่ **ห้องสอบจริง (`ExamEngine`)** ของวิชานั้นๆ ทันที
- [x] ผ่านการทดสอบ Build 100% (**✓ Compiled Successfully, 0 Errors**)
- [x] Commit และ Push ขึ้น GitHub Branches **`main`** และ **`feature/v1.6.0-dev`** เรียบร้อยแล้ว

### 🛠️ Modified
- `src/components/Navbar.tsx` - เพิ่ม Dropdown Menu 5 สาขาวิชาสำหรับปุ่ม "ตัวอย่างข้อสอบ" พร้อมระบบคลิกปิดภายนอก
- `src/features/landing/LandingPage.tsx` - ปรับปรุงส่วน Demo Quiz ให้รับค่าวิชาและมีแท็บสลับทำข้อสอบตัวอย่างได้ฟรี 5 สาขา
- `app/page.tsx` - เชื่อมโยงการส่งต่อ State วิชาที่เลือกจาก Navbar ไปยัง LandingPage และ ExamEngine
