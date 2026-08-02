"use client";

import React, { useState } from "react";
import { SubjectCategory, StudyMaterialItem } from "../../lib/types";
import { SAMPLE_STUDY_MATERIALS } from "../../lib/constants";

interface BranchContentViewerProps {
  category: SubjectCategory;
}

export const BranchContentViewer: React.FC<BranchContentViewerProps> = ({ category }) => {
  const materials = SAMPLE_STUDY_MATERIALS.filter(m => m.category === category);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterialItem | null>(materials[0] || null);

  if (materials.length === 0) {
    return (
      <div className="glass-panel p-8 text-center space-y-2 rounded-3xl">
        <div className="text-3xl">📖</div>
        <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white">กำลังอัปเดตบทเรียนในหมวด {category}</h3>
        <p className="text-xs text-slate-600 dark:text-gray-400 font-medium">คัมภีร์และสรุปเนื้อหาสำหรับสาขานี้กำลังจัดเตรียมข้อมูล</p>
      </div>
    );
  }

  const currentMat = selectedMaterial || materials[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Materials List Side Panel */}
      <div className="space-y-2.5 col-span-1">
        <h3 className="text-xs font-bold font-heading text-slate-950 dark:text-white m-0 flex items-center justify-between">
          <span>📖 รายการบทเรียน ({materials.length} บท)</span>
          <span className="text-emerald-700 dark:text-emerald-400 text-[11px] font-normal">{category}</span>
        </h3>

        <div className="space-y-2">
          {materials.map(mat => {
            const isSelected = currentMat.id === mat.id;
            return (
              <div
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-emerald-800/20 border-emerald-500/50 shadow-sm"
                    : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <div className="flex justify-between items-center text-[11px] text-amber-800 dark:text-amber-300 font-heading font-semibold mb-1">
                  <span>📖 {mat.scriptureRef}</span>
                  <span>⏱️ {mat.readTimeMinutes} นาที</span>
                </div>
                <h4 className="font-heading font-bold text-xs m-0 text-slate-900 dark:text-white leading-snug">
                  {mat.title}
                </h4>
                <p className="text-[11px] text-slate-700 dark:text-gray-400 m-0 mt-1 line-clamp-2 font-medium">
                  {mat.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Material Reader View */}
      <div className="md:col-span-2 glass-panel-emerald p-6 space-y-4 rounded-3xl">
        <div className="flex justify-between items-start border-b border-emerald-500/20 pb-3">
          <div>
            <span className="text-xs font-heading bg-amber-700/15 text-amber-900 dark:text-amber-300 px-3 py-0.5 rounded-full font-semibold">
              📖 {currentMat.scriptureRef}
            </span>
            <h2 className="text-lg font-bold font-heading text-slate-950 dark:text-white mt-1 m-0">
              {currentMat.title}
            </h2>
          </div>
          <span className="text-xs text-slate-600 dark:text-gray-400 font-heading shrink-0">
            ⏱️ เวลาอ่าน: {currentMat.readTimeMinutes} นาที
          </span>
        </div>

        {/* Content Body */}
        <div className="prose prose-emerald dark:prose-invert max-w-none text-xs md:text-sm text-slate-900 dark:text-gray-200 leading-relaxed font-body whitespace-pre-line space-y-3">
          {currentMat.fullContent}
        </div>

        <div className="pt-4 border-t border-emerald-500/20 flex justify-between items-center text-xs font-heading">
          <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
            ✓ อ่านจบบทเรียนนี้แล้ว พร้อมทดสอบความรู้
          </span>
        </div>
      </div>

    </div>
  );
};
