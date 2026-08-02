"use client";

import React, { useState } from "react";
import { SAMPLE_QUESTIONS, SAMPLE_NEWS, SAMPLE_PACKAGES, SAMPLE_KNOWLEDGE_ARTICLES } from "../../lib/constants";

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onOpenPayment: (packageName: string, price: number) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenPayment }) => {
  // Demo Quiz State
  const demoQ = SAMPLE_QUESTIONS[0];
  const [selectedDemoOption, setSelectedDemoOption] = useState<string | null>(null);
  const [showDemoExplanation, setShowDemoExplanation] = useState(false);

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
    <div className="space-y-10 py-6 max-w-6xl mx-auto">
      
      {/* SECTION 1: HERO & STATS */}
      <div className="space-y-6">
        <section className="glass-panel-emerald p-6 md:p-10 space-y-4 rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-700/15 text-amber-900 dark:text-amber-300 text-xs font-heading font-semibold">
              ⏱️ Countdown: อีก 45 วัน สู่วันสอบสภาการแพทย์แผนไทยครั้งถัดไป
            </div>

            <h1 className="text-2xl md:text-4xl font-bold font-heading leading-tight m-0 text-slate-950 dark:text-white">
              เตรียมสอบใบประกอบวิชาชีพ <br />
              <span className="bg-gradient-to-r from-emerald-800 via-teal-800 to-amber-800 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
                แพทย์แผนไทย ประเภท ก
              </span> ให้พร้อมในรอบเดียว
            </h1>

            <p className="text-sm text-slate-800 dark:text-emerald-100/80 leading-relaxed m-0 font-normal">
              คลังข้อสอบย้อนหลัง 5 วิชาหลัก เฉลยรายละเอียดอ้างอิงคัมภีร์สภาการแพทย์แผนไทย พร้อมระบบวิเคราะห์จุดอ่อนรายบุคคล
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button onClick={() => onNavigate("exam")} className="btn-emerald text-sm py-2.5 px-6 rounded-full shadow-lg">
                🚀 ทดลองทำข้อสอบฟรี
              </button>
              <button onClick={() => onNavigate("knowledge")} className="px-6 py-2.5 rounded-full bg-emerald-900/10 dark:bg-white/5 text-slate-900 dark:text-white font-heading text-sm hover:bg-emerald-900/20 dark:hover:bg-white/10 transition-all font-semibold border border-emerald-900/15 dark:border-white/10 inline-flex items-center gap-1.5">
                📚 องค์ความรู้แพทย์แผนไทย
              </button>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-panel p-4 text-center rounded-2xl">
            <div className="text-2xl font-bold font-heading text-emerald-800 dark:text-emerald-400">8,500+</div>
            <div className="text-xs text-slate-700 dark:text-gray-400 font-heading font-medium">คลังข้อสอบย้อนหลัง</div>
          </div>
          <div className="glass-panel p-4 text-center rounded-2xl">
            <div className="text-2xl font-bold font-heading text-amber-800 dark:text-amber-400">94.2%</div>
            <div className="text-xs text-slate-700 dark:text-gray-400 font-heading font-medium">ผู้เรียนสอบผ่าน (≥ 60%)</div>
          </div>
          <div className="glass-panel p-4 text-center rounded-2xl">
            <div className="text-2xl font-bold font-heading text-teal-800 dark:text-teal-300">5 วิชา</div>
            <div className="text-xs text-slate-700 dark:text-gray-400 font-heading font-medium">ครอบคลุมทุกสาขาสภาฯ</div>
          </div>
          <div className="glass-panel p-4 text-center rounded-2xl">
            <div className="text-2xl font-bold font-heading text-emerald-800 dark:text-emerald-300">24 ชม.</div>
            <div className="text-xs text-slate-700 dark:text-gray-400 font-heading font-medium">อนุมัติ VIP อัตโนมัติ</div>
          </div>
        </section>
      </div>

      {/* SECTION 2: องค์ความรู้แพทย์แผนไทย (Public Knowledge Highlights - ตามผัง T1) */}
      <section id="knowledge-section" className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold font-heading flex items-center gap-2 m-0 text-slate-950 dark:text-white">
            📚 องค์ความรู้แพทย์แผนไทย (เปิดอ่านฟรี)
          </h2>
          <button
            onClick={() => onNavigate("knowledge")}
            className="text-xs font-heading font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            ดูบทความทั้งหมด ➔
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_KNOWLEDGE_ARTICLES.map(art => (
            <div
              key={art.id}
              onClick={() => onNavigate("knowledge")}
              className="glass-panel p-5 space-y-3 rounded-2xl cursor-pointer hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold">
                  {art.category}
                </span>
                <span className="text-[10px] text-gray-400">⏱️ {art.readTimeMinutes} นาที</span>
              </div>
              <h3 className="font-heading font-semibold text-sm m-0 text-slate-900 dark:text-white leading-snug">
                {art.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-gray-300/80 m-0 font-medium line-clamp-2">
                {art.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: 5 SUBJECTS */}
      <section id="subjects-section" className="space-y-4 pt-2">
        <h2 className="text-xl font-bold font-heading flex items-center gap-2 m-0 text-slate-950 dark:text-white">
          🌿 ครอบคลุม 5 วิชาสอบสภาการแพทย์แผนไทย (ประเภท ก)
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div onClick={() => onNavigate("branch-hub")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
              <img src="/images/icon_medicine.jpg" alt="เวชกรรมไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 className="font-heading font-semibold text-sm m-0 text-slate-900 dark:text-white">เวชกรรมไทย</h3>
            <p className="text-[11px] text-slate-700 dark:text-gray-400 m-0 font-medium">ตักกศิลา ฉันทศาสตร์</p>
          </div>
          <div onClick={() => onNavigate("branch-hub")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
              <img src="/images/icon_pharmacy.jpg" alt="เภสัชกรรมไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 className="font-heading font-semibold text-sm m-0 text-slate-900 dark:text-white">เภสัชกรรมไทย</h3>
            <p className="text-[11px] text-slate-700 dark:text-gray-400 m-0 font-medium">รสยา 9 รส เภสัชวัตถุ</p>
          </div>
          <div onClick={() => onNavigate("branch-hub")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
              <img src="/images/icon_midwifery.jpg" alt="ผดุงครรภ์ไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 className="font-heading font-semibold text-sm m-0 text-slate-900 dark:text-white">ผดุงครรภ์ไทย</h3>
            <p className="text-[11px] text-slate-700 dark:text-gray-400 m-0 font-medium">ปฐมจินดารัตน์ ซาง</p>
          </div>
          <div onClick={() => onNavigate("branch-hub")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
              <img src="/images/icon_massage.jpg" alt="นวดไทย" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 className="font-heading font-semibold text-sm m-0 text-slate-900 dark:text-white">นวดไทย</h3>
            <p className="text-[11px] text-slate-700 dark:text-gray-400 m-0 font-medium">เส้นประธานสิบ</p>
          </div>
          <div onClick={() => onNavigate("branch-hub")} className="glass-panel-emerald p-4 text-center space-y-2 cursor-pointer hover:-translate-y-1 transition-all rounded-2xl col-span-2 md:col-span-1">
            <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-sm">
              <img src="/images/icon_law.jpg" alt="กฎหมายวิชาชีพ" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h3 className="font-heading font-semibold text-sm m-0 text-slate-900 dark:text-white">กฎหมายวิชาชีพ</h3>
            <p className="text-[11px] text-slate-700 dark:text-gray-400 m-0 font-medium">พ.ร.บ. 2556 จรรยาบรรณ</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: ตัวอย่างแนวข้อสอบ (DEMO QUIZ - ตามผัง T1) */}
      <section id="demo-quiz-section" className="glass-panel-emerald p-6 space-y-4 rounded-3xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-heading bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-3 py-1 rounded-full font-semibold">
            🧪 ตัวอย่างแนวข้อสอบจริง (Interactive Demo)
          </span>
          <span className="text-xs text-amber-800 dark:text-amber-400 font-heading font-semibold">
            {demoQ.category} • {demoQ.scriptureRef}
          </span>
        </div>

        <p className="text-base font-semibold leading-relaxed m-0 text-slate-950 dark:text-white">
          {demoQ.questionText}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          {demoQ.options?.map(opt => {
            const isSelected = selectedDemoOption === opt.id;
            const isCorrect = opt.id === demoQ.correctOptionId;

            let btnStyle = "bg-slate-100 dark:bg-white/5 hover:bg-emerald-800/10 text-slate-900 dark:text-gray-200 border border-slate-200 dark:border-white/10 rounded-2xl";
            if (isSelected) {
              btnStyle = isCorrect
                ? "bg-emerald-800/15 text-emerald-950 dark:text-emerald-300 font-bold border border-emerald-800/40 rounded-2xl"
                : "bg-red-500/20 text-red-900 dark:text-red-300 border border-red-500/40 rounded-2xl";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleDemoSelect(opt.id)}
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

        {showDemoExplanation && (
          <div className="p-4 rounded-2xl bg-amber-700/10 text-amber-950 dark:text-amber-100 text-sm space-y-2 border border-amber-700/20">
            <div className="font-heading font-bold text-amber-900 dark:text-amber-300">
              💡 เฉลยรายละเอียดอ้างอิงตำราสภาการแพทย์แผนไทย:
            </div>
            <p className="text-xs leading-relaxed m-0 font-medium">{demoQ.explanation}</p>
          </div>
        )}
      </section>

      {/* SECTION 5: NEWS */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold font-heading m-0 text-slate-950 dark:text-white">📢 ข่าวสารและประกาศผลสอบสภาการแพทย์แผนไทย</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_NEWS.map(news => (
            <div key={news.id} className="glass-panel p-5 space-y-3 rounded-2xl">
              <span className="bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold">
                {news.category}
              </span>
              <h3 className="font-heading font-semibold text-sm m-0 text-slate-900 dark:text-white">{news.title}</h3>
              <p className="text-xs text-slate-700 dark:text-gray-300/80 m-0 font-medium">{news.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: PRICING SECTION */}
      <section id="pricing-section" className="space-y-4 pt-4">
        <h2 className="text-xl font-bold font-heading text-center m-0 text-slate-950 dark:text-white">💳 เลือกแพ็กเกจติวสอบ PassSapa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SAMPLE_PACKAGES.map(pkg => (
            <div key={pkg.id} className="glass-panel p-6 space-y-3 relative rounded-3xl">
              {pkg.badge && (
                <span className="absolute -top-2.5 left-4 bg-amber-500 text-black text-[10px] font-bold px-3 py-0.5 rounded-full shadow-sm">
                  {pkg.badge}
                </span>
              )}
              <h3 className="text-lg font-bold font-heading m-0 text-slate-950 dark:text-white">{pkg.name}</h3>
              <div className="text-2xl font-bold font-heading text-emerald-800 dark:text-emerald-400">฿{pkg.price}</div>
              <p className="text-xs text-slate-700 dark:text-gray-400 m-0 font-medium">{pkg.subjectCategory}</p>
              <button onClick={() => onOpenPayment(pkg.name, pkg.price)} className="btn-emerald text-xs w-full justify-center mt-2 py-2.5">
                สมัครใช้งาน PromptPay ➔
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="glass-panel p-6 space-y-4 rounded-3xl">
        <h2 className="text-xl font-bold font-heading text-center m-0 text-slate-950 dark:text-white">❓ คำถามที่พบบ่อย (FAQ)</h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-panel p-4 space-y-1 rounded-2xl">
              <div className="font-heading font-semibold text-sm text-slate-900 dark:text-white">{faq.q}</div>
              <div className="text-xs text-slate-700 dark:text-gray-300 font-medium">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
