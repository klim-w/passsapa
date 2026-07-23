"use client";

import React, { useState } from "react";
import { SAMPLE_SUBJECTS } from "../../lib/constants";
import { WeaknessRadar } from "./WeaknessRadar";
import { ReadinessCertificateModal } from "../../components/ReadinessCertificateModal";

interface StudentDashboardProps {
  onNavigate: (view: string) => void;
  userName?: string;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate, userName = "คุณหมอ" }) => {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "exam" | "flashcards" | "analytics">("overview");
  const [certModalOpen, setCertModalOpen] = useState(false);
  const readinessScore = 78;

  const handleStartFixQuiz = (topic: string) => {
    alert(`🎯 เปิดห้องทำข้อสอบติวซ่อมจุดอ่อนในหัวข้อ: "${topic}" เรียบร้อยแล้ว`);
    onNavigate("exam");
  };

  return (
    <div className="space-y-6 py-4 max-w-6xl mx-auto">
      
      {/* Student Dashboard Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold font-heading text-slate-950 dark:text-white m-0 flex items-center gap-2">
            📊 ห้องเรียนผู้เรียน (Student Learning Hub)
          </h1>
          <span className="bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-heading font-bold">
            VIP Active ⚡
          </span>
        </div>

        {/* Inner Sub-Tabs */}
        <div className="flex gap-1.5 bg-emerald-900/10 dark:bg-black/40 p-1 rounded-full border border-emerald-900/15 dark:border-white/10 text-xs font-heading">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-3.5 py-1.5 rounded-full transition-all ${
              activeSubTab === "overview"
                ? "bg-emerald-800/15 dark:bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 font-bold"
                : "text-slate-800 dark:text-gray-400 hover:text-emerald-900"
            }`}
          >
            📌 ภาพรวมความพร้อม
          </button>

          <button
            onClick={() => onNavigate("exam")}
            className="px-3.5 py-1.5 rounded-full text-slate-800 dark:text-gray-300 hover:text-emerald-800 transition-all font-medium"
          >
            ✍️ คลังข้อสอบสภาฯ
          </button>

          <button
            onClick={() => onNavigate("flashcards")}
            className="px-3.5 py-1.5 rounded-full text-slate-800 dark:text-gray-300 hover:text-emerald-800 transition-all font-medium"
          >
            📇 บัตรคำ (Flashcards)
          </button>
        </div>
      </div>

      {/* Top Banner: Readiness Gauge & Streaks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Readiness Gauge Card */}
        <div className="glass-panel-emerald p-6 space-y-3 col-span-1 md:col-span-2 rounded-3xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-heading bg-emerald-800/15 dark:bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">
              🎯 ดัชนีความพร้อมสอบสภาฯ (Exam Readiness Index)
            </span>
            <button
              onClick={() => setCertModalOpen(true)}
              className="text-xs text-amber-800 dark:text-amber-300 font-heading font-bold hover:underline flex items-center gap-1"
            >
              📜 รับใบรับรอง PDF (78%) ➔
            </button>
          </div>

          <div className="flex items-center gap-6 pt-2">
            {/* Circular Gauge */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#162421" strokeWidth="8" fill="transparent" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 * (1 - 0.78)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold font-heading text-emerald-800 dark:text-emerald-400">78%</span>
                <span className="text-[10px] text-slate-600 dark:text-gray-400 font-medium">พร้อมสอบ</span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold font-heading text-slate-950 dark:text-white m-0">ความพร้อมอยู่ในเกณฑ์ดีเยี่ยม! 🎉</h3>
              <p className="text-xs text-slate-800 dark:text-emerald-100/80 m-0 font-medium">
                คุณทำข้อสอบสะสมไปแล้ว 620 ข้อ จากคลัง 8,500 ข้อ (ความแม่นยำ 84.5%) <br />
                แนะนำให้ทบทวนเพิ่มเติมในสาขา <strong className="text-amber-800 dark:text-amber-300">ผดุงครรภ์ไทย (ซางปฐมจินดา)</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Daily Streak & Quick Actions */}
        <div className="glass-panel p-6 space-y-4 flex flex-col justify-between rounded-3xl">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs text-slate-600 dark:text-gray-400 font-heading">
              <span>🔥 ทำข้อสอบต่อเนื่อง</span>
              <span className="text-amber-800 dark:text-amber-400 font-bold">5 วันติด!</span>
            </div>
            <div className="text-2xl font-bold font-heading text-slate-950 dark:text-white">สะสม 150 นาที</div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigate("exam")}
              className="btn-emerald text-xs w-full justify-center py-2.5"
            >
              ✍️ เข้าห้องทำข้อสอบจำลอง 180 นาที ➔
            </button>
            <button
              onClick={() => onNavigate("flashcards")}
              className="w-full py-2 rounded-full bg-emerald-900/10 dark:bg-white/5 border border-emerald-900/15 dark:border-white/10 text-xs font-heading text-slate-900 dark:text-emerald-300 hover:bg-emerald-900/20 transition-all text-center font-semibold"
            >
              📇 ท่องบัตรคำ รสยา 9 รส ➔
            </button>
          </div>
        </div>

      </div>

      {/* AI Personal Weakness Radar Component */}
      <WeaknessRadar onStartFixQuiz={handleStartFixQuiz} />

      {/* 5 Subject Progress Bars */}
      <div className="space-y-3">
        <h2 className="text-base font-bold font-heading text-slate-950 dark:text-white m-0">
          📊 ความก้าวหน้ารายสาขาวิชา (5 Subject Breakdown)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {SAMPLE_SUBJECTS.map(subj => (
            <div key={subj.id} className="glass-panel p-4 space-y-2 rounded-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-heading font-semibold text-slate-900 dark:text-white">
                  <span>{subj.icon}</span>
                  <span>{subj.name}</span>
                </div>
                <span className="text-xs font-mono text-emerald-800 dark:text-emerald-400 font-bold">{subj.readinessScore}%</span>
              </div>

              <div className="w-full h-2 bg-slate-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-500 dark:to-teal-300 rounded-full"
                  style={{ width: `${subj.readinessScore}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-700 dark:text-gray-400 font-medium">
                <span>คลังข้อสอบ: {subj.totalQuestions} ข้อ</span>
                <span>จุดอ่อน: {subj.weakTopics[0] || "ไม่มี"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Readiness Certificate Modal */}
      <ReadinessCertificateModal
        isOpen={certModalOpen}
        userName={userName}
        readinessScore={readinessScore}
        onClose={() => setCertModalOpen(false)}
      />

    </div>
  );
};
