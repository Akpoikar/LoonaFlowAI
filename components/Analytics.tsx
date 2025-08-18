"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Analytics() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
         <div ref={elementRef} className="text-center mb-32">
             <h2 className={`text-3xl font-bold text-slate-900 mb-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         See results instantly
       </h2>
       <p className={`text-lg text-slate-600 mb-8 max-w-2xl mx-auto transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
         Track opens, clicks, replies in one place
       </p>
       <div className={`max-w-4xl mx-auto transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="rounded-2xl bg-white/40 backdrop-blur-md p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300">
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600 mb-2">2,847</div>
              <div className="text-slate-600">Emails Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
              <div className="text-slate-600">Opens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">89</div>
              <div className="text-slate-600">Replies</div>
            </div>
          </div>
                     <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 shadow-sm ring-1 ring-white/30">
            <div className="text-sm text-slate-500 mb-4">Recent Activity</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Dental Clinic Prague - Email opened</span>
                <span className="text-xs text-slate-500 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Vet Practice Brno - Reply received</span>
                <span className="text-xs text-slate-500 ml-auto">15 min ago</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Law Firm Ostrava - Email opened</span>
                <span className="text-xs text-slate-500 ml-auto">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
