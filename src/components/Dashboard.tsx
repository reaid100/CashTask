import React, { useState, useEffect } from "react";
import { 
  Wallet, 
  Tv, 
  ClipboardCheck, 
  Smartphone, 
  Gift, 
  Share2, 
  ArrowUpRight, 
  CheckCircle, 
  Play, 
  AlertCircle, 
  RefreshCw, 
  ArrowLeft,
  X,
  CreditCard,
  UserCheck,
  TrendingUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Task, Transaction, Wallet as WalletType, ReferredUser } from "../types";

interface DashboardProps {
  onBack: () => void;
  wallet: WalletType;
  setWallet: React.Dispatch<React.SetStateAction<WalletType>>;
}

export default function Dashboard({ onBack, wallet, setWallet }: DashboardProps) {
  // Authentication / Identity state
  const [userName, setUserName] = useState(() => localStorage.getItem("cashtask_user") || "");
  const [userPhone, setUserPhone] = useState(() => localStorage.getItem("cashtask_phone") || "");
  const [isAuthRegistered, setIsAuthRegistered] = useState(() => !!localStorage.getItem("cashtask_user"));
  const [authError, setAuthError] = useState("");

  // Simulated invite / referral tracking inside session
  const [tempFriendName, setTempFriendName] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitedFriends, setInvitedFriends] = useState<ReferredUser[]>([
    { id: "ref-1", name: "Rashed Karim", joinedAt: "2026-06-02 23:45", status: "Active", rewardClaimed: true },
    { id: "ref-2", name: "Sumaiya Akhter", joinedAt: "2026-06-03 01:12", status: "Active", rewardClaimed: true }
  ]);

  // Current active interactive task operations
  const [activeVideoTaskId, setActiveVideoTaskId] = useState<string | null>(null);
  const [videoTimer, setVideoTimer] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);

  // Survey action states
  const [activeSurveyTaskId, setActiveSurveyTaskId] = useState<string | null>(null);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, string>>({});
  const [surveyStep, setSurveyStep] = useState(0);

  // App installing action states
  const [activeAppTaskId, setActiveAppTaskId] = useState<string | null>(null);
  const [isInstallingApp, setIsInstallingApp] = useState(false);
  const [appProgress, setAppProgress] = useState(0);

  // Payout checkout states
  const [payoutMethod, setPayoutMethod] = useState<"bKash" | "Nagad">("bKash");
  const [payoutPhone, setPayoutPhone] = useState("");
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutFeedback, setPayoutFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Client feedback states to replace browser alert popups
  const [showToast, setShowToast] = useState<string | null>(null);

  // Tasks local states
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "v-1",
      title: "Watch Mobile Gaming Ad Spotlight",
      description: "Watch a short promotional video about the top online action strategy game for 10 seconds inside our integrated player.",
      reward: 35,
      category: "Video",
      difficulty: "Easy",
      estimatedTime: "10s watch time",
      completed: false,
      videoUrl: "Arena of Valors promo clip"
    },
    {
      id: "v-2",
      title: "bKash Super App Feature Walkthrough",
      description: "Check the visual walkthrough of the new utility bill feature inside our interactive simulator.",
      reward: 45,
      category: "Video",
      difficulty: "Easy",
      estimatedTime: "10s watch time",
      completed: false,
      videoUrl: "bKash walkthrough features"
    },
    {
      id: "s-1",
      title: "CashTask Platform Usability Survey",
      description: "Provide honest feedback regarding your loading speed and payment preference on CashTask. Rewards instated immediately.",
      reward: 60,
      category: "Survey",
      difficulty: "Medium",
      estimatedTime: "3 questions code-check",
      completed: false,
      questions: [
        {
          id: 1,
          questionText: "Which mobile money layout do you find most secure and convenient in Bangladesh?",
          options: ["bKash (Crimson Red UI)", "Nagad (Electric Orange UI)", "Both equally", "Unsure"]
        },
        {
          id: 2,
          questionText: "How often do you scroll social media feeds instead of earning real commissions?",
          options: ["Less than 1 hour daily", "1 to 3 hours daily", "3 to 5 hours daily", "Always scrolling with zero rewards"]
        },
        {
          id: 3,
          questionText: "What feature would you like CashTask to introduce next?",
          options: ["Spin-wheel daily bonuses", "Gemini AI automated quizzes", "Higher-paying app installs", "More local payout currencies"]
        }
      ]
    },
    {
      id: "a-1",
      title: "Register & Install: Daraz Affiliate Booster",
      description: "Simulate loading the checkout and discount affiliate tool optimized for Bangladeshi online shoppers.",
      reward: 120,
      category: "App",
      difficulty: "Hard",
      estimatedTime: "Simulate 5s process",
      completed: false
    }
  ]);

  // Handle register / login submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setAuthError("Please type a valid human name.");
      return;
    }
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(userPhone)) {
      setAuthError("Please enter a valid 11-digit Bangladeshi mobile number starting with 01 (e.g. 01712345678).");
      return;
    }

    localStorage.setItem("cashtask_user", userName);
    localStorage.setItem("cashtask_phone", userPhone);
    setIsAuthRegistered(true);
    setAuthError("");
    triggerToast("Registration completed successfully!");
  };

  // Log out reset
  const handleLogOut = () => {
    localStorage.removeItem("cashtask_user");
    localStorage.removeItem("cashtask_phone");
    setIsAuthRegistered(false);
    setUserName("");
    setUserPhone("");
  };

  // Video playback countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isVideoPlaying && videoTimer > 0) {
      interval = setInterval(() => {
        setVideoTimer((prev) => {
          if (prev <= 1) {
            setIsVideoPlaying(false);
            setIsVideoCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, videoTimer]);

  // App download progress loading simulation
  useEffect(() => {
    let timerID: NodeJS.Timeout;
    if (isInstallingApp) {
      timerID = setInterval(() => {
        setAppProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timerID);
            setIsInstallingApp(false);
            return 100;
          }
          return prev + 25;
        });
      }, 800);
    }
    return () => clearInterval(timerID);
  }, [isInstallingApp]);

  // Simulated Approve timer for payout requests
  useEffect(() => {
    const pendingRequests = wallet.transactions.filter(t => t.status === "Pending");
    if (pendingRequests.length > 0) {
      const timer = setTimeout(() => {
        setWallet(prev => {
          const updatedTx = prev.transactions.map(t => {
            if (t.status === "Pending") {
              return { ...t, status: "Approved" as const };
            }
            return t;
          });
          return { ...prev, transactions: updatedTx };
        });
        triggerToast("Withdrawal transaction approved!");
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [wallet.transactions, setWallet]);

  // Help trigger client toast
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 3800);
  };

  // Video Action logic handlers
  const startVideoTask = (task: Task) => {
    setActiveVideoTaskId(task.id);
    setVideoTimer(10);
    setIsVideoPlaying(true);
    setIsVideoCompleted(false);
  };

  const claimVideoReward = (taskId: string, amount: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      todayEarnings: prev.todayEarnings + amount,
      completedTasksCount: prev.completedTasksCount + 1
    }));
    setActiveVideoTaskId(null);
    setIsVideoCompleted(false);
    triggerToast(`৳${amount} credited into Taka wallet!`);
  };

  // Survey Action logic handlers
  const startSurveyTask = (task: Task) => {
    setActiveSurveyTaskId(task.id);
    setSurveyAnswers({});
    setSurveyStep(0);
  };

  const submitSurveyAnswer = (qId: number, answerValue: string) => {
    setSurveyAnswers(prev => ({ ...prev, [qId]: answerValue }));
  };

  const completeSurveyReward = (taskId: string, amount: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      todayEarnings: prev.todayEarnings + amount,
      completedTasksCount: prev.completedTasksCount + 1
    }));
    setActiveSurveyTaskId(null);
    triggerToast(`৳${amount} credited for your platform feedback!`);
  };

  // App Installation simulator handlers
  const startAppTask = (task: Task) => {
    setActiveAppTaskId(task.id);
    setIsInstallingApp(true);
    setAppProgress(0);
  };

  const claimAppReward = (taskId: string, amount: number) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      todayEarnings: prev.todayEarnings + amount,
      completedTasksCount: prev.completedTasksCount + 1
    }));
    setActiveAppTaskId(null);
    setAppProgress(0);
    triggerToast(`৳${amount} credited for successful booster integration!`);
  };

  // Submit Simulated Referral invite
  const triggerSimulatedReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempFriendName.trim()) return;

    const newRef: ReferredUser = {
      id: `ref-${Date.now()}`,
      name: tempFriendName,
      joinedAt: new Date().toISOString().substring(0, 16).replace("T", " "),
      status: "Active",
      rewardClaimed: true
    };

    setInvitedFriends(prev => [newRef, ...prev]);
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + 15, // ৳15 referral reward
      todayEarnings: prev.todayEarnings + 15,
      totalReferrals: prev.totalReferrals + 1
    }));

    setTempFriendName("");
    setShowInviteModal(false);
    triggerToast(`Success! ${tempFriendName} signed up. +৳15 credited!`);
  };

  // Cashout payout logic
  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutFeedback(null);

    const amount = Number(payoutAmount);
    const phoneRegex = /^01[3-9]\d{8}$/;

    if (!phoneRegex.test(payoutPhone)) {
      setPayoutFeedback({
        type: "error",
        text: "Please enter a valid 11-digit Bangladeshi mobile number starting with 01."
      });
      return;
    }

    if (isNaN(amount) || amount < 200) {
      setPayoutFeedback({
        type: "error",
        text: "Minimum withdrawal amount is ৳200."
      });
      return;
    }

    if (amount > wallet.balance) {
      setPayoutFeedback({
        type: "error",
        text: `Insufficient balance. Your current balance is ৳${wallet.balance}.`
      });
      return;
    }

    // Process simulation
    const newTx: Transaction = {
      id: `tx-${Math.floor(100000 + Math.random() * 900000)}`,
      amount,
      paymentMethod: payoutMethod,
      phoneNumber: payoutPhone,
      status: "Pending",
      createdAt: new Date().toISOString().substring(0, 16).replace("T", " "),
      referenceId: `${payoutMethod.toUpperCase()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    setWallet(prev => ({
      ...prev,
      balance: prev.balance - amount,
      transactions: [newTx, ...prev.transactions]
    }));

    setPayoutAmount("");
    setPayoutPhone("");
    setPayoutFeedback({
      type: "success",
      text: `Your withdrawal request of ৳${amount} via ${payoutMethod} was sent successfully! Our gateway is validating the transaction. Status will update to Approved in 12 seconds.`
    });
    triggerToast(`৳${amount} cashout request submitted!`);
  };

  // Helper check for referral link sharing copies
  const referralLink = `https://cashtask.com/join?ref=CT${userPhone ? userPhone.slice(-4) : "891"}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast("Referral Link copied to clipboard!");
  };

  const handleRefreshTasks = () => {
    triggerToast("Activities board synced and refreshed!");
  };

  if (!isAuthRegistered) {
    return (
      <div className="bg-natural-bg min-h-screen text-natural-text py-16 px-4 font-sans flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-natural-card-border rounded-[32px] p-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-natural-primary/5 rounded-full blur-2xl" />
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-natural-muted hover:text-natural-heading mb-6 uppercase tracking-wider font-mono cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>

          <div className="text-center mb-8">
            <span className="text-natural-primary font-mono text-xs font-bold px-3 py-1 bg-[#E8E6DF] border border-natural-border rounded-full">৳ Start Earning Today</span>
            <h2 className="text-2xl mt-4 font-serif font-bold text-natural-heading">CashTask Registration</h2>
            <p className="text-natural-muted text-xs mt-2">Create a secure profile using your local payment specs to synchronize daily reward multipliers.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#424233] uppercase tracking-wider mb-2 font-mono">Your Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Rayan Ahmed"
                className="w-full bg-[#FAF9F6] border border-natural-border focus:border-natural-primary focus:ring-1 focus:ring-natural-primary rounded-xl px-4 py-3 text-sm text-[#2C2C24] outline-none transition-colors font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#424233] uppercase tracking-wider mb-2 font-mono">Mobile Number (bKash/Nagad Account)</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                placeholder="e.g. 017XXXXXXXX"
                maxLength={11}
                className="w-full bg-[#FAF9F6] border border-natural-border focus:border-natural-primary focus:ring-1 focus:ring-natural-primary rounded-xl px-4 py-3 text-sm text-[#2C2C24] outline-none transition-colors font-mono"
              />
              <span className="text-natural-muted text-xxs mt-1.5 block">Specify your receiver line to allow immediate withdrawals.</span>
            </div>

            {authError && (
              <div className="p-3 bg-red-400/5 border border-red-500/15 text-red-600 text-xs rounded-xl flex gap-2 items-start">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-natural-primary hover:bg-[#4E4E36] text-white font-serif italic font-bold py-3.5 rounded-full transition-all shadow-sm cursor-pointer text-sm"
            >
              Sign Up & Open Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-natural-bg min-h-screen text-natural-text font-sans selection:bg-natural-primary/20 relative">
      {/* Dynamic Native Elegant Toast Notifications to bypass Iframe Alert restrictions */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#2D2D20] text-[#FAF9F6] px-5 py-3 rounded-full shadow-lg border border-[#424233] text-xs font-mono font-medium flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-natural-clay" />
            <span>{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <nav className="border-b border-natural-border bg-white py-4 px-6 relative z-30">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 border border-natural-border hover:border-natural-sage/50 bg-[#FAF9F6] hover:bg-[#E8E6DF] text-natural-text rounded-lg transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-lg font-serif font-bold text-natural-heading flex items-center gap-1.5 leading-none">
                CashTask <span className="text-xxs px-2 py-0.5 bg-natural-light border border-natural-border rounded text-natural-primary uppercase font-mono font-bold">User Platform</span>
              </h2>
              <span className="text-[10px] text-natural-muted font-mono mt-1 block">Live simulator for CashTask community tasks</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-natural-heading">Hi, {userName}</p>
              <p className="text-[10px] text-natural-muted font-mono">{userPhone}</p>
            </div>
            <button
              onClick={handleLogOut}
              className="text-xxs font-mono bg-white hover:bg-[#FAF9F6] text-natural-muted hover:text-natural-heading px-2.5 py-1.5 border border-natural-border rounded-full transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Top Wallet Hub Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white border border-natural-card-border hover:border-natural-primary/30 rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between h-40 shadow-xs transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-natural-primary/5 rounded-full blur-2xl" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase font-mono tracking-wider text-natural-muted">Available Balance</p>
                <h3 className="text-3xl font-serif font-bold text-natural-primary mt-2">
                  ৳{wallet.balance.toFixed(2)}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-natural-light flex items-center justify-center text-natural-primary border border-natural-border">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <div className="text-natural-muted text-xxs font-mono mt-4 pt-3 border-t border-natural-border flex justify-between items-center">
              <span>৳1 = 1 Taka Local Currency</span>
              <span className="text-natural-primary font-bold flex items-center gap-1">Verified Gateway ●</span>
            </div>
          </div>

          <div className="bg-white border border-natural-card-border rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between h-40 shadow-xs transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#D1CFB9]/15 rounded-full blur-2xl animate-pulse" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase font-mono tracking-wider text-natural-muted">Today's Earnings</p>
                <h3 className="text-3xl font-serif font-bold text-natural-heading mt-2">
                  ৳{wallet.todayEarnings.toFixed(2)}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#F5F2ED] flex items-center justify-center text-natural-primary border border-natural-border">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-natural-muted text-xxs font-mono mt-4 pt-3 border-t border-natural-border flex justify-between">
              <span>Completed Tasks: <strong className="text-natural-heading">{wallet.completedTasksCount}</strong></span>
              <span className="text-natural-primary">Referral Multipliers Active</span>
            </p>
          </div>

          <div className="bg-white border border-natural-card-border rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between h-40 shadow-xs transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-natural-primary/5 rounded-full blur-2xl" />
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs uppercase font-mono tracking-wider text-natural-muted">Your Referrals</p>
                <h3 className="text-3xl font-serif font-bold text-natural-heading mt-2">
                  {wallet.totalReferrals} Friends
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#E8E6DF] flex items-center justify-center text-[#5A5A40] border border-natural-border">
                <Gift className="w-5 h-5" />
              </div>
            </div>
            <p className="text-natural-muted text-xxs font-mono mt-4 pt-3 border-t border-natural-border">
              Invite friends & earn <strong className="text-natural-primary">৳15 cash</strong> per registration!
            </p>
          </div>
        </div>

        {/* Dynamic App Layout / Dividers */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Tasks Board */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-natural-heading">Available Daily Activities</h3>
                <p className="text-natural-muted text-xs">Choose tasks below. Complete steps to credit rewards instantly to your balance.</p>
              </div>
              <button 
                onClick={handleRefreshTasks}
                className="p-2 bg-white hover:bg-[#FAF9F6] text-natural-primary border border-natural-border rounded-lg text-xs cursor-pointer shadow-xxs transition-colors"
                title="Sync activities"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`p-5 rounded-[24px] bg-white border ${task.completed ? 'border-natural-primary/10 bg-natural-light/50' : 'border-natural-card-border hover:border-natural-primary/40'} transition-all shadow-xs`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          task.category === "Video" ? "bg-[#FCEAEB] text-[#A33B5C] border border-[#FCEAEB]" :
                          task.category === "Survey" ? "bg-[#EDE9FE] text-[#6D28D9] border border-[#E0D7FE]" :
                          "bg-[#ECFDF5] text-[#047857] border border-[#D1FAE5]"
                        }`}>
                          {task.category}
                        </span>
                        <span className="text-[10px] text-natural-muted font-mono italic">
                          ● {task.estimatedTime}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          task.difficulty === "Easy" ? "text-natural-muted bg-natural-light" :
                          task.difficulty === "Medium" ? "text-[#B45309] bg-[#FEF3C7]" :
                          "text-[#B91C1C] bg-[#FEE2E2]"
                        }`}>
                          {task.difficulty}
                        </span>
                      </div>
                      <h4 className="text-sm font-serif font-bold text-natural-heading mt-2 leading-snug">{task.title}</h4>
                      <p className="text-xs text-natural-muted leading-relaxed font-sans mt-1.5">{task.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-bold text-natural-primary px-3 py-1 bg-natural-light border border-natural-border rounded-lg block">
                        +৳{task.reward}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Dynamic Area for Task Completion */}
                  <div className="mt-4 pt-4 border-t border-natural-border">
                    <AnimatePresence mode="wait">
                      {task.completed ? (
                        <div className="flex items-center gap-1.5 text-xs text-natural-primary font-medium">
                          <CheckCircle className="w-4 h-4 text-natural-primary" />
                          <span>Task completed successfully! ৳{task.reward} virtual money credited.</span>
                        </div>
                      ) : (
                        <div>
                          {/* Video Playback Simulator Component */}
                          {task.category === "Video" && activeVideoTaskId !== task.id && (
                            <button
                              onClick={() => startVideoTask(task)}
                              className="px-4 py-2 rounded-full bg-white hover:bg-red-500/5 border border-[#DE5B26]/30 text-[#DE5B26] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xxs"
                            >
                              <Play className="w-3.5 h-3.5" /> Start Watcher Player
                            </button>
                          )}

                          {task.category === "Video" && activeVideoTaskId === task.id && (
                            <div className="bg-[#FAF9F6] border border-natural-border rounded-2xl p-4 space-y-3 shadow-inner">
                              <div className="flex justify-between items-center text-xs font-mono text-natural-muted">
                                <span className="flex items-center gap-1.5">
                                  <span className={`w-2 h-2 rounded-full ${isVideoPlaying ? "bg-[#DE5B26] animate-pulse" : "bg-natural-muted"}`} />
                                  {isVideoPlaying ? "Playing Video Ad Stream..." : "Ad Finished"}
                                </span>
                                <span>{videoTimer} seconds remaining</span>
                              </div>

                              {/* Virtual Player Box */}
                              <div className="aspect-video bg-white border border-natural-card-border rounded-xl flex flex-col items-center justify-center text-natural-muted relative overflow-hidden shadow-xs">
                                <div className="absolute inset-0 bg-gradient-to-tr from-natural-light/10 to-transparent z-0" />
                                {isVideoPlaying ? (
                                  <div className="text-center relative z-10 px-4 space-y-2">
                                    <div className="w-10 h-10 border-4 border-natural-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                    <p className="text-natural-heading text-xs font-bold uppercase font-serif">Loading rewards promo</p>
                                    <p className="text-natural-muted text-xxs font-sans">{task.title}</p>
                                  </div>
                                ) : (
                                  <div className="text-center relative z-10 px-4 space-y-1">
                                    <CheckCircle className="w-8 h-8 text-natural-primary mx-auto mb-1" />
                                    <p className="text-natural-heading text-xs font-serif font-bold uppercase">Advertisements Watch Complete!</p>
                                    <p className="text-natural-muted text-xxs font-sans">You have satisfied the required duration constraints.</p>
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2">
                                {isVideoCompleted ? (
                                  <button
                                    onClick={() => claimVideoReward(task.id, task.reward)}
                                    className="px-5 py-2 rounded-full bg-natural-primary hover:bg-[#4E4E36] text-white text-xs font-serif italic font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                                  >
                                    Claim ৳{task.reward} Reward Now ✨
                                  </button>
                                ) : (
                                  <span className="text-xxs text-natural-muted">Wait for the countdown timer to finish. Payout updates on claim.</span>
                                )}
                                <button
                                  onClick={() => {
                                    setActiveVideoTaskId(null);
                                    setIsVideoPlaying(false);
                                  }}
                                  className="px-4 py-2 rounded-full bg-white text-natural-muted border border-natural-border text-xs hover:text-natural-heading cursor-pointer shadow-xxs"
                                >
                                  Cancel Watch
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Survey Question interactive questionnaire */}
                          {task.category === "Survey" && activeSurveyTaskId !== task.id && (
                            <button
                              onClick={() => startSurveyTask(task)}
                              className="px-4 py-2 rounded-full bg-white hover:bg-purple-500/5 border border-purple-500/30 text-purple-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xxs"
                            >
                              <ClipboardCheck className="w-3.5 h-3.5" /> Start Feedback Survey
                            </button>
                          )}

                          {task.category === "Survey" && activeSurveyTaskId === task.id && task.questions && (
                            <div className="bg-[#FAF9F6] border border-natural-border rounded-2xl p-5 space-y-4 shadow-inner">
                              <div className="flex justify-between items-center border-b border-natural-border pb-2">
                                <span className="text-xs uppercase font-mono font-bold text-natural-muted">
                                  Survey Question {surveyStep + 1} of {task.questions.length}
                                </span>
                                <span className="text-xxs text-natural-primary font-bold">Earns +৳{task.reward}</span>
                              </div>

                              {/* Question Section */}
                              <div>
                                <h5 className="text-xs font-bold text-natural-heading mb-3">
                                  {task.questions[surveyStep].questionText}
                                </h5>

                                <div className="space-y-2">
                                  {task.questions[surveyStep].options.map((option) => {
                                    const qId = task.questions![surveyStep].id;
                                    const isSelected = surveyAnswers[qId] === option;
                                    return (
                                      <button
                                        type="button"
                                        key={option}
                                        onClick={() => submitSurveyAnswer(qId, option)}
                                        className={`w-full flex items-center justify-between text-left p-3 rounded-xl border text-xs transition cursor-pointer ${
                                          isSelected
                                            ? "bg-[#EDE9FE] border-purple-400 text-purple-700"
                                            : "bg-white border-natural-border/80 hover:border-natural-sage/50 text-natural-text"
                                        }`}
                                      >
                                        <span>{option}</span>
                                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                          isSelected ? "border-purple-600 bg-purple-600" : "border-natural-sage"
                                        }`}>
                                          {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Navigation and claim */}
                              <div className="flex justify-between items-center pt-2">
                                <button
                                  type="button"
                                  onClick={() => setActiveSurveyTaskId(null)}
                                  className="text-natural-muted hover:text-natural-heading text-xs underline"
                                >
                                  Cancel Survey
                                </button>

                                <div className="flex gap-2">
                                  {surveyStep < task.questions.length - 1 ? (
                                    <button
                                      type="button"
                                      disabled={!surveyAnswers[task.questions[surveyStep].id]}
                                      onClick={() => setSurveyStep(prev => prev + 1)}
                                      className="px-4 py-2 bg-white border border-natural-border hover:border-natural-sage text-xs text-natural-heading rounded-full disabled:opacity-50 cursor-pointer shadow-xxs"
                                    >
                                      Next Question
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      disabled={!surveyAnswers[task.questions[surveyStep].id]}
                                      onClick={() => completeSurveyReward(task.id, task.reward)}
                                      className="px-5 py-2 bg-natural-primary hover:bg-[#4E4E36] text-white font-serif italic font-bold text-xs rounded-full disabled:opacity-50 cursor-pointer shadow-sm"
                                    >
                                      Submit & Claim ৳{task.reward}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* App Installation Task Interface */}
                          {task.category === "App" && activeAppTaskId !== task.id && (
                            <button
                              onClick={() => startAppTask(task)}
                              className="px-4 py-2 rounded-full bg-white hover:bg-emerald-500/5 border border-emerald-500/30 text-emerald-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xxs"
                            >
                              <Smartphone className="w-3.5 h-3.5" /> Simulate Install Booster
                            </button>
                          )}

                          {task.category === "App" && activeAppTaskId === task.id && (
                            <div className="bg-[#FAF9F6] border border-natural-border rounded-2xl p-4 space-y-3 shadow-inner">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-mono text-natural-muted">Installing target container simulator...</span>
                                <span className="font-mono text-natural-primary font-bold">{appProgress}%</span>
                              </div>

                              <div className="w-full bg-[#FAF9F6] h-2 rounded-full overflow-hidden border border-natural-border">
                                <div 
                                  className="bg-natural-primary h-full transition-all duration-500"
                                  style={{ width: `${appProgress}%` }}
                                />
                              </div>

                              {appProgress >= 100 ? (
                                <div className="pt-2 flex justify-between items-center gap-3">
                                  <span className="text-natural-primary text-xs flex items-center gap-1">
                                    <UserCheck className="w-4 h-4 text-natural-primary" /> Package verified. Ready to cash in.
                                  </span>
                                  <button
                                    onClick={() => claimAppReward(task.id, task.reward)}
                                    className="px-4 py-2 bg-natural-primary hover:bg-[#4E4E36] font-serif italic font-bold text-xs text-white rounded-full cursor-pointer shadow-sm"
                                  >
                                    Collect ৳{task.reward} Reward
                                  </button>
                                </div>
                              ) : (
                                <p className="text-xxs text-natural-muted pt-1">Please wait for download & background code bundle checks to resolve.</p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>

            {/* Refer & Earn share panel dashboard (Restyled as the primary sage referral card from Design HTML) */}
            <div className="bg-natural-primary text-white rounded-[24px] p-8 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase bg-white/15 text-[#FAF9F6] px-2.5 py-1 rounded-full font-bold">Uncapped Multipliers</span>
                  <h4 className="text-2xl font-serif italic mb-1 text-[#FAF9F6]">Refer Friends & Earn More</h4>
                  <p className="text-[#FAF9F6]/85 text-sm max-w-md">Earn ৳15 cash reward instantly for every friend who joins using your link, plus un-capped commissions.</p>
                </div>
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-6 py-3 rounded-full bg-white hover:bg-[#FAF9F6] font-serif italic font-bold text-natural-primary text-sm shrink-0 flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Share2 className="w-4 h-4 text-natural-primary" /> Simulate Invitation
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 grid sm:grid-cols-2 gap-6 relative z-10 text-[#FAF9F6]">
                <div>
                  <span className="text-white/80 text-xxs font-semibold uppercase tracking-wider block mb-2 font-mono">Your Shareable Referral Link</span>
                  <div className="flex shadow-xs rounded-lg overflow-hidden border border-white/20">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="bg-white/10 placeholder-white/40 px-3 py-2 text-xxs font-mono text-white w-full outline-none border-none"
                    />
                    <button
                      onClick={() => copyToClipboard(referralLink)}
                      className="px-4 bg-white/20 hover:bg-white/30 text-white font-mono text-xxxs cursor-pointer transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-white/80 text-xxs font-semibold uppercase tracking-wider block font-mono">Invited Partners ({invitedFriends.length})</span>
                  <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-xxs rounded bg-white/5 p-2 scrollbar-thin">
                    {invitedFriends.map((friend) => (
                      <div key={friend.id} className="flex justify-between items-center p-2 rounded bg-white/5 border border-white/5">
                        <span className="text-white font-medium">{friend.name}</span>
                        <div className="flex gap-2 text-white/50 font-mono">
                          <span>{friend.joinedAt}</span>
                          <span className="text-[#D1CFB9] font-bold">৳15 Claimed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout bKash & Nagad withdrawal wallet and logs */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-natural-card-border rounded-[24px] space-y-6 relative overflow-hidden shadow-xs">
              <div className="absolute top-0 right-0 w-20 h-20 bg-natural-primary/5 rounded-full blur-xl" />
              <div>
                <h4 className="text-sm font-serif font-bold text-natural-heading uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-natural-primary" /> Wallet Cashout Payout
                </h4>
                <p className="text-natural-muted text-xs mt-1">Submit cashout requests directly to your bKash/Nagad wallet account.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPayoutMethod("bKash")}
                  className={`py-3.5 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    payoutMethod === "bKash"
                      ? "bg-[#E2125B]/5 border-[#E2125B] text-[#E2125B]"
                      : "bg-[#FAF9F6] border-natural-border text-natural-muted hover:border-natural-primary/30"
                  }`}
                >
                  <span className="text-xs uppercase font-extrabold tracking-wider">bKash Payout</span>
                  <span className={`text-[9px] font-mono opacity-80 font-normal ${payoutMethod === "bKash" ? "text-[#E2125B]" : "text-natural-muted"}`}>Crimson Wallet</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayoutMethod("Nagad")}
                  className={`py-3.5 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    payoutMethod === "Nagad"
                      ? "bg-[#DE5B26]/5 border-[#DE5B26] text-[#DE5B26]"
                      : "bg-[#FAF9F6] border-natural-border text-natural-muted hover:border-natural-primary/30"
                  }`}
                >
                  <span className="text-xs uppercase font-extrabold tracking-wider">Nagad Payout</span>
                  <span className={`text-[9px] font-mono opacity-80 font-normal ${payoutMethod === "Nagad" ? "text-[#DE5B26]" : "text-natural-muted"}`}>Electric Wallet</span>
                </button>
              </div>

              <form onSubmit={handlePayoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-natural-muted uppercase tracking-wider mb-1.5 font-mono">Receiver Phone Number</label>
                  <input
                    type="text"
                    value={payoutPhone}
                    onChange={(e) => setPayoutPhone(e.target.value)}
                    placeholder="e.g. 01812345678"
                    className="w-full bg-[#FAF9F6] border border-natural-border focus:border-natural-primary rounded-xl px-3 py-2.5 text-xs text-[#2C2C24] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-natural-muted uppercase tracking-wider mb-1.5 font-mono">Withdrawal Amount (Min ৳200)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-mono font-bold text-natural-muted">৳</span>
                    <input
                      type="number"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      placeholder="Amount to withdraw"
                      className="w-full bg-[#FAF9F6] border border-natural-border focus:border-natural-primary rounded-xl pl-8 pr-3 py-2.5 text-xs text-[#2C2C24] outline-none font-mono"
                    />
                  </div>
                </div>

                {payoutFeedback && (
                  <div className={`p-3 rounded-xl border text-xxs leading-relaxed ${
                    payoutFeedback.type === "success" 
                      ? "bg-natural-light border-natural-primary/30 text-natural-primary font-bold" 
                      : "bg-red-400/5 border-red-500/10 text-red-600"
                  }`}>
                    <p className="flex gap-1.5 items-start">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{payoutFeedback.text}</span>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-natural-primary hover:bg-[#4E4E36] text-white font-serif italic font-bold py-3 rounded-full text-xs transition cursor-pointer shadow-sm"
                >
                  Submit Payout Request
                </button>
              </form>
            </div>

            {/* Historic payouts / transactions list */}
            <div className="p-6 bg-white border border-natural-card-border rounded-[24px] space-y-4 shadow-xs text-natural-text">
              <div className="flex justify-between items-center pb-2 border-b border-natural-border">
                <h4 className="text-xs font-bold text-natural-heading uppercase tracking-wider font-mono">Withdrawal History</h4>
                <span className="text-[10px] text-natural-muted font-mono">Auto-refreshed</span>
              </div>

              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {wallet.transactions.length === 0 ? (
                  <p className="text-[11px] text-natural-muted text-center py-4 font-mono">No previous payouts submitted yet.</p>
                ) : (
                  wallet.transactions.map((tx) => (
                    <div key={tx.id} className="p-3 rounded-xl bg-natural-light/75 border border-natural-card-border flex justify-between items-center text-xxs">
                      <div>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className={`${tx.paymentMethod === "bKash" ? "text-[#E2125B]" : "text-[#DE5B26]"} font-extrabold`}>
                            {tx.paymentMethod}
                          </span>
                          <span className="text-natural-muted">[{tx.referenceId}]</span>
                        </div>
                        <p className="text-natural-muted mt-1 font-mono">{tx.phoneNumber} • {tx.createdAt}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-natural-heading block">
                          ৳{tx.amount}
                        </span>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono mt-1 ${
                          tx.status === "Pending" ? "bg-amber-400/10 text-amber-600 border border-amber-500/20" :
                          tx.status === "Approved" ? "bg-natural-primary/10 text-[#5A5A40] border border-natural-primary/15" :
                          "bg-red-400/5 text-red-600"
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simulated referral code invite input modal sheet */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-[#2D2D20]/75 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-white border border-natural-card-border rounded-[24px] p-6 relative shadow-xl"
          >
            <button 
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 p-1.5 bg-[#FAF9F6] border border-natural-border rounded hover:bg-[#E8E6DF] text-natural-muted cursor-pointer"
            >
              <X className="w-4 h-4 text-natural-text" />
            </button>

            <h4 className="text-sm font-serif font-bold text-natural-heading uppercase tracking-wider font-mono mb-2">Simulate Referral</h4>
            <p className="text-natural-muted text-xs mb-4">Enter a friend's name below to simulate them loading your referral link, filling the registration, and generating instant ৳15 bonus.</p>

            <form onSubmit={triggerSimulatedReferral} className="space-y-4">
              <div>
                <label className="block text-xxs font-bold uppercase text-[#424233] tracking-wider mb-2 font-mono">Friend's Full Name</label>
                <input
                  type="text"
                  value={tempFriendName}
                  onChange={(e) => setTempFriendName(e.target.value)}
                  placeholder="e.g. Asif Khan"
                  required
                  className="w-full bg-[#FAF9F6] border border-natural-border focus:border-natural-primary rounded-xl px-3 py-2 text-[#2C2C24] text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-natural-primary hover:bg-[#4E4E36] text-white font-serif italic font-bold py-2.5 rounded-full text-xs transition cursor-pointer shadow-sm"
              >
                Register & Credit ৳15 Cash Reward
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
