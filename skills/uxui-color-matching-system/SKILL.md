---
name: uxui-color-matching-system
description: ระบบวิเคราะห์และจับคู่สีมาตรฐาน (PassSapa CI & Color Matching System) สำหรับการพัฒนา UI/UX ทางการของสภาการแพทย์แผนไทย (ประเภท ก) ทั้ง Light Mode และ Night Mode
---

# PassSapa Standard CI & Color Matching System

คู่มือมาตรฐานสีและรูปทรงเรขาคณิตสำหรับ PassSapa (ประเภท ก) เพื่อใช้กำกับการพัฒนาทุกหน้าจอให้มีความสวยงาม สุภาพ คอนทราสต์สูง และตรงตามอัตลักษณ์ทางการ 100%

---

## 🎨 Dual CI Color Palette Specification

### ☀️ Light Mode: "Sage Herbal Ivory" (โหมดสว่างงาช้างสมุนไพร - คอนทราสต์คมกริบ AAA)
- **Primary Background**: `#EEF3F0` (ขาวงาช้างอุ่น สบายตา 0% Glare)
- **Card Surface**: `#FFFFFF` (ขาวกระดาษนุ่มละมุน)
- **Card Border**: `#D4E2DC` (ขอบสีเขียวงาช้างจางๆ)
- **Primary Text**: `#0B1915` (เขียวดำป่าลึก คอนทราสต์สูง AAA)
- **Secondary Text**: `#3D5850` / `#1E332C` (เขียวมรกตอุ่น อ่านสบาย)
- **Primary Emerald Action**: `#0D7A5F`
- **Scripture Gold Accent**: `#C27803`

### 🌙 Night Mode: "Obsidian Jade & Scripture Gold" (โหมดมืดหยกมรกต - 0% Glare)
- **Primary Background**: `#060A09` (ดำหยกมรกต 0% สะท้อน)
- **Card Surface**: `#0C1412` (ดำมรกตซ้อนมิติ)
- **Card Border**: `rgba(255, 255, 255, 0.04)` (ไร้ขอบรกตา)
- **Primary Text**: `#F3F4F6` (ขาวนวล สบายตา)
- **Secondary Text**: `#9CA3AF` (เทาสว่างนุ่มตา)
- **Primary Emerald Action**: `#10B981`
- **Scripture Gold Accent**: `#F59E0B`

---

## 📐 Geometry Standard
- **Cards**: `rounded-2xl` (20px) / `rounded-3xl` (24px)
- **Buttons & Pills**: `rounded-full` (9999px)
- **Navbar**: Single-line layout 100%
