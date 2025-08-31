"use client";

import Link from 'next/link';
import Logo from '../../components/Logo';
import Footer from '@/components/Footer';
import SEOHead from '../../components/SEOHead';

export default function PricingPage() {
  return (
    <>
      <SEOHead 
        title="LoonaFlow AI Pricing - Simple, Transparent Plans for Local Business Outreach"
        description="Choose from our simple pricing plans starting at $0. Scale your local business outreach with AI-powered lead generation and email automation. No hidden fees."
        keywords={[
          "loonaflow pricing",
          "local business outreach pricing",
          "lead generation pricing",
          "email automation pricing",
          "business outreach plans",
          "loonaflow ai pricing",
          "local marketing pricing"
        ]}
        canonical="https://loonaflow.app/pricing"
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 p-4 sm:p-6 max-w-7xl mx-auto">
          <Link href="/" className="hover:text-violet-600 transition-colors">
            <Logo />
          </Link>
          <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">
              Sign in
            </Link>
            <Link href="/login" className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-colors">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 relative">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Free Tier</h3>
                <p className="text-sm text-slate-600 mb-2">Free Forever</p>
                <p className="text-xs text-slate-500 mb-4">Perfect for testing the workflow without commitment.</p>
                <div className="text-3xl font-bold text-slate-900 mb-2">$0</div>
                <div className="text-slate-600 mb-6 text-sm">Forever free</div>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">200 leads per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">1 email account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">30 emails/day per inbox</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">1 campaign</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">1 email template</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Basic analytics</span>
                  </li>
                  
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Email warmup</span>
                  </li>
                </ul>
                <button disabled className="block w-full rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-500 cursor-not-allowed text-center text-sm">
                  Downgrade to Free
                </button>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                <p className="text-sm text-slate-600 mb-2">For solopreneurs</p>
                <p className="text-xs text-slate-500 mb-4">Perfect for users sending ~1000 emails/month.</p>
                <div className="text-3xl font-bold text-slate-900 mb-2">$14</div>
                <div className="text-slate-600 mb-6 text-sm">per month</div>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">1,000 leads per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">1 email account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">50 emails/day per inbox</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">3 campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">3 email templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Basic analytics</span>
                  </li>
                  
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Email warmup</span>
                  </li>
                </ul>
                <Link href="/login" className="block w-full rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-700 transition-colors text-center text-sm">
                  Upgrade Now
                </Link>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-violet-300 shadow-lg shadow-purple-100/50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ⭐Recommended
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Growth</h3>
                <p className="text-sm text-slate-600 mb-2">For freelancers & small teams</p>
                <p className="text-xs text-slate-500 mb-4">Advanced features for growing businesses.</p>
                <div className="text-3xl font-bold text-slate-900 mb-2">$35</div>
                <div className="text-slate-600 mb-6 text-sm">per month</div>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">3,000 leads per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">1 email account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">150 emails/day per inbox</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">10 campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">10 email templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Basic analytics</span>
                  </li>
                  
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Email warmup</span>
                  </li>
                </ul>
                <Link href="/login" className="block w-full rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-700 transition-colors text-center text-sm">
                  Upgrade Now
                </Link>
              </div>
            </div>

            {/* Scale Plan */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Scale</h3>
                <p className="text-sm text-slate-600 mb-2">For agencies</p>
                <p className="text-xs text-slate-500 mb-4">Enterprise-grade features for large teams.</p>
                <div className="text-3xl font-bold text-slate-900 mb-2">$79</div>
                <div className="text-slate-600 mb-6 text-sm">per month</div>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">7,000 leads per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">1 email account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">500 emails/day per inbox</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Unlimited campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Unlimited email templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Basic analytics</span>
                  </li>
                  
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Email warmup</span>
                  </li>
                </ul>
                <Link href="/login" className="block w-full rounded-xl bg-violet-600 px-4 py-2 font-semibold text-white hover:bg-violet-700 transition-colors text-center text-sm">
                  Upgrade Now
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 ring-1 ring-white/30 shadow-lg shadow-purple-100/50">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
                <p className="text-sm text-slate-600 mb-2">Custom Pricing</p>
                <p className="text-xs text-slate-500 mb-4">For enterprises & high-volume senders.</p>
                <div className="text-3xl font-bold text-slate-900 mb-2">Custom</div>
                <div className="text-slate-600 mb-6 text-sm">contact us</div>
                <ul className="text-left space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">10,000 leads per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">10 email accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">50 emails/day per inbox</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Unlimited campaigns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Unlimited email templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Advanced analytics</span>
                  </li>
                  
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Email warmup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-slate-700">Agency dashboard</span>
                  </li>
                </ul>
                <Link href="/contact" className="block w-full rounded-xl bg-slate-100 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-200 transition-colors text-center text-sm">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          
           <Footer />
        </div>
      </div>
    </div>
    </>
  );
}
