import React, { useState, useEffect, useRef, useCallback } from "react";
import NavigationMenu4 from "@/components/ui/navigation-menu-4";
import Demo from "@/components/ui/demo";
import { LiveCallDemo } from "@/components/sections/LiveCallDemo";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Features } from "@/components/sections/Features";
import { Outcomes } from "@/components/sections/Outcomes";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { DemoBookingModal } from "@/components/sections/DemoBookingModal";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("Growth Plan");
  
  // Theme state: defaults to Light Mode on initial website load
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      // Clear legacy dark mode flag so fresh visits always open in light mode
      localStorage.removeItem("sada_theme");
      const stored = sessionStorage.getItem("sada_theme");
      if (stored) return stored === "dark";
    }
    return false; // Default: Light Mode
  });

  const [navVisible, setNavVisible] = useState<boolean>(true);
  const navVisibleRef = useRef<boolean>(true);

  // Sync theme class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      sessionStorage.setItem("sada_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      sessionStorage.setItem("sada_theme", "light");
    }
  }, [isDark]);

  // Always restart website from the front page on reload / Ctrl+R
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      window.scrollTo(0, 0);

      const rAF = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);

      const handleBeforeUnload = () => {
        window.scrollTo(0, 0);
      };

      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          window.scrollTo(0, 0);
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("pageshow", handlePageShow);

      return () => {
        cancelAnimationFrame(rAF);
        clearTimeout(timer);
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("pageshow", handlePageShow);
      };
    }
  }, []);

  const updateNavVisibility = useCallback((visible: boolean) => {
    if (navVisibleRef.current !== visible) {
      navVisibleRef.current = visible;
      setNavVisible(visible);
    }
  }, []);

  // Smooth scroll-driven animation:
  // 1. At top of page (progress <= 0.05): navbar is visible.
  // 2. As user scrolls down and zoom-in begins (0.05 < progress < 0.80): navbar slides UP out of view.
  // 3. When zoom finishes and content appears inside the portal (progress >= 0.80): navbar slides back DOWN into view.
  const handleProgress = useCallback((progress: number) => {
    if (progress <= 0.05) {
      updateNavVisibility(true);
    } else if (progress > 0.05 && progress < 0.80) {
      updateNavVisibility(false);
    } else {
      updateNavVisibility(true);
    }
  }, [updateNavVisibility]);

  // Viewport scroll listener fallback
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 50) {
        updateNavVisibility(true);
      } else if (y > window.innerHeight * 2.4) {
        updateNavVisibility(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateNavVisibility]);

  const handleBookDemo = () => {
    setSelectedPlan("Growth Plan");
    setModalOpen(true);
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleExploreCalculator = () => {
    const el = document.getElementById("calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-[#0A1128] text-[#F1F5F9]" : "bg-[#F8FAFC] text-slate-900"
      } flex flex-col font-sans selection:bg-blue-500/25 selection:text-white transition-colors duration-300`}
    >
      {/* Page Load / Reload Animated Screen */}
      <LoadingScreen isDark={isDark} />

      {/* Top Animated Navigation Bar (Slides up on zoom, slides down when content arrives) */}
      <NavigationMenu4
        onBookDemo={handleBookDemo}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        navVisible={navVisible}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* HERO SECTION 1: Glyph Portal with "SADA AI" text camera zoom */}
        <section className="relative">
          <Demo
            word="SADA AI"
            scrollLength={2.2}
            interactive={true}
            annotations={false}
            isDark={isDark}
            onProgress={handleProgress}
            onBookDemo={handleBookDemo}
            onExploreCalculator={handleExploreCalculator}
          />
        </section>

        {/* SECTION 2: TRUST & CAPABILITIES STRIP */}
        <TrustStrip />

        {/* SECTION 3: LIVE CALL SIMULATION (Interactive Dental/Clinic Booking Demo) */}
        <LiveCallDemo
          onBookDemo={handleBookDemo}
          onExploreCalculator={handleExploreCalculator}
        />

        {/* SECTION 4: INTERACTIVE MISSED REVENUE / ROI CALCULATOR */}
        <RoiCalculator onBookDemo={handleBookDemo} />

        {/* SECTION 6: 6 CORE FEATURE PILLARS */}
        <Features onBookDemo={handleBookDemo} />

        {/* SECTION 7: MEASURABLE BUSINESS OUTCOMES */}
        <Outcomes />

        {/* SECTION 7: 3-STEP IMPLEMENTATION PROCESS */}
        <HowItWorks onBookDemo={handleBookDemo} />

        {/* SECTION 8: TAILORED PRICING PLANS */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
        <Faq />

        {/* SECTION 10: HIGH-CONVERSION FINAL CALL TO ACTION */}
        <FinalCta onBookDemo={handleBookDemo} />

      </main>

      {/* SECTION 13: FOOTER */}
      <Footer />

      {/* INTERACTIVE DEMO BOOKING MODAL */}
      <DemoBookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPlan={selectedPlan}
      />
    </div>
  );
}
