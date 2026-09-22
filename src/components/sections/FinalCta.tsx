"use client";

import React, { useState } from "react";
import { PhoneCall, Sparkles, Mail, ShieldCheck, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

interface FinalCtaProps {
  onBookDemo: () => void;
}

export function FinalCta({ onBookDemo }: FinalCtaProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="final-cta" className="py-24 sm:py-28 md:py-36 bg-[#0A1128] text-white relative overflow-hidden border-t border-slate-800">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.2),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(10,17,40,0.9),transparent_50%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Ready to experience SADA AI?
          </h2>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Test our Australian demo line immediately, or enter your email below to receive a personalized clinic setup within 2 hours.
          </p>

          {/* Compact Action Box (Reduced Height, Integrated Direct Email Contact) */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#14213D]/90 border border-slate-700/80 shadow-2xl backdrop-blur-md">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-3 flex items-center justify-center gap-2 text-emerald-400 text-xs sm:text-sm font-bold"
                >
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span>Request received! Our Sydney team will contact {email} within 2 hours.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5">
                  <div className="relative w-full">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your business email..."
                      required
                      className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-hidden focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all font-sans"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer flex items-center justify-center gap-1.5 h-auto"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Get Free Demo</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Direct Demo Dial Row (Compact, Space-Efficient) */}
              <div className="mt-3 sm:mt-3.5 pt-3 sm:pt-3.5 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-2.5 text-xs">
                <a
                  href="tel:+61280007232"
                  className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="h-6 w-6 rounded-lg bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <PhoneCall className="h-3 w-3" />
                  </div>
                  <span className="text-[11px] sm:text-xs">Instant Test Line: <strong className="text-white font-mono group-hover:text-blue-300 transition-colors">+61 2 8000 7232</strong></span>
                </a>

                <div className="flex items-center gap-2.5 sm:gap-3 text-slate-400 text-[10px] sm:text-[11px]">
                  <span>24/7/365 Active</span>
                  <span>·</span>
                  <a href="mailto:contact@sadaai.com.au" className="hover:text-slate-200 transition-colors">
                    contact@sadaai.com.au
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantees strip */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[10px] sm:text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" /> Australian Privacy Principles Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-400 shrink-0" /> Onboarding in 48-72 Hours
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
