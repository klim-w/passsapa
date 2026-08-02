"use client";

import React, { useState } from "react";
import { KnowledgeArticleItem } from "../../lib/types";
import { SAMPLE_KNOWLEDGE_ARTICLES } from "../../lib/constants";

interface PublicKnowledgeHubProps {
  onNavigate: (view: string) => void;
}

export const PublicKnowledgeHub: React.FC<PublicKnowledgeHubProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticleItem | null>(SAMPLE_KNOWLEDGE_ARTICLES[0]);

  return (
    <div className="space-y-6 py-4 max-w-6xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-500/20 pb-3">
        <div>
          <span className="text-xs font-heading bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">
            📚 องค์ความรู้แพทย์แผนไทย (Public Knowledge Hub)
          </span>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-slate-950 dark:text-white mt-1 m-0">
            คลังบทความและตำราความรู้เปิดสำหรับทุกคน
          </h1>
        </div>

        <button
          onClick={() => onNavigate("landing")}
          className="px-3.5 py-1.5 rounded-full bg-emerald-900/10 dark:bg-white/5 text-xs text-slate-800 dark:text-gray-300 hover:bg-emerald-900/20 font-heading font-medium"
        >
          ← กลับหน้าแรก
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Article List Side Panel */}
        <div className="space-y-2.5 col-span-1">
          <h3 className="text-xs font-bold font-heading text-slate-950 dark:text-white m-0">
            📰 บทความองค์ความรู้แนะนำ ({SAMPLE_KNOWLEDGE_ARTICLES.length} บทความ)
          </h3>

          <div className="space-y-2">
            {SAMPLE_KNOWLEDGE_ARTICLES.map(art => {
              const isSelected = selectedArticle?.id === art.id;
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-emerald-800/20 border-emerald-500/50 shadow-sm"
                      : "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-emerald-500/30"
                  }`}
                >
                  <div className="flex justify-between items-center text-[11px] text-amber-800 dark:text-amber-300 font-heading font-semibold mb-1">
                    <span>🏷️ {art.category}</span>
                    <span>⏱️ {art.readTimeMinutes} นาที</span>
                  </div>
                  <h4 className="font-heading font-bold text-xs m-0 text-slate-900 dark:text-white leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-slate-700 dark:text-gray-400 m-0 mt-1 line-clamp-2 font-medium">
                    {art.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Article Viewer */}
        <div className="md:col-span-2 glass-panel-emerald p-6 space-y-4 rounded-3xl">
          {selectedArticle ? (
            <>
              <div className="space-y-2 border-b border-emerald-500/20 pb-3">
                <div className="flex justify-between items-center text-xs font-heading">
                  <span className="bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-3 py-0.5 rounded-full font-semibold">
                    {selectedArticle.category}
                  </span>
                  <span className="text-slate-600 dark:text-gray-400 font-medium">
                    เผยแพร่เมื่อ: {selectedArticle.publishedDate}
                  </span>
                </div>
                <h2 className="text-xl font-bold font-heading text-slate-950 dark:text-white m-0">
                  {selectedArticle.title}
                </h2>
                <div className="text-xs text-amber-800 dark:text-amber-300 font-heading">
                  ✍️ ผู้เขียน: {selectedArticle.author} • ⏱️ เวลาอ่าน: {selectedArticle.readTimeMinutes} นาที
                </div>
              </div>

              <div className="text-xs md:text-sm text-slate-900 dark:text-gray-200 leading-relaxed font-body whitespace-pre-line space-y-3">
                {selectedArticle.fullContent}
              </div>

              <div className="pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-heading">
                <span className="text-slate-700 dark:text-gray-300">
                  สนใจทบทวนทำข้อสอบจริงเพื่อเตรียมสอบใบประกอบวิชาชีพ?
                </span>
                <button
                  onClick={() => onNavigate("exam")}
                  className="btn-emerald text-xs py-2 px-4 shrink-0"
                >
                  ✍️ ทดลองทำข้อสอบจริง ➔
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-400">เลือกบทความที่ต้องการอ่าน</div>
          )}
        </div>

      </div>

    </div>
  );
};
