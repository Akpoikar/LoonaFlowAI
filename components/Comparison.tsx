"use client";

import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Comparison() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div ref={elementRef} className="text-center mb-16 sm:mb-32 px-4 sm:px-0">
      <h2 className={`text-2xl sm:text-3xl font-bold text-slate-900 mb-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        Pricing that scales with your list
      </h2>
      <p className={`text-base sm:text-lg text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto transition-all duration-500 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        See how much you can save with LoonaFlow AI's transparent, lead-based pricing
      </p>

      <div className={`max-w-6xl mx-auto transition-all duration-500 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="rounded-2xl bg-white/40 backdrop-blur-md p-4 sm:p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 overflow-x-auto">
          <div className="min-w-full">
            {/* Desktop view */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 text-sm">
              <div className="font-bold text-slate-900 text-left">Leads / Month</div>
              <div className="font-bold text-violet-600 text-center">LoonaFlow AI</div>
              <div className="font-bold text-slate-600 text-center">Apollo.io</div>
              <div className="font-bold text-slate-600 text-center">Instantly.ai</div>

              <div className="text-slate-700 text-left py-3 font-semibold">200 leads</div>
              <div className="text-green-600 text-center py-3 font-semibold">$0 (Free, 200 leads)</div>
              <div className="text-red-500 text-center py-3">❌ Not available (minimum ~$49/user/month, ~5,000 credits)</div>
              <div className="text-yellow-500 text-center py-3">$19 (Starter, 500 leads)</div>

              <div className="text-slate-700 text-left py-3 border-t border-slate-200 font-semibold">1,000 leads</div>
              <div className="text-green-600 text-center py-3 border-t border-slate-200 font-semibold">$14 (Starter, 1,000 leads)</div>
              <div className="text-yellow-500 text-center py-3 border-t border-slate-200">~$49/month (Basic, 5,000 credits but 1 user min)</div>
              <div className="text-yellow-500 text-center py-3 border-t border-slate-200">$19 (Starter, 500 leads → must upgrade to $49 Growth for 2,000)</div>

              <div className="text-slate-700 text-left py-3 border-t border-slate-200 font-semibold">5,000 leads</div>
              <div className="text-green-600 text-center py-3 border-t border-slate-200 font-semibold">$79 (Scale, 7,000 leads)</div>
              <div className="text-yellow-500 text-center py-3 border-t border-slate-200">~$79–99/month (Pro plan, ~10k credits)</div>
              <div className="text-yellow-500 text-center py-3 border-t border-slate-200">$99 (Scale, 5,000 leads)</div>

              <div className="text-slate-700 text-left py-3 border-t border-slate-200 font-semibold">10,000 leads</div>
              <div className="text-green-600 text-center py-3 border-t border-slate-200 font-semibold">Enterprise (custom, starts ~$99–149 depending on scale, much cheaper than Apollo)</div>
              <div className="text-red-500 text-center py-3 border-t border-slate-200">$119+/user/month (Organization, ~15k credits, 3 users min → $357+)</div>
              <div className="text-red-500 text-center py-3 border-t border-slate-200">❌ Not available (max 5,000 at $99)</div>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-6">
              <div className="bg-white/20 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 text-center mb-3">200 leads</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-violet-600 font-medium">LoonaFlow AI</span>
                    <span className="text-green-600 font-semibold">$0 (Free, 200 leads)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Apollo.io</span>
                    <span className="text-red-500">❌ Not available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Instantly.ai</span>
                    <span className="text-yellow-500">$19 (Starter, 500 leads)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 text-center mb-3">1,000 leads</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-violet-600 font-medium">LoonaFlow AI</span>
                    <span className="text-green-600 font-semibold">$14 (Starter)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Apollo.io</span>
                    <span className="text-yellow-500">~$49/month (Basic)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Instantly.ai</span>
                    <span className="text-yellow-500">$19 → must upgrade to $49</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 text-center mb-3">5,000 leads</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-violet-600 font-medium">LoonaFlow AI</span>
                    <span className="text-green-600 font-semibold">$79 (Scale, 7,000 leads)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Apollo.io</span>
                    <span className="text-yellow-500">~$79–99/month (Pro)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Instantly.ai</span>
                    <span className="text-yellow-500">$99 (Scale)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 rounded-lg p-4">
                <h3 className="font-bold text-slate-900 text-center mb-3">10,000 leads</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-violet-600 font-medium">LoonaFlow AI</span>
                    <span className="text-green-600 font-semibold">Enterprise (custom, starts ~$99–149)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Apollo.io</span>
                    <span className="text-red-500">$119+/user/month (3 users min → $357+)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Instantly.ai</span>
                    <span className="text-red-500">❌ Not available (max 5,000)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
