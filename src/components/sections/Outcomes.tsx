"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// Exact cubic-bezier(0.16, 1, 0.3, 1) luxury easing solver
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  return function(x: number): number {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
      const dx = 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2);
      if (Math.abs(currentX - x) < 0.0001 || dx === 0) break;
      t -= (currentX - x) / dx;
    }
    return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
  };
}

const easeCurve = cubicBezier(0.16, 1, 0.3, 1);

function SmoothCounter({
  end,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2000,
  delay = 0,
  isTriggered,
  replayKey = 0,
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  isTriggered: boolean;
  replayKey?: number;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isTriggered) {
      setVal(0);
      return;
    }

    let rafId: number;
    let startTimestamp: number | null = null;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeCurve(progress);
        const current = eased * end;
        setVal(current);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setVal(end);
        }
      };
      rafId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isTriggered, end, duration, delay, replayKey]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();

  return (
    <span className="cnc-01__val inline-flex items-baseline font-variant-numeric tabular-nums select-none">
      {prefix && <span className="cnc-01__pre">{prefix}</span>}
      <span className="tabular-nums font-feature-settings-tnum">{display}</span>
      {suffix && <span className="cnc-01__suf">{suffix}</span>}
    </span>
  );
}

export function Outcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [replayKeys, setReplayKeys] = useState([0, 0, 0, 0]);

  // Re-trigger animation cleanly when user scrolls to this section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Allow interactive replay on card hover
  const triggerReplay = useCallback((index: number) => {
    setReplayKeys(prev => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="outcomes-section" 
      className="py-24 sm:py-28 md:py-36 bg-white/75 dark:bg-[#0A1128]/80 backdrop-blur-md text-slate-900 dark:text-slate-100 relative transition-colors duration-300 border-t border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
            Proven figures that transform your bottom line.
          </h2>

          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Measurable operational performance delivered to dental practices, medical specialists, and high-volume service businesses across Australia & New Zealand.
          </p>
        </div>

        {/* Figures Container with Even, Balanced, Aesthetic Spacing */}
        <div className={`rounded-[28px] sm:rounded-[36px] bg-[#F1F4F9] dark:bg-[#111C35] border border-slate-200/60 dark:border-slate-800/80 p-8 sm:p-10 lg:p-12 cnc-01 ${isTriggered ? "cnc-in-view" : ""}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            
            {/* Stat 1: +35% */}
            <div 
              className="cnc-01__stat lg:pr-8 flex flex-col justify-between cursor-pointer group"
              style={{ "--cnc-01-i": 0 } as React.CSSProperties}
              onMouseEnter={() => triggerReplay(0)}
            >
              <div>
                <dd className="text-5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black font-stat tracking-tight leading-none sada-text-gradient dark:drop-shadow-[0_2px_16px_rgba(59,130,246,0.18)]">
                  <SmoothCounter 
                    end={35}
                    prefix="+"
                    suffix="%"
                    duration={1900}
                    delay={0.05}
                    isTriggered={isTriggered}
                    replayKey={replayKeys[0]}
                  />
                </dd>

                <dt className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-4 sm:mt-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  More Bookings Captured
                </dt>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Converts after-hours and missed weekend dials into confirmed diary appointments with instant SMS.
                </p>
              </div>
            </div>

            {/* Stat 2: < 1s */}
            <div 
              className="cnc-01__stat lg:px-8 lg:border-l lg:border-slate-200/80 dark:lg:border-slate-700/60 flex flex-col justify-between cursor-pointer group"
              style={{ "--cnc-01-i": 1 } as React.CSSProperties}
              onMouseEnter={() => triggerReplay(1)}
            >
              <div>
                <dd className="text-5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black font-stat tracking-tight leading-none sada-text-gradient dark:drop-shadow-[0_2px_16px_rgba(59,130,246,0.18)]">
                  <SmoothCounter 
                    end={1}
                    prefix="< "
                    suffix="s"
                    duration={1600}
                    delay={0.16}
                    isTriggered={isTriggered}
                    replayKey={replayKeys[1]}
                  />
                </dd>

                <dt className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-4 sm:mt-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Instant Response Time
                </dt>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Every call is answered instantly on the first ring with zero hold music, zero queues, and zero voicemails.
                </p>
              </div>
            </div>

            {/* Stat 3: 15+ hrs */}
            <div 
              className="cnc-01__stat lg:px-8 lg:border-l lg:border-slate-200/80 dark:lg:border-slate-700/60 flex flex-col justify-between cursor-pointer group"
              style={{ "--cnc-01-i": 2 } as React.CSSProperties}
              onMouseEnter={() => triggerReplay(2)}
            >
              <div>
                <dd className="text-5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black font-stat tracking-tight leading-none sada-text-gradient dark:drop-shadow-[0_2px_16px_rgba(59,130,246,0.18)]">
                  <SmoothCounter 
                    end={15}
                    suffix="+ hrs"
                    duration={1800}
                    delay={0.28}
                    isTriggered={isTriggered}
                    replayKey={replayKeys[2]}
                  />
                </dd>

                <dt className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-4 sm:mt-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Staff Admin Saved Weekly
                </dt>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Frees clinic receptionists from repetitive scheduling calls and triage so they can focus on patient care.
                </p>
              </div>
            </div>

            {/* Stat 4: 99.98% */}
            <div 
              className="cnc-01__stat lg:pl-8 lg:border-l lg:border-slate-200/80 dark:lg:border-slate-700/60 flex flex-col justify-between cursor-pointer group"
              style={{ "--cnc-01-i": 3 } as React.CSSProperties}
              onMouseEnter={() => triggerReplay(3)}
            >
              <div>
                <dd className="text-5xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black font-stat tracking-tight leading-none sada-text-gradient dark:drop-shadow-[0_2px_16px_rgba(59,130,246,0.18)]">
                  <SmoothCounter 
                    end={99.98}
                    decimals={2}
                    suffix="%"
                    duration={2000}
                    delay={0.40}
                    isTriggered={isTriggered}
                    replayKey={replayKeys[3]}
                  />
                </dd>

                <dt className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight mt-4 sm:mt-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Voice Gateway Uptime
                </dt>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  Carrier-grade telecom infrastructure with sub-second Australian and New Zealand voice routing.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
