"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Comparison() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
         <div ref={elementRef} className="text-center mb-32">
             <h2 className={`text-3xl font-bold text-slate-900 mb-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         Why LoonaFlow AI wins
       </h2>
       <p className={`text-lg text-slate-600 mb-12 max-w-2xl mx-auto transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         Everything you need in one platform, not scattered across multiple tools
       </p>
       <div className={`max-w-4xl mx-auto transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="rounded-2xl bg-white/40 backdrop-blur-md p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div className="font-bold text-slate-900 text-left">Feature</div>
            <div className="font-bold text-violet-600 text-center">LoonaFlow AI</div>
            <div className="font-bold text-slate-600 text-center">Apollo</div>
            <div className="font-bold text-slate-600 text-center">Instantly</div>
            
            <div className="text-slate-700 text-left py-3">Local business data sourcing</div>
            <div className="text-green-600 text-center py-3">✅ Built-in & specialized for local SMBs</div>
            <div className="text-red-500 text-center py-3">⚠️ Global B2B database (not local-focused)</div>
            <div className="text-red-500 text-center py-3">❌ Not available</div>
            
            <div className="text-slate-700 text-left py-3 border-t border-slate-200">AI email generator(coming soon)</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Advanced</div>
             <div className="text-yellow-500 text-center py-3 border-t border-slate-200">⚠️ Basic templates</div>
             <div className="text-yellow-500 text-center py-3 border-t border-slate-200">⚠️ Basic templates</div>
             
             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Safe sending engine</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Smart deliverability protection</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">❌ No</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Yes</div>
             
             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Local lead focus</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Optimized for local niches (dentists, salons, gyms, etc.)</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">⚠️ Enterprise/global only</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">❌ Not supported</div>
             
             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Unsubscribe & GDPR compliance</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Built-in suppression lists & DPA</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">⚠️ Requires manual handling</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">❌ Not supported</div>

             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Ease of use</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Simple 2-step workflow</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">⚠️ Complex enterprise UI</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">✅ Simple</div>


             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Pricing</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Affordable for SMBs</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">❌ Expensive enterprise pricing</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">⚠️ Mid-range</div>

             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Trial</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Free trial, no credit card</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">⚠️ Limited trial</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">⚠️ Limited trial</div>
          </div>
        </div>
      </div>
    </div>
  );
}
