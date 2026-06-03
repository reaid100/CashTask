import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import CopyKit from "./components/CopyKit";
import { Wallet } from "./types";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard" | "copykit">("landing");

  // Global wallet state lifted to persist user actions across page toggles
  const [wallet, setWallet] = useState<Wallet>({
    balance: 145.0, // Initial sign-on demo reward
    todayEarnings: 45.0,
    completedTasksCount: 1,
    totalReferrals: 2,
    transactions: [
      {
        id: "tx-720138",
        amount: 250,
        paymentMethod: "bKash",
        phoneNumber: "01723456789",
        status: "Approved",
        createdAt: "2026-06-02 18:30",
        referenceId: "BKASHXHG8Y2"
      }
    ]
  });

  const handleNavigate = (view: "landing" | "dashboard" | "copykit") => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-natural-bg text-natural-text font-sans">
      {/* Floating Marketing Header bar alert to drive user journey */}
      {currentView === "landing" && (
        <div className="sticky top-0 z-50 bg-natural-primary text-natural-bg py-2.5 px-4 text-center text-xs font-bold font-mono tracking-wide shadow-sm flex items-center justify-center gap-1.5 flex-wrap">
          🌾 EARNING SPEED INCREASED BY 25% YESTERDAY • REGISTER TODAY AND SECURE FREE ৳10 BONUS
          <button
            onClick={() => handleNavigate("dashboard")}
            className="px-3 py-1 bg-white text-natural-primary border border-natural-border rounded hover:bg-natural-bg transition-all font-sans font-semibold tracking-normal flex items-center gap-1 cursor-pointer ml-4 text-[10px]"
          >
            Instant Registration ৳ →
          </button>
        </div>
      )}

      {currentView === "landing" && (
        <LandingPage 
          onNavigate={(view) => handleNavigate(view)} 
          walletBalance={wallet.balance}
        />
      )}

      {currentView === "dashboard" && (
        <Dashboard 
          onBack={() => handleNavigate("landing")}
          wallet={wallet}
          setWallet={setWallet}
        />
      )}

      {currentView === "copykit" && (
        <CopyKit 
          onBack={() => handleNavigate("landing")}
        />
      )}
    </div>
  );
}
