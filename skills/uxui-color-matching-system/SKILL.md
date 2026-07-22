---
name: uxui-color-matching-system
description: ระบบออกแบบอัตลักษณ์แบรนด์ (CI Design System) และคู่มือจับคู่สี UX/UI สุภาพ ทางการ สำหรับ PassSapa (เขียว-ขาว Light Mode, เขียว-ดำ Night Mode และฟอนต์ทางการ Sarabun)
---

# PassSapa UX/UI & Formal Typography Design System

Skill นี้ใช้เป็นคู่มือมาตรฐานสำหรับการออกแบบอินเทอร์เฟซ (UI/UX) และระบบฟอนต์ทางการสำหรับ PassSapa โดยเน้นอัตลักษณ์ **"สุภาพ ทางการ อ้างอิงตำราสภาแพทย์แผนไทย และถนอมสายตา"**

---

## ✒️ 1. ระบบแบบอักษรทางการ (Formal Academic Typography System)

เพื่อให้เนื้อหาข้อสอบ บทอ้างอิงคัมภีร์ และตัวอักษรบนเว็บมีความเป็นทางการ ถูกต้องตามมาตรฐานวงการแพทย์และราชการไทยเหมือน `saatthai.com`:

* **ฟอนต์หลักเนื้อหาข้อสอบ & คัมภีร์ (Body Text & Exam Scriptures)**: **`Sarabun` (TH Sarabun New)**
  * *เหตุผล*: ฟอนต์มาตรฐานทางการของราชการและสภาการแพทย์แผนไทย มีหัว อ่านง่าย สุภาพ เหมาะกับโจทย์ข้อสอบ ตำรา และตัวบทกฎหมาย
* **ฟอนต์หัวข้อและปุ่มกด (Headings & UI Buttons)**: **`Prompt` / `Kanit`**
  * *เหตุผล*: มีความหนักแน่น สุภาพ ทันสมัย และช่วยเน้นจุดสำคัญของหน้าเว็บ

```css
/* Google Fonts Import: Sarabun & Prompt */
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

:root {
  --font-formal-body: 'Sarabun', 'TH Sarabun New', sans-serif;
  --font-heading: 'Prompt', 'Kanit', sans-serif;
}

body {
  font-family: var(--font-formal-body);
  font-size: 1.15rem; /* ขนาดตัวอักษร Sarabun อ่านสะดวก สบายตา */
  line-height: 1.75;
}

h1, h2, h3, h4, .btn-ui, .nav-item {
  font-family: var(--font-heading);
}
```

---

## 🎨 2. ระบบสีสำหรับ 2 โหมด (Design Tokens / CSS Variables)

```css
/* ☀️ Light Mode (เขียว-ขาว แนวสุภาพ) */
:root[data-theme="light"] {
  --bg-primary: #f8faf9;          /* ขาวอุ่นธรรมชาติ */
  --bg-surface: #ffffff;          /* ขาวบริสุทธิ์สำหรับพื้นหลังการ์ด */
  --text-main: #111827;           /* เทาเข้มเกือบดำ อ่านง่ายสูงสุด */
  --text-muted: #4b5563;          /* เทากลางสำหรับข้อความรอง */
  
  --primary-green: #0d9488;       /* เขียวมรกตสุภาพ (Teal Green) */
  --accent-gold: #d97706;          /* ทองสมุนไพรสำหรับตราสัญลักษณ์/คัมภีร์ */
}

/* 🌙 Night Mode (เขียว-ดำ หรูหราถนอมสายตา) */
:root[data-theme="dark"] {
  --bg-primary: #070d0c;          /* ดำเขียวหยกเข้ม */
  --bg-surface: #0f1917;          /* ดำการ์ดความลึกสูง */
  --text-main: #f3f4f6;           /* ขาวสว่างนวล */
  --text-muted: #9ca3af;          /* เทาอ่อนถนอมสายตา */
  
  --primary-green: #10b981;       /* เขียวมรกตเรืองแสงนวล */
  --accent-gold: #f59e0b;          /* ทองเปล่งประกาย */
}
```
