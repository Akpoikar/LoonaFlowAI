"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function FAQ() {
  const { elementRef, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = useMemo(
    () => [
      {
        q: "Will my emails land in spam?",
        a:
          "LoonaFlow helps maximize inbox placement with warmup, SPF/DKIM/DMARC guidance, sending windows, and smart throttling. No platform can guarantee 100%, but consistent warmup, clean lists, and relevant messaging typically improve placement over time."
      },
      {
        q: "Do you provide the leads?",
        a:
          "Yes. We source business records from publicly available directories and trusted third-party providers based on your criteria, then deduplicate and enrich key fields. If a business has no public email, or only a personal/free mailbox (e.g., @gmail.com), it is automatically skipped for outreach."
      },
      {
        q: "Is it GDPR compliant?",
        a:
          "LoonaFlow is built to support GDPR-friendly workflows: lawful-basis outreach (typically legitimate interest for B2B), clear opt-out handling with suppression lists, data minimization (skipping personal/free emails), and a Data Processing Addendum (DPA) available on request. Customers remain responsible for how they contact recipients in their markets."
      },
      {
        q: "Can I cancel anytime?",
        a:
          "Absolutely. Subscriptions are month-to-month—cancel anytime from your dashboard. No hidden fees."
      },
      {
        q: "Do I need a credit card to start?",
        a:
          "No credit card is required for the free trial. Explore the platform risk-free."
      },
      {
        q: "How quickly can I see results?",
        a:
          "Timelines vary by list quality, offer, and warmup status. Many users see opens and early replies after their first campaigns, but sustained performance depends on relevance, deliverability setup, and consistent sending habits."
      },
      {
        q: "Do I have to send emails through LoonaFlow?",
        a:
          "No. Scraping and sending are separate. You can scrape a list, download it as a CSV, and use it anywhere — your own CRM, another outreach tool, or a manual campaign. Sending through LoonaFlow is optional, not required."
      },
      {
        q: "Which countries do you cover?",
        a:
          "Any country with business listings on Google Maps — that's over 130 countries today. Search by city, region, or country, and we'll scrape whatever matches your target audience."
      },
      {
        q: "What happens to businesses without a public email?",
        a:
          "They're automatically skipped for outreach. We only include businesses with a findable, non-personal email address, so your list stays clean and your sending stays compliant."
      }
    ],
    []
  );

  // JSON-LD for rich results
  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a }
      }))
    }),
    [faqs]
  );

  return (
    <div ref={elementRef} className="text-center mb-32" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className={`text-3xl font-bold text-slate-900 mb-12 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Frequently Asked Questions
      </h2>

      {/* SEO: FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.q}
              className={`rounded-2xl bg-white/40 backdrop-blur-md ring-1 ring-white/30 shadow-md shadow-purple-100/40 transition-all duration-300 hover:ring-white/50 text-left overflow-hidden ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 0.06}s` : "0s" }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span id={`faq-${index}`} className="text-base font-semibold text-slate-900">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-bold transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-${index}`}
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-8 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay: isVisible ? `${faqs.length * 0.06}s` : "0s" }}
      >
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 rounded-xl bg-white/60 backdrop-blur-md px-5 py-3 font-medium text-slate-700 ring-1 ring-white/30 shadow-md shadow-purple-100/40 hover:bg-white/80 hover:text-violet-700 transition-all duration-300"
        >
          See all FAQs
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
