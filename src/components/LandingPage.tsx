import React from "react";
import { ArrowRight, DollarSign, Users, Award, Shield, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onNavigate: (view: "dashboard" | "copykit") => void;
  walletBalance: number;
}

export default function LandingPage({ onNavigate, walletBalance }: LandingPageProps) {
  return (
    <div className="bg-natural-bg text-natural-text min-h-screen font-sans selection:bg-natural-primary/30 selection:text-natural-primary">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-natural-border bg-gradient-to-b from-[#FAF9F6] via-[#F3F1EA] to-[#FAF9F6] pt-16 pb-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-natural-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-natural-clay/10 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Logo Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8E6DF] border border-[#D1CFB9] rounded-full text-natural-primary text-xs font-mono mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            CashTask: ৳1 = Re.1 Real Value Exchange
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif tracking-tight font-bold text-natural-heading leading-tight"
          >
            Turn Your Spare Time Into{" "}
            <span className="italic text-natural-primary underline underline-offset-8 decoration-natural-clay">
              Real Money
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-natural-muted max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Welcome to <strong className="text-natural-primary font-serif italic font-semibold">CashTask</strong> – Your Gateway to Easy Earnings! 
            Complete simple daily activities, refer friends, and withdraw your earnings directly to your <span className="text-[#A33B5C] font-extrabold">bKash</span> or <span className="text-[#DE5B26] font-extrabold">Nagad</span> wallet instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
          >
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-natural-primary hover:bg-[#4E4E36] text-[#FAF9F6] font-serif italic font-bold transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Start Earning Now 💸
              <ArrowRight className="w-5 h-5 text-[#FAF9F6]" />
            </button>
            <button
              onClick={() => onNavigate("copykit")}
              className="flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-white hover:bg-natural-light border border-natural-border text-natural-heading font-medium transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm hover:shadow-md"
            >
              Access Marketer Kit 🚀
            </button>
          </motion.div>

          {/* Social Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-natural-border pt-10"
          >
            <div className="p-4 rounded-2xl bg-white border border-natural-card-border shadow-xs">
              <p className="text-2xl font-serif font-bold text-natural-primary">৳24,500+</p>
              <p className="text-natural-muted text-xs mt-1">Total Paid Today</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-natural-card-border shadow-xs">
              <p className="text-2xl font-serif font-bold text-natural-heading">45,120</p>
              <p className="text-natural-muted text-xs mt-1">Active Members</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-natural-card-border shadow-xs">
              <p className="text-2xl font-serif font-bold text-natural-primary">2 Mins</p>
              <p className="text-natural-muted text-xs mt-1">Avg. bKash Payout</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-natural-card-border shadow-xs">
              <p className="text-2xl font-serif font-bold text-natural-heading">100%</p>
              <p className="text-natural-muted text-xs mt-1">Guaranteed Rewards</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-natural-heading">Why Choose CashTask?</h2>
          <p className="text-natural-muted mt-3 text-sm max-w-lg mx-auto">
            Our platform guarantees safe micro-earnings with simple user actions and instant payment delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[24px] bg-white border border-natural-card-border hover:border-natural-primary/50 transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-natural-light flex items-center justify-center text-natural-primary mb-5">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-natural-heading">Earn Effortlessly</h3>
              <p className="text-natural-muted text-xs mt-2 leading-relaxed">
                No special skills required. Complete daily watch tasks, video ads, or short interactive feedback forms and watch your balance grow.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-natural-card-border hover:border-natural-primary/50 transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F0EEE6] flex items-center justify-center text-natural-primary mb-5">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-natural-heading">Refer & Earn</h3>
              <p className="text-natural-muted text-xs mt-2 leading-relaxed">
                Take advantage of our robust multi-tier referral system. Earn ৳10 welcome reward + 10% commission on every task they complete!
              </p>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-natural-card-border hover:border-natural-primary/50 transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-natural-light flex items-center justify-center text-natural-primary mb-5">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-natural-heading">Instant Payouts</h3>
              <p className="text-natural-muted text-xs mt-2 leading-relaxed">
                Get your pocket money delivered directly into your local bKash or Nagad wallet. Payouts are made instantly and transparently.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-natural-card-border hover:border-natural-primary/50 transition-all flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F0EEE6] flex items-center justify-center text-natural-primary mb-5">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-natural-heading">Secure & Reliable</h3>
              <p className="text-natural-muted text-xs mt-2 leading-relaxed">
                We respect your data privacy, and safeguard your account information. Focus on earnings without any tech headaches or security worries!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slogans Spotlights & Copy Display */}
      <section className="py-16 bg-natural-light border-t border-b border-natural-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-natural-primary text-xs font-mono font-bold tracking-wider uppercase">Marketing Spotlights</span>
              <h2 className="text-3xl font-serif font-bold text-natural-heading mt-1.5 leading-snug">Catchy Social Media Hooks</h2>
              <p className="text-natural-muted text-sm mt-3 leading-relaxed">
                Help us spread the word or examine how CashTask is positioned across online networks. Scroll-stopping slogans that turn passive feeds into money-making funnels:
              </p>

              <div className="mt-8 space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-natural-card-border flex gap-3.5 items-start shadow-xs">
                  <div className="mt-1 p-1 bg-natural-light text-natural-primary border border-natural-border rounded-lg text-xs font-bold font-mono">01</div>
                  <div>
                    <p className="text-natural-heading text-sm italic font-serif">"Turn your spare time into real money with CashTask! 💸"</p>
                    <span className="text-natural-muted text-[10px] mt-1 block">Best for TikTok / Meta Reels / Shorts</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-natural-card-border flex gap-3.5 items-start shadow-xs">
                  <div className="mt-1 p-1 bg-natural-light text-natural-primary border border-natural-border rounded-lg text-xs font-bold font-mono">02</div>
                  <div>
                    <p className="text-natural-heading text-sm italic font-serif">"Complete simple tasks, refer friends, and get paid instantly. Join CashTask today!"</p>
                    <span className="text-natural-muted text-[10px] mt-1 block">Best for Facebook Posts / Whatsapp status</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-natural-card-border flex gap-3.5 items-start shadow-xs">
                  <div className="mt-1 p-1 bg-natural-light text-natural-primary border border-natural-border rounded-lg text-xs font-bold font-mono">03</div>
                  <div>
                    <p className="text-natural-heading text-sm italic font-serif">"Why just scroll? Earn daily rewards on CashTask. Sign up now! 🚀"</p>
                    <span className="text-natural-muted text-[10px] mt-1 block">Best for Instagram Captions / Telegram blasts</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-natural-primary/5 to-natural-clay/10 rounded-[32px] filter blur-xl opacity-35 pointer-events-none" />
              <div className="p-8 rounded-[32px] bg-white border border-natural-card-border relative z-10 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-natural-primary/30" />
                    <span className="w-3 h-3 rounded-full bg-natural-clay" />
                    <span className="w-3 h-3 rounded-full bg-natural-muted/20" />
                  </div>
                  <span className="text-xs font-mono text-natural-muted">cashtask-app-v1.4</span>
                </div>

                <div className="space-y-4 text-xs font-mono text-natural-muted">
                  <div className="border-b border-natural-border pb-3">
                    <span className="text-natural-primary">Guest@CashTask:~$</span> <span className="text-[#3C3C35]">cat landing-summary.txt</span>
                  </div>
                  <p className="text-[#4A4A3E] leading-relaxed font-sans text-xs">
                    At <strong className="text-natural-primary font-serif italic">CashTask</strong>, we believe that your time is valuable. We have created a seamless platform where you can earn rewards by completing simple, everyday tasks. Whether it's watching videos, participating in surveys, or engaging with apps, your effort is always rewarded.
                  </p>
                  <p className="text-[#4A4A3E] leading-relaxed font-sans text-xs mt-2">
                    With an optimized mobile-first layout, a verified bKash/Nagad gateway integration, and our robust referral program, making secure side pocket money has never been this simple, fast, and exciting!
                  </p>
                  <div className="pt-3 border-t border-natural-border mt-4 flex items-center justify-between text-natural-muted">
                    <span>File size: 312 bytes</span>
                    <span className="text-natural-primary font-bold">Ready to simulate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Recent Withdrawals ticker */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold tracking-tight text-natural-heading">Recent Success Stories</h2>
          <p className="text-natural-muted text-sm mt-3">Read what our real Bengali users are saying after withdrawing to bKash.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-[24px] bg-white border border-natural-card-border relative shadow-xs">
            <p className="text-[#424233] text-sm leading-relaxed italic font-serif">
              "Being a student, earning pocket money was hard. On CashTask, I just watch simple videos during my commute, and I've already withdrawn Taka 750 straight to my bKash account! Extremely fast."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-natural-light border border-natural-border text-natural-primary font-serif font-bold flex items-center justify-center text-xs">RM</div>
              <div>
                <h4 className="text-xs font-bold text-[#424233]">Rihan Ahmed</h4>
                <p className="text-natural-primary font-mono text-xxs">৳1,450 Total Earned • bKash Verified</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-natural-card-border relative shadow-xs">
            <p className="text-[#424233] text-sm leading-relaxed italic font-serif">
              "I didn't believe it initially. But I referred 10 of my university friends, and instantly my balance grew. Withdrew ৳1,200 yesterday on Nagad and got the cash confirmation message in 5 minutes."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E8E6DF] text-natural-heading font-serif font-bold flex items-center justify-center text-xs">NF</div>
              <div>
                <h4 className="text-xs font-bold text-[#424233]">Nusrat Farhana</h4>
                <p className="text-natural-primary font-mono text-xxs">৳3,200 Total Earned • Nagad Verified</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-white border border-natural-card-border relative shadow-xs">
            <p className="text-[#424233] text-sm leading-relaxed italic font-serif">
              "The surveys are very short and intuitive. I complete them while waiting. If you are looking for an idle time converter tool to get simple commissions, standard cash, look no further!"
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-natural-light border border-natural-border text-natural-primary font-serif font-bold flex items-center justify-center text-xs">SK</div>
              <div>
                <h4 className="text-xs font-bold text-[#424233]">Sajid Khan</h4>
                <p className="text-natural-primary font-mono text-xxs">৳980 Total Earned • bKash Verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-natural-border bg-[#F5F2ED] py-10 mt-16 text-xs text-natural-muted">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="font-serif font-bold text-natural-heading text-lg tracking-tight mb-1">CashTask</h4>
            <p className="max-w-md text-natural-muted">The original, secure pocket money simulator utilizing digital tasks and instant referral multipliers.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => onNavigate("dashboard")} className="hover:text-natural-primary transition-colors cursor-pointer">Start Earning</button>
            <button onClick={() => onNavigate("copykit")} className="hover:text-natural-primary transition-colors cursor-pointer">Creators Kit</button>
          </div>
          <p>© 2026 CashTask inc. All virtual simulation assets protected. Dhaka, Bangladesh.</p>
        </div>
      </footer>
    </div>
  );
}
