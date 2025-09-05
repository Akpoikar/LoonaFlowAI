"use client";

import { useState } from 'react';
import PulsingBorderShader from "../../components/PulsingBorderShader";
import Logo from "../../components/Logo";
import SEOHead from "../../components/SEOHead";

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: "Local Business Outreach in 2025: What Actually Works",
      excerpt: "Discover the proven strategies that are driving real results in local business outreach this year. From AI-powered tools to personalized approaches that actually get responses.",
      slug: "local-business-outreach-2025",
      date: "2025-09-05",
      readTime: "8 min read",
      category: "Outreach Strategy"
    },
    {
      id: 2,
      title: "Cold Email in 2025: Strategies That Boost Reply Rates",
      excerpt: "Learn the latest cold email techniques that are generating 3x higher reply rates in 2025. From subject line optimization to follow-up sequences that convert.",
      slug: "cold-email-strategies-2025",
      date: "2025-09-05",
      readTime: "6 min read",
      category: "Email Marketing"
    },
    {
      id: 3,
      title: "The Future of B2B Lead Generation: AI, Automation, and GEO Optimization",
      excerpt: "Discover how AI, automation, and geographic optimization are revolutionizing B2B lead generation in 2025. Learn the strategies that are driving 3x higher conversion rates.",
      slug: "future-b2b-lead-generation-2025",
      date: "2025-09-05",
      readTime: "10 min read",
      category: "Lead Generation"
    },
    {
      id: 4,
      title: "Google Maps Lead Generation: How to Find and Contact Local Businesses in 2025",
      excerpt: "Master Google Maps lead generation in 2025. Learn proven strategies to find, research, and contact local businesses using Google Maps data and automation tools.",
      slug: "google-maps-lead-generation-2025",
      date: "2025-09-05",
      readTime: "12 min read",
      category: "Lead Generation"
    },
    {
      id: 5,
      title: "Case Study: How EscapeSpark.com Tripled Leads with AI Outreach",
      excerpt: "Discover how EscapeSpark.com achieved 300% lead growth using AI-powered outreach automation. Learn the strategies and results from this real-world case study.",
      slug: "escapespark-case-study-ai-outreach",
      date: "2025-09-05",
      readTime: "8 min read",
      category: "Case Study"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Articles - LoonaFlow AI | Local Business Outreach Strategies"
        description="Expert insights on local business outreach, cold email strategies, and lead generation techniques that actually work in 2025."
        keywords={["local business outreach", "cold email strategies", "lead generation", "business development", "email marketing"]}
        canonical="https://loonaflow.app/articles"
      />
      <div className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Fallback gradient background */}
          <div 
            className="w-full h-full"
            style={{ 
              background: "linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fdf2f8)",
              display: "none"
            }}
          />
        </div>

        {/* Background blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />

        {/* Glowing circles */}
        <div className="pointer-events-none absolute right-[2%] top-[5%] z-0">
          <PulsingBorderShader />
        </div>
        <div className="pointer-events-none absolute left-[2%] bottom-[5%] z-0">
          <PulsingBorderShader />
        </div>

        {/* Main glass panel */}
        <div className="relative z-10 mx-auto mt-6 sm:mt-10 mb-10 w-[min(1400px,95vw)] sm:w-[min(1400px,92vw)] rounded-2xl sm:rounded-3xl bg-white/8 backdrop-blur-[2px] ring-1 ring-white/80 shadow-[0_25px_80px_rgba(31,38,135,0.12)]">
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl from-white/20 via-white/5 to-white/10 pointer-events-none"></div>
          <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12">
            
            {/* Navbar */}
            <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
              <Logo size="lg" />
              <div className="flex items-center gap-4 sm:gap-6 text-sm">
                <a href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Pricing
                </a>
                <a href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Contact
                </a>
                <a href="/articles" className="text-violet-600 font-semibold">
                  Articles
                </a>
                <a href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Sign in
                </a>
                <a
                  href="/login"
                  className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 text-sm transition-colors"
                >
                  Get Started
                </a>
              </div>
            </nav>

            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6">
                <span className="text-gradient">Expert Insights</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                Proven strategies and tactics for local business outreach, cold email success, and lead generation that actually work in 2025.
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
              {articles.map((article) => (
                <article key={article.id} className="group">
                  <a href={`/articles/${article.slug}`} className="block">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-violet-500/10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">
                          {article.category}
                        </span>
                        <span className="text-slate-500 text-sm">{article.readTime}</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-violet-600 transition-colors">
                        {article.title}
                      </h2>
                      
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-sm">{article.date}</span>
                        <span className="text-violet-600 font-medium group-hover:text-violet-700 transition-colors">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-2xl p-8 border border-violet-200/20">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Ready to put these strategies into action?
                </h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Start implementing these proven outreach techniques with LoonaFlow AI's automated platform.
                </p>
                <a
                  href="/login"
                  className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-bold text-white shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-purple-700"
                >
                  Start Your Free Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
