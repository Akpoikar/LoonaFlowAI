"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function SocialProof() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
         <div ref={elementRef} className="text-center mb-32">
             <h2 className={`text-2xl font-bold text-slate-900 mb-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         Trusted by local businesses worldwide
       </h2>
       <div className={`flex flex-wrap justify-center items-center gap-8 mb-12 opacity-60 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-lg font-semibold text-slate-700">As seen in:</div>
        <div className="text-lg font-bold text-slate-600">Product Hunt</div>
        <div className="text-lg font-bold text-slate-600">Indie Hackers</div>
        <div className="text-lg font-bold text-slate-600">Hacker News</div>
      </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {[
          {
            quote: "LoonaFlow AI helped us find 200+ local clients in just 2 weeks. The AI personalization is incredible!",
            name: "Sarah Chen",
            role: "Marketing Director",
            company: "Local Dental Group"
          },
          {
            quote: "Finally, a tool that actually works for local outreach. The inbox warmup feature saved our deliverability.",
            name: "Mike Rodriguez",
            role: "Agency Owner",
            company: "Digital Growth Co"
          },
          {
            quote: "Setup took 5 minutes. Results came in the first day. This is exactly what we needed.",
            name: "Emma Thompson",
            role: "Business Owner",
            company: "Thompson Consulting"
          }
        ].map((testimonial, index) => (
          <div
            key={testimonial.name}
                         className={`rounded-2xl bg-white/40 backdrop-blur-md p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-[1.02] hover:ring-white/50 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
             style={{ 
               transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
             }}
          >
            <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                 <span className="text-slate-700 font-bold">{testimonial.name.charAt(0)}</span>
               </div>
              <div>
                <div className="font-semibold text-slate-900">{testimonial.name}</div>
                <div className="text-sm text-slate-600">{testimonial.role}, {testimonial.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
