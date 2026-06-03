import React, { useState } from "react";
import { 
  ArrowLeft, 
  Copy, 
  Share2, 
  Sparkles, 
  Mail, 
  Tv, 
  Send, 
  FileText, 
  AlertCircle, 
  Loader2, 
  Check, 
  Layers 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CopyKitProps {
  onBack: () => void;
}

export default function CopyKit({ onBack }: CopyKitProps) {
  const [activeTab, setActiveTab] = useState<"hooks" | "about" | "newsletter" | "ctas" | "generator">("hooks");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Gemini AI generation form states
  const [topic, setTopic] = useState("Fast bKash Payouts");
  const [format, setFormat] = useState("headline");
  const [tone, setTone] = useState("Exciting");
  const [customPrompt, setCustomPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle server-side Gemini generation trigger
  const handleGenerateCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAiError("");
    setAiResponse("");

    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic,
          type: format,
          tone,
          customPrompt
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate copywriting ideas.");
      }

      setAiResponse(data.text || "No response received.");
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-natural-bg text-natural-text min-h-screen font-sans selection:bg-natural-primary/20 selection:text-natural-primary">
      {/* Top Bar */}
      <nav className="border-b border-natural-border bg-white py-4 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 border border-natural-border hover:border-natural-sage/50 bg-[#FAF9F6] hover:bg-[#E8E6DF] text-natural-text hover:text-natural-heading rounded-lg transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-lg font-serif font-bold text-natural-heading flex items-center gap-1.5 leading-none">
                CashTask <span className="text-xxs px-2 py-0.5 bg-[#FAF9F6] border border-natural-border rounded text-natural-primary uppercase font-mono font-bold">Creators Hub</span>
              </h2>
              <span className="text-[10px] text-natural-muted font-mono mt-1 block">Deploy high-converting copy, headlines, and blasts.</span>
            </div>
          </div>
          <span className="text-xxs font-mono text-natural-muted">v1.2 Copy Hub</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center md:text-left mb-10">
          <h3 className="text-2xl font-serif font-bold tracking-tight text-natural-heading">Official CashTask Marketing Kit</h3>
          <p className="text-natural-muted text-xs mt-1.5">
            Perfect copy assets meticulously curated to recruit affiliates, launch campaigns, or craft viral feeds.
          </p>
        </div>

        {/* Tab Selector layout */}
        <div className="flex flex-wrap gap-2 border-b border-natural-border pb-4 mb-8">
          <button
            onClick={() => setActiveTab("hooks")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all cursor-pointer ${
              activeTab === "hooks"
                ? "bg-natural-primary text-white font-bold shadow-sm"
                : "text-natural-muted hover:text-natural-heading hover:bg-[#E8E6DF]/50"
            }`}
          >
            <Tv className="w-3.5 h-3.5" /> Hooks
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all cursor-pointer ${
              activeTab === "about"
                ? "bg-natural-primary text-white font-bold shadow-sm"
                : "text-natural-muted hover:text-natural-heading hover:bg-[#E8E6DF]/50"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> About Us / Landing
          </button>
          <button
            onClick={() => setActiveTab("newsletter")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all cursor-pointer ${
              activeTab === "newsletter"
                ? "bg-natural-primary text-white font-bold shadow-sm"
                : "text-natural-muted hover:text-natural-heading hover:bg-[#E8E6DF]/50"
            }`}
          >
            <Mail className="w-3.5 h-3.5" /> Blast Campaign
          </button>
          <button
            onClick={() => setActiveTab("ctas")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all cursor-pointer ${
              activeTab === "ctas"
                ? "bg-natural-primary text-white font-bold shadow-sm"
                : "text-natural-muted hover:text-natural-heading hover:bg-[#E8E6DF]/50"
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Ads CTAs
          </button>
          <button
            onClick={() => setActiveTab("generator")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif tracking-wide transition-all cursor-pointer ${
              activeTab === "generator"
                ? "bg-[#FAF9F6] border border-natural-primary text-natural-primary font-bold shadow-xs"
                : "border border-natural-border/65 text-natural-primary/80 hover:bg-[#E8E6DF]/50"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Copy Generator
          </button>
        </div>

        {/* Tabs Contents display */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === "hooks" && (
                <motion.div
                  key="hooks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-[24px] bg-white border border-natural-card-border space-y-6 shadow-xs">
                    <div>
                      <h4 className="text-sm font-serif font-bold text-natural-heading uppercase tracking-wider font-mono">Social Media Hooks</h4>
                      <p className="text-natural-muted text-xs mt-1">Scroll-stopping phrases designed for headlines or banners.</p>
                    </div>

                    <div className="space-y-4">
                      {/* Hook 1 */}
                      <div className="p-4 rounded-[20px] bg-natural-light border border-natural-card-border flex justify-between items-start gap-4 shadow-xxs">
                        <div className="space-y-1">
                          <p className="text-[#3C3C32] text-xs leading-relaxed italic font-serif">
                            "Turn your spare time into real money with CashTask! 💸"
                          </p>
                          <span className="text-[10px] text-natural-muted font-mono uppercase font-bold">Recommended for Reels / Tik-Tok</span>
                        </div>
                        <button
                          onClick={() => triggerCopy('"Turn your spare time into real money with CashTask! 💸"', "hook-1")}
                          className="p-2 bg-white hover:bg-[#E8E6DF] border border-natural-border text-natural-primary rounded-lg shrink-0 cursor-pointer shadow-xxs"
                        >
                          {copiedId === "hook-1" ? <Check className="w-4 h-4 text-natural-primary" /> : <Copy className="w-4 h-4 text-natural-primary" />}
                        </button>
                      </div>

                      {/* Hook 2 */}
                      <div className="p-4 rounded-[20px] bg-natural-light border border-natural-card-border flex justify-between items-start gap-4 shadow-xxs">
                        <div className="space-y-1">
                          <p className="text-[#3C3C32] text-xs leading-relaxed italic font-serif">
                            "Complete simple tasks, refer friends, and get paid instantly. Join CashTask today!"
                          </p>
                          <span className="text-[10px] text-natural-muted font-mono uppercase font-bold">Recommended for Daily Posts</span>
                        </div>
                        <button
                          onClick={() => triggerCopy('"Complete simple tasks, refer friends, and get paid instantly. Join CashTask today!"', "hook-2")}
                          className="p-2 bg-white hover:bg-[#E8E6DF] border border-natural-border text-natural-primary rounded-lg shrink-0 cursor-pointer shadow-xxs"
                        >
                          {copiedId === "hook-2" ? <Check className="w-4 h-4 text-natural-primary" /> : <Copy className="w-4 h-4 text-natural-primary" />}
                        </button>
                      </div>

                      {/* Hook 3 */}
                      <div className="p-4 rounded-[20px] bg-natural-light border border-natural-card-border flex justify-between items-start gap-4 shadow-xxs">
                        <div className="space-y-1">
                          <p className="text-[#3C3C32] text-xs leading-relaxed italic font-serif">
                            "Why just scroll? Earn daily rewards on CashTask. Sign up now! 🚀"
                          </p>
                          <span className="text-[10px] text-natural-muted font-mono uppercase font-bold">Recommended for Stories / Twitter</span>
                        </div>
                        <button
                          onClick={() => triggerCopy('"Why just scroll? Earn daily rewards on CashTask. Sign up now! 🚀"', "hook-3")}
                          className="p-2 bg-white hover:bg-[#E8E6DF] border border-natural-border text-natural-primary rounded-lg shrink-0 cursor-pointer shadow-xxs"
                        >
                          {copiedId === "hook-3" ? <Check className="w-4 h-4 text-natural-primary" /> : <Copy className="w-4 h-4 text-natural-primary" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-6 rounded-[24px] bg-white border border-natural-card-border space-y-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-natural-heading uppercase tracking-wider font-mono">Official Landing Description</h4>
                        <p className="text-natural-muted text-xs mt-1">Excellent for homepages, app stores, or authority building sections.</p>
                      </div>
                      <button
                        onClick={() => triggerCopy(`Welcome to CashTask – Your Gateway to Easy Earnings!

At CashTask, we believe that your time is valuable. We have created a seamless platform where you can earn rewards by completing simple, everyday tasks. Whether it’s watching videos, participating in surveys, or engaging with apps, your effort is always rewarded.

Why Choose CashTask?
- Earn Effortlessly: No special skills required. Just complete tasks and watch your balance grow.
- Refer & Earn: Our robust referral program allows you to earn a commission for every friend you bring into the CashTask community.
- Instant Payouts: We value your hard work. Get your earnings delivered directly to your preferred payment method (bKash/Nagad).
- Secure & Reliable: Your data privacy and payment security are our top priorities.

Join thousands of users and start your journey with CashTask today!`, "about-desc")}
                        className="px-3.5 py-1.5 bg-natural-light hover:bg-[#E8E6DF] border border-natural-border text-natural-primary rounded-lg text-xxs font-mono flex items-center gap-1.5 cursor-pointer shadow-xxs"
                      >
                        {copiedId === "about-desc" ? <Check className="w-3.5 h-3.5 text-natural-primary" /> : <Copy className="w-3.5 h-3.5 text-natural-primary" />}
                        {copiedId === "about-desc" ? "Copied All" : "Copy Description"}
                      </button>
                    </div>

                    <div className="p-5 rounded-[20px] bg-natural-light border border-natural-card-border space-y-4 font-sans text-xs text-[#2C2C24] leading-relaxed md:h-96 overflow-y-auto shadow-inner">
                      <p className="font-bold text-natural-heading font-serif text-sm">Welcome to CashTask – Your Gateway to Easy Earnings!</p>
                      
                      <p>At CashTask, we believe that your time is valuable. We have created a seamless platform where you can earn rewards by completing simple, everyday tasks. Whether it’s watching videos, participating in surveys, or engaging with apps, your effort is always rewarded.</p>

                      <div className="space-y-3 pt-2">
                        <p className="font-bold text-natural-heading uppercase tracking-wide font-mono text-[10px]">Why Choose CashTask?</p>
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          <div className="p-3 bg-white border border-natural-card-border rounded-xl space-y-1 shadow-xxs">
                            <h5 className="font-serif font-bold text-natural-primary text-xs">Earn Effortlessly</h5>
                            <p className="text-[11px] text-natural-muted">No special skills required. Just complete tasks and watch your balance grow.</p>
                          </div>
                          <div className="p-3 bg-white border border-natural-card-border rounded-xl space-y-1 shadow-xxs">
                            <h5 className="font-serif font-bold text-natural-primary text-xs">Refer & Earn</h5>
                            <p className="text-[11px] text-natural-muted">Our robust referral program allows you to earn a commission for every friend you bring.</p>
                          </div>
                          <div className="p-3 bg-white border border-natural-card-border rounded-xl space-y-1 shadow-xxs">
                            <h5 className="font-serif font-bold text-natural-primary text-xs">Instant Payouts</h5>
                            <p className="text-[11px] text-natural-muted">We value your hard work. Get your earnings delivered directly (bKash/Nagad).</p>
                          </div>
                          <div className="p-3 bg-white border border-natural-card-border rounded-xl space-y-1 shadow-xxs">
                            <h5 className="font-serif font-bold text-natural-primary text-xs">Secure & Reliable</h5>
                            <p className="text-[11px] text-natural-muted">Your data privacy and payment security are our top priorities.</p>
                          </div>
                        </div>
                      </div>

                      <p className="pt-2 italic text-natural-muted text-[11px]">Join thousands of users and start your journey with CashTask today!</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "newsletter" && (
                <motion.div
                  key="newsletter"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-6 rounded-[24px] bg-white border border-natural-card-border space-y-6 shadow-xs">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h4 className="text-sm font-serif font-bold text-natural-heading uppercase tracking-wider font-mono">Promotional Email & Messaging Blast</h4>
                        <p className="text-natural-muted text-xs mt-1">Ready-to-use template optimized for Email lists, Telegram, and WhatsApp broadcasters.</p>
                      </div>
                      <button
                        onClick={() => triggerCopy(`Subject: Start Earning with CashTask Today! 💰

Hello,

Are you looking for a flexible way to earn extra income from your smartphone? Look no further! CashTask is now live and ready for you.

How to get started:
1. Register: Create your free account at [YourLinkHere].
2. Complete Tasks: Choose from a variety of simple daily activities.
3. Refer Friends: Use your unique referral link to earn even more.
4. Withdraw: Cash out your earnings quickly and securely.

Don’t leave money on the table—join CashTask today and start earning!

[Join Now]`, "blast-email")}
                        className="px-3 py-1.5 bg-natural-light hover:bg-[#E8E6DF] border border-natural-border text-natural-primary rounded-lg text-xxs font-mono flex items-center gap-1.5 cursor-pointer shadow-xxs"
                      >
                        {copiedId === "blast-email" ? <Check className="w-3.5 h-3.5 text-natural-primary" /> : <Copy className="w-3.5 h-3.5 text-natural-primary" />}
                        {copiedId === "blast-email" ? "Copied" : "Copy Template"}
                      </button>
                    </div>

                    <div className="p-5 rounded-[20px] bg-natural-light border border-natural-card-border font-mono text-xxs text-[#2C2C24] leading-relaxed space-y-4 shadow-inner">
                      <div className="border-b border-natural-border pb-3">
                        <strong className="text-natural-muted text-[10px] uppercase block tracking-wider mb-1">Subject:</strong>
                        <p className="text-natural-heading text-xs font-serif font-bold">Start Earning with CashTask Today! 💰</p>
                      </div>

                      <div className="space-y-3 font-sans text-xs">
                        <p>Hello,</p>
                        <p>Are you looking for a flexible way to earn extra income from your smartphone? Look no further! CashTask is now live and ready for you.</p>

                        <div className="p-3.5 bg-white border border-natural-card-border rounded-xl space-y-2 shadow-xxs">
                          <p className="font-bold text-natural-heading font-serif">How to get started:</p>
                          <ul className="space-y-1 text-[11px] text-[#4A4A3E] list-disc list-inside">
                            <li><strong>Register:</strong> Create your free account at [YourLinkHere].</li>
                            <li><strong>Complete Tasks:</strong> Choose from a variety of simple daily activities.</li>
                            <li><strong>Refer Friends:</strong> Use your unique referral link to earn even more.</li>
                            <li><strong>Withdraw:</strong> Cash out your earnings quickly and securely.</li>
                          </ul>
                        </div>

                        <p>Don’t leave money on the table—join CashTask today and start earning!</p>

                        <button 
                          type="button" 
                          onClick={() => alert("Simulated newsletter CTA click.")} 
                          className="px-6 py-2 bg-natural-primary text-white font-serif font-bold rounded-full text-xs cursor-pointer shadow-sm hover:opacity-95"
                        >
                          Join Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "ctas" && (
                <motion.div
                  key="ctas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-6 rounded-[24px] bg-white border border-natural-card-border space-y-6 shadow-xs">
                    <div>
                      <h4 className="text-sm font-serif font-bold text-natural-heading uppercase tracking-wider font-mono">Short Call-to-Action (CTA) Ads Options</h4>
                      <p className="text-natural-muted text-xs mt-1">Targeted snippets ideal for image banners, Google Ads, or social captions.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {/* CTA Option A */}
                      <div className="p-5 rounded-[20px] bg-natural-light border border-natural-card-border flex flex-col justify-between h-40 shadow-xs">
                        <div>
                          <span className="text-natural-primary font-mono text-[10px] font-bold">OPTION A</span>
                          <p className="text-[#3C3C32] text-xs italic mt-2 leading-relaxed font-serif">
                            "Stop scrolling, start earning. Join CashTask now!"
                          </p>
                        </div>
                        <button
                          onClick={() => triggerCopy('"Stop scrolling, start earning. Join CashTask now!"', "cta-a")}
                          className="w-full mt-4 py-1.5 bg-white hover:bg-[#E8E6DF] text-[10px] font-mono text-natural-primary rounded border border-natural-border flex justify-center items-center gap-1.5 cursor-pointer shadow-xxs"
                        >
                          {copiedId === "cta-a" ? <Check className="w-3.5 h-3.5 text-natural-primary" /> : <Copy className="w-3.5 h-3.5 text-natural-primary" />}
                          {copiedId === "cta-a" ? "Copied" : "Copy"}
                        </button>
                      </div>

                      {/* CTA Option B */}
                      <div className="p-5 rounded-[20px] bg-natural-light border border-natural-card-border flex flex-col justify-between h-40 shadow-xs">
                        <div>
                          <span className="text-natural-primary font-mono text-[10px] font-bold">OPTION B</span>
                          <p className="text-[#3C3C32] text-xs italic mt-2 leading-relaxed font-serif">
                            "The easiest way to make money from home. Sign up for CashTask!"
                          </p>
                        </div>
                        <button
                          onClick={() => triggerCopy('"The easiest way to make money from home. Sign up for CashTask!"', "cta-b")}
                          className="w-full mt-4 py-1.5 bg-white hover:bg-[#E8E6DF] text-[10px] font-mono text-natural-primary rounded border border-natural-border flex justify-center items-center gap-1.5 cursor-pointer shadow-xxs"
                        >
                          {copiedId === "cta-b" ? <Check className="w-3.5 h-3.5 text-natural-primary" /> : <Copy className="w-3.5 h-3.5 text-natural-primary" />}
                          {copiedId === "cta-b" ? "Copied" : "Copy"}
                        </button>
                      </div>

                      {/* CTA Option C */}
                      <div className="p-5 rounded-[20px] bg-natural-light border border-natural-card-border flex flex-col justify-between h-40 shadow-xs">
                        <div>
                          <span className="text-natural-primary font-mono text-[10px] font-bold">OPTION C</span>
                          <p className="text-[#3C3C32] text-xs italic mt-2 leading-relaxed font-serif">
                            "Complete tasks. Refer friends. Get paid. Experience CashTask!"
                          </p>
                        </div>
                        <button
                          onClick={() => triggerCopy('"Complete tasks. Refer friends. Get paid. Experience CashTask!"', "cta-c")}
                          className="w-full mt-4 py-1.5 bg-white hover:bg-[#E8E6DF] text-[10px] font-mono text-natural-primary rounded border border-natural-border flex justify-center items-center gap-1.5 cursor-pointer shadow-xxs"
                        >
                          {copiedId === "cta-c" ? <Check className="w-3.5 h-3.5 text-natural-primary" /> : <Copy className="w-3.5 h-3.5 text-natural-primary" />}
                          {copiedId === "cta-c" ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "generator" && (
                <motion.div
                  key="generator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-6 rounded-[24px] bg-white border border-natural-card-border space-y-6 shadow-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-serif font-bold text-natural-heading uppercase tracking-wider font-mono">Gemini-Powered Copy generator</h4>
                        <span className="text-[9px] font-mono uppercase bg-[#E8E6DF] border border-natural-border text-natural-primary px-2 py-0.5 rounded-full font-bold">Flash 3.5</span>
                      </div>
                      <p className="text-natural-muted text-xs mt-1">Leverage Gemini AI to generate customized, high-ROI marketing content tailored to your target focus keyword.</p>
                    </div>

                    <form onSubmit={handleGenerateCopy} className="space-y-4 bg-natural-light/60 p-5 rounded-[20px] border border-natural-card-border">
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xxs font-bold uppercase text-natural-muted tracking-wider mb-2 font-mono">Campaign Topic</label>
                          <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g. Free registration bonus"
                            className="w-full bg-white border border-natural-border focus:border-natural-primary focus:ring-1 focus:ring-natural-primary rounded-xl px-3 py-2 text-xs text-natural-text outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xxs font-bold uppercase text-natural-muted tracking-wider mb-2 font-mono">Content Format</label>
                          <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl px-3 py-2 text-xs text-natural-text outline-none"
                          >
                            <option value="headline">Social Headline Hooks</option>
                            <option value="email">Marketing Newsletter / Email</option>
                            <option value="blast">Telegram/WhatsApp Blast</option>
                            <option value="cta">Direct CTAs</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xxs font-bold uppercase text-natural-muted tracking-wider mb-2 font-mono">Persuasion Tone</label>
                          <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl px-3 py-2 text-xs text-natural-text outline-none"
                          >
                            <option value="Exciting">Viral & Exciting</option>
                            <option value="Convincing">Convincing & Trustworthy</option>
                            <option value="Professional">Corporate / Professional</option>
                            <option value="Local">Bengali Accented Accent</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xxs font-bold uppercase text-natural-muted tracking-wider mb-2 font-mono">Special Custom Prompt (Optional)</label>
                        <input
                          type="text"
                          value={customPrompt}
                          onChange={(e) => setCustomPrompt(e.target.value)}
                          placeholder="e.g. Highlight student side income, keep it under 3 bullets"
                          className="w-full bg-white border border-natural-border focus:border-natural-primary rounded-xl px-3 py-2 text-xs text-natural-text outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-natural-primary hover:bg-[#4E4E36] text-white font-serif italic font-bold py-3 rounded-full text-xs transition cursor-pointer flex justify-center items-center gap-1.5 disabled:opacity-50 shadow-sm"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Gemini is composing copy...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-white" />
                            <span>Generate Campaign Assets</span>
                          </>
                        )}
                      </button>
                    </form>

                    {/* Result Output Display */}
                    <div className="space-y-3">
                      <span className="block text-[10px] font-bold text-natural-muted uppercase tracking-wider font-mono">Composition Output</span>
                      
                      <div className="p-4 rounded-[20px] bg-natural-light border border-natural-card-border min-h-36 relative">
                        {isLoading ? (
                          <div className="absolute inset-0 bg-[#F5F2ED]/80 flex items-center justify-center rounded-[20px]">
                            <span className="text-xxs font-mono text-natural-primary animate-pulse">Running advanced copywriting models...</span>
                          </div>
                        ) : null}

                        {aiError && (
                          <div className="p-4 bg-red-400/5 border border-red-500/10 rounded-lg text-red-600 text-xs space-y-2">
                            <div className="flex gap-2 items-center">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <strong className="font-semibold">{aiError.includes("API_KEY") ? "API Key Missing" : "Composition Error"}</strong>
                            </div>
                            <p className="text-xxs text-slate-500 leading-relaxed">
                              {aiError.includes("API_KEY") 
                                ? "Your server does not have GEMINI_API_KEY injected in Settings > Secrets. Please add your credentials to enable live copywriting generation." 
                                : "The composition process failed. Check your network or system settings."}
                            </p>
                          </div>
                        )}

                        {aiResponse ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-natural-border pb-2">
                              <span className="text-[10px] text-natural-muted font-mono">Format: {format.toUpperCase()} Tone: {tone.toUpperCase()}</span>
                              <button
                                onClick={() => triggerCopy(aiResponse, "ai-response")}
                                className="px-2.5 py-1 bg-white hover:bg-[#E8E6DF] border border-natural-border text-natural-primary rounded text-xxs font-mono flex items-center gap-1 cursor-pointer"
                              >
                                {copiedId === "ai-response" ? <Check className="w-3.5 h-3.5 text-natural-primary" /> : <Copy className="w-3.5 h-3.5 text-natural-primary" />}
                                {copiedId === "ai-response" ? "Copied" : "Copy"}
                              </button>
                            </div>
                            <div className="text-[#3C3C32] text-xs leading-relaxed font-sans whitespace-pre-line select-text">
                              {aiResponse}
                            </div>
                          </div>
                        ) : null}

                        {!aiResponse && !aiError && !isLoading ? (
                          <p className="text-natural-muted text-xxs font-mono pt-12 text-center">Fill campaign fields and trigger generator. Composition will compile here.</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Tips & Best practices */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-natural-card-border rounded-[24px] space-y-5 shadow-xs">
              <h4 className="text-xs font-serif font-bold text-natural-heading uppercase tracking-wider font-mono">Quick Placement Guide</h4>
              
              <div className="space-y-4 text-xs font-sans leading-relaxed text-natural-muted">
                <div className="space-y-1.5 p-3.5 bg-[#FAF9F6] border border-natural-border rounded-[20px]">
                  <h5 className="font-bold text-natural-heading font-serif">Where to use Hooks?</h5>
                  <p className="text-xxs">Short, high-clickrate slogans that drive immediate curiosity. Copy and paste them into Facebook Group headers, Telegram group descriptions, or Instagram Bio links.</p>
                </div>

                <div className="space-y-1.5 p-3.5 bg-[#FAF9F6] border border-natural-border rounded-[20px]">
                  <h5 className="font-bold text-natural-heading font-serif">How to use Newsletters?</h5>
                  <p className="text-xxs">Broaden your outreach! Paste the messaging template into email campaigns, newsletters, or broadcast it directly into WhatsApp affiliate channels to guide immediate registrations.</p>
                </div>

                <div className="space-y-1.5 p-3.5 bg-[#FAF9F6] border border-natural-border rounded-[20px]">
                  <h5 className="font-bold text-natural-heading font-serif">Maximizing Referrals</h5>
                  <p className="text-xxs">Replace <code className="text-natural-primary font-mono text-[10px]">[YourLinkHere]</code> with your share link generated from the cash dashboard. Start building your affiliate commission networks today!</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-natural-card-border rounded-[24px] space-y-4 text-xxs font-mono text-natural-muted leading-relaxed shadow-xs">
              <span className="text-[10px] text-natural-heading font-bold uppercase tracking-wider block">Simulator Guidelines</span>
              <p>This marketing kit coordinates with the live user dashboard. Copy hooks, modify, share, and track active refer counts under your profile node dynamically.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
