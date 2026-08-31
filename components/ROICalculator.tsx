"use client";

import { useMemo, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// LoonaFlow plans, mirrored from /pricing — used to pick the cheapest plan
// that covers the lead volume the user asks for.
const PLANS = [
  { name: "Free", leads: 200, price: 0 },
  { name: "Starter", leads: 1000, price: 14 },
  { name: "Growth", leads: 3000, price: 35 },
  { name: "Scale", leads: 7000, price: 79 },
  { name: "Enterprise", leads: 10000, price: 129 },
];

function pickPlan(leadsNeeded: number) {
  const fit = PLANS.find((p) => p.leads >= leadsNeeded);
  return fit ?? PLANS[PLANS.length - 1];
}

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function ROICalculator() {
  const { elementRef, isVisible } = useScrollAnimation();

  const [leadsPerMonth, setLeadsPerMonth] = useState(1000);
  const [replyRate, setReplyRate] = useState(8); // %
  const [closeRate, setCloseRate] = useState(20); // % of replies that become customers
  const [dealValue, setDealValue] = useState(500); // $ per closed deal

  const plan = useMemo(() => pickPlan(leadsPerMonth), [leadsPerMonth]);

  const replies = useMemo(() => Math.round((leadsPerMonth * replyRate) / 100), [leadsPerMonth, replyRate]);
  const deals = useMemo(() => Math.round((replies * closeRate) / 100), [replies, closeRate]);
  const revenue = useMemo(() => deals * dealValue, [deals, dealValue]);

  const costPerLead = plan.price > 0 ? plan.price / leadsPerMonth : 0;
  const costPerReply = replies > 0 ? plan.price / replies : 0;
  const roiMultiple = plan.price > 0 ? revenue / plan.price : revenue > 0 ? Infinity : 0;

  // Rough anchor: a part-time SDR/agency doing this manually costs ~$1,500+/mo
  // for comparable volume — used purely as an illustrative comparison.
  const sdrCost = 1500;
  const savings = Math.max(0, sdrCost - plan.price);

  return (
    <div id="roi-calculator" ref={elementRef} className="mb-16 sm:mb-32 px-4 sm:px-0 scroll-mt-24">
      <div className="text-center mb-8 sm:mb-12">
        <h2
          className={`text-2xl sm:text-3xl font-bold text-slate-900 mb-4 transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          What could this be worth to you?
        </h2>
        <p
          className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto transition-all duration-500 delay-100 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Plug in your numbers and see the plan you'd need, your cost per reply, and the revenue those replies could turn into.
        </p>
      </div>

      <div
        className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Inputs */}
        <div className="rounded-2xl bg-white/40 backdrop-blur-md p-6 sm:p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Your outreach</h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Leads contacted / month</label>
                <span className="text-sm font-bold text-violet-600">{leadsPerMonth.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={200}
                max={10000}
                step={100}
                value={leadsPerMonth}
                onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>200</span>
                <span>10,000</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Average reply rate</label>
                <span className="text-sm font-bold text-violet-600">{replyRate}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={replyRate}
                onChange={(e) => setReplyRate(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Cold list (1%)</span>
                <span>Warm & personalized (30%)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Replies → customers</label>
                <span className="text-sm font-bold text-violet-600">{closeRate}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">Average deal value</label>
                <span className="text-sm font-bold text-violet-600">{formatMoney(dealValue)}</span>
              </div>
              <input
                type="range"
                min={50}
                max={10000}
                step={50}
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-2xl bg-white/40 backdrop-blur-md p-6 sm:p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">What you'd get</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-white/50 p-4">
              <div className="text-2xl font-bold text-slate-900">{replies.toLocaleString()}</div>
              <div className="text-xs text-slate-600 mt-1">replies / month</div>
            </div>
            <div className="rounded-xl bg-white/50 p-4">
              <div className="text-2xl font-bold text-slate-900">{deals.toLocaleString()}</div>
              <div className="text-xs text-slate-600 mt-1">new customers / month</div>
            </div>
            <div className="rounded-xl bg-white/50 p-4">
              <div className="text-2xl font-bold text-green-600">{formatMoney(revenue)}</div>
              <div className="text-xs text-slate-600 mt-1">potential revenue / month</div>
            </div>
            <div className="rounded-xl bg-white/50 p-4">
              <div className="text-2xl font-bold text-violet-600">
                {plan.price === 0 ? "Free" : formatMoney(plan.price)}
              </div>
              <div className="text-xs text-slate-600 mt-1">LoonaFlow plan: {plan.name}</div>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-700 border-t border-slate-200 pt-4 mb-4">
            <div className="flex justify-between">
              <span>Cost per lead contacted</span>
              <span className="font-semibold">{plan.price === 0 ? "$0.00" : `$${costPerLead.toFixed(3)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Cost per reply</span>
              <span className="font-semibold">{plan.price === 0 ? "$0.00" : `$${costPerReply.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Return on your subscription</span>
              <span className="font-semibold text-green-600">
                {plan.price === 0 ? "∞ (free plan)" : Number.isFinite(roiMultiple) ? `${roiMultiple.toFixed(1)}×` : "∞"}
              </span>
            </div>
          </div>

          {savings > 0 && (
            <div className="rounded-xl bg-violet-50 ring-1 ring-violet-200 p-4 text-sm text-slate-700 mb-6">
              A part-time SDR runs about {formatMoney(sdrCost)}/mo. Your plan here is{" "}
              <span className="font-semibold text-violet-700">{plan.price === 0 ? "$0" : formatMoney(plan.price)}</span>,
              so you'd keep <span className="font-semibold text-violet-700">{formatMoney(savings)}</span>/mo in your pocket.
            </div>
          )}

          <a
            href="/login"
            className="mt-auto block w-full rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white text-center shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-colors"
          >
            Start free
          </a>
        </div>
      </div>
    </div>
  );
}
