"use client";

import React, { useState } from "react";
import { SAMPLE_QUESTIONS, SAMPLE_KNOWLEDGE_ARTICLES, SAMPLE_NEWS, SAMPLE_SUBJECTS } from "../../lib/constants";
import { QuestionItem, SubjectCategory, QuestionType, ExamPart } from "../../lib/types";

export const AdminPortal: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<"overview" | "users" | "questions" | "knowledge" | "audit">("overview");

  // State: Sample Users for Admin Management
  const [users, setUsers] = useState([
    { id: "u1", name: "คุณหมอสมชาย ใจดี", phone: "081-234-5678", email: "somchai@med.com", plan: "สมาชิกทั่วไป", readiness: 78, joinDate: "15 ก.ค. 2026", status: "ACTIVE" },
    { id: "u2", name: "คุณหมอนภา สุขใจ", phone: "089-876-5432", email: "napha@med.com", plan: "VIP Member ⭐", readiness: 92, joinDate: "20 ก.ค. 2026", status: "ACTIVE" },
    { id: "u3", name: "คุณหมอวิชัย มีสุข", phone: "086-555-4321", email: "wichai@med.com", plan: "สมาชิกทั่วไป", readiness: 65, joinDate: "25 ก.ค. 2026", status: "ACTIVE" },
    { id: "u4", name: "คุณหมออารี รัตนะ", phone: "082-111-2233", email: "aree@med.com", plan: "VIP Member ⭐", readiness: 88, joinDate: "01 ส.ค. 2026", status: "ACTIVE" }
  ]);

  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [selectedUserDetail, setSelectedUserDetail] = useState<any | null>(null);

  // State: Questions
  const [questions, setQuestions] = useState<QuestionItem[]>(SAMPLE_QUESTIONS);
  const [qSearchQuery, setQSearchQuery] = useState("");
  const [qFilterSubject, setQFilterSubject] = useState<string>("ALL");

  // State: New Question Form
  const [newQSubject, setNewQSubject] = useState<SubjectCategory>("เวชกรรมไทย");
  const [newQPart, setNewQPart] = useState<ExamPart>("theory");
  const [newQType, setNewQType] = useState<QuestionType>("mcq_5");
  const [newQScripture, setNewQScripture] = useState("คัมภีร์ตักกศิลา");
  const [newQText, setNewQText] = useState("");
  const [newQExplanation, setNewQExplanation] = useState("");

  // State: Excel Import Simulation
  const [importSuccess, setImportSuccess] = useState(false);

  // State: PromptPay & Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { id: "log1", timestamp: "05 ส.ค. 2026 10:20", admin: "Admin System", action: "🔓 อนุมัติสิทธิ์ VIP ด่วนให้ คุณหมอสมชาย ใจดี (แพ็กเกจ 3 เดือน)", type: "VIP_GRANT" },
    { id: "log2", timestamp: "05 ส.ค. 2026 09:15", admin: "Admin System", action: "✍️ เพิ่มข้อสอบใหม่ในสาขา เวชกรรมไทย (ปรนัย 5 ตัวเลือก)", type: "QUESTION_ADD" },
    { id: "log3", timestamp: "04 ส.ค. 2026 14:05", admin: "Admin System", action: "🔑 รีเซ็ตรหัสผ่านให้ คุณหมอวิชัย มีสุข", type: "PASSWORD_RESET" }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showAdminToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // User Actions
  const handleInstantGrantVIP = (userId: string, userName: string, durationMonths: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan: `VIP Member (${durationMonths} เดือน) ⭐` } : u));
    const newLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      admin: "Admin System",
      action: `🔓 อนุมัติสิทธิ์ VIP ด่วน (${durationMonths} เดือน) ให้ ${userName}`,
      type: "VIP_GRANT"
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showAdminToast(`⚡ อนุมัติสิทธิ์ VIP (${durationMonths} เดือน) ให้ ${userName} เรียบร้อยแล้ว!`);
  };

  const handleResetExamHistory = (userName: string) => {
    showAdminToast(`🔄 รีเซ็ตประวัติการทำข้อสอบของ ${userName} เรียบร้อยแล้ว!`);
  };

  const handleUnlockPassword = (userName: string) => {
    showAdminToast(`🔑 ส่งลิงก์ปลดล็อกและรีเซ็ตรหัสผ่านให้ ${userName} ทางอีเมลแล้ว!`);
  };

  // Add Question Action
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText.trim()) return;

    const newQ: QuestionItem = {
      id: `q_custom_${Date.now()}`,
      category: newQSubject,
      examPart: newQPart,
      questionType: newQType,
      scriptureRef: newQScripture,
      questionText: newQText,
      options: newQType === "mcq_5" ? [
        { id: "a", text: "ตัวเลือก A" },
        { id: "b", text: "ตัวเลือก B" },
        { id: "c", text: "ตัวเลือก C" },
        { id: "d", text: "ตัวเลือก D" },
        { id: "e", text: "ตัวเลือก E" },
      ] : undefined,
      correctOptionId: newQType === "mcq_5" ? "a" : undefined,
      correctAnswerText: newQType === "fill_in_blank" ? "คำเฉลยเติมคำ" : undefined,
      subjectiveRubric: newQType === "subjective" ? "แนวทางคำตอบอัตนัย" : undefined,
      explanation: newQExplanation || "คำอธิบายเฉลยอ้างอิงคัมภีร์สภาฯ"
    };

    setQuestions(prev => [newQ, ...prev]);
    setNewQText("");
    setNewQExplanation("");
    showAdminToast(`✅ เพิ่มข้อสอบใหม่ลงคลัง (${newQSubject} - ${newQType}) เรียบร้อยแล้ว!`);
  };

  const filteredUsers = users.filter(u => 
    u.name.includes(userSearchQuery) || u.phone.includes(userSearchQuery) || u.email.includes(userSearchQuery)
  );

  const filteredQuestions = questions.filter(q => {
    const matchQuery = q.questionText.includes(qSearchQuery) || q.scriptureRef.includes(qSearchQuery);
    const matchSubject = qFilterSubject === "ALL" || q.category === qFilterSubject;
    return matchQuery && matchSubject;
  });

  return (
    <div className="space-y-6 py-4 max-w-6xl mx-auto">
      
      {/* Admin Top Header Banner */}
      <div className="glass-panel-emerald p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-heading font-bold">
            ⚙️ ระบบผู้ดูแลหลังบ้าน (PassSapa Admin Portal - v1.9.0)
          </span>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-slate-950 dark:text-white mt-2 m-0">
            ศูนย์ควบคุมระบบ, จัดการผู้ใช้ & คลังข้อสอบผัง T2
          </h1>
        </div>

        {toastMessage && (
          <div className="bg-emerald-500 text-black px-4 py-2 rounded-2xl font-heading text-xs font-bold animate-fadeIn shadow-lg">
            {toastMessage}
          </div>
        )}
      </div>

      {/* Admin 5 Main Navigation Tabs */}
      <div className="glass-panel p-2 rounded-2xl flex flex-wrap gap-2 text-xs font-heading">
        {[
          { id: "overview", label: "📊 1. ภาพรวมระบบ" },
          { id: "users", label: "👥 2. จัดการผู้ใช้ & สิทธิ์ VIP" },
          { id: "questions", label: "✍️ 3. จัดการคลังข้อสอบ T2" },
          { id: "knowledge", label: "📚 4. องค์ความรู้ & ข่าวสาร" },
          { id: "audit", label: "🛠️ 5. ประวัติการซัพพอร์ต & Audit" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`flex-1 py-2.5 px-4 rounded-xl transition-all font-semibold text-center shrink-0 ${
              activeAdminTab === tab.id
                ? "bg-emerald-800/20 text-emerald-950 dark:text-emerald-300 border border-emerald-500/40 font-bold shadow-sm"
                : "text-slate-700 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MODULE 1: 📊 Executive Overview */}
      {activeAdminTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-xs text-gray-400 font-heading font-medium">สมาชิกทั้งหมด</div>
              <div className="text-2xl font-bold font-heading text-emerald-800 dark:text-emerald-400 mt-1">1,248 คน</div>
            </div>
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-xs text-gray-400 font-heading font-medium">VIP Active</div>
              <div className="text-2xl font-bold font-heading text-amber-800 dark:text-amber-400 mt-1">842 คน</div>
            </div>
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-xs text-gray-400 font-heading font-medium">รายได้รวม PromptPay</div>
              <div className="text-2xl font-bold font-heading text-teal-800 dark:text-teal-300 mt-1">฿412,580</div>
            </div>
            <div className="glass-panel p-4 text-center rounded-2xl">
              <div className="text-xs text-gray-400 font-heading font-medium">อัตราสอบผ่านสภาฯ</div>
              <div className="text-2xl font-bold font-heading text-emerald-800 dark:text-emerald-300 mt-1">94.2%</div>
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="glass-panel-emerald p-6 space-y-4 rounded-3xl">
            <h2 className="text-base font-bold font-heading text-slate-950 dark:text-white m-0 flex items-center gap-2">
              📡 Real-time System Activity Feed (สถานการณ์ใช้งานสด)
            </h2>
            <div className="space-y-2 text-xs font-body">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-gray-300">
                <span>🎉 สมาชิกใหม่ **คุณหมอนภา สุขใจ** ชำระเงินผ่าน PromptPay ฿490 อนุมัติสิทธิ์ VIP 3 เดือนแล้ว</span>
                <span className="text-[10px] text-gray-400 font-mono">เมื่อครู่นี้</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center text-gray-300">
                <span>📜 **คุณหมอสมชาย ใจดี** ทำข้อสอบผ่านเกณฑ์ 78% และดาวน์โหลดใบรับรอง PDF Readiness Certificate</span>
                <span className="text-[10px] text-gray-400 font-mono">5 นาทีที่แล้ว</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: 👥 User & VIP Support Center */}
      {activeAdminTab === "users" && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="relative flex-1 w-full">
              <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="ค้นหาผู้ใช้งานตามชื่อ, อีเมล หรือเบอร์โทรศัพท์..."
                value={userSearchQuery}
                onChange={e => setUserSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-heading"
              />
            </div>
            <span className="text-xs text-slate-700 dark:text-gray-400 font-heading font-medium shrink-0">
              พบ {filteredUsers.length} รายชื่อ
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-white/10 glass-panel">
            <table className="w-full text-left text-xs text-slate-900 dark:text-gray-300 font-body">
              <thead className="bg-slate-100 dark:bg-white/5 font-heading text-emerald-800 dark:text-emerald-300">
                <tr>
                  <th className="p-3.5">ชื่อ-นามสกุล</th>
                  <th className="p-3.5">การติดต่อ</th>
                  <th className="p-3.5">สถานะสิทธิ์</th>
                  <th className="p-3.5">ความพร้อม</th>
                  <th className="p-3.5 text-right">ปุ่มแก้ปัญหาด่วน (Instant Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-white/5">
                    <td className="p-3.5 font-heading font-bold text-slate-950 dark:text-white">{u.name}</td>
                    <td className="p-3.5 text-slate-600 dark:text-gray-400">{u.phone}<br />{u.email}</td>
                    <td className="p-3.5 font-heading font-semibold text-emerald-700 dark:text-emerald-400">{u.plan}</td>
                    <td className="p-3.5 font-heading font-bold text-amber-800 dark:text-amber-300">{u.readiness}%</td>
                    <td className="p-3.5 text-right space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleInstantGrantVIP(u.id, u.name, 3)}
                        className="btn-emerald text-[11px] py-1 px-3"
                        title="อนุมัติ VIP ด่วน 3 เดือน"
                      >
                        ⚡ อนุมัติ VIP 3 เดือน
                      </button>
                      <button
                        onClick={() => handleResetExamHistory(u.name)}
                        className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-500/40 text-[11px] font-heading font-semibold hover:bg-amber-500/30"
                      >
                        🔄 รีเซ็ตข้อสอบ
                      </button>
                      <button
                        onClick={() => handleUnlockPassword(u.name)}
                        className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-gray-300 text-[11px] font-heading font-semibold hover:bg-slate-300 dark:hover:bg-white/20"
                      >
                        🔑 ปลดล็อกบัญชี
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 3: ✍️ Question Bank & Scripture Manager (T2 Diagram) */}
      {activeAdminTab === "questions" && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <form onSubmit={handleAddQuestion} className="glass-panel-emerald p-6 rounded-3xl space-y-4">
            <h2 className="text-base font-bold font-heading text-slate-950 dark:text-white m-0 flex items-center gap-2">
              ➕ สร้างข้อสอบใหม่เข้าคลัง (ผังใหม่ T2)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-heading">
              <div>
                <label className="block text-slate-700 dark:text-gray-300 font-medium mb-1">สาขาวิชา</label>
                <select
                  value={newQSubject}
                  onChange={e => setNewQSubject(e.target.value as any)}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white"
                >
                  {SAMPLE_SUBJECTS.map(s => <option key={s.id} value={s.name} className="bg-slate-900 text-white">{s.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-gray-300 font-medium mb-1">ภาคการสอบ</label>
                <select
                  value={newQPart}
                  onChange={e => setNewQPart(e.target.value as any)}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white"
                >
                  <option value="theory" className="bg-slate-900 text-white">📘 ภาคทฤษฎี (เวช 1/2)</option>
                  <option value="practical" className="bg-slate-900 text-white">🛠️ ภาคปฏิบัติ</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-gray-300 font-medium mb-1">รูปแบบข้อสอบ (T2)</label>
                <select
                  value={newQType}
                  onChange={e => setNewQType(e.target.value as any)}
                  className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white"
                >
                  <option value="mcq_5" className="bg-slate-900 text-white">🔘 ปรนัย 5 ตัวเลือก (A-E)</option>
                  <option value="fill_in_blank" className="bg-slate-900 text-white">📝 เติมคำในช่องว่าง</option>
                  <option value="subjective" className="bg-slate-900 text-white">✍️ อัตนัย (บรรยาย)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="ชื่อคัมภีร์อ้างอิง (เช่น คัมภีร์ตักกศิลา, รสยา 9 รส)..."
                value={newQScripture}
                onChange={e => setNewQScripture(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl p-2.5 text-slate-900 dark:text-white font-heading"
              />
              <textarea
                rows={2}
                placeholder="พิมพ์โจทย์คำถามที่นี่..."
                value={newQText}
                onChange={e => setNewQText(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl p-3 text-slate-900 dark:text-white font-body"
              />
              <textarea
                rows={2}
                placeholder="คำอธิบายเฉลยอ้างอิงตำราสภาฯ..."
                value={newQExplanation}
                onChange={e => setNewQExplanation(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl p-3 text-slate-900 dark:text-white font-body"
              />
            </div>

            <button type="submit" className="btn-emerald text-xs py-2.5 px-6 font-heading">
              💾 บันทึกข้อสอบลงคลัง DB ➔
            </button>
          </form>

          {/* Question List Table */}
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-white/10 glass-panel p-4">
            <h3 className="font-heading font-bold text-xs text-slate-950 dark:text-white mb-3">
              รายการข้อสอบในคลังฐานข้อมูล ({filteredQuestions.length} ข้อ)
            </h3>
            <table className="w-full text-left text-xs text-slate-900 dark:text-gray-300 font-body">
              <thead className="bg-slate-100 dark:bg-white/5 font-heading text-emerald-800 dark:text-emerald-300">
                <tr>
                  <th className="p-3">สาขาวิชา</th>
                  <th className="p-3">ประเภทข้อสอบ</th>
                  <th className="p-3">คัมภีร์อ้างอิง</th>
                  <th className="p-3">โจทย์คำถาม</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {filteredQuestions.map(q => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-white/5">
                    <td className="p-3 font-heading font-bold text-slate-950 dark:text-white">{q.category}</td>
                    <td className="p-3 font-heading text-amber-800 dark:text-amber-400">
                      {q.questionType === "mcq_5" ? "ปรนัย 5 ตัวเลือก" : q.questionType === "fill_in_blank" ? "เติมคำ" : "อัตนัย"}
                    </td>
                    <td className="p-3 text-emerald-700 dark:text-emerald-400">{q.scriptureRef}</td>
                    <td className="p-3 truncate max-w-md">{q.questionText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 4: 📚 Knowledge Base & News Editor */}
      {activeAdminTab === "knowledge" && (
        <div className="glass-panel p-6 space-y-4 rounded-3xl">
          <h2 className="text-base font-bold font-heading text-slate-950 dark:text-white m-0">
            📚 จัดการบทความองค์ความรู้ & ข่าวสารสภาฯ
          </h2>
          <div className="space-y-2">
            {SAMPLE_KNOWLEDGE_ARTICLES.map(art => (
              <div key={art.id} className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex justify-between items-center text-xs">
                <div>
                  <div className="font-heading font-bold text-slate-950 dark:text-white">{art.title}</div>
                  <div className="text-slate-600 dark:text-gray-400 font-heading">{art.category} • เผยแพร่เมื่อ {art.publishedDate}</div>
                </div>
                <button className="px-3 py-1 rounded-full bg-emerald-800/15 text-emerald-900 dark:text-emerald-300 font-heading font-semibold">
                  ✏️ แก้ไขบทความ
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: 🛠️ Support Audit Trail & PromptPay Logs */}
      {activeAdminTab === "audit" && (
        <div className="glass-panel p-6 space-y-4 rounded-3xl">
          <h2 className="text-base font-bold font-heading text-slate-950 dark:text-white m-0">
            🛠️ ประวัติการทำงาน Admin & PromptPay Audit Logs
          </h2>
          <div className="space-y-2">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex justify-between items-center text-xs font-body">
                <div>
                  <span className="font-heading font-bold text-emerald-800 dark:text-emerald-400">[{log.admin}]</span>{" "}
                  <span className="text-slate-900 dark:text-gray-200">{log.action}</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
