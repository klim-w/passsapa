# PassSapa - System Architecture Specification (เอกสารสถาปัตยกรรมระบบ)

**เวอร์ชัน**: 1.2.0  
**สถานะ**: Development Architecture Approved  
**วัตถุประสงค์**: เอกสารอ้างอิงหลัก (Single Source of Truth) สำหรับสถาปัตยกรรมระบบคลังข้อสอบและการประเมินผลการสอบแพทย์แผนไทย ประเภท ก

---

## 1. ภาพรวมสถาปัตยกรรมระบบ (System Architecture Overview)

```mermaid
graph TD
    User[📱/💻 ผู้ใช้งาน / นักเรียน] -->|HTTPS / Modern Browser| Frontend[🌐 Next.js 14 Web App]
    Admin[🛠️ แอดมิน / ผู้ดูแลระบบ] -->|HTTPS| Frontend

    subgraph "Development Phase (Local Dev)"
        Frontend -->|Prisma ORM| SQLite[(📁 SQLite Database: dev.db)]
    end

    subgraph "Production Phase (Cloud Production)"
        Frontend -->|Prisma ORM| Supabase[(⚡ PostgreSQL Supabase DB)]
        Frontend --> Storage[🗂️ Supabase Storage (รูปภาพข้อสอบ/สลิป)]
    end

    subgraph "External Integrations"
        Frontend -->|Validate TransRef| SlipOK[💳 SlipOK API / LINE Notification]
    end
```

---

## 2. การเลือกใช้เทคโนโลยีและเหตุผล (Tech Stack Rationale)

| ส่วนของระบบ | เทคโนโลยีที่เลือก | เหตุผลเชิงวิศวกรรม (SA Rationale) | ความเสี่ยงและแนวทางป้องกัน |
| :--- | :--- | :--- | :--- |
| **Frontend & SSR** | **Next.js 14+ (App Router)** | รองรับ SEO ดีเยี่ยม, โหลดเร็วบนมือถือ, ทำ Server Component ซ่อน Logic คำตอบของข้อสอบได้ | หากใช้ Client Component อาจโดนแอบดูเฉลยผ่าน F12 -> แก้ด้วยการประมวลผลคำตอบบน Server |
| **Database (Dev)** | **SQLite (`dev.db`)** | **ใช้ง่าย รวดเร็ว ไม่ต้องต่อ Cloud ในช่วงพัฒนาแรก** จัดเก็บข้อมูลในไฟล์เดียว | SQLite มีข้อจำกัดเรื่อง Concurrent Writes สูงๆ -> เปลี่ยนเป็น PostgreSQL เมื่อขึ้น Production |
| **Database (Prod)** | **PostgreSQL (Supabase)** | รองรับผู้ใช้งานพร้อมกันจำนวนมาก มี Row Level Security (RLS) และ Free Tier 500MB | ปรับ `provider = "postgresql"` ใน Prisma schema เมื่อพร้อม Deploy |
| **ORM Tool** | **Prisma ORM** | ทำหน้าที่เป็นสะพานเชื่อมระหว่าง SQLite และ PostgreSQL ทำให้ย้าย DB ได้แบบ 100% Seamless | เขียน Schema ใน `schema.prisma` เป็นหลัก |
