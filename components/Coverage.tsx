"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { countryCodes } from "../lib/countryCodes";

const featured = [
  "US", "GB", "DE", "FR", "ES", "IT", "NL", "CA", "AU", "SE",
  "PL", "CZ", "PT", "BE", "IE", "AT", "CH", "DK", "NO", "FI",
];

export default function Coverage() {
  const { elementRef, isVisible } = useScrollAnimation();
  const featuredCountries = featured
    .map((code) => countryCodes.find((c) => c.code === code))
    .filter(Boolean) as typeof countryCodes;

  return (
    <div ref={elementRef} className="mb-24 sm:mb-32 px-4 sm:px-0">
      <div
        className={`text-center mb-10 sm:mb-12 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="inline-block text-xs font-bold tracking-widest text-violet-600 mb-3">
          COVERAGE
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Local leads in {countryCodes.length}+ countries
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
          Wherever your customers do business, Google Maps has the listings — so we can scrape them.
        </p>
      </div>

      <div
        className={`max-w-4xl mx-auto rounded-2xl bg-white/40 backdrop-blur-md p-6 sm:p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 transition-all duration-500 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {featuredCountries.map((c) => (
            <span
              key={c.code}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white ring-1 ring-slate-200 text-sm text-slate-700 shadow-sm"
            >
              <span>{c.flag}</span>
              {c.name}
            </span>
          ))}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600 text-white text-sm font-medium shadow-sm">
            +{countryCodes.length - featured.length} more
          </span>
        </div>
      </div>
    </div>
  );
}
