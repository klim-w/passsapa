# PassSapa - System Change Log & Development Checkpoints

เอกสารบันทึกประวัติการปรับปรุง แก้ไข และเพิ่มฟังก์ชันใหม่ของระบบ PassSapa ตามมาตรฐาน Keep a Changelog

---

## [v1.9.0-diagram-t2-upgraded] - 2026-08-05 (Phase 5: Diagram T2 Full Architecture Upgrade)

### 📌 Development Checkpoint Status
- [x] ศึกษาและยกระดับสถาปัตยกรรมระบบให้ตรงตาม **ผังใหม่ (Requirement Diagram T2)** 100%
- [x] อัปเดตหมวดภาคปฏิบัติสำหรับ 3 สาขาวิชา (**เภสัชกรรมไทย**, **ผดุงครรภ์ไทย**, **นวดไทย**) ให้รองรับ **`ข้อสอบเติมคำในช่องว่าง/ ปรนัย`**
- [x] อัปเดตหมวดภาคปฏิบัติสำหรับ **เวชกรรมไทย** ให้รองรับ **`ข้อสอบปรนัย 5 ตัวเลือก`** ชัดเจนเคียงคู่กับ อัตนัย และ เติมคำในช่องว่าง
- [x] ปรับเปลี่ยน Filter Label และเมนูส่วนหน้าให้แสดงผลตรงกับข้อความผังใหม่ T2 ทุกจุด
- [x] ผ่านการทดสอบ Build 100% (**✓ Compiled Successfully, 0 Errors**)
- [x] Commit และ Push ขึ้น GitHub Branches **`main`** และ **`feature/v1.6.0-dev`** เรียบร้อยแล้ว

### 🛠️ Modified
- `src/lib/constants.ts` - เพิ่มชุดข้อสอบภาคปฏิบัติประเภท ปรนัย 5 ตัวเลือก และ เติมคำ/ปรนัย ครบ 5 สาขา
- `src/features/branch/BranchHub.tsx` - อัปเดตการแสดงผลและตัวกรองภาคปฏิบัติให้ตรงกับผังใหม่ T2
- `src/features/exam/ExamEngine.tsx` - อัปเดตระบบสอบและ Tag แสดงผลตามผังใหม่ T2
- `index.html` & `preview.html` - อัปเดตสแน็ปช็อตสแตนอโลน static HTML ให้ซิงค์ตรงตามผังใหม่ T2
