"use client";

import React from "react";

interface ReadinessCertificateModalProps {
  isOpen: boolean;
  userName: string;
  readinessScore: number;
  onClose: () => void;
}

export const ReadinessCertificateModal: React.FC<ReadinessCertificateModalProps> = ({
  isOpen,
  userName,
  readinessScore,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Certificate Modal Container */}
      <div 
        className="p-6 md:p-8 max-w-lg w-full space-y-6 relative rounded-3xl shadow-2xl transition-colors text-center"
        style={{
          backgroundColor: "var(--bg-surface, #0c1412)",
          border: "2px solid #f59e0b",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.3)"
        }}
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10"
        >
          ✕
        </button>

        {/* Certificate Inner Frame */}
        <div className="border-4 border-amber-500/40 p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 via-emerald-900/20 to-black/40 space-y-4">
          
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
            📜
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">PASSSAPA OFFICIAL CERTIFICATE OF EXAM READINESS</span>
            <h2 className="text-xl md:text-2xl font-bold font-heading text-white">
              ใบรับรองระดับความพร้อมสอบสภาการแพทย์แผนไทย (ประเภท ก)
            </h2>
          </div>

          <div className="py-2 border-y border-amber-500/30 my-2 space-y-1">
            <p className="text-xs text-gray-300 font-heading">ขอรับรองว่าคุณหมอ</p>
            <div className="text-xl font-bold font-heading text-amber-300">
              {userName || "คุณหมอสมชาย ใจดี"}
            </div>
            <p className="text-xs text-emerald-300 font-heading">
              สะสมคะแนนดัชนีความพร้อมสอบสภาฯ สูงถึง <strong className="text-white text-base">{readinessScore}%</strong> (ผ่านเกณฑ์มาตรฐานสภาฯ)
            </p>
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-2">
            <span>ออกให้เมื่อ: {new Date().toLocaleDateString("th-TH")}</span>
            <span className="text-amber-300 font-bold">VERIFIED BY PASSSAPA AI</span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 font-heading">
          <button
            onClick={() => alert("📥 กำลังดาวน์โหลดไฟล์ใบรับรอง PDF... (พร้อมสำหรับพิมพ์หรือแนบสมัครสอบ)")}
            className="btn-emerald flex-1 justify-center py-2.5 text-xs"
          >
            📥 ดาวน์โหลดใบรับรอง PDF
          </button>
          <button
            onClick={() => alert("🔗 คัดลอกลิงก์ใบรับรองสำหรับแชร์ลง Facebook / LINE เรียบร้อยแล้ว!")}
            className="py-2.5 px-4 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition-all flex items-center justify-center gap-1"
          >
            📲 แชร์ลงโซเชียล
          </button>
        </div>

      </div>
    </div>
  );
};
