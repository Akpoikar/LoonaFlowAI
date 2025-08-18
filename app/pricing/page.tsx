"use client";

import Link from 'next/link';
import Logo from '../../components/Logo';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
                          <Link href="/" className="hover:text-violet-600 transition-colors">
                  <Logo />
                </Link>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">
              Sign in
            </Link>
            <Link href="/login" className="rounded-xl bg-violet-600 px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-colors">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the plan that's right for your business. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">$29</div>
                <div className="text-slate-600 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">500 leads per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">AI email generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Email support</span>
                  </li>
                </ul>
                <Link href="/login" className="block w-full rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-200 transition-colors text-center">
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-violet-300 shadow-lg shadow-purple-100/50 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">$79</div>
                <div className="text-slate-600 mb-6">per month</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">2,000 leads per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Advanced AI personalization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Full analytics dashboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">A/B testing</span>
                  </li>
                </ul>
                <Link href="/login" className="block w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-105 text-center">
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">Custom</div>
                <div className="text-slate-600 mb-6">contact us</div>
                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Unlimited leads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Custom AI training</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Advanced integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Custom reporting</span>
                  </li>
                </ul>
                <Link href="/contact" className="block w-full rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-200 transition-colors text-center">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 text-left">
                <h3 className="font-semibold text-slate-900 mb-2">Can I cancel anytime?</h3>
                <p className="text-slate-600">Yes, you can cancel your subscription at any time. No long-term contracts or hidden fees.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 text-left">
                <h3 className="font-semibold text-slate-900 mb-2">Is there a free trial?</h3>
                <p className="text-slate-600">Yes, all plans come with a 14-day free trial. No credit card required to start.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 text-left">
                <h3 className="font-semibold text-slate-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-slate-600">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 text-left">
                <h3 className="font-semibold text-slate-900 mb-2">Can I upgrade or downgrade?</h3>
                <p className="text-slate-600">Yes, you can change your plan at any time. Changes take effect immediately.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-12 ring-1 ring-violet-500 shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
                                   Join thousands of businesses using LoonaFlow AI to find leads and grow their revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login" className="rounded-2xl bg-white px-8 py-4 font-bold text-violet-600 shadow-xl shadow-black/20 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                  Start Free Trial
                </Link>
                <Link href="/contact" className="rounded-2xl bg-violet-500/20 backdrop-blur-sm px-8 py-4 font-semibold text-white border border-white/20 hover:bg-violet-500/30 transition-all duration-300 hover:scale-105">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
