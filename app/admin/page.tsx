"use client";

import React, { useState } from "react";
import { AdminPortal } from "../../src/features/admin/AdminPortal";
import Link from "next/link";

export default function AdminPage() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Passcode for Admin System: admin2026 or passsapa2026
    if (adminPasscode === "admin2026" || adminPasscode === "passsapa2026") {
      setIsAdminAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#060a09] text-white selection:bg-emerald-500 selection:text-black flex flex-col justify-between">
      
      {/* Admin Dedicated Navbar */}
      <header className="bg-white/5 border-b border-white/10 px-6 py-4 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-lg">
            ⚙️
          </div>
          <div>
            <h1 className="text-base font-bold font-heading text-white m-0 leading-tight">
              PassSapa Dedicated Admin Portal
            </h1>
            <p className="text-[10px] text-gray-400 font-heading m-0">
              ระบบส่วนตัวผู้ดูแลหลังบ้าน (Isolated Security Gate)
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-heading font-medium text-gray-300 transition-all"
        >
          ← กลับสู่ระบบหลัก (User App)
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-6 w-full flex-grow flex items-center justify-center">
        {!isAdminAuthenticated ? (
          /* Admin Security Lock Screen */
          <div className="glass-panel-emerald p-8 max-w-md w-full rounded-3xl space-y-6 text-center animate-fadeIn shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-3xl">
              🔐
            </div>
            
            <div>
              <h2 className="text-xl font-bold font-heading text-white m-0">
                เข้าสู่ระบบผู้ดูแลหลังบ้าน (Admin System)
              </h2>
              <p className="text-xs text-gray-300 font-body mt-1 m-0">
                โปรดป้อนรหัสผ่านความปลอดภัย (Admin Passcode) เพื่อเข้าใช้งาน
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="password"
                placeholder="ป้อนรหัสผ่าน Admin (เช่น passsapa2026)..."
                value={adminPasscode}
                onChange={e => {
                  setAdminPasscode(e.target.value);
                  setAuthError(false);
                }}
                className="w-full bg-white/5 border border-white/10 focus:border-emerald-500 rounded-2xl px-4 py-3 text-center text-sm font-mono text-white focus:outline-none"
              />

              {authError && (
                <div className="text-xs text-red-400 font-heading bg-red-500/20 border border-red-500/30 p-2.5 rounded-xl">
                  ❌ รหัสผ่านไม่ถูกต้อง! กรุณาลองใหม่อีกครั้ง
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-emerald text-sm py-3 font-heading font-bold"
              >
                🔓 ปลดล็อกเข้าสู่ระบบ Admin ➔
              </button>
            </form>

            <div className="text-[11px] text-gray-500 font-heading pt-2">
              💡 รหัสผ่านสาธิตสำหรับทดสอบระบบ: <code className="text-amber-300 font-bold font-mono">passsapa2026</code> หรือ <code className="text-amber-300 font-bold font-mono">admin2026</code>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Portal */
          <div className="w-full">
            <AdminPortal />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-500 font-heading border-t border-white/5">
        PassSapa Dedicated Admin Portal System v2.0.0 • Role-Based Security Guard Enabled
      </footer>

    </div>
  );
}
