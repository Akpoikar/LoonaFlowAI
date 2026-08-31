"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function SocialProof() {
  const { elementRef, isVisible } = useScrollAnimation();

  const stats = [
    { value: "50K+", label: "Emails sent" },
    { value: "1,200+", label: "Leads found" },
    { value: "180+", label: "Businesses onboarded" },
    { value: "$95K+", label: "Deal value generated for customers" },
  ];

  return (
    <div ref={elementRef} className="text-center mb-16 sm:mb-32 px-4 sm:px-0">
      <h2
        className={`text-2xl font-bold text-slate-900 mb-10 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Trusted by founders and local teams
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`rounded-2xl bg-white/40 backdrop-blur-md p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-[1.02] hover:ring-white/50 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? `${index * 0.1}s` : "0s" }}
          >
            <div className="text-3xl sm:text-4xl font-bold text-violet-600 mb-2">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
