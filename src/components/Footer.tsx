"use client";

import React from "react";

export const Footer: React.FC = () => {
  const currentVersion = "v1.3.0-beta";

  return (
    <footer className="border-t border-emerald-500/20 bg-emerald-950/40 dark:bg-black/60 py-8 px-4 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-heading">
        
        <div className="flex items-center gap-3">
          <span className="font-bold text-emerald-400 text-sm">PassSapa</span>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-mono text-[11px]">
            {currentVersion}
          </span>
          <span>© 2026 ระบบคลังข้อสอบและประเมินผลการสอบสภาการแพทย์แผนไทย (ประเภท ก)</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-emerald-300 transition-colors">เงื่อนไขการใช้งาน</a>
          <a href="#" className="hover:text-emerald-300 transition-colors">นโยบายความเป็นส่วนตัว</a>
          <a href="#" className="hover:text-emerald-300 transition-colors">ติดต่อแอดมิน</a>
        </div>

      </div>
    </footer>
  );
};
