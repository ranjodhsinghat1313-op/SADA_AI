import React from "react";

interface SadaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function SadaLogo({ size = 36, className = "", showText = false }: SadaLogoProps) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Premium Neural Soundwave Emblem */}
      <div 
        style={{ width: size, height: size }}
        className="relative rounded-xl bg-gradient-to-tr from-[#1E40AF] via-[#2563EB] to-[#60A5FA] p-[1.5px] shadow-lg shadow-blue-600/25 group-hover:scale-105 transition-all duration-300 flex items-center justify-center shrink-0"
      >
        <div className="w-full h-full rounded-[10.5px] bg-[#0A1128] flex items-center justify-center relative overflow-hidden">
          {/* Subtle inner ambient glow */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xs pointer-events-none" />
          
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[62%] h-[62%] relative z-10 text-white"
          >
            <defs>
              <linearGradient id="sada-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA" />
                <stop offset="0.5" stopColor="#3B82F6" />
                <stop offset="1" stopColor="#93C5FD" />
              </linearGradient>
              <linearGradient id="sada-wave" x1="8" y1="16" x2="24" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#93C5FD" />
                <stop offset="1" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
            
            {/* Modern Geometric Soundwave + Neural Nexus Path */}
            <path
              d="M6 16C6 10.4772 10.4772 6 16 6C18.675 6 21.0967 7.05193 22.8837 8.76185"
              stroke="url(#sada-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M26 16C26 21.5228 21.5228 26 16 26C13.325 26 10.9033 24.9481 9.1163 23.2381"
              stroke="url(#sada-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            
            {/* Dynamic Sound Wave Pulse Bars in Core */}
            <line x1="11.5" y1="13" x2="11.5" y2="19" stroke="url(#sada-wave)" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="16" y1="10" x2="16" y2="22" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="20.5" y1="12" x2="20.5" y2="20" stroke="url(#sada-wave)" strokeWidth="2.2" strokeLinecap="round" />
            
            {/* Floating Neural Pulse Point */}
            <circle cx="23" cy="9" r="1.5" fill="#60A5FA" />
            <circle cx="9" cy="23" r="1.5" fill="#93C5FD" />
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-1.5 leading-none">
            SADA AI
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </span>
          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider leading-tight mt-0.5 font-mono">
            AI RECEPTIONIST · AU & NZ
          </span>
        </div>
      )}
    </div>
  );
}
