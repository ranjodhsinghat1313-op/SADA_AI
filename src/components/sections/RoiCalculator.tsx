import React, { useState } from "react";
import { DollarSign, TrendingUp, AlertTriangle, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

interface RoiCalculatorProps {
  onBookDemo: () => void;
}

interface IndustryPreset {
  name: string;
  calls: number;
  missedRate: number;
  convRate: number;
  val: number;
}

const PRESETS: IndustryPreset[] = [
  { name: "Dental Clinic", calls: 600, missedRate: 18, convRate: 35, val: 280 },
  { name: "Trade / Plumbing", calls: 400, missedRate: 25, convRate: 40, val: 350 },
  { name: "Allied Health / Physio", calls: 500, missedRate: 15, convRate: 30, val: 160 },
  { name: "Legal / Accounting", calls: 350, missedRate: 20, convRate: 25, val: 650 },
  { name: "Salon & Aesthetics", calls: 450, missedRate: 22, convRate: 45, val: 190 },
];

export function RoiCalculator({ onBookDemo }: RoiCalculatorProps) {
  const [monthlyCalls, setMonthlyCalls] = useState(500);
  const [missedRate, setMissedRate] = useState(15);
  const [convRate, setConvRate] = useState(30);
  const [avgValue, setAvgValue] = useState(250);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Calculations
  const missedCalls = Math.round(monthlyCalls * (missedRate / 100));
  const lostBookingsPerMonth = Math.round(missedCalls * (convRate / 100));
  const monthlyLostRevenue = Math.round(lostBookingsPerMonth * avgValue);
  const annualLostRevenue = monthlyLostRevenue * 12;

  const applyPreset = (preset: IndustryPreset) => {
    setActivePreset(preset.name);
    setMonthlyCalls(preset.calls);
    setMissedRate(preset.missedRate);
    setConvRate(preset.convRate);
    setAvgValue(preset.val);
  };

  return (
    <section id="calculator" className="py-24 sm:py-28 md:py-36 bg-[#F8FAFC]/90 dark:bg-[#070E22] text-slate-900 dark:text-slate-100 relative border-t border-slate-200/90 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            How much revenue is slipping through your phone lines?
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            <span className="sm:hidden">Discover how many bookings and dollars slip through your phone lines each month.</span>
            <span className="hidden sm:inline">In Australia and New Zealand, 62% of callers hang up without leaving a voicemail. Adjust the sliders below or select your industry to discover the actual financial impact on your practice.</span>
          </p>

          {/* Industry Quick Presets */}
          <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">Industry Benchmarks:</span>
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className={`text-[11px] sm:text-xs px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  activePreset === preset.name
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105"
                    : "bg-white dark:bg-[#14213D] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Interactive Calculator Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.94, y: 35 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto"
        >
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#14213D] rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 sm:space-y-6 text-slate-900 dark:text-white">
            <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 shrink-0" />
              Your Business Numbers
            </h3>

            {/* Input 1: Monthly Calls */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Monthly Inbound Calls
                </label>
                <span className="text-xs sm:text-base font-bold font-mono text-blue-700 dark:text-blue-300 bg-slate-100 dark:bg-[#0A1128] px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  {monthlyCalls.toLocaleString()} calls
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="3000"
                step="25"
                value={monthlyCalls}
                onChange={(e) => {
                  setMonthlyCalls(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="hidden sm:flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>50 calls</span>
                <span>Average: 500 calls</span>
                <span>3,000+ calls</span>
              </div>
            </div>

            {/* Input 2: Missed Call Percentage */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Unanswered / Missed Calls
                  </label>
                  <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400">Calls arriving after-hours, on weekends, or during lunch</p>
                </div>
                <span className="text-xs sm:text-base font-bold font-mono text-blue-700 dark:text-blue-300 bg-slate-100 dark:bg-[#0A1128] px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 ml-2">
                  {missedRate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={missedRate}
                onChange={(e) => {
                  setMissedRate(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="hidden sm:flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>5% (Low)</span>
                <span>Avg: 15%</span>
                <span>50% (High)</span>
              </div>
            </div>

            {/* Input 3: Conversion Rate */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Booking Conversion Rate
                  </label>
                  <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400">Percentage of callers ready to book</p>
                </div>
                <span className="text-xs sm:text-base font-bold font-mono text-blue-700 dark:text-blue-300 bg-slate-100 dark:bg-[#0A1128] px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 ml-2">
                  {convRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                step="5"
                value={convRate}
                onChange={(e) => {
                  setConvRate(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="hidden sm:flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>10%</span>
                <span>Typical: 30%</span>
                <span>70%</span>
              </div>
            </div>

            {/* Input 4: Average Customer/Appointment Value */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Average Value / Booking
                  </label>
                  <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400">Average dollar value per customer booking</p>
                </div>
                <span className="text-xs sm:text-base font-bold font-mono text-blue-700 dark:text-blue-300 bg-slate-100 dark:bg-[#0A1128] px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0 ml-2">
                  ${avgValue} AUD
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                step="25"
                value={avgValue}
                onChange={(e) => {
                  setAvgValue(Number(e.target.value));
                  setActivePreset(null);
                }}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="hidden sm:flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>$50</span>
                <span>Median: $250</span>
                <span>$1,200+</span>
              </div>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-slate-900 dark:bg-[#0d172e] text-white p-4 sm:p-8 flex flex-col justify-between shadow-2xl border border-slate-800 dark:border-blue-900/60 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <DollarSign className="w-48 h-48 text-blue-400" />
            </div>

            <div className="space-y-3 sm:space-y-6 relative z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 text-blue-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Estimated Lost Opportunity</span>
              </div>

              <div>
                <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-medium">Estimated Monthly Lost Revenue</span>
                <div className="text-2xl sm:text-5xl font-black text-blue-400 font-stat tracking-tight mt-0.5 flex flex-wrap items-baseline gap-1">
                  ${monthlyLostRevenue.toLocaleString()}
                  <span className="text-xs sm:text-sm font-normal text-slate-400">AUD / mo</span>
                </div>
              </div>

              {/* Full Breakdown Table */}
              <div className="p-4 rounded-2xl bg-slate-800/80 dark:bg-[#14213D] border border-slate-700 dark:border-slate-800 space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-300 dark:text-slate-400">Annualized Lost:</span>
                  <span className="font-extrabold text-white font-stat text-base sm:text-lg">
                    ${annualLostRevenue.toLocaleString()} AUD
                  </span>
                </div>
                <div className="h-[1px] bg-slate-700 dark:bg-slate-800" />
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-300 dark:text-slate-400">Lost Bookings / Mo:</span>
                  <span className="font-extrabold text-blue-300 font-stat text-base sm:text-lg">
                    ~{lostBookingsPerMonth} bookings
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-300 dark:text-slate-400">Unanswered Calls / Mo:</span>
                  <span className="font-extrabold text-blue-300 font-stat text-base sm:text-lg">
                    ~{missedCalls} calls
                  </span>
                </div>
              </div>

              <p className="hidden sm:block text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                By capturing 80% of these calls with SADA AI, you could instantly inject an estimated <strong className="text-white font-semibold">${Math.round(monthlyLostRevenue * 0.8).toLocaleString()} AUD</strong> in monthly revenue back into your bottom line.
              </p>
            </div>

            {/* Button with Increased Spacing and Modern Styling */}
            <div className="mt-4 sm:mt-7 pt-3 border-t border-slate-800/80 relative z-10">
              <Button
                onClick={onBookDemo}
                className="w-full py-3 sm:py-3.5 px-5 h-auto text-xs sm:text-sm font-bold shadow-xl shadow-blue-600/30 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Sparkles className="h-4 w-4 text-blue-200 shrink-0" />
                <span>Stop Missing Bookings Now</span>
              </Button>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-400 mt-2.5 sm:mt-3">
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-400 shrink-0" />
                <span>Zero setup fee · Starts in 3 business days</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
