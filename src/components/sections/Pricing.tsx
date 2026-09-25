import React, { useState } from "react";
import { Check, Sparkles, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const [activeTab, setActiveTab] = useState<number>(1);

  const plans = [
    {
      name: "Starter",
      badge: "Sole Practitioners",
      price: "$299",
      priceSub: "AUD / month",
      tagline: "Essential after-hours & overflow answering for solo practices.",
      features: [
        "Up to 150 minutes of AI voice calls / mo",
        "Australian & New Zealand trained voice",
        "Direct Google Calendar & Outlook sync",
        "Automated booking confirmation SMS",
        "Real-time email summary of every call",
        "Warm call forwarding to human mobile",
      ],
      ctaText: "Start Starter Plan",
      isPopular: false,
    },
    {
      name: "Growth",
      badge: "Most Popular",
      price: "$599",
      priceSub: "AUD / month",
      tagline: "Full-time 24/7 receptionist for high-volume busy practices.",
      features: [
        "Up to 500 minutes of AI voice calls / mo",
        "All Australian & NZ voice accents",
        "Cliniko, ServiceM8 & CRM bi-directional sync",
        "Custom clinic protocols & fee schedules",
        "Instant SMS cancellation & reschedule links",
        "Priority live onboarding & voice tailoring",
        "Dedicated VIP support channel",
      ],
      ctaText: "Start Growth Plan",
      isPopular: true,
    },
    {
      name: "Scale",
      badge: "Multi-Location Clinics",
      price: "$1,199",
      priceSub: "AUD / month",
      tagline: "Multi-location clinics requiring custom CRM routing.",
      features: [
        "Up to 1,500 minutes of AI voice calls / mo",
        "Multi-location calendar & doctor routing",
        "Custom EHR & CRM API integration",
        "Custom voice persona & brand greeting",
        "Multi-line simultaneous call overflow",
        "Dedicated account manager",
        "Quarterly ROI & operational review",
      ],
      ctaText: "Contact for Scale",
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-28 md:py-36 bg-white/75 dark:bg-[#0A1128]/80 backdrop-blur-md text-slate-900 dark:text-slate-100 border-t border-slate-200/80 dark:border-slate-800 relative transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

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
            Transparent pricing for growing practices.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            One extra booking captured per month pays for the entire service. Month-to-month flexibility with zero hidden fees.
          </p>
        </motion.div>

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300/80 dark:border-slate-700/80">
            {plans.map((p, idx) => (
              <button
                key={p.name}
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === idx
                    ? "bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Single Card Carousel */}
        <div className="lg:hidden max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            {(() => {
              const p = plans[activeTab];
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative shadow-xl ${
                    p.isPopular
                      ? "bg-slate-900 dark:bg-[#111C35] text-white border-2 border-blue-500 shadow-blue-600/20"
                      : "bg-[#F1F4F9] dark:bg-[#111C35] text-slate-900 dark:text-slate-100 border border-slate-200/60 dark:border-slate-800/80"
                  }`}
                >
                  {p.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold shadow-xs mb-3 w-fit ${
                        p.isPopular 
                          ? "bg-white/10 border border-white/20 text-blue-300" 
                          : "bg-white dark:bg-[#182647] border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200"
                      }`}>
                        {p.badge}
                      </div>
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

        {/* Desktop 3-Card Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5 sm:gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: idx * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 flex flex-col justify-between transition-all duration-300 relative shadow-xl ${
                p.isPopular
                  ? "bg-slate-900 dark:bg-[#111C35] text-white border-2 border-blue-500 z-10 shadow-2xl shadow-blue-600/25 lg:scale-[1.02]"
                  : "bg-[#F1F4F9] dark:bg-[#111C35] text-slate-900 dark:text-slate-100 border border-slate-200/60 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-md dark:shadow-xl"
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-blue-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <div className="mb-4 sm:mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold shadow-xs mb-3 w-fit ${
                    p.isPopular 
                      ? "bg-white/10 border border-white/20 text-blue-300" 
                      : "bg-white dark:bg-[#182647] border border-slate-200/80 dark:border-slate-700/60 text-slate-800 dark:text-slate-200"
                  }`}>
                    {p.badge}
                  </div>
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
