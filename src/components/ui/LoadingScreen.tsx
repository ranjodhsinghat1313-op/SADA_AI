"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { SadaLogo } from "@/components/ui/sada-logo";

const SADA_LOADING_WORDS = [
  "INITIALIZING",
  "CONNECTING AI",
  "VOICE CALIBRATION",
  "AU & NZ ACCENTS",
  "SADA AI READY",
];

interface LoadingScreenProps {
  isDark?: boolean;
  minDuration?: number;
  onFinish?: () => void;
}

export function LoadingScreen({
  isDark = false,
  minDuration = 1800,
  onFinish,
}: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sada-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none ${
            isDark ? "bg-[#0A1128] text-white" : "bg-[#F8FAFC] text-slate-900"
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDark
                ? "radial-gradient(circle at 50% 45%, rgba(37, 99, 235, 0.15) 0%, transparent 60%)"
                : "radial-gradient(circle at 50% 45%, rgba(96, 165, 250, 0.15) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
            {/* SADA AI Logo with Luminous Pulse */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="absolute -inset-3 rounded-2xl blur-lg opacity-60 animate-pulse pointer-events-none"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
                    : "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%)",
                }}
              />
              <SadaLogo size={56} showText={false} />
            </motion.div>

            {/* SADA AI Brand Name */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center justify-center gap-2">
                <span>SADA AI</span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
              </h2>
              <p className="text-[11px] font-semibold tracking-widest uppercase font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                AI Voice Receptionist · AU & NZ
              </p>
            </motion.div>

            {/* FlipFadeText Animation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full max-w-sm mt-2"
            >
              <FlipFadeText
                words={SADA_LOADING_WORDS}
                interval={1400}
                letterDuration={0.4}
                staggerDelay={0.04}
                exitStaggerDelay={0.02}
                textClassName={
                  isDark
                    ? "text-blue-400/90 text-sm sm:text-base font-mono font-semibold tracking-widest justify-center"
                    : "text-blue-600/90 text-sm sm:text-base font-mono font-semibold tracking-widest justify-center"
                }
              />
            </motion.div>

            {/* Micro loading progress line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="w-36 h-[2px] rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
