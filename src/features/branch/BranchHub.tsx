"use client";

import React, { useState } from "react";
import { SubjectCategory, ExamPart, SubCategory } from "../../lib/types";
import { SAMPLE_SUBJECTS, SAMPLE_STUDY_MATERIALS, SAMPLE_QUESTIONS } from "../../lib/constants";
import { BranchContentViewer } from "./BranchContentViewer";

interface BranchHubProps {
  onNavigate: (view: string, extraState?: any) => void;
}

export const BranchHub: React.FC<BranchHubProps> = ({ onNavigate }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory>("เวชกรรมไทย");
  const [activeTab, setActiveTab] = useState<"content" | "theory" | "practical">("content");
  const [theorySubCategory, setTheorySubCategory] = useState<SubCategory>("เวช 1");
  const [practicalTypeFilter, setPracticalTypeFilter] = useState<"ALL" | "subjective" | "fill_in_blank_mcq" | "fill_in_blank" | "mcq_5">("ALL");

  const currentSubjectObj = SAMPLE_SUBJECTS.find(s => s.name === selectedSubject) || SAMPLE_SUBJECTS[0];

  // Filter Study Materials
  const materials = SAMPLE_STUDY_MATERIALS.filter(m => m.category === selectedSubject);

  // Filter Questions for Theory & Practical
  const theoryQuestions = SAMPLE_QUESTIONS.filter(q => {
    const isCategory = q.category === selectedSubject;
    const isTheory = q.examPart === "theory" || !q.examPart;
    const isSub = selectedSubject === "เวชกรรมไทย" ? q.subCategory === theorySubCategory : true;
    return isCategory && isTheory && isSub;
  });

  const practicalQuestions = SAMPLE_QUESTIONS.filter(q => {
    const isCategory = q.category === selectedSubject;
    const isPractical = q.examPart === "practical";
    let isType = true;
    if (practicalTypeFilter === "subjective") {
      isType = q.questionType === "subjective";
    } else if (practicalTypeFilter === "fill_in_blank_mcq") {
      isType = q.questionType === "fill_in_blank" || q.questionType === "mcq_5";
    } else if (practicalTypeFilter === "fill_in_blank") {
      isType = q.questionType === "fill_in_blank";
    } else if (practicalTypeFilter === "mcq_5") {
      isType = q.questionType === "mcq_5";
    }
    return isCategory && isPractical && isType;
  });

  const handleStartExam = (part: ExamPart, subCat?: SubCategory, typeFilter?: string) => {
    onNavigate("exam", {
      category: selectedSubject,
      part,
      subCategory: subCat,
      typeFilter
    });
  };

  // Determine practical filters based on subject (ตามผังใหม่ T2)
  const isMed = selectedSubject === "เวชกรรมไทย";
  const practicalFilterOptions = isMed
    ? [
        { id: "ALL", label: "ทั้งหมด" },
        { id: "subjective", label: "✍️ ข้อสอบอัตนัย" },
        { id: "fill_in_blank", label: "📝 ข้อสอบเติมคำในช่องว่าง" },
        { id: "mcq_5", label: "🔘 ข้อสอบปรนัย 5 ตัวเลือก" },
      ]
    : [
        { id: "ALL", label: "ทั้งหมด" },
        { id: "subjective", label: "✍️ ข้อสอบอัตนัย" },
        { id: "fill_in_blank_mcq", label: "📝 ข้อสอบเติมคำในช่องว่าง/ ปรนัย" },
      ];

  return (
    <div className="space-y-6 py-4 max-w-6xl mx-auto">
      
      {/* Title & 5 Branch Selector Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-500/20 pb-3">
          <div>
            <span className="text-xs font-heading bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">
              🌿 ระบบเลือกสาขาวิชา (Member Branch Selector - ผัง T2)
            </span>
            <h1 className="text-xl md:text-2xl font-bold font-heading text-slate-950 dark:text-white mt-1 m-0">
              ศูนย์การเรียนรู้ {selectedSubject}
            </h1>
          </div>
          
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-3.5 py-1.5 rounded-full bg-emerald-900/10 dark:bg-white/5 text-xs text-slate-800 dark:text-gray-300 hover:bg-emerald-900/20 font-heading font-medium"
          >
            ← กลับหน้าแดชบอร์ด
          </button>
        </div>

        {/* 5 Branch Selection Pills (ตามผังใหม่ T2) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 font-heading text-xs">
          {SAMPLE_SUBJECTS.map(subj => {
            const isSelected = selectedSubject === subj.name as SubjectCategory;
            return (
              <button
                key={subj.id}
                onClick={() => {
                  setSelectedSubject(subj.name as SubjectCategory);
                  setActiveTab("content");
                  setPracticalTypeFilter("ALL");
                  if (subj.name === "เวชกรรมไทย") setTheorySubCategory("เวช 1");
                }}
                className={`p-3 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-800/20 text-emerald-950 dark:text-emerald-300 font-bold border-2 border-emerald-500 shadow-md"
                    : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-400 border border-slate-200 dark:border-white/10 hover:border-emerald-500/40"
                }`}
              >
                <span className="text-base">{subj.icon}</span>
                <span>{subj.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Tab Bar: เนื้อหา / ภาคทฤษฎี / ภาคปฏิบัติ (ตามผังใหม่ T2) */}
      <div className="glass-panel p-2 rounded-2xl flex flex-wrap gap-2 text-xs font-heading">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 py-2 px-4 rounded-xl transition-all font-semibold text-center ${
            activeTab === "content"
              ? "bg-emerald-800/20 text-emerald-950 dark:text-emerald-300 border border-emerald-500/40 font-bold shadow-sm"
              : "text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📖 เนื้อหาบทเรียน / คัมภีร์ ({materials.length} บท)
        </button>

        <button
          onClick={() => setActiveTab("theory")}
          className={`flex-1 py-2 px-4 rounded-xl transition-all font-semibold text-center ${
            activeTab === "theory"
              ? "bg-emerald-800/20 text-emerald-950 dark:text-emerald-300 border border-emerald-500/40 font-bold shadow-sm"
              : "text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          📘 ภาคทฤษฎี (ข้อสอบปรนัย 5 ตัวเลือก)
        </button>

        {selectedSubject !== "กฎหมายและจรรยาบรรณวิชาชีพ" && (
          <button
            onClick={() => setActiveTab("practical")}
            className={`flex-1 py-2 px-4 rounded-xl transition-all font-semibold text-center ${
              activeTab === "practical"
                ? "bg-emerald-800/20 text-emerald-950 dark:text-emerald-300 border border-emerald-500/40 font-bold shadow-sm"
                : "text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            🛠️ ภาคปฏิบัติ ({isMed ? "อัตนัย / เติมคำ / ปรนัย 5 ตัวเลือก" : "อัตนัย / เติมคำในช่องว่าง/ ปรนัย"})
          </button>
        )}
      </div>

      {/* TAB 1: เนื้อหาบทเรียน (Content Material) */}
      {activeTab === "content" && (
        <BranchContentViewer category={selectedSubject} />
      )}

      {/* TAB 2: ภาคทฤษฎี (Theory Exams) */}
      {activeTab === "theory" && (
        <div className="glass-panel-emerald p-6 space-y-4 rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-xs font-heading bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">
                📘 ภาคทฤษฎี: {selectedSubject}
              </span>
              <h2 className="text-lg font-bold font-heading text-slate-950 dark:text-white mt-1 m-0">
                คลังข้อสอบทฤษฎี (ข้อสอบปรนัย 5 ตัวเลือก A, B, C, D, E)
              </h2>
            </div>

            {/* เวชกรรมไทย Sub-Category Toggle (เวช 1 vs เวช 2) */}
            {selectedSubject === "เวชกรรมไทย" && (
              <div className="flex gap-1.5 bg-black/30 p-1 rounded-full border border-emerald-500/30 text-xs font-heading">
                <button
                  onClick={() => setTheorySubCategory("เวช 1")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    theorySubCategory === "เวช 1"
                      ? "bg-emerald-500 text-black font-bold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  📜 เวช 1
                </button>
                <button
                  onClick={() => setTheorySubCategory("เวช 2")}
                  className={`px-4 py-1.5 rounded-full transition-all ${
                    theorySubCategory === "เวช 2"
                      ? "bg-emerald-500 text-black font-bold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  📜 เวช 2
                </button>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-900/10 dark:bg-white/5 space-y-3 border border-emerald-500/20">
            <div className="flex justify-between items-center text-xs text-slate-800 dark:text-gray-300 font-heading">
              <span>ชุดข้อสอบทฤษฎีที่มีในคลัง: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{theoryQuestions.length} ข้อ</strong></span>
              <span className="text-amber-800 dark:text-amber-300 font-bold">ข้อสอบปรนัย 5 ตัวเลือก</span>
            </div>

            <p className="text-xs text-slate-700 dark:text-gray-300 m-0 leading-relaxed font-medium">
              ข้อสอบทฤษฎีอ้างอิงจากคัมภีร์หลักสภาการแพทย์แผนไทย ปรับโครงสร้างเป็น **ข้อสอบปรนัย 5 ตัวเลือก** ตามเกณฑ์ประเมินจริงของสภาฯ
            </p>

            <button
              onClick={() => handleStartExam("theory", selectedSubject === "เวชกรรมไทย" ? theorySubCategory : undefined)}
              className="btn-emerald text-xs py-2.5 px-6 shadow-lg font-heading"
            >
              🚀 เริ่มทำข้อสอบทฤษฎี {selectedSubject === "เวชกรรมไทย" ? `(${theorySubCategory})` : ""} ➔
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: ภาคปฏิบัติ (Practical Exams - ตามผังใหม่ T2) */}
      {activeTab === "practical" && selectedSubject !== "กฎหมายและจรรยาบรรณวิชาชีพ" && (
        <div className="glass-panel-emerald p-6 space-y-4 rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-xs font-heading bg-amber-700/15 text-amber-900 dark:text-amber-300 px-3 py-1 rounded-full font-semibold">
                🛠️ ภาคปฏิบัติ: {selectedSubject} (ผัง T2)
              </span>
              <h2 className="text-lg font-bold font-heading text-slate-950 dark:text-white mt-1 m-0">
                {isMed 
                  ? "คลังข้อสอบภาคปฏิบัติ (ข้อสอบอัตนัย, ข้อสอบเติมคำในช่องว่าง, ข้อสอบปรนัย 5 ตัวเลือก)"
                  : "คลังข้อสอบภาคปฏิบัติ (ข้อสอบอัตนัย, ข้อสอบเติมคำในช่องว่าง/ ปรนัย)"
                }
              </h2>
            </div>

            {/* Filter Types for Practical (ตรงตามผังใหม่ T2) */}
            <div className="flex flex-wrap gap-1.5 text-xs font-heading">
              {practicalFilterOptions.map(type => (
                <button
                  key={type.id}
                  onClick={() => setPracticalTypeFilter(type.id as any)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    practicalTypeFilter === type.id
                      ? "bg-amber-500/20 text-amber-950 dark:text-amber-300 font-bold border border-amber-500/40"
                      : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-400 hover:text-slate-900"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-900/10 dark:bg-white/5 space-y-3 border border-amber-500/20">
            <div className="flex justify-between items-center text-xs text-slate-800 dark:text-gray-300 font-heading">
              <span>ข้อสอบปฏิบัติพร้อมทดสอบ: <strong className="text-amber-700 dark:text-amber-300 font-bold">{practicalQuestions.length} ข้อ</strong></span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                {isMed ? "อัตนัย + เติมคำ + ปรนัย 5 ตัวเลือก" : "อัตนัย + เติมคำในช่องว่าง/ ปรนัย"}
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-gray-300 m-0 leading-relaxed font-medium">
              ข้อสอบภาคปฏิบัติเน้นประเมินการวินิจฉัยโรค การเขียนระบุคำเฉลย และการเลือกคำตอบที่ถูกต้องตามผังมาตรฐานใหม่ T2
            </p>

            <button
              onClick={() => handleStartExam("practical", undefined, practicalTypeFilter)}
              className="btn-emerald text-xs py-2.5 px-6 shadow-lg font-heading"
              style={{ background: "linear-gradient(135deg, #c27803, #92400e)" }}
            >
              🚀 เริ่มทำข้อสอบภาคปฏิบัติ ➔
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
