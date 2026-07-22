"use client";

import React, { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  packageName: string;
  price: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  packageName,
  price,
  onClose,
  onSuccess,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [slipUploaded, setSlipUploaded] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    setSlipUploaded(true);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Modal Box Container (กำหนดกรอบทึบสีหยก ล็อคกรอบทอง 2px ชัดเจน 100%) */}
      <div 
        className="p-6 md:p-8 max-w-md w-full space-y-6 relative rounded-2xl shadow-2xl transition-colors"
        style={{
          backgroundColor: "var(--bg-surface, #0f1917)",
          border: "2px solid #f59e0b",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.25)"
        }}
      >
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10"
        >
          ✕
        </button>

        <div className="text-center space-y-1">
          <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-heading inline-block">
            💳 ชำระเงินผ่าน PromptPay QR Code
          </span>
          <h2 className="text-xl font-bold font-heading text-white mt-2">
            {packageName}
          </h2>
          <div className="text-3xl font-bold font-heading text-emerald-400">
            ยอดชำระ ฿{price}
          </div>
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-4 rounded-2xl max-w-[220px] mx-auto shadow-2xl text-center space-y-2 border-4 border-amber-500/50">
          <div className="bg-blue-900 text-white text-[10px] font-bold p-1 rounded font-heading">
            PROMPTPAY QR CODE
          </div>
          <div className="aspect-square bg-gray-900 rounded-lg flex flex-col items-center justify-center text-xs text-white p-2 space-y-1">
            <span className="text-4xl">📱</span>
            <span className="font-mono text-[11px] text-emerald-300">081-XXX-XXXX</span>
            <span className="text-[10px] text-gray-400">สภาการแพทย์แผนไทย (PassSapa)</span>
          </div>
        </div>

        {/* Upload Slip Zone */}
        <div className="space-y-3">
          <label className="block text-xs text-gray-300 font-heading text-center">
            แนบสลิปการโอนเงิน (ระบบจะตรวจและเปิดสิทธิ์ VIP ให้อัตโนมัติใน 2 วินาที)
          </label>

          <button
            onClick={handleUpload}
            disabled={isVerifying}
            className="w-full border-2 border-dashed border-emerald-500/60 hover:border-emerald-400 p-4 rounded-xl text-center text-sm font-heading text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all flex flex-col items-center gap-1"
          >
            {isVerifying ? (
              <span className="animate-pulse text-amber-300">⏳ กำลังตรวจสอบสลิปผ่าน SlipOK...</span>
            ) : slipUploaded ? (
              <span className="text-emerald-400 font-bold">✅ สลิปถูกต้อง! กำลังอนุมัติสิทธิ์ VIP...</span>
            ) : (
              <>
                <span>📁 คลิกเพื่ออัปโหลดรูปสลิปโอนเงิน (หรือลากมาวาง)</span>
                <span className="text-[11px] text-gray-400 font-normal">รองรับไฟล์ JPG, PNG</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
