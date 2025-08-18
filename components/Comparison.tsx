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
            
            <div className="text-slate-700 text-left py-3">Google Maps scraping</div>
            <div className="text-green-600 text-center py-3">✅ Built-in</div>
            <div className="text-red-500 text-center py-3">❌</div>
            <div className="text-red-500 text-center py-3">❌</div>
            
                         <div className="text-slate-700 text-left py-3 border-t border-slate-200">AI email generator</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Advanced</div>
             <div className="text-yellow-500 text-center py-3 border-t border-slate-200">⚠️ Basic</div>
             <div className="text-yellow-500 text-center py-3 border-t border-slate-200">⚠️ Basic</div>
             
             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Safe sending engine</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">❌</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅</div>
             
             <div className="text-slate-700 text-left py-3 border-t border-slate-200">Local lead focus</div>
             <div className="text-green-600 text-center py-3 border-t border-slate-200">✅ Specialized</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">❌</div>
             <div className="text-red-500 text-center py-3 border-t border-slate-200">❌</div>
          </div>
        </div>
      </div>
    </div>
  );
}
