# PassSapa - Complete Sitemap & URL Routing Specification

**เวอร์ชัน**: 1.0.0  
**การจัดเส้นทาง URL (Routing Structure)**: Next.js App Router Standard

---

## 🗺️ ผังแผนที่เว็บไซต์และเส้นทาง URL (Complete Sitemap Tree)

```
[ PassSapa Root Domain: passsapa.com ]
│
├── 🌐 / (Public Landing Page - หน้าแรกสาธารณะ)
│   │
│   ├── 📰 /news (ศูนย์ข่าวสาร & ประกาศสอบสภาฯ)
│   │   └── 📄 /news/[id] (อ่านประกาศสภาฯ ฉบับเต็ม & โหลด PDF)
│   │
│   ├── 💳 /pricing (เลือกแพ็กเกจราคา 1, 3, 6 เดือน)
│   │   └── 🧾 /payment/verify (อัปโหลดสลิป PromptPay)
│   │
│   └── 🔑 /auth (เข้าสู่ระบบ / สมัครสมาชิก)
│       ├── /auth/login (เข้าสู่ระบบ)
│       ├── /auth/register (สมัครสมาชิก)
│       └── /auth/forgot-password (ลืมรหัสผ่าน)
│
├── 🎓 /dashboard (Student Portal - หน้าหลักผู้เรียน [Requires Auth])
│   │
│   ├── ✍️ /exam (Exam Engine - เครื่องมือสอบ)
│   │   ├── /exam/mock (โหมดจำลองสอบจริง จับเวลา 180 นาที)
│   │   ├── /exam/practice (โหมดฝึกซ้อมรายวิชา เฉลยทันที)
│   │   ├── /exam/scripture (โหมดเจาะลึกรายคัมภีร์ เช่น ตักกศิลา)
│   │   ├── /exam/wrong (คลังข้อสอบที่เคยตอบผิด)
│   │   ├── /exam/bookmarked (คลังข้อสอบที่ปักหมุดไว้)
│   │   └── /exam/result/[id] (สรุปคะแนน & เฉลยละเอียดรายข้อ)
│   │
│   ├── 🧠 /analytics (วิเคราะห์จุดอ่อน Radar Chart & สุ่มข้อสอบซ่อม)
│   │
│   └── 📇 /flashcards (บัตรคำท่องจำสมุนไพร & รสยา 9 รส)
│
└── ⚙️ /admin (Admin Portal - หลังบ้านผู้ดูแลระบบ [Requires Admin Role])
    ├── 📚 /admin/questions (จัดการข้อสอบ & 1-Click Excel Importer)
    ├── 💳 /admin/slips (อนุมัติสลิปโอนเงิน 1-Click Approval)
    ├── 📢 /admin/news (จัดการโพสต์ข่าวสาร & ประกาศสภาฯ)
    └── 👥 /admin/users (จัดการสิทธิ์และวันหมดอายุสมาชิก)
```

---

## 🔒 การควบคุมสิทธิ์ตามเส้นทาง URL (Route Protection Rules)

| เส้นทาง URL Path | สิทธิ์เข้าถึง (Access Level) | การจัดการเมื่อไม่มีสิทธิ์ (Redirection Guard) |
| :--- | :--- | :--- |
| `/`, `/news`, `/pricing` | **Public (ทุกคน)** | เข้าชมได้ทันทีไม่ต้องล็อกอิน |
| `/dashboard`, `/exam/*`, `/analytics`, `/flashcards` | **Authenticated User** | หากยังไม่ได้ล็อกอิน ➔ เด้งไป `/auth/login` |
| `/exam/mock`, `/exam/scripture` (ข้อสอบเต็ม) | **VIP Member** | หากเป็นผู้ใช้ฟรี ➔ แสดง Modal ชวนอัปเกรด VIP |
| `/admin/*` | **Admin Only** | หากไม่ใช่แอดมิน ➔ เด้งกลับไปหน้า `/dashboard` |
