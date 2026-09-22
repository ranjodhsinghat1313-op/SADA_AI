"use client";

import React, { useState } from "react";
import { 
  Smile, 
  Stethoscope, 
  Wrench, 
  Home, 
  Scissors, 
  Scale, 
  Car, 
  Dumbbell, 
  Cat, 
  Activity, 
  Zap, 
  UtensilsCrossed, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface IndustriesProps {
  onBookDemo: () => void;
}

export function Industries({ onBookDemo }: IndustriesProps) {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      icon: Smile,
      name: "Dental Clinics",
      summary: "Triages tooth pain emergencies, schedules cleans & checkups, updates Cliniko.",
      sampleCall: "“Hi, I chipped a molar eating lunch, can I see Dr. Mitchell tomorrow?”",
      callOutcome: "Booked 2:30 PM slot, synced with Cliniko, sent SMS prep instructions.",
    },
    {
      icon: Stethoscope,
      name: "Medical & Specialists",
      summary: "Patient intake, doctor consultation bookings, referral check & appointment confirmations.",
      sampleCall: "“Do you have any dermatology consultation slots open with Dr. Green this Friday?”",
      callOutcome: "Verified referral, booked Friday 11:00 AM, collected pre-appointment notes.",
    },
    {
      icon: Wrench,
      name: "Trades & Home Services",
      summary: "Qualifies jobs, captures address/suburb, schedules technician on-site visits via ServiceM8.",
      sampleCall: "“We have water leaking through our laundry ceiling right now in Coogee.”",
      callOutcome: "Flagged emergency leak, dispatched nearest technician, SMS alert sent to owner.",
    },
    {
      icon: Home,
      name: "Real Estate Agencies",
      summary: "Schedules private property inspections, registers open-home visitors, logs buyers in CRM.",
      sampleCall: "“I’d like to book an inspection for 42 Ocean Street this Saturday morning.”",
      callOutcome: "Registered buyer for 10:30 AM open home, synced with Rex CRM.",
    },
    {
      icon: Scissors,
      name: "Salons & Aesthetics",
      summary: "Books treatments, stylist selection, answers service pricing, prevents no-shows with SMS.",
      sampleCall: "“Can I get a balayage and haircut with Sarah this Saturday afternoon?”",
      callOutcome: "Booked 3:00 PM session, took deposit via SMS link, updated Timely calendar.",
    },
    {
      icon: Scale,
      name: "Legal & Accounting",
      summary: "Initial client intake, fee structure disclosure, schedules 30-minute discovery consultations.",
      sampleCall: "“I need to speak with a tax accountant regarding small business restructuring.”",
      callOutcome: "Qualified caller needs, booked initial consultation, added to Clio CRM.",
    },
    {
      icon: Car,
      name: "Automotive Workshops",
      summary: "Logbook service scheduling, tyre replacement bookings, urgent mechanical repairs.",
      sampleCall: "“I need a 60,000km logbook service for my Toyota RAV4 next Tuesday.”",
      callOutcome: "Collected rego details, booked courtesy car, added to workshop schedule.",
    },
    {
      icon: Dumbbell,
      name: "Gyms & Fitness Studios",
      summary: "Trial class bookings, personal training scheduling, membership inquiry answers.",
      sampleCall: "“Do you have space in the 6:00 AM Pilates class tomorrow for a free trial?”",
      callOutcome: "Enrolled in class, sent digital waiver form to phone number via SMS.",
    },
    {
      icon: Cat,
      name: "Veterinary Clinics",
      summary: "Vaccination reminders, routine checkups, emergency pet triage and intake notes.",
      sampleCall: "“My golden retriever has been limping since yesterday afternoon.”",
      callOutcome: "Booked afternoon vet consult, logged symptom notes for attending vet.",
    },
    {
      icon: Activity,
      name: "Allied Health & Physio",
      summary: "Physiotherapy, chiropractic, and podiatry scheduling with practitioner matching.",
      sampleCall: "“I strained my lower back at rugby training, need a physio today if possible.”",
      callOutcome: "Matched sports physiotherapist, booked 4:45 PM slot, sent intake form.",
    },
    {
      icon: Zap,
      name: "Plumbing & Electrical",
      summary: "24/7 emergency dispatch, job quoting triage, address validation in local suburbs.",
      sampleCall: "“Our hot water system blew up and we have no hot water in Manly.”",
      callOutcome: "Categorized urgent priority, dispatched on-call plumber, notified manager.",
    },
    {
      icon: UtensilsCrossed,
      name: "Hospitality & Tours",
      summary: "Large table bookings, dietary requirement recording, private dining inquiries.",
      sampleCall: "“I’d like to book a table for 8 people this Friday at 7:30 PM with 1 gluten-free guest.”",
      callOutcome: "Reserved table, logged dietary notes, sent SMS reservation code.",
    },
  ];

  const current = industries[selectedIndustry];

  return (
    <section id="industries" className="py-20 md:py-28 bg-[#F8FAFC] dark:bg-[#0A1128] text-slate-900 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800 relative transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 mb-4 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">
              SECTOR SPECIALISATIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            If your business phone rings, SADA AI can answer it.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Tailored conversational logic, jargon, and booking rules custom-built for high-volume service businesses across Australia & New Zealand.
          </p>
        </motion.div>

        {/* Industry Grid Selection with spring pop-up stagger */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isSelected = selectedIndustry === idx;
            return (
              <motion.button
                key={ind.name}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 240, damping: 18, delay: idx * 0.035 }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedIndustry(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col items-start gap-2.5 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30 scale-[1.02]"
                    : "bg-white dark:bg-[#14213D] text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-[#1A2C52] shadow-xs"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-white/20 text-white" : "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 shadow-xs"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold leading-tight">{ind.name}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Industry Detail Showcase Card with smooth entrance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-3xl bg-slate-900 dark:bg-[#14213D] text-white p-7 sm:p-10 shadow-2xl border border-slate-800 dark:border-slate-700/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800/80">
                  Industry Focus
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{current.name}</h3>
              </div>
              
              <p className="text-base text-slate-300 leading-relaxed">
                {current.summary}
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 dark:bg-[#0A1128] border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                  Live Interaction Example
                </div>
                <p className="text-sm italic text-slate-200 font-serif">
                  {current.sampleCall}
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-300 font-medium pt-1">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  <span><strong>AI Action:</strong> {current.callOutcome}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
              <div className="p-6 rounded-2xl bg-slate-950/80 dark:bg-[#0A1128]/80 border border-slate-800 w-full space-y-4 text-left">
                <h4 className="text-sm font-bold text-white">Have a specific clinic or dispatch workflow?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We pre-train SADA AI on your price lists, staff timetables, and intake questions during your complimentary setup.
                </p>
                <button
                  onClick={onBookDemo}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book a {current.name} Demo</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
