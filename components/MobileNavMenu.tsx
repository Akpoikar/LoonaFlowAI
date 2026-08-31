"use client";

import { useState } from "react";
import TutorialButton from "./TutorialButton";

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-slate-300/50 text-slate-700"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col gap-2">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 text-slate-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <a
              href="/pricing"
              className="px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="/contact"
              className="px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <a
              href="/articles"
              className="px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </a>
            <a
              href="/login"
              className="px-3 py-3 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign in
            </a>

            <div className="px-3 py-2">
              <TutorialButton />
            </div>

            <a
              href="/login"
              className="mt-2 rounded-xl bg-violet-600 px-4 py-3 font-medium text-white text-center shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
