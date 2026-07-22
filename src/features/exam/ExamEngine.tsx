"use client";

import React, { useState, useEffect } from "react";
import { SAMPLE_QUESTIONS } from "../../lib/constants";
import { QuestionItem } from "../../lib/types";

interface ExamEngineProps {
  onNavigate: (view: string) => void;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({ onNavigate }) => {
  const [questions] = useState<QuestionItem[]>(SAMPLE_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, "a" | "b" | "c" | "d">>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer: 180 minutes = 10,800 seconds
  const [secondsLeft, setSecondsLeft] = useState(180 * 60);

  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (optId: "a" | "b" | "c" | "d") => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
  };

  const toggleBookmark = () => {
    setBookmarks(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Score Calculation
  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionId) {
        score++;
      }
    });
    return score;
  };

  if (isSubmitted) {
    const total = questions.length;
    const score = calculateScore();
    const percent = Math.round((score / total) * 100);
    const isPassed = percent >= 60;

    return (
      <div className="space-y-8 py-4 max-w-4xl mx-auto">
        {/* Score Summary Box */}
        <div className="glass-panel-emerald p-8 text-center space-y-4">
          <h1 className="text-3xl font-bold font-heading text-white">สรุปผลการสอบประเมิน</h1>
          
          <div className="text-2xl font-bold font-heading" style={{ color: isPassed ? "#10b981" : "#f59e0b" }}>
            {isPassed ? "🎉 PASSED (ผ่านเกณฑ์ประเมินสภาการแพทย์แผนไทย ≥ 60%)" : "💪 NEEDS IMPROVEMENT (ทบทวนคัมภีร์เพิ่มเติม)"}
          </div>

          <div className="flex justify-center gap-8 py-4">
            <div>
              <div className="text-sm text-gray-400 font-heading">คะแนนที่ได้</div>
              <div className="text-4xl font-bold font-heading text-white">{score} / {total}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 font-heading">คิดเป็นเปอร์เซ็นต์</div>
              <div className="text-4xl font-bold font-heading text-emerald-400">{percent}%</div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button onClick={() => setIsSubmitted(false)} className="btn-emerald">
              🔄 ลองทำใหม่อีกครั้ง
            </button>
            <button onClick={() => onNavigate("dashboard")} className="px-6 py-2.5 rounded-xl border border-white/20 text-white font-heading">
              กลับหน้าหลัก
            </button>
          </div>
        </div>

        {/* Detailed Explanations List */}
        <div className="glass-panel p-6 space-y-4">
          <h2 className="text-xl font-bold font-heading text-white">📜 เฉลยรายละเอียดอ้างอิงตำราสภาฯ</h2>
          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctOptionId;

              return (
                <div 
                  key={q.id} 
                  className={`p-4 rounded-xl border space-y-2 ${
                    isCorrect ? "bg-emerald-500/10 border-emerald-500/30" : "bg-red-500/10 border-red-500/30"
                  }`}
                >
                  <div className="flex justify-between text-xs font-heading">
                    <span className="text-emerald-300 font-bold">ข้อที่ {idx + 1} • {q.category}</span>
                    <span className={isCorrect ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                      {isCorrect ? "✓ ตอบถูกต้อง" : "✗ ตอบผิด"}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium">{q.questionText}</p>
                  <div className="text-xs text-gray-300 space-y-1">
                    <div><strong className="text-emerald-400">เฉลย:</strong> {q.options.find(o=>o.id===q.correctOptionId)?.text}</div>
                    <div><strong className="text-amber-400">คำอธิบายอ้างอิง:</strong> {q.explanation}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      
      {/* Top Header Bar */}
      <div className="glass-panel p-4 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-heading">
            {currentQ.category} • {currentQ.scriptureRef}
          </span>
          <span className="text-xs text-gray-400 font-heading ml-3">
            ข้อที่ {currentIndex + 1} จาก {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1 rounded-full font-heading font-bold text-sm flex items-center gap-2">
            ⏱️ {formatTime(secondsLeft)}
          </div>
        </div>
      </div>

      {/* 2-Column Main Exam Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Question Area */}
        <div className="md:col-span-2 glass-panel p-6 md:p-8 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-lg md:text-xl font-medium text-white leading-relaxed">
              {currentIndex + 1}. {currentQ.questionText}
            </h2>
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg border text-xs font-heading shrink-0 ${
                bookmarks[currentQ.id]
                  ? "bg-amber-500/20 border-amber-500 text-amber-300"
                  : "bg-white/5 border-white/10 text-gray-400"
              }`}
            >
              {bookmarks[currentQ.id] ? "🟨 ปักหมุดแล้ว" : "📌 ปักหมุด"}
            </button>
          </div>

          {currentQ.imageUrl && (
            <div className="w-full max-w-sm mx-auto rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img src={currentQ.imageUrl} alt="รูปประกอบข้อสอบ" className="w-full h-48 object-cover" />
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = userAnswers[currentQ.id] === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-medium"
                      : "bg-white/5 border-white/10 hover:bg-emerald-500/10 text-gray-200"
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold font-heading text-sm ${
                    isSelected ? "border-emerald-400 bg-emerald-500 text-black" : "border-gray-500 text-gray-400"
                  }`}>
                    {opt.id.toUpperCase()}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between pt-4 border-t border-white/10">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="px-4 py-2 rounded-xl border border-white/10 text-sm font-heading disabled:opacity-30 text-gray-300"
            >
              ⬅️ ข้อก่อนหน้า
            </button>
            
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="btn-emerald text-sm py-2 px-5"
              >
                ข้อถัดไป ➔
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold font-heading px-5 py-2 rounded-xl text-sm transition-all"
              >
                🏁 ส่งข้อสอบทันที
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Question Palette Sidebar */}
        <div className="glass-panel p-6 space-y-4 h-fit">
          <h3 className="font-heading font-bold text-white text-base">ตารางข้อสอบ (Question Palette)</h3>
          <p className="text-xs text-gray-400">คลิกหมายเลขเพื่อข้ามไปยังข้อนั้น</p>

          <div className="grid grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = !!userAnswers[q.id];
              const isCurrent = idx === currentIndex;
              const isBookmarked = !!bookmarks[q.id];

              let bgStyle = "bg-white/5 text-gray-400 border-white/10";
              if (isAnswered) bgStyle = "bg-emerald-500/20 text-emerald-300 border-emerald-500/50";
              if (isBookmarked) bgStyle = "bg-amber-500/20 text-amber-300 border-amber-500/50";
              if (isCurrent) bgStyle += " border-2 border-amber-400 font-bold";

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`aspect-square rounded-lg border text-sm flex items-center justify-center font-heading transition-all ${bgStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-2 text-xs space-y-1 text-gray-400 font-heading">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500"></span> ตอบแล้ว
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span> ปักหมุด
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-white/5 border border-white/10"></span> ยังไม่ตอบ
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
