import React from "react";
import { ArrowUp, Phone, Mail, MapPin, Shield } from "lucide-react";
import { SadaLogo } from "@/components/ui/sada-logo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A1128] text-slate-100 border-t border-slate-800 pt-16 sm:pt-20 pb-10 sm:pb-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7 sm:gap-10 pb-8 sm:pb-12 border-b border-slate-800">
          
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2">
              <SadaLogo size={32} />
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white font-sans">
                SADA AI
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Always-on 24/7 intelligent AI receptionist infrastructure for healthcare clinics, trades, and service businesses across Australia and New Zealand.
            </p>

            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>All Telco Voice Gateways Operational (99.98% Uptime)</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400 pt-1.5 sm:pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <span className="text-[11px] sm:text-xs">Level 24, 200 George Street, Sydney NSW 2000</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <a href="tel:+61280007232" className="text-[11px] sm:text-xs hover:text-white transition-colors">+61 2 8000 7232</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                <a href="mailto:contact@sadaai.com.au" className="text-[11px] sm:text-xs hover:text-white transition-colors">contact@sadaai.com.au</a>
              </div>
            </div>
          </div>

          {/* Nav links 1 */}
          <div className="hidden md:block">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 sm:mb-4 font-mono">
              Product
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-400">
              <li><a href="#live-call" className="hover:text-white transition-colors">Live Call Simulation</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Missed Revenue Calculator</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">AI Features & Guardrails</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">3-Step Implementation</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Plans & Custom Quotes</a></li>
            </ul>
          </div>

          {/* Platform Integrations */}
          <div className="hidden md:block">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 sm:mb-4 font-mono">
              Integrations
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Cliniko & Halaxy Sync</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">ServiceM8 & Timely</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Google & Outlook Calendar</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">HubSpot & Zoho CRM</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Warm Transfer to Staff</a></li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="hidden md:block">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 sm:mb-4">
              Compliance & Trust
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 text-xs text-slate-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Australian Privacy Act 1988</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Data Encryption & Storage</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Cliniko & CRM Safety</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Voice Model Guardrails</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">No Lock-in Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and Back to top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} SADA AI (sadaai.com.au). All rights reserved. Servicing Australia & New Zealand.
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-[#14213D] border border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
