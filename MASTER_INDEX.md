# PassSapa - Master Context Bootstrap & Project Index

**📌 อ่านไฟล์นี้เป็นอันดับแรกเสมอ (FIRST READ ENTRY POINT)** เมื่อเปิดการสนทนาใหม่เพื่อดึงบริบทระบบทั้งหมดอย่างรวดเร็วและต่อเนื่อง 100%

---

## 🚀 1. ภาพรวมระบบแบบย่อ (System Snapshot)

* **ชื่อโปรเจกต์**: PassSapa (ระบบคลังข้อสอบและประเมินผลการสอบแพทย์แผนไทย ประเภท ก)
* **ขอบเขตวิชา**: 5 วิชาหลัก (กฎหมายและจรรยาบรรณวิชาชีพ, เวชกรรมไทย, เภสัชกรรมไทย, ผดุงครรภ์ไทย, นวดไทย)
* **โมเดลแพ็กเกจ**: ซื้อแยกรายวิชา และ เหมาทุกวิชา (ระยะเวลา 1, 3, 6 เดือน) + QR PromptPay
* **Tech Stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Prisma ORM, SQLite (Dev) / PostgreSQL Supabase (Prod)
* **อัตลักษณ์ CI**: Light Mode (เขียว-ขาวสุภาพ) / Night Mode (เขียว-ดำหรูหราถนอมสายตา) + ฟอนต์ทางการ Sarabun

---

## 🗺️ 2. ดรรชนีเชื่อมโยงเอกสารสเปกศูนย์กลาง (Master Document Registry)

เมื่อต้องการเจาะลึกเรื่องใด ให้เปิดอ่านเอกสารตามดรรชนีในโฟลเดอร์ `docs/` ดังนี้:

