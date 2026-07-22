"use client";

import React, { useState, useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: "login" | "register";
  onClose: () => void;
  onSuccess: (fullName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = "login",
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("เวชกรรมไทย");

  // อัปเดตแท็บตามปุ่มที่กดคลิกจริง (Login vs Register) ทุกครั้งที่เปิด Modal
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameToUse = fullName || (email ? email.split("@")[0] : "คุณหมอแพทย์แผนไทย");
    onSuccess(nameToUse);
  };

  const handleDemoLogin = () => {
    onSuccess("คุณหมอแพทย์แผนไทย (Demo)");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Box Container (กำหนดพื้นหลังทึบ ล็อคกรอบเขียวมรกตชัดเจน ไม่กลืนกับฉากหลัง 100%) */}
      <div 
        className="p-6 md:p-8 max-w-md w-full space-y-6 relative rounded-2xl shadow-2xl transition-colors"
        style={{
          backgroundColor: "var(--bg-surface, #0f1917)",
          border: "2px solid rgba(16, 185, 129, 0.5)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.25)"
        }}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10"
        >
          ✕
        </button>

        {/* Tab Switcher: Login vs Register */}
        <div className="flex bg-black/40 dark:bg-black/60 p-1 rounded-xl border border-white/15 text-sm font-heading">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === "login"
                ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🔑 เข้าสู่ระบบ
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === "register"
                ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 font-bold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🚀 สมัครสมาชิกใหม่
          </button>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold font-heading text-white">
            {mode === "login" ? "เข้าสู่ระบบคลังข้อสอบ PassSapa" : "สร้างบัญชีผู้เรียนใหม่"}
          </h2>
          <p className="text-xs text-gray-400 font-heading">
            {mode === "login"
              ? "กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบติวสอบ"
              : "สมัครสมาชิกฟรีเพื่อเริ่มต้นทำข้อสอบและสะสมสถิติ"}
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm font-heading">
          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-xs text-gray-300">ชื่อ-นามสกุล (สำหรับออกใบรับรอง)</label>
              <input
                type="text"
                required
                placeholder="เช่น คุณหมอสมชาย ใจดี"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full p-3 rounded-xl bg-black/40 border border-white/20 text-white focus:border-emerald-500 outline-none"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs text-gray-300">อีเมล (Email Address)</label>
            <input
              type="email"
              required
              placeholder="doctor@passsapa.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/20 text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-300">รหัสผ่าน (Password)</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/20 text-white focus:border-emerald-500 outline-none"
            />
          </div>

          {mode === "register" && (
            <div className="space-y-1">
              <label className="text-xs text-gray-300">สาขาวิชาหลักที่เตรียมสอบ</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-white/20 text-white focus:border-emerald-500 outline-none"
              >
                <option value="เวชกรรมไทย">เวชกรรมไทย</option>
                <option value="เภสัชกรรมไทย">เภสัชกรรมไทย</option>
                <option value="ผดุงครรภ์ไทย">ผดุงครรภ์ไทย</option>
                <option value="นวดไทย">นวดไทย</option>
                <option value="กฎหมายวิชาชีพ">กฎหมายและจรรยาบรรณวิชาชีพ</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="btn-emerald w-full justify-center py-3 text-base mt-2"
          >
            {mode === "login" ? "🔑 เข้าสู่ระบบทันที" : "🚀 ยืนยันสมัครสมาชิก"}
          </button>
        </form>

        {/* 1-Click Demo Login Helper */}
        <div className="pt-3 border-t border-white/10 text-center space-y-2">
          <p className="text-xs text-gray-400 font-heading">หรือทดลองเข้าสู่ระบบทันทีใน 1 คลิก:</p>
          <button
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl border border-amber-500/50 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-heading font-semibold transition-all shadow-md"
          >
            ⚡ เข้าสู่ระบบทดลองด่วน (1-Click Demo Login)
          </button>
        </div>

      </div>
    </div>
  );
};
