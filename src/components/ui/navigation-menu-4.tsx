"use client"

import React, { useState, useEffect } from "react"
import { 
  Sun, 
  Moon, 
  PhoneCall, 
  Mic2, 
  BarChart3, 
  CalendarSync, 
  Stethoscope, 
  Wrench, 
  Building2,
  ArrowRight
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { RandomLetterSwap } from "@/components/ui/random-letter-swap"
import { SadaLogo } from "@/components/ui/sada-logo"

export interface NavigationMenu4Props {
  onBookDemo: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  navVisible?: boolean;
}

export default function NavigationMenu4({
  onBookDemo,
  isDark,
  onToggleTheme,
  navVisible = true,
}: NavigationMenu4Props) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featureItems = [
    {
      href: "#features",
      icon: PhoneCall,
      label: "Instant Call Handling",
      description: "Answers in <1 second with zero hold music or voicemails.",
    },
    {
      href: "#features",
      icon: Mic2,
      label: "Local AU & NZ Voices",
      description: "Authentic accents, regional suburbs, and colloquial phrasing.",
    },
    {
      href: "#features",
      icon: BarChart3,
      label: "Real-Time Transcripts & Analytics",
      description: "Full call audio recordings, executive summaries & sentiment.",
    },
    {
      href: "#features",
      icon: CalendarSync,
      label: "Live Calendar & CRM Sync",
      description: "Connects with Cliniko, ServiceM8, Google Calendar & Outlook.",
    },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-6 border-b",
        navVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none",
        isScrolled
          ? "bg-white/95 dark:bg-[#0A1128]/90 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-2xl shadow-black/5 dark:shadow-black/40 py-2.5"
          : "bg-white/85 dark:bg-[#0A1128]/75 backdrop-blur-lg border-slate-200/80 dark:border-slate-800/60 py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between gap-2 sm:gap-4">
        {/* Left side: Brand + Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-9 md:hidden text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80"
                variant="ghost"
                size="icon"
                aria-label="Toggle navigation menu"
              >
                <svg
                  className="pointer-events-none"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            
            {/* Mobile Drawer */}
            <PopoverContent align="start" className="w-72 p-2 bg-white dark:bg-[#14213D] border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-2xl md:hidden">
              <div className="space-y-1">
                <a
                  href="#live-call"
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  Live Call Demo
                </a>
                <a
                  href="#calculator"
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  ROI Calculator
                </a>
                <a
                  href="#features"
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  AI Features
                </a>
                <a
                  href="#how-it-works"
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  Pricing
                </a>
                <a
                  href="#faq"
                  className="block px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  FAQ
                </a>

              </div>
            </PopoverContent>
          </Popover>

          {/* SADA AI Modern Brand Logo */}
          <a href="#" className="flex items-center group">
            <span className="sm:hidden">
              <SadaLogo size={30} showText={true} />
            </span>
            <span className="hidden sm:inline-flex">
              <SadaLogo size={38} showText={true} />
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                
                {/* Features Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-transparent px-3 py-1.5 text-xs font-semibold">
                    <RandomLetterSwap label="Features" staggerDuration={0.025} />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[460px] gap-2 p-4 md:grid-cols-2">
                      {featureItems.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={idx}
                            href={item.href}
                            className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-100/80 dark:hover:bg-slate-800/80"
                          >
                            <div className="h-9 w-9 shrink-0 rounded-lg bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-xs">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                                {item.label}
                              </div>
                              <p className="line-clamp-2 text-[11px] text-slate-600 dark:text-slate-400 leading-snug mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Direct Page Anchor Links */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#live-call"
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                    >
                      <RandomLetterSwap label="Live Call Demo" staggerDuration={0.025} />
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#calculator"
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                    >
                      <RandomLetterSwap label="ROI Calculator" staggerDuration={0.025} />
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#pricing"
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                    >
                      <RandomLetterSwap label="Pricing" staggerDuration={0.025} />
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <a
                      href="#faq"
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
                    >
                      <RandomLetterSwap label="FAQ" staggerDuration={0.025} />
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>

              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>
          </div>
        </div>

        {/* Right side: Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="h-9 w-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm shrink-0"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Dark and Light Mode"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0 hover:rotate-90 duration-300" />
            ) : (
              <Moon className="h-4 w-4 text-blue-600 transition-transform rotate-0 hover:-rotate-12 duration-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
