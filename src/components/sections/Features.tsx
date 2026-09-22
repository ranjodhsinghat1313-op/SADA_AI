import React from "react";
import { 
  PhoneCall, 
  Mic2, 
  BarChart3, 
  CalendarSync, 
  Clock4, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";

interface FeaturesProps {
  onBookDemo: () => void;
}

export function Features({ onBookDemo }: FeaturesProps) {
  const features = [
    {
      icon: PhoneCall,
      tag: "Immediate Pick-up",
      title: "Instant Call Handling",
      description:
        "Answers in under one second on the very first ring. SADA AI handles appointment bookings, reschedules, cancellations, and clinic inquiries with zero hold music and zero voicemails.",
      benefits: ["Sub-second answer speed", "Reschedule & cancellation logic", "Zero caller wait time"],
    },
    {
      icon: Mic2,
      tag: "Authentic Pronunciation",
      title: "Natural Local AU & NZ Voices",
      description:
        "Trained specifically on Australian and Kiwi vocal cadences, terminology, and phonetics. It effortlessly recognizes local suburb names (like Woolloomooloo, Parramatta, or Whangārei) and colloquial speech.",
      benefits: ["Authentic Aussie & Kiwi accents", "Recognizes regional suburbs", "Human-like conversational pacing"],
    },
    {
      icon: BarChart3,
      tag: "Operational Intelligence",
      title: "Real-Time Analytics & Transcripts",
      description:
        "Every single customer interaction is transcribed, summarized, and categorized. Access call audio recordings, sentiment analysis, caller intent, and booking conversion metrics on your dashboard.",
      benefits: ["Full audio logs & transcripts", "Automated call executive summaries", "Caller intent & sentiment analysis"],
    },
    {
      icon: CalendarSync,
      tag: "Bi-Directional Connectivity",
      title: "Calendar & CRM Synchronization",
      description:
        "Directly integrates with Google Calendar, Microsoft Outlook, Cliniko, ServiceM8, HubSpot, and Zoho. New appointments are immediately reserved with instant SMS & email confirmation.",
      benefits: ["Real-time schedule conflict prevention", "Instant confirmation SMS & email", "Lead profile creation in CRM"],
    },
    {
      icon: Clock4,
      tag: "Always On Duty",
      title: "24/7/365 Non-Stop Coverage",
      description:
        "Capture valuable emergency calls and after-hours bookings while your clinic or office is closed. SADA AI never takes sick leave, never sleeps, and never leaves a potential client unanswered.",
      benefits: ["After-hours & weekend triage", "Public holiday coverage", "High-volume call overflow handling"],
    },
    {
      icon: ShieldCheck,
      tag: "Guardrailed AI",
      title: "Strict Business Knowledge Compliance",
      description:
        "Your AI receptionist strictly relies on your approved business documentation, fee structures, and clinical protocols. It never makes up false answers and can warm-transfer complex calls to human staff.",
      benefits: ["Zero hallucinations or guessing", "Warm transfer to human staff", "Enterprise data privacy compliance"],
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-28 md:py-36 bg-white dark:bg-[#0A1128] text-slate-900 dark:text-slate-100 border-t border-slate-200/90 dark:border-slate-800 relative transition-colors duration-300">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
            More than just software. A reliable 24/7 team member.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            SADA AI acts as a dedicated receptionist that works alongside your team, answering inquiries, qualifying leads, and syncing with your business tools without error.
          </p>
        </motion.div>

        {/* Feature Cards Grid (4 core boards on mobile, all 6 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            const isDesktopOnly = idx === 2 || idx === 5; // Exclude analytics & strict compliance on mobile
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 240, 
                  damping: 18, 
                  delay: idx * 0.05,
                  mass: 0.8
                }}
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
                className={`rounded-3xl bg-white dark:bg-[#14213D] p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md dark:shadow-xl hover:shadow-2xl hover:border-blue-500/60 transition-all duration-300 flex-col justify-between group cursor-default ${
                  isDesktopOnly ? "hidden md:flex" : "flex"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-blue-600/25 shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-200 dark:border-blue-800/60">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-2.5">
                    {feat.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 sm:mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  {feat.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-14 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-900 dark:bg-gradient-to-r dark:from-[#14213D] dark:via-[#1A2C52] dark:to-[#14213D] border border-slate-800 dark:border-blue-500/30 text-white flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xl"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">Want to see your customized clinic workflow?</h4>
            <p className="text-xs text-slate-300">We build your custom FAQ & booking flow in 48 hours for your free live trial.</p>
          </div>
          <button
            onClick={onBookDemo}
            className="w-full sm:w-auto justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-600/30 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-blue-200" /> Request Custom Flow Demo
          </button>
        </motion.div>

      </div>
    </section>
  );
}
