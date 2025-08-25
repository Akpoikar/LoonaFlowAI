"use client";

import { useMemo } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function FAQ() {
  const { elementRef, isVisible } = useScrollAnimation();

  const faqs = useMemo(
    () => [
      {
        q: "Will my emails land in spam?",
        a:
          "LoonaFlow is designed to maximize inbox placement with warmup, SPF/DKIM/DMARC guidance, sending windows, and smart throttling. While no platform can guarantee 100%, most users achieve strong inbox rates within days."
      },
      {
        q: "Do you provide the leads?",
        a:
          "Yes. We source leads directly from Google Maps based on your criteria, then deduplicate and enrich key fields. No external lists required."
      },
      {
        q: "Is it GDPR compliant?",
        a:
          "Yes. We support lawful-basis outreach, honor opt-outs with one-click unsubscribe, and handle data per GDPR best practices. A Data Processing Addendum is available on request."
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
          "Many users see opens and first replies within 24–48 hours after launching their first campaign, depending on list quality and offer."
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

      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={faq.q}
            className={`rounded-2xl bg-white/40 backdrop-blur-md p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-[1.02] hover:ring-white/50 text-left ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? `${index * 0.1}s` : "0s" }}
            role="region"
            aria-labelledby={`faq-${index}`}
          >
            <h3 id={`faq-${index}`} className="text-lg font-bold text-slate-900 mb-3">
              {faq.q}
            </h3>
            <p className="text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
