# PassSapa - Detailed User Flow & Screen Wiring Diagram

**เวอร์ชัน**: 1.1.0  
**ผู้ออกแบบ**: System Architect & System Analyst Team  
**อัปเดตระบบข่าวสารและประกาศผลสอบสภาการแพทย์แผนไทย (Exam News & Board Announcements)**

---

## 1. การแบ่งสิทธิ์และสถานะผู้ใช้งาน (User Roles & Access Guards)

| บทบาทผู้ใช้ (Role) | สิทธิ์การเข้าถึงหน้าจอ | ข้อจำกัดระบบ (Access Guard) |
| :--- | :--- | :--- |
| **Guest (ผู้เข้าชม)** | Landing Page, ดูข่าวสารสอบ/ประกาศผลสอบ, ดูราคาแพ็กเกจ, ทดลองทำข้อสอบ 3 ข้อ | เข้าอ่านข่าวได้ 100% (เพื่อดึงคนจาก Google SEO) |
| **Trial User (สมัครฟรี)** | Dashboard, ข่าวสาร, บัตรคำตัวอย่าง, ทำข้อสอบชุดทดลอง | ข้อสอบถูกจำกัด 10 ข้อ |
| **VIP Member (ผู้ใช้ชำระเงิน)** | เข้าถึงทุกหน้าจอ 100% (Mock Exam, Re-test, Flashcards, Radar) | เข้าถึงตามระยะเวลาแพ็กเกจ (1, 3, 6 เดือน) |
| **Admin (ผู้ดูแลระบบ)** | `/admin` หน้าควบคุมหลังบ้าน | เข้าถึง Excel Import, โพสต์ข่าวสารสอบ, 1-Click Slip Approval |

---

## 2. ผังการเชื่อมโยงหน้าจอรวม (Global Screen Wiring Map)

```mermaid
graph TD
    %% Public Pages
    PAGE_LANDING[1. Landing Page /] -->|คลิก เข้าสู่ระบบ| PAGE_AUTH[2. Login & Register /auth]
    PAGE_LANDING -->|คลิก ดูข่าวสารสอบ| PAGE_NEWS[8. Exam News & Announcements /news]
    PAGE_LANDING -->|คลิก ดูแพ็กเกจราคา| PAGE_PRICING[6. Pricing & Subscription /pricing]
    PAGE_LANDING -->|คลิก ลองทำข้อสอบฟรี| PAGE_PRACTICE[3.2 Practice Mode /exam/practice]

    PAGE_NEWS -->|คลิก อ่านประกาศฉบับเต็ม| PAGE_NEWS_DETAIL[8.1 News Detail /news/id]
    PAGE_NEWS_DETAIL -->|คลิก ติวสอบวิชานี้| PAGE_AUTH

    %% Authentication Guard Flow
    PAGE_AUTH -->|ล็อกอินสำเร็จ (Student)| PAGE_DASHBOARD[3. Student Dashboard /dashboard]
    PAGE_AUTH -->|ล็อกอินสำเร็จ (Admin)| PAGE_ADMIN[7. Admin Portal /admin]

    %% Student Dashboard Wiring
    PAGE_DASHBOARD -->|คลิก ข่าวสอบล่าสุด| PAGE_NEWS_DETAIL
    PAGE_DASHBOARD -->|คลิก เริ่มจำลองสอบจริง| PAGE_MOCK[3.1 Mock Exam Engine /exam/mock]
    PAGE_DASHBOARD -->|คลิก ติวแยกรายคัมภีร์| PAGE_SCRIPTURE[3.3 Scripture Drills /exam/scripture]
    PAGE_DASHBOARD -->|คลิก ข้อที่เคยทำผิด| PAGE_RETEST[3.4 Wrong Answer Re-Test /exam/wrong]
    PAGE_DASHBOARD -->|คลิก บัตรคำท่องจำ| PAGE_FLASHCARDS[5. Smart Flashcards /flashcards]
    PAGE_DASHBOARD -->|คลิก ดูวิเคราะห์จุดอ่อน| PAGE_ANALYTICS[4. Analytics & Radar /analytics]
    PAGE_DASHBOARD -->|คลิก อัปเกรด VIP| PAGE_PRICING

    %% Exam Workflow
    PAGE_MOCK -->|กดส่งข้อสอบ / หมดเวลา| PAGE_RESULT[3.5 Exam Result & Explanations /exam/result]
    PAGE_PRACTICE -->|ดูเฉลยเรียลไทม์| PAGE_RESULT
    PAGE_SCRIPTURE -->|ทำเสร็จ| PAGE_RESULT
    PAGE_RETEST -->|ทำเสร็จ| PAGE_RESULT

    PAGE_RESULT -->|คลิก ซ่อมจุดอ่อน| PAGE_ANALYTICS
    PAGE_RESULT -->|คลิก กลับหน้าหลัก| PAGE_DASHBOARD

    %% Payment Workflow
    PAGE_PRICING -->|เลือกแพ็กเกจ| MODAL_QR[6.1 PromptPay QR Modal /payment/qr]
    MODAL_QR -->|อัปโหลดสลิปโอนเงิน| API_VERIFY[6.2 Slip Verification System]
    API_VERIFY -->|อนุมัติสำเร็จ| PAGE_DASHBOARD

    %% Admin Portal Wiring
    PAGE_ADMIN -->|ลากวางไฟล์ Excel| ADMIN_IMPORT[7.1 1-Click Excel Importer]
    PAGE_ADMIN -->|เขียนโพสต์ข่าวสาร| ADMIN_NEWS[7.3 News & Announcement Editor]
    PAGE_ADMIN -->|กดยืนยันสลิป| ADMIN_SLIP[7.2 1-Click Slip Approval]
```
