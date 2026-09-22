"use client";

import React from "react";
import { PhoneIncoming, BrainCircuit, CheckCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface HowItWorksProps {
  onBookDemo: () => void;
}

export function HowItWorks({ onBookDemo }: HowItWorksProps) {
  const steps = [
    {
      step: "01",
      icon: PhoneIncoming,
      title: "Incoming Call Pick-up",
      subtitle: "Answers on the 1st ring",
      description:
        "A customer dials your regular business phone number. SADA AI picks up in under a second with a natural Australian or New Zealand greeting, identifying your practice warmly.",
      details: [
        "Uses existing phone numbers (no change needed)",
        "Zero voicemail or hold music delays",
        "Identifies returning patients vs. new leads",
      ],
    },
    {
      step: "02",
      icon: BrainCircuit,
      title: "Intelligent Interaction",
      subtitle: "Qualifies & answers questions",
      description:
        "The AI understands natural conversational speech, answers approved questions about your services and pricing, and queries your live calendar for real-time slot availability.",
      details: [
        "Understands complex queries & interruptions",
        "Follows clinic guidelines strictly",
        "Checks staff calendars without double-booking",
      ],
    },
    {
      step: "03",
      icon: CheckCheck,
      title: "Seamless Confirmation",
      subtitle: "Calendar sync & SMS confirmation",
      description:
        "The appointment is instantly booked into your diary, the customer receives an immediate confirmation SMS with directions, and the lead is logged into your CRM.",
      details: [
        "Bi-directional calendar synchronization",
        "Automated SMS booking reminder sent",
        "Warm transfer to human staff if requested",
      ],
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-28 md:py-36 bg-[#F8FAFC]/90 dark:bg-[#070E22] text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200/90 dark:border-slate-800 transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
            Effortless booking in three simple steps.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            From the moment your phone rings to the moment the patient walks through your doors, SADA AI manages the entire call journey automatically.
          </p>
        </motion.div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/3 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-blue-300 via-blue-600 to-blue-300 dark:from-blue-900 dark:via-blue-600 dark:to-blue-900 -z-0" />

          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 240, 
                  damping: 18, 
                  delay: idx * 0.06,
                  mass: 0.8
                }}
                whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25 } }}
                className="relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14213D] backdrop-blur-md p-5 sm:p-8 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-blue-500/60 transition-all duration-300 z-10 group shadow-md dark:shadow-xl cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shrink-0">
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-blue-200 dark:text-blue-500/30 group-hover:text-blue-600 dark:group-hover:text-blue-400/80 transition-colors">
                      {s.step}
                    </span>
                  </div>

                  <span className="text-[11px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                    {s.subtitle}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-3">
                    {s.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 sm:mb-6">
                    {s.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  {s.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <Button
            onClick={onBookDemo}
            className="w-full sm:w-auto px-8 py-3.5 h-auto text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 mr-2" /> Start Your Practice Setup
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
