"use client";

import React from "react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  isLoggedIn?: boolean;
  userPlan?: string;
  userName?: string;
  onOpenAuth?: (mode: "login" | "register") => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  theme,
  onToggleTheme,
  isLoggedIn = false,
  userPlan = "Guest",
  userName = "คุณหมอ",
  onOpenAuth,
  onOpenProfile,
}) => {
  const handleScrollToSection = (sectionId: string) => {
    if (currentView !== "landing") {
      onNavigate("landing");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#060a09]/90 border-b border-emerald-900/10 dark:border-white/[0.05] px-4 py-3 backdrop-blur-md transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => {
            onNavigate("landing");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div 
            className="rounded-2xl overflow-hidden shadow-sm shrink-0 flex items-center justify-center bg-emerald-950"
            style={{ width: "36px", height: "36px" }}
          >
            <img 
              src="/images/logo.jpg" 
              alt="PassSapa Logo" 
              style={{ width: "36px", height: "36px", objectFit: "cover" }}
            />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold font-heading bg-gradient-to-r from-emerald-800 to-amber-700 dark:from-emerald-400 dark:to-amber-400 bg-clip-text text-transparent m-0 leading-tight">
              PassSapa
            </h1>
            <p className="text-[10px] text-emerald-900/70 dark:text-emerald-200/60 font-heading m-0 leading-none hidden sm:block font-medium">
              คลังข้อสอบแพทย์แผนไทย ก
            </p>
          </div>
        </div>

        {/* Dynamic & Professional Smooth Anchor Navigation Bar (DCS Recommended Lineup) */}
        <div className="hidden lg:flex items-center gap-1 text-xs font-heading">
          <button
            onClick={() => {
              onNavigate("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3 py-1.5 rounded-full transition-all ${
              currentView === "landing"
                ? "bg-emerald-800/15 dark:bg-emerald-500/15 text-emerald-900 dark:text-emerald-400 font-bold"
                : "text-slate-800 dark:text-gray-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium"
            }`}
          >
            🏠 หน้าแรก
          </button>

          {isLoggedIn && (
            <button
              onClick={() => onNavigate("dashboard")}
              className={`px-3 py-1.5 rounded-full transition-all ${
                currentView === "dashboard" || currentView === "exam" || currentView === "flashcards"
                  ? "bg-emerald-800/15 dark:bg-emerald-500/15 text-emerald-900 dark:text-emerald-400 font-bold"
                  : "text-slate-800 dark:text-gray-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium"
              }`}
            >
              📊 ห้องเรียนผู้เรียน
            </button>
          )}

          <button
            onClick={() => handleScrollToSection("subjects-section")}
            className="px-3 py-1.5 rounded-full text-slate-800 dark:text-gray-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium transition-all"
          >
            🌿 5 สาขาวิชา
          </button>

          <button
            onClick={() => handleScrollToSection("demo-quiz-section")}
            className="px-3 py-1.5 rounded-full text-slate-800 dark:text-gray-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium transition-all"
          >
            🧪 ทดลองทำข้อสอบ
          </button>

          <button
            onClick={() => handleScrollToSection("pricing-section")}
            className={`px-3 py-1.5 rounded-full transition-all ${
              currentView === "pricing"
                ? "bg-amber-700/15 dark:bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold"
                : "text-slate-800 dark:text-gray-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-medium"
            }`}
          >
            💳 ราคาแพ็กเกจ
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-1.5 px-3 rounded-full bg-emerald-900/10 dark:bg-white/[0.04] text-emerald-900 dark:text-gray-300 text-xs font-heading hover:bg-emerald-900/20 dark:hover:bg-white/[0.08] transition-all font-medium"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Night"}
          </button>

          {!isLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onOpenAuth && onOpenAuth("login")}
                className="px-3 py-1.5 text-slate-900 dark:text-gray-300 text-xs font-heading hover:text-emerald-800 dark:hover:text-emerald-300 transition-all font-semibold"
              >
                🔑 เข้าสู่ระบบ
              </button>
              <button
                onClick={() => onOpenAuth && onOpenAuth("register")}
                className="btn-emerald text-xs py-1.5 px-4"
              >
                🚀 สมัครสมาชิก
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 bg-emerald-900/10 dark:bg-white/[0.05] hover:bg-emerald-900/20 dark:hover:bg-white/[0.08] px-3 py-1 rounded-full text-xs font-heading text-slate-900 dark:text-emerald-300 font-semibold cursor-pointer transition-all border border-emerald-900/20 dark:border-emerald-500/20"
              title="คลิกเพื่อแก้ไขชื่อหรือออกจากระบบ (Logout)"
            >
              <span>👤 {userName ? (userName.length > 12 ? userName.substring(0, 10) + ".." : userName) : "คุณหมอ"}</span>
              <span className="bg-emerald-800/20 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                {userPlan}
              </span>
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};
