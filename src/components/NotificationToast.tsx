"use client";

import React from "react";

interface NotificationToastProps {
  isOpen: boolean;
  title?: string;
  message: string;
  icon?: string;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  isOpen,
  title = "การแจ้งเตือนจากระบบ PassSapa",
  message,
  icon = "✨",
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Centered Sleek Notification Box Container */}
      <div 
        className="p-6 max-w-sm w-full space-y-4 relative rounded-3xl shadow-2xl transition-all text-center"
        style={{
          backgroundColor: "var(--bg-surface, #0c1412)",
          border: "2px solid rgba(16, 185, 129, 0.4)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.25)"
        }}
      >
        {/* Glow Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-2xl shadow-lg">
          {icon}
        </div>

        {/* Notification Title & Message */}
        <div className="space-y-1">
          <h3 className="text-base font-bold font-heading text-slate-950 dark:text-white m-0">
            {title}
          </h3>
          <p className="text-xs text-slate-700 dark:text-emerald-100/90 leading-relaxed font-medium m-0">
            {message}
          </p>
        </div>

        {/* Custom Styled Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="btn-emerald text-xs w-full justify-center py-2.5 shadow-md"
          >
            ตกลง (OK)
          </button>
        </div>

      </div>
    </div>
  );
};
