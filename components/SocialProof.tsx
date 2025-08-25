"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function SocialProof() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div ref={elementRef} className="text-center mb-32">
      <h2
        className={`text-2xl font-bold text-slate-900 mb-6 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Trusted by founders and local teams
      </h2>

      {/* Usage badges */}
      <div
        className={`flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-10 transition-all duration-500 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0 opacity-60"
        }`}
      >
        <span className="px-3 py-1 rounded-full text-sm bg-white/60 ring-1 ring-white/40 text-slate-700">
          Used by the team behind <b>EscapeSpark</b>
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-white/60 ring-1 ring-white/40 text-slate-700">
          Powering outreach tests at <b>Orvio.ai</b>
        </span>
        <span className="px-3 py-1 rounded-full text-sm bg-white/60 ring-1 ring-white/40 text-slate-700">
          Built for local businesses & small agencies
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {[
          {
            quote:
              "We plugged LoonaFlow into our EscapeSpark outreach. Wrote one template, scraped 300 local venues, and booked 3 demos within 48 hours.",
            name: "Karen Akopian",
            role: "Founder",
            company: "EscapeSpark",
            initials: "KA",
          },
          {
            quote:
              "For Orvio.ai trials in Prague, pacing + warmup kept deliverability solid. 42% open rate and 5 booked calls in week one.",
            name: "Orvio Team",
            role: "Growth",
            company: "Orvio.ai",
            initials: "OR",
          },
          {
            quote:
              "Setup was quick. We imported a simple template with {name} and {city}, and LoonaFlow handled the rest. Clean UI, clear stats.",
            name: "Marta K.",
            role: "Owner",
            company: "Local Services Agency",
            initials: "MK",
          },
        ].map((t, index) => (
          <div
            key={`${t.name}-${index}`}
            className={`rounded-2xl bg-white/40 backdrop-blur-md p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-[1.02] hover:ring-white/50 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? `${index * 0.1}s` : "0s" }}
          >
            <p className="text-slate-700 mb-4 italic">“{t.quote}”</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                <span className="text-slate-700 font-bold text-sm">{t.initials}</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-600">
                  {t.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional footnote for extra credibility without overpromising */}
      <p className="mt-6 text-xs text-slate-500">
        Results vary based on list quality, offer, and sending history.
      </p>
    </div>
  );
}
