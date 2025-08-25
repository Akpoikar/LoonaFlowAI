"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Hero() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
         <div ref={elementRef} className="text-center mb-32">
                             <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-slate-900 mb-8 sm:mb-12 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mb-2 sm:mb-3">All-in-one local</div>
          <div><span className="text-gradient">outreach</span> in minutes</div>
        </h1>

        <p className={`text-lg sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 sm:mb-16 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        Turn local businesses into clients — with AI that does the outreach for you.
        </p>

                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           <a href="/login" className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 sm:px-12 py-4 sm:py-6 font-bold text-white shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-105 text-lg sm:text-xl md:text-2xl hover:from-violet-700 hover:to-purple-700 inline-block">
             Get Started
           </a>
           <a href="/contact" className="rounded-2xl bg-white/40 backdrop-blur-md px-6 sm:px-10 py-4 sm:py-6 font-semibold text-slate-700 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-105 text-base sm:text-lg md:text-xl border border-white/30 hover:border-white/50 inline-block">
             Watch Demo
           </a>
         </div>
    </div>
  );
}
