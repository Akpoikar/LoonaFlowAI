"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

const examples = [
  "Dental clinics in Prague",
  "Gyms in Austin",
  "Roofers in Manchester",
  "Hair salons in Toronto",
  "Law firms in Warsaw",
  "Real estate agents in Dubai",
  "Restaurants in Barcelona",
  "Physiotherapists in Berlin",
  "Car dealerships in Miami",
  "Wedding photographers in Lisbon",
  "Accounting firms in Amsterdam",
  "Veterinary clinics in Sydney",
];

export default function SearchAnyBusiness() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div ref={elementRef} className="mb-24 sm:mb-32 px-4 sm:px-0">
      <div
        className={`text-center mb-10 sm:mb-12 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="inline-block text-xs font-bold tracking-widest text-violet-600 mb-3">
          ANY NICHE, ANY CITY
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          If you can search it on Google Maps, you can target it
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
          Just type what you&apos;re looking for, like you would in Google Maps. No lists to buy, no categories to pick from.
        </p>
      </div>

      <div
        className={`max-w-3xl mx-auto rounded-2xl bg-white/40 backdrop-blur-md p-6 sm:p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 transition-all duration-500 delay-100 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 ring-1 ring-slate-200 shadow-sm mb-6 sm:mb-8 max-w-lg mx-auto">
          <svg
            className="w-5 h-5 text-slate-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm sm:text-base text-slate-400">e.g. &ldquo;dental clinics in Prague&rdquo;</span>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {examples.map((example) => (
            <span
              key={example}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white ring-1 ring-slate-200 text-sm text-slate-700 shadow-sm"
            >
              {example}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
