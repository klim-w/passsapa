"use client";

import React, { useState } from "react";
import { SAMPLE_QUESTIONS, SAMPLE_NEWS, SAMPLE_PACKAGES } from "../../lib/constants";

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenPayment: (packageName: string, price: number) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenPayment }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "subjects" | "quiz" | "news" | "pricing" | "faq">("overview");

  // Demo Quiz State
  const demoQ = SAMPLE_QUESTIONS[0];
  const [selectedDemoOption, setSelectedDemoOption] = useState<string | null>(null);
  const [showDemoExplanation, setShowDemoExplanation] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDemoSelect = (optId: string) => {
    setSelectedDemoOption(optId);
    setShowDemoExplanation(true);
  };

  const faqs = [
    {
      q: "การสอบใบประกอบวิชาชีพแพทย์แผนไทย ประเภท ก มีวิชาใดบ้าง?",
      a: "การสอบแบ่งออกเป็น 5 วิชาหลัก ได้แก่ 1. วิชากฎหมายและจรรยาบรรณวิชาชีพ 2. สาขาเวชกรรมไทย 3. สาขาเภสัชกรรมไทย 4. สาขาผดุงครรภ์ไทย 5. สาขาการนวดไทย โดยเกณฑ์สอบผ่านภาคทฤษฎีคือ 60% ขึ้นไป"
    },
    {
      q: "หากชำระเงินแล้ว ระบบจะอนุมัติสิทธิ์เข้าใช้งาน VIP เมื่อไหร่?",
      a: "ระบบชำระเงินผ่าน PromptPay QR จะตรวจสอบสลิปและอนุมัติสิทธิ์ VIP ให้ทันทีภายใน 2 วินาที ตลอด 24 ชั่วโมง สามารถเข้าทำคลังข้อสอบย้อนหลังได้ทั้งหมดทันที"
    },
    {
      q: "สามารถเลือกซื้อติวเฉพาะวิชาที่ยังสอบไม่ผ่านได้หรือไม่?",
      a: "ได้ครับ! PassSapa มีแพ็กเกจยืดหยุ่นที่ให้คุณเลือกซื้อติวเฉพาะสาขาวิชาที่ต้องการ (เช่น ติวเฉพาะเวชกรรมไทย หรือ เภสัชกรรมไทย) ในระยะเวลา 1, 3 หรือ 6 เดือน"
    },
    {
      q: "ข้อสอบและเฉลยอ้างอิงจากตำราเล่มใดบ้าง?",
      a: "เฉลยทุกข้ออ้างอิงจากคัมภีร์หลักของสภาการแพทย์แผนไทย เช่น คัมภีร์ตักกศิลา, คัมภีร์ฉันทศาสตร์, คัมภีร์เวชศึกษา, คัมภีร์ธาตุวิภังค์, รสยา 9 รส และพระราชบัญญัติวิชาชีพ พ.ศ. 2556"
    }
  ];

  return (
    <div className="space-y-6 py-4 max-w-6xl mx-auto">
      
      {/* Clean Rounded-Full Tab Navigation Bar */}
      <div className="flex flex-wrap gap-1.5 bg-black/20 dark:bg-white/[0.02] p-1.5 rounded-full sticky top-16 z-40 backdrop-blur-md">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-1.5 rounded-full text-xs font-heading transition-all ${
            activeTab === "overview" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-gray-400 hover:text-white"
          }`}
        >
          📌 ภาพรวม (Overview)
        </button>
        <button
          onClick={() => setActiveTab("subjects")}
          className={`px-4 py-1.5 rounded-full text-xs font-heading transition-all ${
            activeTab === "subjects" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-gray-400 hover:text-white"
          }`}
        >
          🌿 5 สาขาวิชา
        </button>
        <button
          onClick={() => setActiveTab("quiz")}
          className={`px-4 py-1.5 rounded-full text-xs font-heading transition-all ${
            activeTab === "quiz" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-gray-400 hover:text-white"
          }`}
        >
          🧪 ทดลองทำข้อสอบ
        </button>
        <button
          onClick={() => setActiveTab("news")}
          className={`px-4 py-1.5 rounded-full text-xs font-heading transition-all ${
            activeTab === "news" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-gray-400 hover:text-white"
          }`}
        >
          📢 ข่าวสารสภาฯ
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`px-4 py-1.5 rounded-full text-xs font-heading transition-all ${
            activeTab === "pricing" ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold" : "text-slate-600 dark:text-gray-400 hover:text-white"
          }`}
        >
          💳 ราคาแพ็กเกจ
        </button>
        <button
          onClick={() => setActiveTab("faq")}
          className={`px-4 py-1.5 rounded-full text-xs font-heading transition-all ${
            activeTab === "faq" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold" : "text-slate-600 dark:text-gray-400 hover:text-white"
          }`}
        >
          ❓ คำถามพบบ่อย
        </button>
      </div>

      {/* 1. OVERVIEW TAB */}
      {(activeTab === "overview" || activeTab === "subjects") && (
        <div className="space-y-6">
          <section className="glass-panel-emerald p-6 md:p-10 space-y-4 rounded-3xl">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-heading">
                ⏱️ Countdown: อีก 45 วัน สู่วันสอบสภาการแพทย์แผนไทยครั้งถัดไป
              </div>

              <h1 className="text-2xl md:text-4xl font-bold font-heading leading-tight m-0">
                เตรียมสอบใบประกอบวิชาชีพ <br />
                <span className="bg-gradient-to-r from-emerald-600 to-amber-600 dark:from-emerald-400 dark:to-amber-300 bg-clip-text text-transparent">
                  แพทย์แผนไทย ประเภท ก
                </span> ให้พร้อมในรอบเดียว
              </h1>

              <p className="text-sm text-slate-600 dark:text-emerald-100/80 leading-relaxed m-0">
                คลังข้อสอบย้อนหลัง 5 วิชาหลัก เฉลยละเอียดอ้างอิงคัมภีร์สภาการแพทย์แผนไทย พร้อมระบบวิเคราะห์จุดอ่อนรายบุคคล
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <button onClick={() => onNavigate("exam")} className="btn-emerald text-sm py-2.5 px-6 rounded-full">
                  🚀 ทดลองทำข้อสอบฟรี
                </button>
                <button onClick={() => setActiveTab("pricing")} className="px-6 py-2.5 rounded-full bg-black/10 dark:bg-white/5 text-slate-700 dark:text-white font-heading text-sm hover:bg-black/20 dark:hover:bg-white/10 transition-all">
                  💎 ดูแพ็กเกจราคา
                </button>
              </div>
            </div>
          </section>

          {/* Stats Bar (Rounded-2XL Borderless Cards) */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">8,500+</div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-heading">คลังข้อสอบย้อนหลัง</div>
            </div>
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold font-heading text-amber-600 dark:text-amber-400">94.2%</div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-heading">ผู้เรียนสอบผ่าน (≥ 60%)</div>
            </div>
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold font-heading text-teal-600 dark:text-teal-300">5 วิชา</div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-heading">ครอบคลุมทุกสาขาสภาฯ</div>
            </div>
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-300">24 ชม.</div>
              <div className="text-xs text-slate-500 dark:text-gray-400 font-heading">อนุมัติ VIP อัตโนมัติ</div>
            </div>
          </section>
        </div>
      )}

      {/* 2. 5 SUBJECTS TAB */}
      {(activeTab === "overview" || activeTab === "subjects") && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2 m-0">
            🌿 ครอบคลุม 5 วิชาสอบสภาการแพทย์แผนไทย (ประเภท ก)
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div onClick={() => onNavigate("exam")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
                <img src="/images/icon_medicine.jpg" alt="เวชกรรมไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 className="font-heading font-semibold text-sm m-0">เวชกรรมไทย</h3>
              <p className="text-[11px] text-slate-500 dark:text-gray-400 m-0">ตักกศิลา ฉันทศาสตร์</p>
            </div>
            <div onClick={() => onNavigate("exam")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
                <img src="/images/icon_pharmacy.jpg" alt="เภสัชกรรมไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 className="font-heading font-semibold text-sm m-0">เภสัชกรรมไทย</h3>
              <p className="text-[11px] text-slate-500 dark:text-gray-400 m-0">รสยา 9 รส เภสัชวัตถุ</p>
            </div>
            <div onClick={() => onNavigate("exam")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
                <img src="/images/icon_midwifery.jpg" alt="ผดุงครรภ์ไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 className="font-heading font-semibold text-sm m-0">ผดุงครรภ์ไทย</h3>
              <p className="text-[11px] text-slate-500 dark:text-gray-400 m-0">ปฐมจินดารัตน์ ซาง</p>
            </div>
            <div onClick={() => onNavigate("exam")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
                <img src="/images/icon_massage.jpg" alt="นวดไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 className="font-heading font-semibold text-sm m-0">นวดไทย</h3>
              <p className="text-[11px] text-slate-500 dark:text-gray-400 m-0">เส้นประธานสิบ</p>
            </div>
            <div onClick={() => onNavigate("exam")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl col-span-2 md:col-span-1">
              <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
                <img src="/images/icon_law.jpg" alt="กฎหมายวิชาชีพ" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 className="font-heading font-semibold text-sm m-0">กฎหมายวิชาชีพ</h3>
              <p className="text-[11px] text-slate-500 dark:text-gray-400 m-0">พ.ร.บ. 2556 จรรยาบรรณ</p>
            </div>
          </div>
        </section>
      )}

      {/* 3. DEMO QUIZ TAB */}
      {(activeTab === "overview" || activeTab === "quiz") && (
        <section className="glass-panel-emerald p-6 space-y-4 rounded-3xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
              🧪 ทดลองทำข้อสอบจริง 1 ข้อ (Interactive Demo)
            </span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-heading">
              {demoQ.category} • {demoQ.scriptureRef}
            </span>
          </div>

          <p className="text-base font-medium leading-relaxed m-0">
            {demoQ.questionText}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {demoQ.options.map(opt => {
              const isSelected = selectedDemoOption === opt.id;
              const isCorrect = opt.id === demoQ.correctOptionId;

              let btnStyle = "bg-black/5 dark:bg-white/5 hover:bg-emerald-500/10 text-slate-800 dark:text-gray-200 rounded-2xl";
              if (isSelected) {
                btnStyle = isCorrect
                  ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold rounded-2xl"
                  : "bg-red-500/20 text-red-800 dark:text-red-300 rounded-2xl";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleDemoSelect(opt.id)}
                  className={`p-3.5 rounded-2xl text-left flex items-center gap-3 transition-all ${btnStyle}`}
                >
                  <span className="w-7 h-7 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold font-heading text-xs">
                    {opt.id.toUpperCase()}
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {showDemoExplanation && (
            <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-900 dark:text-amber-100 text-sm space-y-2">
              <div className="font-heading font-bold text-amber-800 dark:text-amber-300">
                💡 เฉลยรายละเอียดอ้างอิงตำราสภาการแพทย์แผนไทย:
              </div>
              <p className="text-xs leading-relaxed m-0">{demoQ.explanation}</p>
            </div>
          )}
        </section>
      )}

      {/* 4. NEWS TAB */}
      {(activeTab === "news") && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading m-0">📢 ข่าวสารและประกาศผลสอบสภาการแพทย์แผนไทย</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_NEWS.map(news => (
              <div key={news.id} className="glass-panel p-5 space-y-3 rounded-2xl">
                <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-heading">
                  {news.category}
                </span>
                <h3 className="font-heading font-semibold text-sm m-0">{news.title}</h3>
                <p className="text-xs text-slate-500 dark:text-gray-300/80 m-0">{news.summary}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PRICING TAB */}
      {(activeTab === "overview" || activeTab === "pricing") && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-center m-0">💳 เลือกแพ็กเกจติวสอบ PassSapa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAMPLE_PACKAGES.map(pkg => (
              <div key={pkg.id} className="glass-panel p-6 space-y-3 relative rounded-3xl">
                {pkg.badge && (
                  <span className="absolute -top-2.5 left-4 bg-amber-500 text-black text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                    {pkg.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold font-heading m-0">{pkg.name}</h3>
                <div className="text-2xl font-bold font-heading text-emerald-600 dark:text-emerald-400">฿{pkg.price}</div>
                <p className="text-xs text-slate-500 dark:text-gray-400 m-0">{pkg.subjectCategory}</p>
                <button onClick={() => onOpenPayment(pkg.name, pkg.price)} className="btn-emerald text-xs w-full justify-center mt-2 py-2.5">
                  สมัครใช้งาน PromptPay ➔
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. FAQ TAB */}
      {(activeTab === "faq") && (
        <section className="glass-panel p-6 space-y-4 rounded-3xl">
          <h2 className="text-xl font-bold font-heading text-center m-0">❓ คำถามที่พบบ่อย (FAQ)</h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-4 space-y-1 rounded-2xl">
                <div className="font-heading font-semibold text-sm">{faq.q}</div>
                <div className="text-xs text-slate-500 dark:text-gray-300">{faq.a}</div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
