import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassSapa v1.3.3 - คลังข้อสอบสภาการแพทย์แผนไทย (ประเภท ก)",
  description: "เตรียมสอบใบประกอบวิชาชีพแพทย์แผนไทย ประเภท ก คลังข้อสอบย้อนหลัง 5 วิชาหลัก เฉลยรายละเอียดอ้างอิงคัมภีร์สภาฯ พร้อมระบบวิเคราะห์จุดอ่อน",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" data-theme="dark">
      <head>
        {/* Tailwind CDN Fallback การันตีว่าสไตล์ CSS จะแสดงผล 100% ทันทีไม่ต้องรอรีสตาร์ท Dev Server */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
