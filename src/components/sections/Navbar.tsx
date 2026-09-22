import React, { useState, useEffect } from "react";
import { Phone, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onBookDemo: () => void;
}

export function Navbar({ onBookDemo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Live Call", href: "#live-call" },
    { label: "ROI Calculator", href: "#calculator" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Industries", href: "#industries" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-950/10 py-3"
          : "bg-white/80 backdrop-blur-sm border-b border-emerald-950/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-950 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-emerald-700/30 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-emerald-950 leading-none flex items-center gap-1.5">
              SADA AI
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-widest leading-tight">
              AU & NZ AI Receptionist
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-emerald-950/75 hover:text-emerald-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+61280007232"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-600" />
            <span>Demo Line: +61 2 8000 7232</span>
          </a>

          <Button
            onClick={onBookDemo}
            variant="emerald"
            size="sm"
            className="h-9 px-4 text-xs font-semibold shadow-sm hover:shadow"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Book a Demo
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            onClick={onBookDemo}
            variant="emerald"
            size="sm"
            className="sm:hidden text-xs px-2.5 py-1"
          >
            Demo
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-emerald-900 hover:bg-emerald-50 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-900/10 bg-white px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-emerald-950 hover:bg-emerald-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-100 space-y-2">
            <a
              href="tel:+61280007232"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-600" />
              <span>Call Demo Line: +61 2 8000 7232</span>
            </a>
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookDemo();
              }}
              variant="emerald"
              className="w-full text-sm font-semibold"
            >
              Schedule 1-on-1 Demo <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
