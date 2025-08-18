"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function HowItWorks() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
         <div ref={elementRef} className="text-center mb-32">
             <h2 className={`text-3xl font-bold text-slate-900 mb-12 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         How it works
       </h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {[
          {
            step: "Step 1",
            title: "Pick your audience",
            desc: "Type in who you want to reach. We'll find their business details instantly.",
            icon: "🎯",
            input: true,
          },
          {
            step: "Step 2", 
            title: "Let AI craft your emails",
            desc: "AI writes tailored outreach emails that sound natural, not spammy.",
            icon: "✨",
          },
          {
            step: "Step 3",
            title: "Safe sending engine", 
            desc: "Emails are sent from your own inbox with smart limits so you stay out of spam.",
            icon: "📤",
          },
          {
            step: "Step 4",
            title: "Track and improve",
            desc: "See exactly who opened, clicked, and replied — and optimize with A/B testing.",
            icon: "📊",
          },
        ].map((i, index) => (
          <div
            key={i.title}
                         className={`rounded-2xl bg-white/40 backdrop-blur-md p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-[1.02] hover:ring-white/50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
             style={{ 
               transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
             }}
          >
            {i.input ? (
              <div className="space-y-4">
                                 <div className="flex items-center gap-3 bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-sm">
                  <span className="text-2xl">🎯</span>
                  <input 
                    type="text" 
                    placeholder="e.g. Dentists in Prague" 
                    className="bg-transparent outline-none text-lg font-medium flex-1 placeholder-slate-500"
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-slate-700 mb-2 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full inline-block">{i.step}</div>
                  <div className="text-xl font-bold text-slate-900 mb-2">{i.title}</div>
                  <p className="text-slate-600 leading-relaxed">{i.desc}</p>
                </div>
              </div>
            ) : (
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-700 mb-2 bg-white/40 backdrop-blur-sm px-3 py-1 rounded-full inline-block">{i.step}</div>
                <div className="text-4xl mb-4 bg-white/40 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center">{i.icon}</div>
                <div className="text-xl font-bold text-slate-900 mb-3">{i.title}</div>
                <p className="text-slate-600 leading-relaxed">{i.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
