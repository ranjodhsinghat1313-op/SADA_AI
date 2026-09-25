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
    <section id="how-it-works" className="py-24 sm:py-28 md:py-36 bg-[#F8FAFC]/75 dark:bg-[#070E22]/80 backdrop-blur-md text-slate-900 dark:text-slate-100 relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-300">
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
          
          {steps.map((s, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative rounded-[28px] sm:rounded-[32px] bg-[#F1F4F9] dark:bg-[#111C35] p-8 sm:p-10 border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-start transition-all duration-300 z-10 group cursor-default"
              >
                {/* Top Pill Badge */}
                <div className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#182647] border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 text-xs font-medium w-fit mb-6 shadow-xs">
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{s.step}</span>
                  <span className="text-slate-300 dark:text-slate-600 mx-1.5">·</span>
                  <span>{s.subtitle}</span>
                </div>

                {/* Heading */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {s.description}
                </p>
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
