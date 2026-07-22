---
name: payment-verification-spec
description: สเปกการออกแบบระบบชำระเงิน ตรวจสอบสลิป PromptPay อัตโนมัติ และจัดการสิทธิ์สมาชิก PassSapa
---

# Payment & Slip Verification Specification

Skill นี้ใช้เป็นข้อกำหนดทางเทคนิคในการสร้างระบบสมัครสมาชิก ชำระเงินด้วย PromptPay QR Code และสแกนตรวจสอบสลิปอัตโนมัติ

---

## 1. ลำดับการทำงาน (Payment Flow)

```
[ผู้ใช้] -> เลือกแพ็กเกจ -> สร้าง QR PromptPay -> โอนเงิน -> อัปโหลดสลิป
                                                              │
                                                              ▼
[Backend] ◄── ยิง API ตรวจสลิป ── [SlipOK API Service]
    │
    ├─► ตรวจ transRef ใน DB ป้องกัน Replay Attack (สลิปซ้ำ)
    ├─► ตรวจ ยอดเงิน (Amount) และ ชื่อบัญชีผู้รับเงิน (Receiver Account)
    └─► หากถูกต้อง -> ปรับ User Status เป็น "ACTIVE" -> ส่ง Notification
```

---

## 2. โครงสร้างข้อมูลตารางชำระเงิน (Database Schema)

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    package_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    trans_ref VARCHAR(100) UNIQUE NOT NULL, -- หมายเลขอ้างอิงสลิป
    sending_bank VARCHAR(10),
    receiving_bank VARCHAR(10),
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED
    raw_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. กฎความปลอดภัยและการป้องกันสลิปปลอม (Anti-Fraud Rules)

1. **Replay Attack Prevention**: ฟิลด์ `trans_ref` ต้องเป็น Unique Constraint ใน Database ห้ามประมวลผลสลิปที่มี `trans_ref` ซ้ำเด็ดขาด
2. **Amount Verification**: ยอดเงินในสลิปต้องตรงกับราคาสินค้าใน `package_id`
3. **Date Verification**: เวลาในสลิปต้องไม่เกิน 24 ชั่วโมง นับจากเวลาปัจจุบัน
