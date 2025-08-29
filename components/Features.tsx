"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Features() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
         <div ref={elementRef} className="text-center mb-32">
             <h2 className={`text-3xl font-bold text-slate-900 mb-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         Why choose LoonaFlow AI?
       </h2>
       <p className={`text-lg text-slate-600 mb-12 max-w-2xl mx-auto transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         Everything you need for successful local outreach, all in one platform
       </p>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {[
          {
            icon: "🤖",
            title: "AI Personalization",
            desc: "Dynamic intros for every lead, not generic spam.",
                         color: "bg-white/90"
           },
           {
             icon: "📈",
             title: "Inbox Warmup",
             desc: "Smart sending limits to keep you out of spam folders.",
             color: "bg-white/90"
           },
           {
             icon: "🔍",
             title: "Lead Scraping",
             desc: "LoonaFlow instantly finds publicly available and verified business contact details.",
             color: "bg-white/90"
           },
           {
             icon: "📊",
             title: "Analytics Dashboard",
             desc: "Track opens, clicks, and replies in real-time.",
             color: "bg-white/90"
           },
           {
             icon: "🛡️",
             title: "GDPR Compliance",
             desc: "Built-in unsubscribe and data protection features.",
             color: "bg-white/90"
           },
           {
             icon: "⚡",
             title: "2-Click Setup",
             desc: "Get started in minutes, not hours.",
             color: "bg-white/90"
          }
        ].map((feature, index) => (
          <div
            key={feature.title}
                         className={`rounded-2xl bg-white/40 backdrop-blur-md p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-[1.02] hover:ring-white/50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
             style={{ 
               transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
             }}
          >
                         <div className="text-3xl mb-4 bg-white/40 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">{feature.icon}</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
