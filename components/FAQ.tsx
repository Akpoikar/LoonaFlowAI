"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FAQ() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
         <div ref={elementRef} className="text-center mb-32">
             <h2 className={`text-3xl font-bold text-slate-900 mb-12 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         Frequently Asked Questions
       </h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {[
          {
            q: "Will I land in spam?",
            a: "No! Our inbox warmup system and smart sending limits ensure your emails reach the inbox, not spam folders."
          },
          {
            q: "Do you provide the leads?",
            a: "Yes! We scrape leads directly from Google Maps based on your criteria. No need for external lead sources."
          },
          {
            q: "Is it GDPR compliant?",
            a: "Absolutely. We include built-in unsubscribe links and follow all GDPR requirements for data protection."
          },
          {
            q: "Can I cancel anytime?",
            a: "Yes, you can cancel your subscription at any time. No long-term contracts or hidden fees."
          },
          {
            q: "Do I need a credit card to start?",
            a: "No credit card required for the free trial. Start exploring the platform risk-free."
          },
          {
            q: "How quickly can I see results?",
            a: "Most users see their first opens and replies within 24-48 hours of starting their campaign."
          }
        ].map((faq, index) => (
          <div
            key={faq.q}
                         className={`rounded-2xl bg-white/40 backdrop-blur-md p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-[1.02] hover:ring-white/50 text-left ${isVisible ? 'opacity-100' : 'opacity-0'}`}
             style={{ 
               transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
             }}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.q}</h3>
            <p className="text-slate-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
