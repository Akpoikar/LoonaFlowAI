"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FinalCTA() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div ref={elementRef} className="text-center mb-12">
             <div className={`rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 p-12 ring-1 ring-violet-500 shadow-lg hover:shadow-xl transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         <h2 className={`text-4xl font-bold text-white mb-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           Start your free trial today
         </h2>
         <p className={`text-xl text-violet-100 mb-8 max-w-2xl mx-auto transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           No credit card required • Cancel anytime • Get started in 5 minutes
         </p>
                        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                 <a href="/login" className="rounded-2xl bg-white px-10 py-5 font-bold text-violet-600 shadow-xl shadow-black/20 hover:bg-gray-50 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 hover:scale-105 text-xl inline-block">
                   Start Free Trial
                 </a>
                 <a href="/contact" className="rounded-2xl bg-violet-500/20 backdrop-blur-sm px-8 py-5 font-semibold text-white shadow-lg shadow-black/10 hover:bg-violet-500/30 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:scale-105 text-lg border border-white/20 inline-block">
                   Watch Demo
                 </a>
               </div>
      </div>
    </div>
  );
}
