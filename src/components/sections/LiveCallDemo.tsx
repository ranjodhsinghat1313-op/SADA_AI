"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck,
  Calendar,
  Send,
  Volume2,
  Check,
  Building2,
  Clock,
  Sparkle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThinkingOrb, type OrbState } from "thinking-orbs";
import { motion, AnimatePresence } from "motion/react";

interface LiveCallDemoProps {
  onBookDemo: () => void;
  onExploreCalculator: () => void;
}

export interface ScriptMessage {
  id: number;
  sender: "sada" | "james";
  senderName: string;
  senderRole: string;
  avatar?: string;
  message: string;
  timeOffset: number; // in seconds from start of loop
  orbState: OrbState;
}

// Exact script provided by user
const SCRIPT: ScriptMessage[] = [
  {
    id: 1,
    sender: "sada",
    senderName: "Sada",
    senderRole: "Harbour Dental Receptionist",
    message: "Good morning, you've called Harbour Dental — this is Sada. How can I help you today?",
    timeOffset: 0.8,
    orbState: "composing"
  },
  {
    id: 2,
    sender: "james",
    senderName: "James",
    senderRole: "Patient",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    message: "Hi, I'd like to book a check-up sometime this week if possible.",
    timeOffset: 3.6,
    orbState: "listening"
  },
  {
    id: 3,
    sender: "sada",
    senderName: "Sada",
    senderRole: "Harbour Dental Receptionist",
    message: "Perfect — booked for Thursday 10:30am. Confirmation SMS sent. Anything else?",
    timeOffset: 6.8,
    orbState: "solving"
  },
  {
    id: 4,
    sender: "james",
    senderName: "James",
    senderRole: "Patient",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    message: "That's all, thanks Sada!",
    timeOffset: 9.6,
    orbState: "listening"
  }
];

const STATUS_APPEAR_TIME = 11.5; // Within 12s, status message appears
const LOOP_TOTAL_DURATION = 15.5; // Total loop length before restarting

