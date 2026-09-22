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
    <div className="border-b border-slate-200 dark:border-slate-800/90 bg-slate-100/70 dark:bg-[#070E22] text-slate-900 dark:text-slate-100 py-16 sm:py-24 md:py-28 relative overflow-hidden transition-colors duration-300">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: idx * 0.04 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2.5 group cursor-default p-2 rounded-xl"
              >
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-white dark:bg-[#14213D] border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:border-blue-500/60 group-hover:text-white group-hover:bg-blue-600 transition-all shadow-sm sm:shadow-md dark:shadow-black/30">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-snug sm:leading-relaxed max-w-[190px]">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
