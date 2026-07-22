---
name: exam-generator-importer
description: สเปกและ workflow สำหรับสกัด แปลงข้อสอบจาก PDF/Word/Excel/CSV และ Import เข้าสู่ระบบPassSapa
---

# Exam Generator & Importer Specification

Skill นี้กำหนดวิธีการสกัด คัดกรอง และนำเข้าข้อสอบจากไฟล์ต้นฉบับ (PDF, CSV, Excel) เข้าสู่ฐานข้อมูลคลังข้อสอบ PassSapa

---

## 1. JSON Standard Schema สำหรับข้อสอบ

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "PassSapaExamBatch",
  "type": "object",
  "properties": {
    "batch_id": { "type": "string" },
    "category": { 
      "type": "string", 
      "enum": ["เวชกรรมไทย", "เภสัชกรรมไทย", "ผดุงครรภ์ไทย", "นวดไทย"] 
    },
    "questions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "question_text": { "type": "string" },
          "image_url": { "type": ["string", "null"] },
          "scripture_ref": { "type": "string" },
          "options": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "id": { "type": "string", "enum": ["a", "b", "c", "d"] },
                "text": { "type": "string" }
              },
              "required": ["id", "text"]
            },
            "minItems": 4,
            "maxItems": 4
          },
          "correct_option_id": { "type": "string", "enum": ["a", "b", "c", "d"] },
          "explanation": { "type": "string" }
        },
        "required": ["id", "question_text", "scripture_ref", "options", "correct_option_id", "explanation"]
      }
    }
  },
  "required": ["batch_id", "category", "questions"]
}
```

---

## 2. ขั้นตอนการทำงาน (Import Workflow)

1. **Extraction**: แปลงไฟล์ PDF/Word/CSV ต้นฉบับเป็น Plain Text
2. **Parsing**: ใช้อัลกอริทึมจัดกลุ่ม โจทย์, ตัวเลือก A-D, เฉลย และคำอธิบาย
3. **Scripture Mapping**: จัดกลุ่มข้อสอบเข้ากับคัมภีร์หลัก (เช่น คัมภีร์ตักกศิลา, ฉันทศาสตร์, รสยา 9 รส)
4. **Validation**: ตรวจสอบว่าทุกข้อมี 4 ตัวเลือก และมี `correct_option_id` ตรงกับตัวเลือกที่มีอยู่จริง
5. **Database Import**: ส่งข้อมูล JSON เข้า API `/api/admin/questions/import`
