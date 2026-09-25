"use client";

import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";

const settings = { word: "SADA AI", scrollLength: 2.6, interactive: true, annotations: false };
const family = '"Plus Jakarta Sans", "Inter", "Arial Black", Arial, sans-serif';
let fontLoad: Promise<void> | undefined;

export interface DemoProps extends Partial<typeof settings> {
  onBookDemo?: () => void;
  onExploreCalculator?: () => void;
  mode?: "page" | "contained";
  onProgress?: (progress: number) => void;
  isDark?: boolean;
}

export default function Demo({ 
  onBookDemo, 
  onExploreCalculator, 
  mode = "page", 
  onProgress, 
  isDark = false,
  ...props 
}: DemoProps) {
  const s = { ...settings, ...props };
  const [face, setFace] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;
    const finish = (value: string) => {
      if (!settled) {
        settled = true;
        setFace(value);
      }
    };

    if (typeof window !== "undefined" && "fonts" in document) {
      fontLoad ??= new FontFace(
        "Glyph Portal Jakarta",
        'url("https://cdn.21st.dev/assets/mirror/15/153fc85b70298beeb1d61a5f723331649e7f23bb77302a66e61cb3e2fbdb5e79.woff2")',
        { weight: "400 700 900" }
      )
        .load()
        .then((font) => {
          document.fonts.add(font);
        })
        .catch(() => {});

      const timeout = window.setTimeout(() => finish(family), 800);
      void fontLoad?.then(
        () => finish('"Glyph Portal Jakarta", ' + family),
        () => finish(family)
      );
      return () => {
        settled = true;
        clearTimeout(timeout);
      };
    } else {
      setFace(family);
    }
  }, []);

  const isContained = mode === "contained";

  const glyphPortalStyle = isDark
    ? {
        fontFamily: face ?? undefined,
        "--gp-paper": "#0A1128",
        "--gp-ink": "#F1F5F9",
        "--gp-field": "#0A1128",
        "--gp-foreground": "#F1F5F9",
        "--gp-glyph-gradient": "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 25%, #93C5FD 55%, #60A5FA 85%, #3B82F6 100%)",
        "--gp-field-bg": "radial-gradient(circle at 50% 30%, #14213D 0%, #0A1128 70%, #060A18 100%)",
      }
    : {
        fontFamily: face ?? undefined,
        "--gp-paper": "#F8FAFC",
        "--gp-ink": "#0A1128",
        "--gp-field": "#F8FAFC",
        "--gp-foreground": "#0A1128",
        "--gp-glyph-gradient": "linear-gradient(135deg, #0A1128 0%, #14213D 35%, #1E3A8A 70%, #2563EB 100%)",
        "--gp-field-bg": "radial-gradient(circle at 50% 30%, #E2E8F0 0%, #F1F5F9 60%, #F8FAFC 100%)",
      };

  return (
    <div
      data-demo-scroll
      data-slipstream-demo
      data-page-scroll={!isContained ? "true" : undefined}
      tabIndex={isContained ? 0 : undefined}
      role="region"
      aria-label="SADA AI. Scroll to step inside."
      style={{
        width: "100%",
        height: isContained ? "min(720px, 100dvh)" : "auto",
        overflowY: isContained ? "auto" : "visible",
        background: isDark ? "#0A1128" : "#F8FAFC",
        color: isDark ? "#F1F5F9" : "#0A1128",
        position: "relative",
        containerType: "inline-size",
        fontFamily: face ?? "system-ui, Arial, sans-serif",
      }}
      className="relative transition-colors duration-300"
    >
      <style>{`
        [data-slipstream-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-slipstream-demo] [data-gp-hint]{display:none;}
        [data-slipstream-demo] [data-gp-touch-picker]{display:none!important;}
        [data-sublime-header]{position:absolute;inset:clamp(20px,4vw,40px) clamp(20px,4.5vw,60px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;z-index:20;}
        [data-sublime-logo]{font-size:20px;font-weight:700;letter-spacing:-.04em;color:${isDark ? "#F1F5F9" : "#0A1128"};display:flex;align-items:center;gap:6px;}
        [data-sublime-category]{font-size:12px;font-weight:600;letter-spacing:.02em;text-transform:uppercase;color:${isDark ? "#60A5FA" : "#2563EB"};background:${isDark ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.1)"};padding:4px 10px;border-radius:9999px;border:1px solid ${isDark ? "rgba(96,165,250,0.3)" : "rgba(37,99,235,0.2)"};}
        [data-sublime-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 32px);margin:0;text-align:center;font-size:15px;font-weight:600;line-height:1.5;letter-spacing:.04em;color:${isDark ? "#60A5FA" : "#2563EB"};text-transform:uppercase;}
        [data-sublime-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 28px) 24px auto;margin:0;text-align:center;font-size:18.5px;font-weight:500;line-height:1.5;color:${isDark ? "#94A3B8" : "#475569"};max-width:560px;margin-inline:auto;}
        [data-sublime-pills]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 148px) 24px auto;display:flex;align-items:center;justify-content:center;gap:10px;pointer-events:none;}
        [data-sublime-pills] span{font-size:13px;font-weight:600;color:${isDark ? "#94A3B8" : "#64748B"};background:${isDark ? "rgba(20, 33, 61, 0.75)" : "rgba(241, 245, 249, 0.95)"};border:1px solid ${isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(226, 232, 240, 0.9)"};padding:4px 12px;border-radius:9999px;backdrop-filter:blur(8px);}
        [data-sublime-scroll]{position:absolute;inset:auto 24px 6%;text-align:center;color:${isDark ? "#60A5FA" : "#2563EB"};font-size:13px;font-weight:600;letter-spacing:.03em;}
        @media(max-width:768px){
          [data-sublime-header]{display:none!important;}
          [data-sublime-eyebrow]{font-size:12.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;position:absolute;top:calc(var(--gp-word-top,38%) - 34px);left:0;right:0;width:100%;margin:0 auto;text-align:center;}
          [data-sublime-support]{font-size:15.5px;font-weight:500;line-height:1.48;position:absolute;top:calc(var(--gp-word-bottom,46%) + 20px);left:0;right:0;width:92%;max-width:340px;margin:0 auto;text-align:center;text-wrap:balance;}
          [data-slipstream-demo] [data-gp-caption]{position:absolute;top:calc(var(--gp-word-bottom,46%) + 88px);left:0;right:0;width:100%;margin:0 auto;display:flex;justify-content:center;align-items:center;}
          [data-sublime-pills]{position:absolute;top:calc(var(--gp-word-bottom,46%) + 152px);left:0;right:0;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:6px;}
          [data-sublime-pills] span{font-size:11.5px;font-weight:600;padding:4px 10px;border-radius:9999px;color:${isDark ? "#94A3B8" : "#64748B"};background:${isDark ? "rgba(20, 33, 61, 0.75)" : "rgba(241, 245, 249, 0.95)"};border:1px solid ${isDark ? "rgba(30, 41, 59, 0.8)" : "rgba(203, 213, 225, 0.8)"};}
          [data-sublime-scroll]{position:absolute;bottom:24px;left:0;right:0;width:100%;margin:0 auto;text-align:center;font-size:12px;font-weight:600;letter-spacing:.03em;}
          [data-slipstream-demo] [data-gp-content]{padding:2.25rem 1.25rem 2.75rem!important;align-content:start!important;justify-content:start!important;min-height:auto!important;}
          [data-slipstream-copy]{gap:1.5rem;margin:0;}
          [data-slipstream-copy] h2{font-size:1.45rem;line-height:1.25;}
          [data-slipstream-features]{gap:0.85rem;}
          [data-slipstream-feature]{padding-top:0.75rem;}
          [data-slipstream-feature] h3{font-size:1.08rem;}
          [data-slipstream-feature] p{font-size:0.92rem;line-height:1.5;margin-top:0.25rem;}
        }
        @container(max-height:480px){[data-sublime-header]{top:14px;}[data-sublime-support]{top:calc(var(--gp-word-bottom,50%) + 12px);}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 54px);}[data-sublime-scroll]{display:none;}}
        [data-slipstream-demo] [data-gp-content]{padding:5rem clamp(1.25rem,5cqw,5rem) 6rem;font-family:inherit;}
        [data-slipstream-demo] section,[data-slipstream-demo] [data-gp-caption]{font-family:inherit;}
        [data-slipstream-copy]{display:flex;width:min(100%,80rem);margin:auto;flex-direction:column;align-items:flex-start;gap:clamp(2rem,5svh,3.5rem);}
        [data-slipstream-copy] h2{max-width:52rem;margin:0;color:${isDark ? "#F1F5F9" : "#0A1128"};font-size:clamp(1.85rem,1.1rem + 2.1cqw,2.5rem);font-weight:600;line-height:1.2;letter-spacing:-0.02em;text-wrap:balance;}
        [data-slipstream-features]{display:grid;width:100%;grid-template-columns:1fr;gap:1.75rem;}
        [data-slipstream-feature]{border-top:1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"};padding-top:1.25rem;}
        [data-slipstream-feature] h3{margin:0;color:${isDark ? "#F1F5F9" : "#0A1128"};font-size:1.22rem;font-weight:600;line-height:1.25;letter-spacing:-0.01em;}
        [data-slipstream-feature] p{margin:.55rem 0 0;color:${isDark ? "#94A3B8" : "#64748B"};font-size:1.02rem;line-height:1.55;}
        [data-slipstream-no]{display:inline-block;margin-right:.7rem;color:${isDark ? "#60A5FA" : "#2563EB"};font:600 .8rem ui-monospace,monospace;letter-spacing:.08em;transform:translateY(-.1em);}
        @container(min-width:768px){[data-slipstream-features]{grid-template-columns:repeat(3,minmax(0,1fr));gap:3rem;}}
      `}</style>
      {face ? (
        <GlyphPortal
          word={s.word}
          fontFamily={face}
          fontWeight={900}
          style={glyphPortalStyle}
          scrollLength={s.scrollLength}
          interactive={s.interactive}
          annotations={s.annotations}
          enterLabel="Enter SADA AI"
          onProgress={onProgress}
          front={
            <>
              <div data-sublime-header>
                <div data-sublime-logo>
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse mr-1"></span>
                  SADA AI
                </div>
                <span data-sublime-category>AI Receptionist · AU & NZ</span>
              </div>
              <p data-sublime-eyebrow>Always-On Intelligent Voice Agent</p>
              <p data-sublime-support>
                Every call answered. Every booking captured. Zero voicemails.
              </p>
              <div data-sublime-pills>
                <span>⚡ Sub-Second Answer</span>
                <span>🇦🇺 AU & NZ Voice</span>
                <span>📅 Direct CRM Sync</span>
              </div>
              <span data-sublime-scroll>Scroll down to zoom inside ↓</span>
            </>
          }
        >
          <div data-slipstream-copy>
            <h2>Never miss another customer. SADA AI answers every incoming call 24/7.</h2>
            <div data-slipstream-features>
              <div data-slipstream-feature>
                <h3>
                  <span data-slipstream-no>01</span>Instant Call Pick-up
                </h3>
                <p>
                  <span className="sm:hidden">Zero hold music or voicemail. Answers on the first ring and books appointments instantly.</span>
                  <span className="hidden sm:inline">Zero hold music, zero voicemail. Our AI answers on the first ring, qualifies callers, and manages appointment schedules effortlessly.</span>
                </p>
              </div>
              <div data-slipstream-feature>
                <h3>
                  <span data-slipstream-no>02</span>Natural AU & NZ Voice
                </h3>
                <p>
                  <span className="sm:hidden">Locally trained voice agents that recognize Aussie & Kiwi accents, slang, and regional suburbs.</span>
                  <span className="hidden sm:inline">Locally trained Australian & New Zealand voice agents that understand regional suburbs, slang, medical terminology, and everyday phrasing.</span>
                </p>
              </div>
              <div data-slipstream-feature>
                <h3>
                  <span data-slipstream-no>03</span>Live Calendar & CRM Sync
                </h3>
                <p>
                  <span className="sm:hidden">Instant calendar sync with Google, Outlook, Cliniko & ServiceM8 with automated SMS confirmations.</span>
                  <span className="hidden sm:inline">Real-time synchronization with Google Calendar, Outlook, Cliniko, ServiceM8, HubSpot, and custom CRMs with automated SMS confirmations.</span>
                </p>
              </div>
            </div>
            {/* Evenly placed divider line directly below the 3rd feature point */}
            <div className="w-full border-b border-slate-200 dark:border-slate-800/80 mt-5 sm:mt-10" />
          </div>
        </GlyphPortal>
      ) : (
        <div
          role="status"
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
            color: isDark ? "#60A5FA" : "#2563EB",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Loading SADA AI...
        </div>
      )}
    </div>
  );
}
