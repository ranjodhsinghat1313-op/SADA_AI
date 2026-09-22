"use client";

import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Plus, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function Faq() {
  const faqs = [
    {
      id: "faq-1",
      q: "How quickly can the AI receptionist be set up for our business?",
      a: "Most businesses and clinics go live in just 48 to 72 hours. Our onboarding team takes your existing FAQ documents, treatment pricing lists, and booking rules, configures your custom voice agent, and runs thorough test calls with you before pointing your phone lines to SADA AI.",
    },
    {
      id: "faq-2",
      q: "Will the AI sound natural to Australian and New Zealand callers?",
      a: "Absolutely. SADA AI uses voice models specifically trained on Australian and Kiwi conversational cadence, colloquialisms, and regional pronunciations. It effortlessly understands local suburbs, slang, and common Aussie phrasing without robotic pauses or confusion.",
    },
    {
      id: "faq-3",
      q: "What happens when a caller asks something the AI doesn't know?",
      a: "SADA AI has strict guardrails to prevent hallucinations or incorrect medical/pricing advice. If a question is outside its approved knowledge base, the AI politely explains this and can either warm-transfer the call directly to your on-duty staff member or take a detailed message and immediately SMS/email the audio summary to your team.",
    },
    {
      id: "faq-4",
      q: "Which calendars and practice management systems do you support?",
      a: "We support direct bi-directional synchronization with Google Calendar, Microsoft Outlook, Cliniko, ServiceM8, Timely, Halaxy, HubSpot, Zoho CRM, Salesforce, and custom systems via secure REST APIs and webhooks.",
    },
    {
      id: "faq-5",
      q: "How is patient and caller data secured?",
      a: "All call recordings, transcripts, and customer contact information are encrypted in transit (TLS 1.3) and at rest (AES-256) inside Australian data centers complying with the Australian Privacy Principles (APP) and Privacy Act 1988. We never sell, monetize, or publicly share caller data.",
    },
    {
      id: "faq-6",
      q: "Are there any setup fees or lock-in contracts?",
      a: "No lock-in contracts whatsoever. All SADA AI subscriptions are billed month-to-month, allowing you to scale minutes up during busy seasonal peaks or adjust as your practice needs change. There is also zero upfront setup fee for standard integrations.",
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-28 md:py-36 bg-[#F8FAFC]/90 dark:bg-[#070E22] text-slate-900 dark:text-slate-100 border-t border-slate-200/90 dark:border-slate-800 relative transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            Everything you need to know.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Have questions about how SADA AI handles your phone lines, integrations, and patient interactions? Here are the most common answers.
          </p>
        </motion.div>

        {/* Modern Radix Accordion with Animated Left Plus/Minus Icon */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14213D] border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-8 shadow-xl shadow-slate-900/5 dark:shadow-black/40"
        >
          <Accordion type="single" collapsible defaultValue="faq-1" className="w-full space-y-1.5 sm:space-y-2">
            {faqs.map((faq) => (
              <AccordionItem 
                value={faq.id} 
                key={faq.id} 
                className="py-1 sm:py-1.5 border-b border-slate-100 dark:border-slate-800/80 last:border-b-0"
              >
                <AccordionPrimitive.Header className="flex">
                  <AccordionPrimitive.Trigger className="flex flex-1 items-center gap-2.5 sm:gap-3.5 py-3 sm:py-4 text-left text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-snug sm:leading-6 transition-all hover:text-blue-600 dark:hover:text-blue-400 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&>svg]:-order-1 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg]:text-blue-600 dark:[&[data-state=open]>svg]:text-blue-400 cursor-pointer">
                    <span className="flex-1">{faq.q}</span>
                    <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
                      <Plus
                        size={15}
                        strokeWidth={2.5}
                        className="shrink-0 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </div>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionContent className="pb-3.5 sm:pb-4 ps-2 sm:ps-10 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

      </div>
    </section>
  );
}
