"use client";

import React, { useState } from "react";
import { Check, Sparkles, Shield, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const [selectedMobilePlan, setSelectedMobilePlan] = useState<number>(1); // Default to 'Growth' (Most Popular)

  const plans = [
    {
      name: "Starter",
      badge: "Solo & Small Practices",
      tagline: "Entry-level 24/7 AI phone receptionist to capture every missed call.",
      price: "Tailored Quote",
      priceSub: "Based on monthly call volume",
      isPopular: false,
      features: [
        "24/7/365 AI Inbound Answering",
        "Direct Appointment Booking",
        "Google Calendar & Outlook Sync",
        "Automated SMS Confirmations",
        "Full Call Audio Recordings",
        "Instant Transcripts & Summaries",
        "Standard AU/NZ Voices",
        "Monthly Flexible Call Allowance",
      ],
      ctaText: "Get Starter Quote",
    },
    {
      name: "Growth",
      badge: "Most Popular",
      tagline: "Comprehensive operational automation for busy surgeries, agencies & trades.",
      price: "Tailored Quote",
      priceSub: "Custom minutes & features",
      isPopular: true,
      features: [
        "Everything in Starter, plus:",
        "Full CRM Integration (Cliniko, ServiceM8, HubSpot)",
        "Advanced Clinical / Job Qualification Logic",
        "Warm Live Transfers to Human Staff",
        "Custom Voice Cadence & Branded Greetings",
        "Real-Time Analytics & Sentiment Dashboard",
        "Cancellation & Rescheduling Workflows",
        "Priority Australian Phone & Email Support",
      ],
      ctaText: "Get Growth Quote",
    },
    {
      name: "Scale",
      badge: "Multi-Site & Franchises",
      tagline: "High-volume call handling across multi-location clinics and large teams.",
      price: "Tailored Quote",
      priceSub: "Enterprise volume discount",
      isPopular: false,
      features: [
        "Everything in Growth, plus:",
        "Unlimited Inbound Call Capacity",
        "Multiple Dedicated Phone Numbers",
        "Multi-Location Practice Routing",
        "Automated Outbound Appointment Reminders",
        "Custom API & EHR / Webhook Integrations",
        "Dedicated Account Manager",
        "Custom SLA & HIPAA/Privacy Guarantees",
      ],
      ctaText: "Get Scale Quote",
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-28 md:py-36 bg-white dark:bg-[#0A1128] text-slate-900 dark:text-slate-100 border-t border-slate-200/90 dark:border-slate-800 relative transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Flexible Practice Pricing</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            Tailored plans designed around your call volume.
          </h2>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            No expensive setup fees, no restrictive lock-in contracts. You only pay for what your business actually uses, with complete flexibility to scale up or down.
          </p>
        </motion.div>

        {/* Mobile Interactive Plan Switcher Tabs (Visible on mobile only) */}
        <div className="lg:hidden mb-6 max-w-sm mx-auto">
          <div className="flex items-center p-1 rounded-2xl bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 shadow-inner">
            {plans.map((p, idx) => {
              const isSelected = selectedMobilePlan === idx;
              return (
                <button
                  key={p.name}
                  onClick={() => setSelectedMobilePlan(idx)}
                  className={`relative flex-1 py-2 px-2 text-xs font-bold rounded-xl transition-all duration-200 text-center cursor-pointer ${
                    isSelected
                      ? "text-white shadow-md shadow-blue-600/30"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeMobilePlanHighlight"
                      className="absolute inset-0 bg-blue-600 rounded-xl"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1 font-semibold">
                    <span>{p.name}</span>
                    {p.isPopular && (
                      <span className={`text-[9px] px-1 rounded font-extrabold ${isSelected ? "bg-blue-800/80 text-blue-100" : "bg-blue-600 text-white"}`}>
                        ★
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Single Active Card Display (Interactive switcher output) */}
        <div className="lg:hidden max-w-sm mx-auto mb-6">
          <AnimatePresence mode="wait">
            {(() => {
              const p = plans[selectedMobilePlan];
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative shadow-xl ${
                    p.isPopular
                      ? "bg-slate-900 dark:bg-[#14213D] text-white border-2 border-blue-500 shadow-2xl shadow-blue-600/25"
                      : "bg-white dark:bg-[#14213D] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-xl"
                  }`}
                >
                  {p.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <span className={`text-[11px] font-semibold uppercase tracking-wider ${p.isPopular ? "text-blue-400" : "text-blue-600 dark:text-blue-400"}`}>
                        {p.badge}
                      </span>
                      <h3 className={`text-xl font-bold mt-1 ${p.isPopular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                        {p.name} Plan
                      </h3>
                      <p className={`text-xs mt-1 leading-relaxed ${p.isPopular ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>
                        {p.tagline}
                      </p>
                    </div>

                    <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <div className={`text-2xl font-extrabold ${p.isPopular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                        {p.price}
                      </div>
                      <div className={`text-[11px] mt-0.5 ${p.isPopular ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
                        {p.priceSub}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6 text-xs">
                      {p.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${p.isPopular ? "text-blue-400" : "text-blue-600 dark:text-blue-400"}`} />
                          <span className={p.isPopular ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Button
                      onClick={() => onSelectPlan(p.name)}
                      className={`w-full py-3 h-auto text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer ${
                        p.isPopular
                          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                          : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      <span>{p.ctaText}</span>
                    </Button>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Desktop 3-Card Grid (Preserved strictly for desktop, hidden on mobile) */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 relative shadow-xl ${
                p.isPopular
                  ? "bg-slate-900 dark:bg-[#14213D] text-white border-2 border-blue-500 z-10 shadow-2xl shadow-blue-600/25 lg:scale-[1.02]"
                  : "bg-white dark:bg-[#14213D] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-md dark:shadow-xl"
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-blue-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-4 sm:mb-6">
                  <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${p.isPopular ? "text-blue-400" : "text-blue-600 dark:text-blue-400"}`}>
                    {p.badge}
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${p.isPopular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {p.name}
                  </h3>
                  <p className={`text-xs mt-1.5 sm:mt-2 leading-relaxed ${p.isPopular ? "text-slate-300" : "text-slate-600 dark:text-slate-400"}`}>
                    {p.tagline}
                  </p>
                </div>

                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div className={`text-2xl sm:text-3xl font-extrabold ${p.isPopular ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {p.price}
                  </div>
                  <div className={`text-[11px] sm:text-xs mt-1 ${p.isPopular ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
                    {p.priceSub}
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 text-xs">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 sm:gap-2.5">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${p.isPopular ? "text-blue-400" : "text-blue-600 dark:text-blue-400"}`} />
                      <span className={p.isPopular ? "text-slate-200" : "text-slate-700 dark:text-slate-300"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Button
                  onClick={() => onSelectPlan(p.name)}
                  className={`w-full py-3 h-auto text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer ${
                    p.isPopular
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  <span>{p.ctaText}</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800 text-center max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 text-xs text-slate-500 dark:text-slate-400"
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" /> No Lock-in Contracts (Cancel Anytime)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" /> Free 14-Day Practice Pilot
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" /> Keep Your Existing Phone Number
          </span>
        </motion.div>

      </div>
    </section>
  );
}
