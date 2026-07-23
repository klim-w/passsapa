# PassSapa - Master Wiring Check & QA Standard Operating Procedure (SOP)

**บังคับใช้**: ตั้งแต่เวอร์ชัน v1.7.0 เป็นต้นไป  
**เป้าหมาย**: ล็อคระบบการพัฒนาเพื่อการันตีว่า **ปุ่มไม่หาย, Context ไม่หลุด, และท่อเชื่อมโยง (Wiring Navigation) กดได้ 100%** ทุกครั้งก่อนส่งมอบงาน

---

## 📋 1. กฎเหล็ก 4 ข้อในการเดินสายระบบ (4 Mandatory Wiring Rules)

1. **ศูนย์รวมการเดินหน้าเพจจุดเดียว (Single Source of Navigation Truth)**:
   - การจัดการเปลี่ยนหน้า (Routing View) ต้องถูกควบคุมโดย `app/page.tsx` เป็นหลัก ห้ามแยกเขียนโลจิกเปลี่ยน View ซ่อนไว้ใน Component ย่อยเด็ดขาด
2. **การซิงค์ State ของ Modal (Modal State Synchronization)**:
   - Modals ทุกตัว (เช่น `AuthModal`, `PaymentModal`, `UserProfileModal`) ต้อง Pairing ด้วย `useEffect` เพื่อซิงค์ `props` จาก Parent ลง `state` ภายในเสมอ ป้องกันปัญหาการกดปุ่มแล้วขึ้นแท็บผิด
3. **การซิงค์ไฟล์ HTML พรีวิว (Dual File Sync Mandatory)**:
   - เมื่อมีการปรับเปลี่ยนระบบหลัก ต้องซิงค์โครงสร้างและ Event Listener ลงใน `index.html` และ `preview.html` 100% เพื่อการันตีการเรนเดอร์บน GitHub Pages
4. **การตรวจสอบ Build ไร้ข้อผิดพลาด (Zero Build Error Enforcement)**:
   - ต้องรัน `cmd /c npm run build` และได้ผลลัพธ์ **`✓ Compiled successfully (0 Errors)`** ก่อนรันคำสั่ง `git commit` เสมอ

---

## 🧪 2. ตารางตรวจสอบท่อเชื่อมโยง 6 จุดหลัก (Master 6-Point Wiring Checklist)

ก่อนส่งมอบงานหรือรัน Git Push ทุกครั้ง ต้องทำการทดสอบ Wiring 6 จุดต่อไปนี้:

| ลำดับ | จุดเชื่อมโยง (Navigation Point) | พฤติกรรมที่ต้องเกิดขึ้น 100% (Expected Outcome) | สถานะผ่านเกณฑ์ |
|---|---|---|:---:|
| 1 | **`🏠 หน้าแรก`** | สลับ View เป็น `landing` และ Scroll ขึ้นบนสุดอย่างนุ่มนวล | [x] PASSED |
| 2 | **`📊 ห้องเรียนผู้เรียน`** | สลับ View เป็น `dashboard` และโชว์ AI Weakness Radar | [x] PASSED |
| 3 | **`✍️ คลังข้อสอบสภาฯ`** | สลับ View เป็น `exam` และเปิดห้องจำลองสอบ 180 นาที | [x] PASSED |
| 4 | **`📇 บัตรคำ (Flashcards)`** | สลับ View เป็น `flashcards` และเปิดห้องทวนบัตรคำ 3D | [x] PASSED |
| 5 | **`💳 ราคาแพ็กเกจ`** | สลับ View หรือ Scroll นุ่มนวลไปยัง `#pricing-section` | [x] PASSED |
| 6 | **`🔑 เข้าสู่ระบบ / 🚀 สมัครสมาชิก`** | เปิด `AuthModal` และซิงค์แท็บตรงตามปุ่มที่กด 100% | [x] PASSED |

---

## 🔒 3. การจดจำและบังคับใช้ของ AI Assistant
เอกสารฉบับนี้ถูกบันทึกไว้ในคลังเอกสารโครงการ และถูกผูกกับความทรงจำของ AI Assistant ทุกตัวที่จะเข้ามาทำงานในโครงการ PassSapa ต่อจากนี้
