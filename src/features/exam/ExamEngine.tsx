"use client";

import React, { useState } from "react";
import { SAMPLE_QUESTIONS } from "../../lib/constants";
import { QuestionItem } from "../../lib/types";

interface ExamEngineProps {
  onNavigate: (view: string) => void;
  initialFilter?: {
    category?: string;
    part?: string;
    subCategory?: string;
    typeFilter?: string;
  };
}

export const ExamEngine: React.FC<ExamEngineProps> = ({ onNavigate, initialFilter }) => {
  const [questions] = useState<QuestionItem[]>(SAMPLE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // MCQ selection answers
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // Fill-in-the-blank text answers
  const [fillBlankText, setFillBlankText] = useState<Record<string, string>>({});
  // Subjective essay text answers
  const [subjectiveText, setSubjectiveText] = useState<Record<string, string>>({});

  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>(initialFilter?.category || "ALL");
  const [selectedPart, setSelectedPart] = useState<string>(initialFilter?.part || "ALL");
  const [selectedSubCat, setSelectedSubCat] = useState<string>(initialFilter?.subCategory || "ALL");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>(initialFilter?.typeFilter || "ALL");

  const filteredQuestions = questions.filter(q => {
    const matchQuery = q.questionText.includes(searchQuery) || q.explanation.includes(searchQuery) || q.scriptureRef.includes(searchQuery);
    const matchSubject = selectedSubject === "ALL" || q.category === selectedSubject;
    const matchPart = selectedPart === "ALL" || q.examPart === selectedPart || (!q.examPart && selectedPart === "theory");
    const matchSubCat = selectedSubCat === "ALL" || q.subCategory === selectedSubCat;
    
    let matchType = true;
    if (selectedTypeFilter === "subjective") {
      matchType = q.questionType === "subjective";
    } else if (selectedTypeFilter === "fill_in_blank_mcq") {
      matchType = q.questionType === "fill_in_blank" || q.questionType === "mcq_5";
    } else if (selectedTypeFilter === "fill_in_blank") {
      matchType = q.questionType === "fill_in_blank";
    } else if (selectedTypeFilter === "mcq_5") {
      matchType = q.questionType === "mcq_5";
    }

    return matchQuery && matchSubject && matchPart && matchSubCat && matchType;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0] || SAMPLE_QUESTIONS[0];

  const handleSelectMCQOption = (qId: string, optId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const handleCheckFillInBlank = (qId: string) => {
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const handleShowSubjectiveRubric = (qId: string) => {
    setShowExplanation(prev => ({ ...prev, [qId]: true }));
  };

  const toggleBookmark = (qId: string) => {
    setBookmarked(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-6 py-4 max-w-6xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-emerald-500/20 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("branch-hub")}
            className="p-2 rounded-full bg-emerald-900/10 dark:bg-white/5 hover:bg-emerald-900/20 text-slate-900 dark:text-white text-xs font-heading font-semibold"
          >
            ← กลับหน้าเลือกสาขา
          </button>
          <div>
            <h1 className="text-lg font-bold font-heading text-slate-950 dark:text-white m-0 flex items-center gap-2">
              ✍️ ห้องจำลองสอบสภาการแพทย์แผนไทย (ผัง T2 Exam Engine)
            </h1>
            <p className="text-xs text-slate-700 dark:text-gray-400 m-0 font-medium">
              ข้อที่ {currentIndex + 1} จากทั้งหมด {filteredQuestions.length} ข้อในหมวดนี้
            </p>
          </div>
        </div>

        {/* Timer Bar */}
        <div className="flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-heading text-amber-900 dark:text-amber-300 font-bold shrink-0">
          <span>⏱️ เวลาคงเหลือ: 174:20 นาที</span>
        </div>
      </div>

      {/* 🔍 Search & Scripture Filter Bar (ตามผังใหม่ T2) */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="ค้นหาโจทย์ คัมภีร์ หรือคำศัพท์ (เช่น 'ตักกศิลา', 'รสยา', 'เหือด')..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-heading"
          />
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs font-heading shrink-0">
          {["ALL", "เวชกรรมไทย", "เภสัชกรรมไทย", "ผดุงครรภ์ไทย", "นวดไทย", "กฎหมายและจรรยาบรรณวิชาชีพ"].map(subj => (
            <button
              key={subj}
              onClick={() => {
                setSelectedSubject(subj);
                setSelectedTypeFilter("ALL");
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-full transition-all ${
                selectedSubject === subj
                  ? "bg-emerald-800/20 text-emerald-950 dark:text-emerald-300 font-bold border border-emerald-500/30"
                  : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-400 hover:text-slate-900"
              }`}
            >
              {subj === "ALL" ? "🌐 ทั้งหมด" : subj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quiz Card */}
      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          
          {/* Question & Answers Area */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass-panel-emerald p-6 space-y-4 rounded-3xl">
              
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-heading bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">
                    {currentQ.category}
                  </span>
                  {currentQ.examPart && (
                    <span className="text-[11px] font-heading bg-amber-700/15 text-amber-900 dark:text-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                      {currentQ.examPart === "theory" ? "📘 ภาคทฤษฎี" : "🛠️ ภาคปฏิบัติ"}
                    </span>
                  )}
                  {currentQ.subCategory && currentQ.subCategory !== "ทั่วไป" && (
                    <span className="text-[11px] font-heading bg-teal-700/15 text-teal-900 dark:text-teal-300 px-2.5 py-0.5 rounded-full font-bold">
                      📜 {currentQ.subCategory}
                    </span>
                  )}
                  {currentQ.questionType && (
                    <span className="text-[10px] font-heading bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                      {currentQ.questionType === "mcq_5" ? "🔘 ปรนัย 5 ตัวเลือก" : currentQ.questionType === "fill_in_blank" ? "📝 เติมคำในช่องว่าง" : "✍️ อัตนัย"}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-800 dark:text-amber-400 font-heading font-semibold">
                    📖 {currentQ.scriptureRef}
                  </span>
                  <button
                    onClick={() => toggleBookmark(currentQ.id)}
                    className={`p-1.5 rounded-full text-xs transition-all ${
                      bookmarked[currentQ.id] ? "bg-amber-500/20 text-amber-500" : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                    title="บุ๊กมาร์กไว้ทบทวน"
                  >
                    {bookmarked[currentQ.id] ? "★ บุ๊กมาร์กแล้ว" : "☆ บุ๊กมาร์ก"}
                  </button>
                </div>
              </div>

              <p className="text-base font-semibold leading-relaxed m-0 text-slate-950 dark:text-white">
                ข้อ {currentIndex + 1}. {currentQ.questionText}
              </p>

              {/* RENDER TYPE 1: ปรนัย 5 ตัวเลือก (MCQ 5 choices: A-E) */}
              {(!currentQ.questionType || currentQ.questionType === "mcq_5") && currentQ.options && (
                <div className="grid grid-cols-1 gap-2.5 text-sm pt-2">
                  {currentQ.options.map(opt => {
                    const selectedOpt = selectedAnswers[currentQ.id];
                    const isSelected = selectedOpt === opt.id;
                    const isCorrect = opt.id === currentQ.correctOptionId;

                    let btnStyle = "bg-slate-100 dark:bg-white/5 hover:bg-emerald-800/10 text-slate-900 dark:text-gray-200 border border-slate-200 dark:border-white/10 rounded-2xl";
                    if (selectedOpt) {
                      if (isSelected) {
                        btnStyle = isCorrect
                          ? "bg-emerald-800/20 text-emerald-950 dark:text-emerald-300 font-bold border border-emerald-500/50 rounded-2xl"
                          : "bg-red-500/20 text-red-900 dark:text-red-300 border border-red-500/50 rounded-2xl";
                      } else if (isCorrect) {
                        btnStyle = "bg-emerald-800/15 text-emerald-950 dark:text-emerald-300 font-bold border border-emerald-500/30 rounded-2xl";
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectMCQOption(currentQ.id, opt.id)}
                        className={`p-3.5 rounded-2xl text-left flex items-center gap-3 transition-all ${btnStyle}`}
                      >
                        <span className="w-7 h-7 rounded-full bg-emerald-900/10 dark:bg-white/10 flex items-center justify-center font-bold font-heading text-xs text-slate-900 dark:text-white">
                          {opt.id.toUpperCase()}
                        </span>
                        <span className="font-medium">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* RENDER TYPE 2: ข้อสอบเติมคำในช่องว่าง (Fill-in-the-blank) */}
              {currentQ.questionType === "fill_in_blank" && (
                <div className="space-y-3 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="พิมพ์คำตอบเติมในช่องว่างที่นี่..."
                      value={fillBlankText[currentQ.id] || ""}
                      onChange={e => setFillBlankText(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                      className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-body"
                    />
                    <button
                      onClick={() => handleCheckFillInBlank(currentQ.id)}
                      className="btn-emerald text-xs px-5 rounded-2xl shrink-0"
                    >
                      ตรวจคำตอบ ➔
                    </button>
                  </div>
                  {showExplanation[currentQ.id] && currentQ.correctAnswerText && (
                    <div className="p-3 rounded-2xl bg-emerald-900/20 border border-emerald-500/40 text-xs text-emerald-950 dark:text-emerald-200 font-heading">
                      <strong>คำตอบที่ถูกต้อง:</strong> "{currentQ.correctAnswerText}"
                    </div>
                  )}
                </div>
              )}

              {/* RENDER TYPE 3: ข้อสอบอัตนัย (Subjective Essay) */}
              {currentQ.questionType === "subjective" && (
                <div className="space-y-3 pt-2">
                  <textarea
                    rows={4}
                    placeholder="พิมพ์ตอบข้อสอบอัตนัยบรรยายรายละเอียดที่นี่..."
                    value={subjectiveText[currentQ.id] || ""}
                    onChange={e => setSubjectiveText(prev => ({ ...prev, [currentQ.id]: e.target.value }))}
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl p-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-body"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleShowSubjectiveRubric(currentQ.id)}
                      className="btn-emerald text-xs py-2 px-5 rounded-2xl"
                      style={{ background: "linear-gradient(135deg, #c27803, #92400e)" }}
                    >
                      💡 ดูแนวทางเฉลยและเกณฑ์ตรวจอัตนัย ➔
                    </button>
                  </div>
                  {showExplanation[currentQ.id] && currentQ.subjectiveRubric && (
                    <div className="p-4 rounded-2xl bg-amber-900/20 border border-amber-500/40 text-xs text-amber-950 dark:text-amber-100 font-body space-y-1">
                      <strong className="font-heading text-amber-900 dark:text-amber-300 block">📜 แนวทางเฉลยคำตอบอัตนัย:</strong>
                      <p className="m-0 leading-relaxed">{currentQ.subjectiveRubric}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation Box */}
              {showExplanation[currentQ.id] && (
                <div className="p-4 rounded-2xl bg-amber-700/10 text-amber-950 dark:text-amber-100 text-sm space-y-2 border border-amber-700/20 animate-fadeIn">
                  <div className="font-heading font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <span>💡 คำอธิบายเฉลยเพิ่มเติมอ้างอิงคัมภีร์สภาฯ:</span>
                  </div>
                  <p className="text-xs leading-relaxed m-0 font-medium">{currentQ.explanation}</p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-2 font-heading">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-full bg-emerald-900/10 dark:bg-white/5 text-xs text-slate-900 dark:text-white disabled:opacity-40 font-semibold"
                >
                  ← ข้อก่อนหน้า
                </button>
                <button
                  disabled={currentIndex === filteredQuestions.length - 1}
                  onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                  className="btn-emerald text-xs py-2 px-5"
                >
                  ข้อถัดไป ➔
                </button>
              </div>

            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="glass-panel p-4 space-y-3 rounded-3xl h-fit">
            <h3 className="text-xs font-bold font-heading text-slate-900 dark:text-white m-0">
              📌 พาเลตข้อสอบ ({filteredQuestions.length} ข้อ)
            </h3>
            <div className="grid grid-cols-5 gap-1.5 text-xs font-mono">
              {filteredQuestions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = !!selectedAnswers[q.id] || !!fillBlankText[q.id] || !!subjectiveText[q.id];
                const isBookmarked = !!bookmarked[q.id];

                let btnBg = "bg-slate-200 dark:bg-white/5 text-slate-700 dark:text-gray-400";
                if (isAnswered) btnBg = "bg-emerald-800/20 text-emerald-900 dark:text-emerald-300 font-bold border border-emerald-500/40";
                if (isCurrent) btnBg = "ring-2 ring-emerald-500 bg-emerald-600 text-white font-bold";

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl flex flex-col items-center justify-center relative transition-all ${btnBg}`}
                  >
                    <span>{idx + 1}</span>
                    {isBookmarked && (
                      <span className="absolute -top-1 -right-1 text-[9px] text-amber-500">★</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        <div className="glass-panel p-8 text-center space-y-3 rounded-3xl">
          <div className="text-3xl">🔍</div>
          <h3 className="text-base font-bold font-heading text-slate-950 dark:text-white">ไม่พบข้อสอบในหมวดนี้</h3>
          <p className="text-xs text-slate-600 dark:text-gray-400 font-medium">ลองเปลี่ยนหมวดการกรอง หรือคลิกเลือกหมวดทั้งหมด</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSubject("ALL");
              setSelectedPart("ALL");
              setSelectedSubCat("ALL");
              setSelectedTypeFilter("ALL");
            }}
            className="btn-emerald text-xs py-2 px-4"
          >
            🔄 รีเซ็ตการค้นหา
          </button>
        </div>
      )}

    </div>
  );
};
