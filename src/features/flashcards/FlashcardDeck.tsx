"use client";

import React, { useState } from "react";
import { SAMPLE_FLASHCARDS } from "../../lib/constants";

export const FlashcardDeck: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = SAMPLE_FLASHCARDS[index];

  const handleNext = () => {
    setIsFlipped(false);
    setIndex(prev => (prev + 1) % SAMPLE_FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setIndex(prev => (prev - 1 + SAMPLE_FLASHCARDS.length) % SAMPLE_FLASHCARDS.length);
  };

  return (
    <div className="space-y-8 py-8 max-w-2xl mx-auto text-center">
      
      <div>
        <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-heading">
          📇 Smart Flashcards • {currentCard.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-white mt-2">
          บัตรคำท่องจำสมุนไพร & รสยา 9 รส
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          การ์ดที่ {index + 1} จาก {SAMPLE_FLASHCARDS.length} (แตะการ์ดเพื่อพลิกดูเฉลย)
        </p>
      </div>

      {/* 3D Interactive Flip Card */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 cursor-pointer perspective-1000"
      >
        <div className={`w-full h-full glass-panel-emerald p-8 flex flex-col justify-between items-center transition-all duration-500 transform shadow-2xl ${
          isFlipped ? "bg-amber-950/40 border-amber-500/40" : "bg-emerald-950/40 border-emerald-500/40"
        }`}>
          
          <div className="text-xs font-heading text-amber-400 font-bold">
            {isFlipped ? "💡 ด้านหลัง (คำอธิบาย & สูตรจำ)" : "📌 ด้านหน้า (โจทย์คำถาม)"}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold font-heading text-white">
              {currentCard.title}
            </h2>
            <p className="text-lg text-emerald-100 leading-relaxed font-medium">
              {isFlipped ? currentCard.backText : currentCard.frontText}
            </p>
            {isFlipped && currentCard.mnemonicNote && (
              <div className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-heading">
                สูตรจำ: {currentCard.mnemonicNote}
              </div>
            )}
          </div>

          <div className="text-xs text-gray-400 font-heading">
            (แตะเพื่อพลิกกลับ)
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center px-4">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 rounded-xl border border-white/10 text-sm font-heading text-gray-300 hover:bg-white/5"
        >
          ⬅️ การ์ดก่อนหน้า
        </button>

        <button
          onClick={() => alert(`เล่นเสียงอ่านสูตรท่องจำ: ${currentCard.mnemonicNote || currentCard.title}`)}
          className="p-3 rounded-full bg-white/5 border border-white/10 text-amber-300 hover:bg-white/10"
          title="ฟังเสียงอ่านสูตรท่องจำ"
        >
          🔊
        </button>

        <button
          onClick={handleNext}
          className="btn-emerald text-sm py-2.5 px-5"
        >
          การ์ดถัดไป ➔
        </button>
      </div>

    </div>
  );
};
