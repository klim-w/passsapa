"use client";

import React, { useState } from "react";

interface UserProfileModalProps {
  isOpen: boolean;
  userName: string;
  userPlan: string;
  onClose: () => void;
  onLogout: () => void;
  onUpdateName: (newName: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  userName,
  userPlan,
  onClose,
  onLogout,
  onUpdateName,
}) => {
  const [nameInput, setNameInput] = useState(userName || "คุณหมอแพทย์แผนไทย");
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateName(nameInput);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Box Container */}
      <div 
        className="p-6 md:p-8 max-w-md w-full space-y-6 relative rounded-2xl shadow-2xl transition-colors"
        style={{
          backgroundColor: "var(--bg-surface, #0f1917)",
          border: "2px solid rgba(16, 185, 129, 0.5)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.25)"
        }}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10"
        >
          ✕
        </button>

        {/* Header Profile Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-3xl shadow-lg">
            👤
          </div>
          <h2 className="text-xl font-bold font-heading text-white">
            โปรไฟล์ผู้เรียน (Student Profile)
          </h2>
          <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-heading font-bold">
            สถานะสิทธิ์: {userPlan}
          </span>
        </div>

        {/* Profile Info Details */}
        <div className="space-y-4 text-sm font-heading">
          
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>ชื่อผู้ใช้งาน</span>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="text-emerald-400 hover:underline"
                >
                  ✏️ แก้ไขชื่อ
                </button>
              ) : (
                <button 
                  onClick={handleSave}
                  className="text-amber-300 font-bold hover:underline"
                >
                  💾 บันทึก
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="text-white font-bold text-base">{userName || "คุณหมอแพทย์แผนไทย"}</div>
            ) : (
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-black/60 border border-emerald-500 text-white outline-none"
              />
            )}
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>อีเมลบัญชี:</span>
              <span className="text-white font-mono">doctor@passsapa.com</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>สาขาติวหลัก:</span>
              <span className="text-emerald-300 font-bold">เวชกรรมไทย & เภสัชกรรมไทย</span>
            </div>
            <div className="flex justify-between pt-1">
              <span>อายุสิทธิ์ VIP:</span>
              <span className="text-amber-300 font-bold">ใช้งานได้ 30 วัน</span>
            </div>
          </div>

        </div>

        {/* Action Buttons: Save & Logout */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onLogout}
            className="w-full py-3 rounded-xl border border-red-500/50 bg-red-500/15 hover:bg-red-500/25 text-red-300 text-sm font-heading font-bold transition-all flex items-center justify-center gap-2 shadow-md"
          >
            🚪 ออกจากระบบ (Logout)
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-heading"
          >
            ปิดหน้าต่างนี้
          </button>
        </div>

      </div>
    </div>
  );
};
