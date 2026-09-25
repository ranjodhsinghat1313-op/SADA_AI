"use client";

import React from "react";
import { Clock, ShieldCheck, Calendar, MapPin, Zap, Award } from "lucide-react";
import { motion } from "motion/react";

export function TrustStrip() {
  const items = [
    {
      icon: Clock,
      title: "24/7/365 Coverage",
      desc: "Nights, weekends, public holidays & peak overflow",
    },
    {
      icon: MapPin,
      title: "AU & NZ Local Voices",
      desc: "Authentic accents, local slang & suburb recognition",
    },
    {
      icon: Calendar,
      title: "Direct Calendar & CRM Sync",
      desc: "Google, Outlook, Cliniko, ServiceM8, HubSpot & Zoho",
    },
    {
      icon: ShieldCheck,
      title: "Privacy & Data Guardrails",
      desc: "Strict approved knowledge only, zero hallucinated facts",
    },
    {
      icon: Zap,
      title: "Sub-Second Pick-up",
      desc: "Immediate answer time, zero hold music or voicemails",
    },
    {
      icon: Award,
      title: "Zero Setup Fee",
      desc: "No lock-in contracts, flexible month-to-month terms",
    },
  ];

  return (
    <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-[#070E22]/60 backdrop-blur-md text-slate-900 dark:text-slate-100 py-16 sm:py-24 md:py-28 relative overflow-hidden transition-colors duration-300">
      {/* Subtle blue ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[250px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Enterprise Voice Infrastructure
          </h3>
          <p className="text-sm sm:text-base font-normal text-slate-600 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
            Bank-grade reliability built for high-volume clinics and service businesses across Australia & New Zealand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.map((item, idx) => {
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.04, ease: "easeOut" }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#111C35] p-6 sm:p-7 border border-slate-200/70 dark:border-slate-800/80 transition-all flex flex-col justify-start group cursor-default"
              >
                <div className="px-3 py-1 rounded-md bg-slate-100 dark:bg-[#182647] border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 text-xs font-medium w-fit mb-4 shadow-xs">
                  {idx === 0 ? "Coverage" : idx === 1 ? "Voices" : idx === 2 ? "Integration" : idx === 3 ? "Compliance" : idx === 4 ? "Latency" : "Pricing"}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
