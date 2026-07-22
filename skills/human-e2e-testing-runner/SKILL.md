---
name: human-e2e-testing-runner
description: Skill สำหรับรันการทดสอบระบบเสมือนมนุษย์ (Human Emulation E2E Testing) และการไล่ทดสอบท่อ Wiring ย้อนกลับ 100%
---

# Human E2E Testing Runner Skill

Skill นี้ใช้กำกับการรันทดสอบระบบเสมือนพฤติกรรมมนุษย์และการไล่ทดสอบตลอดท่อส่งข้อมูล (Full Chain Wiring Tracing) สำหรับระบบ PassSapa

---

## 🧪 ขั้นตอนการทดสอบ 4 สเต็ปมาตรฐาน

1. **Step 1: TypeScript Build & Lint Check**:
   * รันคำสั่ง `npx tsc --noEmit` เพื่อการันตีว่าไม่มี Syntax/Type Error หลุดรอด

2. **Step 2: Human Error Emulation**:
   * จำลองการกรอกข้อมูลผิดพลาด (กรอกสลิปมั่ว, รหัสผ่านสั้น, อีเมลผิดฟอร์แมต) ➔ ตรวจสอบว่าขึ้นแจ้งเตือนสุภาพ

3. **Step 3: State Interruption Emulation**:
   * จำลองกด Refresh (F5), กด Back, หรือปิดเบราว์เซอร์ขณะทำข้อสอบ ➔ ตรวจสอบว่าคำตอบและเวลานาฬิกาไม่รีเซ็ต

4. **Step 4: Full Chain Regression Tracing**:
   * ไล่รันตั้งแต่หน้าแรก Landing ➔ Auth ➔ Dashboard ➔ Exam ➔ Result ➔ Payment ➔ DB ➔ การันตีว่าฟังก์ชันเดิมไม่พัง 100%
