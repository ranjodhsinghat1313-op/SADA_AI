"use client";

import React from "react";
import { Zap, CalendarCheck, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function Outcomes() {
  const outcomes = [
    {
      icon: Zap,
      metric: "< 1s",
      label: "Average Response Time",
      description:
        "Every inbound call is answered instantly. Zero callers waiting on hold, zero frustrating phone trees, and zero patients lost to voicemail.",
      comparison: "Eliminates caller hang-ups & phone tag",
    },
    {
      icon: CalendarCheck,
      metric: "+35%",
      label: "More Completed Bookings",
      description:
        "Capturing after-hours inquiries, weekend emergencies, and lunch-break calls converts missed dials into confirmed diary appointments.",
      comparison: "Average 20–30 new monthly bookings",
    },
    {
      icon: Clock,
      metric: "15+ hrs",
      label: "Staff Admin Saved Weekly",
      description:
        "Frees up your clinic receptionists from repetitive scheduling calls and rescheduling requests so they can focus on in-person care.",
      comparison: "Reduces receptionist burnout and overtime",
    },
  ];

  return (
    <section 
      id="outcomes-section" 
      className="py-24 sm:py-32 md:py-40 bg-[#0A1128] text-white relative overflow-hidden border-y border-slate-800 transition-colors duration-300"
    >
      {/* Subtle Dot Pattern Texture (Minimalist Modern DNA) */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Ambient Radial Electric Blue Glows */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Verified Clinic Performance</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Proven operational impact on your bottom line.
          </h2>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Measurable metrics delivered to dental practices, medical specialists, and high-volume service businesses across Australia & New Zealand.
          </p>
        </motion.div>

        {/* Mobile Modern Bento Arrangement (Takes minimal vertical space with concise content) */}
        <div className="md:hidden space-y-3">
          {/* Featured Top Card: < 1s */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative rounded-2xl bg-[#14213D]/90 backdrop-blur-md p-4 sm:p-5 border border-slate-700/80 shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded-full">
                <span>Verified</span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>

            <div className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent tracking-tight font-stat">
              {outcomes[0].metric}
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {outcomes[0].label}
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              Instant sub-second call pickup. Zero hold time or missed voicemails.
            </p>
          </motion.div>

          {/* 2-Column Split for +35% and 15+ hrs */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 2: +35% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.05 }}
              className="relative rounded-2xl bg-[#14213D]/90 backdrop-blur-md p-3.5 border border-slate-700/80 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                    <CalendarCheck className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent tracking-tight font-stat">
                  {outcomes[1].metric}
                </div>
                <div className="text-xs font-bold text-white mt-0.5 leading-tight">
                  {outcomes[1].label}
                </div>
              </div>
              <p className="text-[10px] text-slate-300 mt-1.5 leading-snug">
                Captures after-hours & weekend patient calls.
              </p>
            </motion.div>

            {/* Card 3: 15+ hrs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.1 }}
              className="relative rounded-2xl bg-[#14213D]/90 backdrop-blur-md p-3.5 border border-slate-700/80 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent tracking-tight font-stat">
                  {outcomes[2].metric}
                </div>
                <div className="text-xs font-bold text-white mt-0.5 leading-tight">
                  {outcomes[2].label}
                </div>
              </div>
              <p className="text-[10px] text-slate-300 mt-1.5 leading-snug">
                Frees front-desk staff from repetitive triage.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Desktop 3-Card Grid (Preserved strictly for desktop, hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
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
                whileHover={{ 
                  y: -6, 
                  scale: 1.015, 
                  transition: { duration: 0.25, ease: "easeOut" } 
                }}
                className="relative rounded-2xl sm:rounded-3xl bg-[#14213D]/90 backdrop-blur-md p-6 sm:p-8 md:p-10 border border-slate-700/80 flex flex-col justify-between overflow-hidden group hover:border-blue-400/80 hover:shadow-2xl hover:shadow-blue-600/20 transition-all duration-300 shadow-xl cursor-default"
              >
                {/* Subtle top card glow */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded-full">
                      <span>Verified</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent tracking-tight font-stat mb-2.5">
                    {item.metric}
                  </div>

                  <div className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-2.5">
                    {item.label}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 sm:pt-4 border-t border-slate-700/60 text-xs font-medium text-slate-300 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400/50" />
                  <span>{item.comparison}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
