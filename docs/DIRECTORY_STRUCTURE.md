# PassSapa - Project Directory Structure Specification

**เวอร์ชัน**: 1.0.0  
**รูปแบบสถาปัตยกรรม**: Feature-Driven Modular Architecture (โครงสร้างแยกตามโมดูลฟังก์ชัน)

---

## 1. แผนผังโครงสร้างโฟลเดอร์หลัก (Directory Tree)

```
PassSapa/
├── dev/                             # ซอร์สโค้ดและส่วนประกอบทั้งหมดของแอปพลิเคชัน
│   ├── app/                         # Routing Layer (Next.js App Router)
│   │   ├── (auth)/                  # [Route Group] หน้าสมัคร/เข้าสู่ระบบ
│   │   ├── (dashboard)/             # [Route Group] หน้า Dashboard นักเรียน & ทำข้อสอบ
│   │   ├── (admin)/                 # [Route Group] หน้าหลังบ้านแอดมิน
│   │   └── api/                     # API Routes & Webhook Endpoints
│   │
│   ├── src/                         # Business Logic & Core Components
│   │   ├── features/                # 🧩 Feature-Driven Modules (แยกส่วนเป็นเอกเทศ)
│   │   │   ├── exam/                # [โมดูลสอบ] UI ทำข้อสอบ, จับเวลา, คำนวณคะแนน, วิเคราะห์คัมภีร์
│   │   │   ├── payment/             # [โมดูลชำระเงิน] QR PromptPay, สแกนตรวจสลิป
│   │   │   ├── admin/               # [โมดูลแอดมิน] 1-Click Excel Importer, ตรวจสลิป
│   │   │   └── flashcard/           # [โมดูลบัตรคำ] ท่องจำรสยา พรรณไม้ เส้นประธานสิบ
│   │   │
│   │   ├── components/              # 🎨 Shared UI Design System (Button, Card, Modal, Badge)
│   │   ├── lib/                     # ⚙️ Third-party Integrations (Supabase, SlipOK Client)
│   │   └── types/                   # 🏷️ TypeScript Global Interfaces (ป้องกัน Type Errors)
│   │
│   ├── docs/                        # 📚 Single Source of Truth Documentation
│   │   ├── ARCHITECTURE.md          # สถาปัตยกรรมระบบรวม
│   │   ├── DATABASE_SCHEMA.md       # ผังฐานข้อมูล ERD
│   │   ├── REQUIREMENTS.md          # เอกสารความต้องการ SRS
│   │   └── DIRECTORY_STRUCTURE.md   # คู่มือโครงสร้างซอฟต์แวร์ฉบับนี้
│   │
│   └── skills/                      # 🤖 Agent Custom Skills
│       ├── thai-med-knowledge-base/
│       ├── exam-generator-importer/
│       └── payment-verification-spec/
│
└── sources/                         # 📁 เอกสารอ้างอิง & ข้อสอบสภาการแพทย์แผนไทย ก
    └── THAI_MED_EXAM_INFO.md
```

---

## 2. กฎเหล็ก 4 ข้อในการป้องกัน Bug (Bug Prevention Rules)

1. **Feature Isolation Rule (กฎการแยกโมดูล)**:
   * ทุกไฟล์ที่เกี่ยวข้องกับเรื่องใดเรื่องหนึ่ง (เช่น การทำข้อสอบ) จะต้องอยู่ใน `src/features/exam/` เท่านั้น
   * **ข้อดี**: เวลาแก้ไขระบบข้อสอบ โค้ดส่วนระบบจ่ายเงินจะไม่ถูกแตะต้อง ป้องกัน Bug ข้ามโมดูล 100%

2. **Strict TypeScript Interfaces (กฎความเข้มงวดของชนิดข้อมูล)**:
   * ประกาศ Type/Interface ของข้อสอบ, คำตอบ, สลิปโอนเงิน อย่างชัดเจน ห้ามใช้ `any`
   * **ข้อดี**: ดักจับข้อผิดพลาด (เช่น พิมพ์ชื่อตัวแปรผิด, ลืมส่งค่า) ตั้งแต่ตอนเขียนโค้ดก่อนรันจริง

3. **Separation of UI and Logic (กฎการแยก UI และ Logic)**:
   * UI (หน้าตาเว็บ) จะทำหน้าที่แสดงผลเท่านั้น Logic การคำนวณคะแนน/จับเวลา/ยิง API ให้แยกไปอยู่ใน `hooks/` และ `services/`
   * **ข้อดี**: สามารถทดสอบและแก้ไข Logic ได้โดยไม่ทำให้หน้าตา UI พัง

4. **Single Source of Truth Documentation (กฎเอกสารศูนย์กลาง)**:
   * การเปลี่ยนแปลงโครงสร้างตาราง DB หรือ API ทุกครั้ง ต้องอัปเดตไฟล์ใน `docs/` เสมอ
