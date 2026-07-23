"use client";

import React, { useState } from "react";

interface SubjectWeakness {
  subjectName: string;
  score: number;
  weakTopics: string[];
  recommendedScripture: string;
}

interface WeaknessRadarProps {
  onStartFixQuiz: (topic: string) => void;
}

export const WeaknessRadar: React.FC<WeaknessRadarProps> = ({ onStartFixQuiz }) => {
  const weaknesses: SubjectWeakness[] = [
    { subjectName: "ผดุงครรภ์ไทย", score: 68, weakTopics: ["คัมภีร์ปฐมจินดารัตน์", "โรคซางในเด็ก"], recommendedScripture: "คัมภีร์ปฐมจินดา เล่ม 1" },
    { subjectName: "เภสัชกรรมไทย", score: 75, weakTopics: ["สรรพคุณรสยา 9 รส", "พรรณไม้สมุนไพร"], recommendedScripture: "ตำราเภสัชวัตถุสภาฯ" },
    { subjectName: "เวชกรรมไทย", score: 82, weakTopics: ["ไข้ตักกศิลา (ไข้ปะตัง/ไข้เหือด)"], recommendedScripture: "คัมภีร์ตักกศิลา" },
    { subjectName: "นวดไทย", score: 88, weakTopics: ["เส้นประธานสิบ (เส้นอิทา/ปิงคลา)"], recommendedScripture: "ตำราเส้นประธานสิบ" },
    { subjectName: "กฎหมายวิชาชีพ", score: 90, weakTopics: ["พ.ร.บ. วิชาชีพ 2556"], recommendedScripture: "พระราชบัญญัติ 2556" }
  ];

  const [selectedTopic, setSelectedTopic] = useState<string>("คัมภีร์ปฐมจินดารัตน์");

  return (
    <div className="glass-panel-emerald p-6 space-y-4 rounded-3xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-emerald-500/20 pb-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-heading font-semibold">
            🎯 AI Personal Weakness Radar (เรดาร์วิเคราะห์จุดอ่อน)
          </div>
          <h2 className="text-lg font-bold font-heading text-slate-950 dark:text-white mt-1 m-0">
            วิเคราะห์จุดอ่อนและจัดชุดข้อสอบซ่อมเฉพาะบุคคล
          </h2>
        </div>
        <button
          onClick={() => onStartFixQuiz(selectedTopic)}
          className="btn-emerald text-xs py-2 px-4 shadow-lg shrink-0"
        >
          ⚡ ติวซ่อมจุดอ่อนทันที ({selectedTopic}) ➔
        </button>
      </div>

      {/* Radar Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        {weaknesses.map((w, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedTopic(w.weakTopics[0])}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedTopic === w.weakTopics[0]
                ? "bg-amber-500/15 border-amber-500/50 shadow-md"
                : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-emerald-500/40"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-heading font-bold text-slate-900 dark:text-white">{w.subjectName}</span>
              <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full ${
                w.score < 75 ? "bg-red-500/20 text-red-700 dark:text-red-300" : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              }`}>
                {w.score}% (เกณฑ์ 75%)
              </span>
            </div>

            <div className="text-xs text-slate-700 dark:text-gray-300 mt-2 space-y-1">
              <div>⚠️ <strong className="text-amber-800 dark:text-amber-300">จุดอ่อนที่ต้องซ่อม:</strong> {w.weakTopics.join(", ")}</div>
              <div>📖 <strong className="text-emerald-800 dark:text-emerald-400">ตำราแนะนำ:</strong> {w.recommendedScripture}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