export function LiveCallDemo({ onBookDemo, onExploreCalculator }: LiveCallDemoProps) {
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // High-precision loop ticker (ticks every 100ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = Math.round((prev + 0.1) * 10) / 10;
        if (next >= LOOP_TOTAL_DURATION) {
          return 0; // Seamless loop restart
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Determine which messages have been revealed
  const visibleMessages = SCRIPT.filter((msg) => seconds >= msg.timeOffset);
  const isStatusVisible = seconds >= STATUS_APPEAR_TIME;

  // Derive current speaker and orb state
  const currentMsg = visibleMessages[visibleMessages.length - 1];
  const activeOrbState: OrbState = isStatusVisible 
    ? "breathing" 
    : (currentMsg ? currentMsg.orbState : "composing");

  // Keep scroll area pinned to latest message smoothly
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        '[data-slot="scroll-area-viewport"]'
      ) as HTMLElement;
      if (viewport) {
        viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
      }
    }
  }, [visibleMessages.length, isStatusVisible]);

  const handleRestart = () => {
    setSeconds(0);
    setIsPaused(false);
  };

  return (
    <section id="live-call" className="py-24 sm:py-28 md:py-36 bg-white dark:bg-[#0A1128] text-slate-900 dark:text-slate-100 relative overflow-hidden transition-colors duration-300 border-t border-slate-200/90 dark:border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
            Hear it in real-time. Continuous live call simulation.
          </h2>

          <p className="mt-2.5 sm:mt-4 text-xs sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Watch how Sada answers Harbour Dental's phone line, checks calendar availability, and locks in the appointment within seconds.
          </p>
        </motion.div>

        {/* Main Interactive Demo Container */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start"
        >
          
          {/* Left Column: Living Audio & Orb Station (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Live Orb Card */}
            <div className="p-4 sm:p-7 rounded-3xl bg-white dark:bg-[#14213D] border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/40 relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-200 dark:border-blue-800/60 font-mono">
                  Voice Activity
                </span>
                <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Harbour Dental Line
                </span>
              </div>

              {/* Central Thinking Orb */}
              <div className="flex flex-col items-center justify-center py-2 sm:py-4 text-center">
                <div className="relative flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 mb-2 sm:mb-3 shadow-inner">
                  <span className="sm:hidden transform scale-[0.8] origin-center flex items-center justify-center">
                    <ThinkingOrb state={activeOrbState} size={64} />
                  </span>
                  <span className="hidden sm:inline-flex">
                    <ThinkingOrb state={activeOrbState} size={64} />
                  </span>
                  
                  {/* Subtle pulsing concentric ring */}
                  <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
                </div>

                <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white capitalize flex items-center gap-2">
                  <span>{currentMsg?.sender === "james" ? "Listening to James..." : "Sada Speaking..."}</span>
                </div>

                {/* Animated soundwave bars */}
                <div className="flex items-center justify-center gap-1.5 mt-2.5 h-5">
                  {[40, 75, 100, 60, 90, 45, 80, 50, 70].map((height, i) => (
                    <motion.span
                      key={i}
                      animate={!isPaused ? { height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`] } : { height: "20%" }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.7 + (i % 3) * 0.2,
                        ease: "easeInOut",
                      }}
                      className="w-1 rounded-full bg-blue-600 dark:bg-blue-400 opacity-80"
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 max-w-xs">
                  {isStatusVisible 
                    ? "Appointment confirmed and synced directly to clinic calendar."
                    : currentMsg?.sender === "james"
                    ? "Processing patient speech with local Australian phonetics."
                    : "Delivering sub-second natural voice response."}
                </p>
              </div>

              {/* Loop Progress Bar */}
              <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
                  <span>Loop Progress</span>
                  <span className="font-stat font-bold">{Math.round(seconds)}s / {Math.round(LOOP_TOTAL_DURATION)}s</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                    style={{ width: `${(seconds / LOOP_TOTAL_DURATION) * 100}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            </div>

            {/* Telephony Specs Card (Minimal, High-Trust) */}
            <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#14213D] border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/40 space-y-3">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
                Infrastructure Benchmarks
              </span>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0A1128] border border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 block font-mono">Response Latency</span>
                  <span className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 font-stat">780 ms</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0A1128] border border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 block font-mono">Telco Uptime</span>
                  <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 font-stat">99.98%</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0A1128] border border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 block font-mono">Voice Cadence</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">AU / NZ Native</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#0A1128] border border-slate-100 dark:border-slate-800">
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 block font-mono">Calendar Sync</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Cliniko / Outlook</span>
                </div>
              </div>

              <div className="pt-1">
                <Button
                  onClick={onBookDemo}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2 sm:py-2.5 rounded-xl shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Book 1-on-1 Practice Setup
                </Button>
              </div>
            </div>

          </div>

          {/* Right Column: Modern Aesthetic Chat Stream (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-white/95 dark:bg-[#14213D] border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 overflow-hidden flex flex-col h-[480px] sm:h-[540px] lg:h-[590px] backdrop-blur-md">
              
              {/* Header Bar */}
              <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0A1128]/50 flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative">
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                    <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-emerald-500 relative" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5 sm:gap-2 font-sans">
                      Harbour Dental Clinic
                      <span className="text-[9px] sm:text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 sm:px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-900 font-mono">
                        Active Call
                      </span>
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                      Live voice interaction between Sada & James
                    </p>
                  </div>
                </div>

                {/* Simulator Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#0A1128] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer shadow-xs"
                  >
                    {isPaused ? (
                      <>
                        <Play className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-white dark:bg-[#0A1128] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Restart loop"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Chat Stream Body using ScrollArea with smooth spring message animations */}
              <div ref={scrollAreaRef} className="flex-1 relative overflow-hidden p-4 sm:p-5 bg-slate-50/40 dark:bg-[#0A1128]/25 flex flex-col justify-between">
                <ScrollArea className="h-full pr-2">
                  <div className="space-y-3.5 pb-2">
                    <AnimatePresence>
                      {visibleMessages.map((msg) => {
                        const isSada = msg.sender === "sada";
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 280, damping: 20 }}
                            className={`flex gap-3 items-end ${isSada ? "flex-row" : "flex-row-reverse"}`}
                          >
                            {/* Avatar */}
                            <div className="shrink-0 mb-1">
                              {isSada ? (
                                <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0">
                                  <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-xs animate-pulse" />
                                  <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-[#0A1128] border-2 border-blue-400/60 flex items-center justify-center overflow-hidden shadow-md shadow-blue-500/20">
                                    <div className="hidden sm:block">
                                      <ThinkingOrb state={msg.orbState} size={32} />
                                    </div>
                                    <div className="block sm:hidden">
                                      <ThinkingOrb state={msg.orbState} size={20} />
                                    </div>
                                  </div>
                                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#14213D]" />
                                </div>
                              ) : (
                                <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-slate-300 dark:border-slate-700 shadow-md">
                                    <AvatarImage src={msg.avatar} alt="James" className="object-cover" />
                                    <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-900 text-white text-[10px] sm:text-xs font-bold font-stat">
                                      JM
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="absolute -bottom-0.5 -left-0.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-400 border-2 border-white dark:border-[#14213D]" />
                                </div>
                              )}
                            </div>

                            {/* Message Container */}
                            <div className={`flex max-w-[88%] sm:max-w-[78%] flex-col gap-1 ${isSada ? "items-start" : "items-end"}`}>
                              {/* Speech Bubble with modern gradient styling */}
                              <div
                                className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                                  isSada
                                    ? "bg-white/95 dark:bg-[#14213D]/95 border border-blue-500/30 text-slate-900 dark:text-slate-100 rounded-tl-xs shadow-md shadow-blue-900/10 backdrop-blur-md"
                                    : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-xs shadow-md shadow-blue-600/20"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3 mb-1">
                                  <span className={`text-[11px] font-bold ${isSada ? "text-blue-600 dark:text-blue-400" : "text-blue-100"} flex items-center gap-1.5`}>
                                    {msg.senderName}
                                    {isSada && <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                  </span>
                                  <span className={`text-[10px] ${isSada ? "text-slate-400" : "text-blue-200"} font-mono`}>
                                    {isSada ? "AI Receptionist" : "Patient"}
                                  </span>
                                </div>
                                <div>{msg.message}</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {/* STATUS MESSAGE: Appears within 12 seconds, compact and immediately visible */}
                    <AnimatePresence>
                      {isStatusVisible && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 260, damping: 18 }}
                          className="mt-3 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-blue-500/10 to-emerald-500/15 border-2 border-emerald-500/40 p-2.5 sm:p-4 shadow-lg shadow-emerald-500/10 backdrop-blur-md"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-2.5">
                            <div className="flex items-center gap-2 sm:gap-2.5">
                              <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" />
                              </div>
                              <span className="text-[11px] sm:text-sm font-extrabold tracking-tight text-emerald-800 dark:text-emerald-300">
                                Appointment booked & synced to calendar + CRM
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                              <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-[#14213D] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-emerald-500/30">
                                📅 Thu 10:30am
                              </span>
                              <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-[#14213D] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-emerald-500/30">
                                🏥 Harbour Dental
                              </span>
                              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg border border-emerald-400/50 flex items-center gap-1">
                                <Send className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> SMS Confirmed
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </ScrollArea>
              </div>

              {/* Status Footer Bar */}
              <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-t border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-[#0A1128]/70 flex items-center justify-between flex-wrap gap-2.5 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="hidden sm:inline">Australian Privacy Principles & Health Records Compliant</span>
                  <span className="sm:hidden">APP & Health Records Compliant</span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 animate-pulse" />
                    Live Loop
                  </span>
                  <Button
                    onClick={onBookDemo}
                    size="sm"
                    className="text-[11px] sm:text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-2.5 sm:px-4 h-7 sm:h-8 shadow-xs cursor-pointer"
                  >
                    Deploy For Clinic
                  </Button>
                </div>
              </div>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
