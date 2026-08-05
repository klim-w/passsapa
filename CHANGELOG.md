# PassSapa - System Change Log & Development Checkpoints

เอกสารบันทึกประวัติการปรับปรุง แก้ไข และเพิ่มฟังก์ชันใหม่ของระบบ PassSapa ตามมาตรฐาน Keep a Changelog

---

## [v2.1.0-session-and-view-persistence-released] - 2026-08-05 (Phase 7: Full Session & View Persistence Upgrade)

### 📌 Development Checkpoint Status
- [x] เพิ่มระบบ **Session & View Memory Persistence** จดจำหน้าและเมนูล่าสุดผ่าน `localStorage` 100%
- [x] เมื่อผู้ใช้รีเฟรชเบราว์เซอร์ (F5 / Refresh) ระบบจะจดจำ:
  - 📌 **หน้าปัจจุบัน (Active View)** เช่น อยู่หน้าเลือกสาขาวิชา (`branch-hub`), แดชบอร์ด (`dashboard`), ห้องสอบ (`exam`), คลังบทความ (`knowledge`), หรือ Admin (`admin`)
  - 👤 **สถานะเข้าสู่ระบบ (User Session)** เช่น เข้าสู่ระบบแล้ว, ชื่อผู้ใช้, สถานะสิทธิ์ VIP
  - 🌿 **สาขาวิชาและแท็บบทเรียนล่าสุด** ใน `BranchHub` (เช่น เวชกรรมไทย, ภาคปฏิบัติ, อัตนัย/เติมคำ)
  - ✍️ **ตัวกรองคลังข้อสอบล่าสุด** ใน `ExamEngine`
- [x] ผ่านการทดสอบ Build 100% (**✓ Compiled Successfully, 0 Errors**)
- [x] Commit และ Push ขึ้น GitHub Branches **`main`** และ **`feature/v1.6.0-dev`** เรียบร้อยแล้ว

### 🛠️ Modified
- `app/page.tsx` - เพิ่ม `useEffect` ดึงและบันทึก `currentView`, `isLoggedIn`, `userName`, `userPlan`, `examInitialFilter` ลงใน `localStorage`
- `src/features/branch/BranchHub.tsx` - เพิ่ม `useEffect` ดึงและบันทึก `selectedSubject`, `activeTab`, `theorySubCategory`, `practicalTypeFilter` ลงใน `localStorage`
