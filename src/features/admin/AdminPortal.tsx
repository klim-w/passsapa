"use client";

import React, { useState } from "react";
import { SAMPLE_QUESTIONS } from "../../lib/constants";

export const AdminPortal: React.FC = () => {
  const [questions, setQuestions] = useState(SAMPLE_QUESTIONS);
  const [importSuccess, setImportSuccess] = useState(false);

  const [slips] = useState([
    { id: "s1", user: "คุณหมอสมชาย ใจดี", plan: "แพ็กเกจ 3 เดือน", amount: 490, date: "22 ก.ค. 2026 22:30", status: "PENDING" },
    { id: "s2", user: "คุณหมอนภา สุขใจ", plan: "ติวเข้ม 1 เดือน (เวชกรรม)", amount: 190, date: "22 ก.ค. 2026 21:15", status: "PENDING" }
  ]);

  const handleSimulateExcelImport = () => {
    setImportSuccess(true);
    setTimeout(() => setImportSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 py-4">
      
      {/* Admin Banner */}
      <div className="glass-panel-emerald p-6 flex justify-between items-center">
        <div>
          <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-heading">
            ⚙️ หลังบ้านผู้ดูแลระบบ (Admin Portal)
          </span>
          <h1 className="text-2xl font-bold font-heading text-white mt-2">
            จัดการคลังข้อสอบ & อนุมัติการชำระเงิน (โหมดผู้ใช้ท่านเดียว)
          </h1>
        </div>
      </div>

      {/* 1. Drag & Drop Excel Importer Section */}
      <div className="glass-panel p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
          📥 1-Click Excel Importer (นำเข้าข้อสอบจาก Excel / CSV)
        </h2>

        <div 
          onClick={handleSimulateExcelImport}
          className="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 p-8 rounded-2xl text-center space-y-3 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer transition-all"
        >
          <div className="text-4xl">📁</div>
          <div className="font-heading font-semibold text-white text-base">
            ลากไฟล์ Excel (.xlsx) หรือ (.csv) มาวางที่นี่เพื่ออัปโหลดข้อสอบ
          </div>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            คอลัมน์มาตรฐาน: category, scripture_ref, question_text, option_a, option_b, option_c, option_d, correct_option, explanation
          </p>
          <button className="btn-emerald text-xs py-2 px-4 mt-2">
            🚀 หรือคลิกเพื่อเลือกไฟล์ Excel ในคอมพิวเตอร์
          </button>
        </div>

        {importSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-sm font-heading flex items-center gap-2 animate-fadeIn">
            ✅ ตรวจสอบและบันทึกข้อสอบใหม่เข้าสู่คลังฐานข้อมูล SQLite เรียบร้อยแล้ว! (7 ข้อพร้อมใช้งาน)
          </div>
        )}

        {/* Question Preview Table */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-white text-sm">รายการข้อสอบล่าสุดในคลัง DB ({questions.length} ข้อ)</h3>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-white/5 font-heading text-emerald-300">
                <tr>
                  <th className="p-3">สาขาวิชา</th>
                  <th className="p-3">คัมภีร์อ้างอิง</th>
                  <th className="p-3">โจทย์คำถาม</th>
                  <th className="p-3">เฉลย</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {questions.map(q => (
                  <tr key={q.id} className="hover:bg-white/5">
                    <td className="p-3 font-heading font-medium text-white">{q.category}</td>
                    <td className="p-3 text-amber-300">{q.scriptureRef}</td>
                    <td className="p-3 truncate max-w-xs">{q.questionText}</td>
                    <td className="p-3 font-bold text-emerald-400">{q.correctOptionId.toUpperCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2. 1-Click Slip Approval List */}
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
          💳 รายการสลิปชำระเงินที่รออนุมัติ (1-Click Slip Approval)
        </h2>

        <div className="space-y-3">
          {slips.map(s => (
            <div key={s.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap justify-between items-center gap-4">
              <div>
                <div className="font-heading font-bold text-white text-base">{s.user}</div>
                <div className="text-xs text-emerald-300 font-heading">{s.plan} • ฿{s.amount}</div>
                <div className="text-xs text-gray-400">{s.date}</div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`อนุมัติสิทธิ์ VIP ให้ ${s.user} เรียบร้อยแล้ว!`)}
                  className="btn-emerald text-xs py-1.5 px-3"
                >
                  ✅ 1-Click อนุมัติสิทธิ์ VIP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
