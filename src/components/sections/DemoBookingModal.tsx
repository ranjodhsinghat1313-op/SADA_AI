import React, { useState } from "react";
import { X, CheckCircle, PhoneCall, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export function DemoBookingModal({ isOpen, onClose, defaultPlan }: DemoBookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    industry: "Dental / Medical",
    monthlyCalls: "100 - 500 calls/mo",
    plan: defaultPlan || "Growth Plan",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14213D] text-slate-900 dark:text-slate-100 shadow-2xl border border-slate-200 dark:border-slate-700/80"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 rounded-full p-1.5 sm:p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors z-10"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <div className="p-5 sm:p-8">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                AU & NZ Live AI Onboarding
              </span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Book Your Free SADA AI Demo
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Hear our AI speak in real time, customize your clinic or business call flow, and test calendar integration in 15 minutes.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Dr. David Campbell"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#0A1128] border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Business Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Bondi Dental Care"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#0A1128] border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number (AU / NZ)</label>
                  <input
                    required
                    type="tel"
                    placeholder="+61 400 123 456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#0A1128] border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="contact@practice.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#0A1128] border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#0A1128] border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
                  >
                    <option>Dental Clinic</option>
                    <option>Medical & Allied Health</option>
                    <option>Trades & Home Services</option>
                    <option>Real Estate Agency</option>
                    <option>Salon & Aesthetics</option>
                    <option>Legal & Accounting</option>
                    <option>Automotive Service</option>
                    <option>Fitness / Wellness</option>
                    <option>Veterinary Clinic</option>
                    <option>Other Service Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Estimated Monthly Calls</label>
                  <select
                    value={formData.monthlyCalls}
                    onChange={(e) => setFormData({ ...formData, monthlyCalls: e.target.value })}
                    className="w-full rounded-xl bg-slate-50 dark:bg-[#0A1128] border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:border-blue-500 focus:outline-hidden"
                  >
                    <option>Under 100 calls/mo</option>
                    <option>100 - 500 calls/mo</option>
                    <option>500 - 1,500 calls/mo</option>
                    <option>1,500+ calls/mo (Multi-site)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="navy" className="w-full py-3 h-11 sm:h-12 text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 bg-blue-600 hover:bg-blue-500 text-white cursor-pointer">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-200" /> Schedule Free 15-Min Live Demo
                </Button>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 pt-0.5 sm:pt-1">
                <span>✓ No lock-in contract</span>
                <span>✓ No setup fee</span>
                <span>✓ 14-day free pilot</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-5 sm:p-8 text-center space-y-3 sm:space-y-4">
            <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 shadow-lg">
              <CheckCircle className="h-7 w-7 sm:h-10 sm:w-10" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Demo Request Confirmed!</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
              Thanks {formData.name || "there"}! A SADA AI specialist will call you at <strong className="text-slate-900 dark:text-white">{formData.phone || "your number"}</strong> within 1 business hour to demonstrate a live call simulation for {formData.businessName || "your business"}.
            </p>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#0A1128] border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm">
                <PhoneCall className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" /> Immediate Demo Line
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                Want to test the AI immediately? You can also dial our Australian live demonstration number right now:
                <br />
                <strong className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-mono">+61 2 8000 7232</strong> (24/7 active line)
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full h-10 sm:h-11 text-xs sm:text-sm border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer">
              Close Window
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