| หมวดหมู่ข้อมูล | เอกสารสเปกหลัก (Single Source of Truth) |
| :--- | :--- |
| **📍 ประวัติ & Checkpoint ล่าสุด** | [CHANGELOG.md](file:///d:/Antigravity/PassSapa/dev/CHANGELOG.md) *(เช็กว่างานถึงสเต็ปไหนแล้ว)* |
| **🗣️ คู่มือการสั่งแก้จุดต่างๆ** | [docs/USER_FEEDBACK_GUIDELINES.md](file:///d:/Antigravity/PassSapa/dev/docs/USER_FEEDBACK_GUIDELINES.md) *(วิธีสั่งแคปรูปวงสั่งงาน)* |
| **📐 ข้อกำหนดการจัดวางหน้าจอ (UI Wireframes)** | [docs/UI_WIREFRAMES_SPECIFICATION.md](file:///d:/Antigravity/PassSapa/dev/docs/UI_WIREFRAMES_SPECIFICATION.md) |
| **💳 คู่มือระบบชำระเงินไม่ต้องใช้ Statement** | [docs/PAYMENT_GATEWAY_SELECTION.md](file:///d:/Antigravity/PassSapa/dev/docs/PAYMENT_GATEWAY_SELECTION.md) |
| **🏗️ สถาปัตยกรรมระบบรวม** | [docs/ARCHITECTURE.md](file:///d:/Antigravity/PassSapa/dev/docs/ARCHITECTURE.md) |
| **🗄️ แบบจำลองฐานข้อมูล Prisma** | [docs/DATABASE_SCHEMA.md](file:///d:/Antigravity/PassSapa/dev/docs/DATABASE_SCHEMA.md) |
| **📂 โครงสร้างโฟลเดอร์ซอฟต์แวร์** | [docs/DIRECTORY_STRUCTURE.md](file:///d:/Antigravity/PassSapa/dev/docs/DIRECTORY_STRUCTURE.md) |
| **📋 สเปกความต้องการระบบ (SRS)** | [docs/REQUIREMENTS.md](file:///d:/Antigravity/PassSapa/dev/docs/REQUIREMENTS.md) |
| **🗺️ แผนที่เว็บ & เส้นทาง URL Routes** | [docs/SITEMAP.md](file:///d:/Antigravity/PassSapa/dev/docs/SITEMAP.md) |
| **🔗 ผังเชื่อมโยงหน้าจอ & User Flow** | [docs/USER_FLOW_AND_WIRING.md](file:///d:/Antigravity/PassSapa/dev/docs/USER_FLOW_AND_WIRING.md) |
| **🎨 พิมพ์เขียว Landing Page 7 ส่วน** | [docs/LANDING_PAGE_BLUEPRINT.md](file:///d:/Antigravity/PassSapa/dev/docs/LANDING_PAGE_BLUEPRINT.md) |
| **📊 ตารางฟีเจอร์เทียบ saatthai.com** | [docs/MENU_AND_FEATURE_STRUCTURE.md](file:///d:/Antigravity/PassSapa/dev/docs/MENU_AND_FEATURE_STRUCTURE.md) |
| **🎨 ระบบสี CI & UX/UI Guidelines** | [docs/UX_UI_DESIGN_SYSTEM.md](file:///d:/Antigravity/PassSapa/dev/docs/UX_UI_DESIGN_SYSTEM.md) |
| **📋 SOP 5 เฟส & QA Checklist** | [docs/SOP_AND_QA_CHECKLIST.md](file:///d:/Antigravity/PassSapa/dev/docs/SOP_AND_QA_CHECKLIST.md) |
| **🧪 ระเบียบทดสอบเสมือนมนุษย์** | [docs/HUMAN_E2E_TESTING_PROTOCOL.md](file:///d:/Antigravity/PassSapa/dev/docs/HUMAN_E2E_TESTING_PROTOCOL.md) |

---

## 🤖 3. ดรรชนี Subagents & Custom Skills ที่ลงทะเบียนไว้ (ครบถ้วน 100%)

### Subagents ที่เปิดใช้งาน (3 ตัวหลัก)
1. `thai-med-content-curator`: ตรวจสอบความถูกต้องของข้อสอบและคัมภีร์แพทย์แผนไทย ก
2. `exam-security-auditor`: ตรวจสอบความปลอดภัย API, OWASP Top 10 และสลิปชำระเงิน
3. `fullstack-qa-engineer`: **[ใหม่!]** รันทดสอบระบบเสมือนมนุษย์ E2E, ตรวจสอบ TypeScript & Prisma Queries

### Custom Skills ในโปรเจกต์ (`/skills` - 6 Skills หลัก)
1. [thai-med-knowledge-base](file:///d:/Antigravity/PassSapa/dev/skills/thai-med-knowledge-base/SKILL.md): คลังความรู้คัมภีร์ 10+ เล่ม และรสยา 9 รส
2. [exam-generator-importer](file:///d:/Antigravity/PassSapa/dev/skills/exam-generator-importer/SKILL.md): JSON Schema และเครื่องมือ Import ข้อสอบ
3. [payment-verification-spec](file:///d:/Antigravity/PassSapa/dev/skills/payment-verification-spec/SKILL.md): สเปกการตรวจสลิป PromptPay อัตโนมัติ
4. [uxui-color-matching-system](file:///d:/Antigravity/PassSapa/dev/skills/uxui-color-matching-system/SKILL.md): ระบบจัดชุดสี CI และฟอนต์ทางการ Sarabun & Prompt
5. [excel-template-generator](file:///d:/Antigravity/PassSapa/dev/skills/excel-template-generator/SKILL.md): **[ใหม่!]** สเปกแม่แบบ Excel และการนำเข้าข้อสอบ 1-Click
6. [human-e2e-testing-runner](file:///d:/Antigravity/PassSapa/dev/skills/human-e2e-testing-runner/SKILL.md): **[ใหม่!]** สเปกและขั้นตอนการรันทดสอบเสมือนพฤติกรรมมนุษย์

---

## ⚡ 4. ขั้นตอนการเริ่มต้นทำงานสำหรับ AI Agent (Bootstrap Protocol)

1. อ่านไฟล์ [MASTER_INDEX.md](file:///d:/Antigravity/PassSapa/dev/MASTER_INDEX.md) เพื่อรับทราบภาพรวมโปรเจกต์
2. อ่านไฟล์ [CHANGELOG.md](file:///d:/Antigravity/PassSapa/dev/CHANGELOG.md) เพื่อเช็ก Checkpoint ล่าสุดว่าค้างที่จุดไหน
3. อ่านสเปกเฉพาะเรื่องที่ต้องพัฒนาในโฟลเดอร์ `docs/`
4. ลงมือพัฒนางานตาม SOP 5 เฟสใน [SOP_AND_QA_CHECKLIST.md](file:///d:/Antigravity/PassSapa/dev/docs/SOP_AND_QA_CHECKLIST.md)
