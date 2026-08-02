# PassSapa - System Change Log & Development Checkpoints

เอกสารบันทึกประวัติการปรับปรุง แก้ไข และเพิ่มฟังก์ชันใหม่ของระบบ PassSapa ตามมาตรฐาน Keep a Changelog

---

## [v1.8.0-t1-architecture-upgraded] - 2026-08-02 (Phase 4: Full Requirement Diagram T1 System Architecture Upgrade)

### 📌 Development Checkpoint Status
- [x] ยกระดับโครงสร้างและสถาปัตยกรรมระบบให้สอดคล้องกับผังไดอะแกรมข้อกำหนด T1 (Requirement Diagram T1) 100%
- [x] เพิ่มระบบ **องค์ความรู้แพทย์แผนไทย (Public Knowledge Hub)** บนหน้าแรกสำหรับผู้เยี่ยมชมอ่านฟรี
- [x] เพิ่มระบบ ** Branch Selector Hub (ศูนย์เลือกสาขาวิชา)** สำหรับสมาชิก รองรับ 5 สาขาวิชาหลัก
- [x] เพิ่มโมดูล **`📖 เนื้อหาบทเรียน/ตำรา`** ประจำแต่ละสาขา
- [x] ขยายรูปแบบข้อสอบรองรับ 3 ประเภทตามผัง T1:
  - **ข้อสอบปรนัย 5 ตัวเลือก (A, B, C, D, E)**
  - **ข้อสอบเติมคำในช่องว่าง (Fill-in-the-blank)**
  - **ข้อสอบอัตนัย (Subjective Essay + แนวทางการตอบ/Rubric)**
- [x] รองรับการแยกหมวด **📘 ภาคทฤษฎี** (ย่อย **เวช 1** และ **เวช 2** สำหรับเวชกรรมไทย) และ **🛠️ ภาคปฏิบัติ**
- [x] ผ่านการทดสอบ Build 100% (**✓ Compiled Successfully, 0 Errors**)
- [x] Commit และ Push ขึ้น GitHub Branch **`feature/v1.6.0-dev`** เรียบร้อยแล้ว

### 🛠️ Added & Modified
- `src/lib/types.ts` - ขยายชนิดข้อมูลรองรับ `mcq_5`, `fill_in_blank`, `subjective`, `theory`, `practical`, `เวช 1`, `เวช 2`, `StudyMaterialItem`, `KnowledgeArticleItem`
- `src/lib/constants.ts` - เพิ่มชุดข้อสอบและเนื้อหาตัวอย่างตามผัง T1 100%
- `src/features/branch/BranchHub.tsx` [NEW] - คอมโพเนนต์หน้าเลือกสาขาวิชาและสลับหมวดเนื้อหา/ทฤษฎี/ปฏิบัติ
- `src/features/branch/BranchContentViewer.tsx` [NEW] - คอมโพเนนต์เปิดอ่านสรุปเนื้อหาบทเรียนคัมภีร์
- `src/features/knowledge/PublicKnowledgeHub.tsx` [NEW] - คอมโพเนนต์เปิดอ่านองค์ความรู้แพทย์แผนไทยสำหรับคนทั่วไป
- `src/features/exam/ExamEngine.tsx` - ปรับระบบสอบรองรับ 5 ตัวเลือก A-E, เติมคำ, อัตนัย, เวช 1/2
- `src/features/landing/LandingPage.tsx` & `src/components/Navbar.tsx` & `app/page.tsx` - เชื่อมต่อการนำทางตามผัง T1
