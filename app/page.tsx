"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "../src/components/Navbar";
import { LandingPage } from "../src/features/landing/LandingPage";
import { StudentDashboard } from "../src/features/dashboard/StudentDashboard";
import { ExamEngine } from "../src/features/exam/ExamEngine";
import { FlashcardDeck } from "../src/features/flashcards/FlashcardDeck";
import { AdminPortal } from "../src/features/admin/AdminPortal";
import { PaymentModal } from "../src/components/PaymentModal";
import { AuthModal } from "../src/components/AuthModal";
import { UserProfileModal } from "../src/components/UserProfileModal";
import { NotificationToast } from "../src/components/NotificationToast";
import { MobileBottomNav } from "../src/components/MobileBottomNav";
import { Footer } from "../src/components/Footer";

export default function Home() {
  const [currentView, setCurrentView] = useState("landing");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("คุณหมอสมชาย");
  const [userPlan, setUserPlan] = useState("สมาชิกทั่วไป");

  // Modals State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: "", price: 0 });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Custom Toast State
  const [toastState, setToastState] = useState<{ open: boolean; title: string; message: string; icon: string }>({
    open: false,
    title: "",
    message: "",
    icon: "✨"
  });

  // 🌙 Theme Memory (ดึงค่าธีมที่บันทึกไว้ใน localStorage)
  useEffect(() => {
    const savedTheme = localStorage.getItem("passsapa_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("passsapa_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const showToast = (title: string, message: string, icon = "✨") => {
    setToastState({ open: true, title, message, icon });
  };

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    setUserPlan("สมาชิกทั่วไป");
    setAuthModalOpen(false);
    showToast("🎉 เข้าสู่ระบบสำเร็จ!", `ยินดีต้อนรับ ${name} เข้าสู่ระบบ PassSapa`, "🔑");
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileModalOpen(false);
    setUserPlan("Guest");
    showToast("🚪 ออกจากระบบสำเร็จ", "คุณหมอได้ออกจากระบบเรียบร้อยแล้ว", "👋");
    setCurrentView("landing");
  };

  const handleUpdateName = (newName: string) => {
    setUserName(newName);
    showToast("💾 บันทึกข้อมูลสำเร็จ", `บันทึกชื่อผู้ใช้งานใหม่เป็น: ${newName} เรียบร้อยแล้ว`, "👤");
  };

  const handleOpenPayment = (name: string, price: number) => {
    setSelectedPackage({ name, price });
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    setIsLoggedIn(true);
    setUserPlan("VIP Member ⭐");
    showToast("🎉 ชำระเงินสำเร็จ!", "ระบบตรวจสอบผ่าน PromptPay เรียบร้อย เปิดสิทธิ์ VIP ให้อัตโนมัติใน 2 วินาที", "💎");
    setCurrentView("dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-black pb-16 md:pb-0">
      
      {/* Top Glassmorphic Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        theme={theme}
        onToggleTheme={toggleTheme}
        isLoggedIn={isLoggedIn}
        userPlan={userPlan}
        userName={userName}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 w-full flex-grow">
        {currentView === "landing" && (
          <LandingPage
            onNavigate={setCurrentView}
            onOpenPayment={handleOpenPayment}
          />
        )}

        {currentView === "dashboard" && (
          <StudentDashboard onNavigate={setCurrentView} userName={userName} />
        )}

        {currentView === "exam" && (
          <ExamEngine onNavigate={setCurrentView} />
        )}

        {currentView === "flashcards" && (
          <FlashcardDeck />
        )}

        {currentView === "pricing" && (
          <LandingPage
            onNavigate={setCurrentView}
            onOpenPayment={handleOpenPayment}
          />
        )}

        {currentView === "admin" && (
          <AdminPortal />
        )}
      </main>

      {/* Interactive Auth Modal (Login & Register) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* User Profile & Logout Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        userName={userName}
        userPlan={userPlan}
        onClose={() => setProfileModalOpen(false)}
        onLogout={handleLogout}
        onUpdateName={handleUpdateName}
      />

      {/* PromptPay Payment Verification Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        packageName={selectedPackage.name}
        price={selectedPackage.price}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Custom Centered Notification Toast (แทนที่ browser alert อัปลักษณ์ 100%) */}
      <NotificationToast
        isOpen={toastState.open}
        title={toastState.title}
        message={toastState.message}
        icon={toastState.icon}
        onClose={() => setToastState(prev => ({ ...prev, open: false }))}
      />

      {/* 📱 Mobile Floating Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
        isLoggedIn={isLoggedIn}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
