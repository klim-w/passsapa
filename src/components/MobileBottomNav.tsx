"use client";

import React from "react";

interface MobileBottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isLoggedIn?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onNavigate,
  isLoggedIn = false,
}) => {
  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 dark:bg-[#0c1412]/95 border border-emerald-500/20 rounded-full px-4 py-2 backdrop-blur-lg shadow-2xl flex items-center justify-around text-xs font-heading">
      <button
        onClick={() => onNavigate("landing")}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-full transition-all ${
          currentView === "landing"
            ? "text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-500/10"
            : "text-slate-700 dark:text-gray-400 hover:text-emerald-700"
        }`}
      >
        <span className="text-base">🏠</span>
        <span>หน้าแรก</span>
      </button>

      <button
        onClick={() => onNavigate("dashboard")}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-full transition-all ${
          currentView === "dashboard"
            ? "text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-500/10"
            : "text-slate-700 dark:text-gray-400 hover:text-emerald-700"
        }`}
      >
        <span className="text-base">📊</span>
        <span>ห้องเรียน</span>
      </button>

      <button
        onClick={() => onNavigate("exam")}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-full transition-all ${
          currentView === "exam"
            ? "text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-500/10"
            : "text-slate-700 dark:text-gray-400 hover:text-emerald-700"
        }`}
      >
        <span className="text-base">✍️</span>
        <span>ข้อสอบ</span>
      </button>

      <button
        onClick={() => onNavigate("flashcards")}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-full transition-all ${
          currentView === "flashcards"
            ? "text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-500/10"
            : "text-slate-700 dark:text-gray-400 hover:text-emerald-700"
        }`}
      >
        <span className="text-base">📇</span>
        <span>บัตรคำ</span>
      </button>
    </div>
  );
};
