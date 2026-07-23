# PassSapa - System Change Log & Development Checkpoints

เอกสารบันทึกประวัติการปรับปรุง แก้ไข และเพิ่มฟังก์ชันใหม่ของระบบ PassSapa ตามมาตรฐาน Keep a Changelog

---

## [v1.6.4-custom-centered-notification-toast] - 2026-07-23 (Phase 3: Custom Centered Notification Modal Upgrade)

### 📌 Development Checkpoint Status
- [x] ยกเลิกระบบป็อปอัปแจ้งเตือนเดิมของเบราว์เซอร์ (`browser native alert()`) ที่ดูเหมือนกล่อง Error อัปลักษณ์
- [x] สร้างคอมโพเนนต์ใหม่ **`NotificationToast.tsx`** ออกแบบป็อปอัปแจ้งเตือนกึ่งกลางหน้าจอแบบ Glassmorphic มนพรีเมียม สไตล์ PassSapa Standard CI 100%
- [x] เปลี่ยนจุดแจ้งเตือนทั้งหมด (การเข้าสู่ระบบ, การสลับห้องทำข้อสอบซ่อมจุดอ่อน, การชำระเงิน VIP, การออกจากระบบ) ให้ใช้ `NotificationToast` ใหม่ทั้งหมด
- [x] ทดสอบสั่งรันคำสั่ง `npm run build` ผ่าน 100% (**✓ Compiled Successfully, 0 Errors**)
- [x] Commit และ Push ขึ้น GitHub Branch **`feature/v1.6.0-dev`** เรียบร้อยแล้ว

### 🛠️ Added & Modified
- `src/components/NotificationToast.tsx` - คอมโพเนนต์ป็อปอัปแจ้งเตือนกึ่งกลางหน้าจอดีไซน์พรีเมียม
- `src/features/dashboard/StudentDashboard.tsx` - สลับมาใช้ NotificationToast เมื่อเปิดติวซ่อมจุดอ่อน
- `app/page.tsx` - สลับมาใช้ NotificationToast สำหรับแจ้งเตือนการใช้งานระบบทั้งหมด
