"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Footer from "./Footer";

type FaqItem = { q: string; a: string };
type FaqCategory = { name: string; items: FaqItem[] };

const categories: FaqCategory[] = [
  {
    name: "Getting started",
    items: [
      {
        q: "What does LoonaFlow actually do?",
        a: "LoonaFlow finds real local businesses for you by scraping Google Maps for whatever you search — \"dentists in Prague,\" \"gyms in Austin,\" anything with listings — then hands you verified contact details: name, address, phone, website, and email. From there you can download the list as a CSV and reach out yourself, or let LoonaFlow send the outreach emails for you automatically.",
      },
      {
        q: "Do I need a credit card to start?",
        a: "No. The Free Tier doesn't require a credit card — you get 200 leads a month, 1 email account, and 30 emails/day per inbox to try the platform risk-free.",
      },
      {
        q: "How quickly can I see results?",
        a: "Sourcing a list of leads usually takes minutes. From there, timelines vary by list quality, offer, and inbox warmup status — many users see opens and early replies after their first campaigns, but sustained performance depends on relevance, deliverability setup, and consistent sending habits.",
      },
      {
        q: "Do I need any technical skills to use LoonaFlow?",
        a: "No. Searching for leads is just typing what you're looking for, like you would in Google Maps. No CSVs to build by hand, no scraping tools to configure, no code required.",
      },
    ],
  },
  {
    name: "Finding leads",
    items: [
      {
        q: "Do you provide the leads?",
        a: "Yes. We source business records from Google Maps and trusted directories based on whatever you search for, then deduplicate and enrich key fields like email, phone, and socials. If a business has no public email, or only a personal/free mailbox (e.g. @gmail.com), it's automatically skipped for outreach so your list stays clean.",
      },
      {
        q: "Which countries do you cover?",
        a: "Any country with business listings on Google Maps — that's over 130 countries today. Search by city, region, or country, and we'll scrape whatever matches your target audience.",
      },
      {
        q: "Can I search for any type of business?",
        a: "Yes. If you can search for it on Google Maps, you can target it with LoonaFlow — there's no fixed category list to pick from. Dental clinics, roofers, law firms, restaurants, whatever niche and city you type in.",
      },
      {
        q: "What information do I get for each lead?",
        a: "Business name, category, phone, website, address, city, rating and review count, email (and a secondary email when available), plus links to Facebook, Instagram, and LinkedIn where LoonaFlow can find them.",
      },
      {
        q: "How many leads can I get per month?",
        a: "It depends on your plan: 200/month on the Free Tier, 1,000 on Starter, 3,000 on Growth, 7,000 on Scale, and 10,000+ on Enterprise. See the Pricing page for the full breakdown.",
      },
      {
        q: "Can I upload my own list instead of scraping?",
        a: "Yes. Scraping and sending are two separate steps — if you already have a list, you can upload your own CSV instead and skip straight to outreach.",
      },
      {
        q: "How fresh and accurate is the data?",
        a: "Listings are pulled live from Google Maps at the time you search, so they reflect what's publicly listed right now — not a stale, pre-built database. That said, businesses do update their own listings, so always double-check anything mission-critical (like a phone number) before a high-stakes outreach.",
      },
    ],
  },
  {
    name: "Sending & outreach",
    items: [
      {
        q: "Do I have to send emails through LoonaFlow?",
        a: "No. Scraping and sending are separate. You can scrape a list, download it as a CSV, and use it anywhere — your own CRM, another outreach tool, or a manual campaign. Sending through LoonaFlow is optional, not required.",
      },
      {
        q: "How does LoonaFlow send emails on my behalf?",
        a: "You write one email template, and LoonaFlow sends it to every contact in your list straight from your own inbox — not a shared or generic sending address. Sends are paced out over several days rather than blasted all at once, which helps protect deliverability.",
      },
      {
        q: "Can I reach out through channels other than email?",
        a: "Yes. If a lead has a phone number, WhatsApp, Facebook, Instagram, or LinkedIn on file, you can download the list and reach out on whichever channel makes sense for that business — LoonaFlow's automated sending only covers email today.",
      },
      {
        q: "How many emails can I send per day?",
        a: "That's set per inbox by your plan: 30/day on Free, 50/day on Starter, 150/day on Growth, and 500/day on Scale. Enterprise plans support 10 email accounts at 50/day each.",
      },
      {
        q: "Can I track opens and replies?",
        a: "Yes. If you send through LoonaFlow, opens and replies show up per campaign in real time, so you can see what's working before your next batch goes out.",
      },
      {
        q: "Will my emails land in spam?",
        a: "LoonaFlow helps maximize inbox placement with warmup, SPF/DKIM/DMARC guidance, sending windows, and smart throttling. No platform can guarantee 100%, but consistent warmup, clean lists, and relevant messaging typically improve placement over time.",
      },
      {
        q: "What happens to businesses without a public email?",
        a: "They're automatically skipped for outreach. LoonaFlow only includes businesses with a findable, non-personal email address, so your list stays clean and your sending stays compliant.",
      },
    ],
  },
  {
    name: "Pricing & billing",
    items: [
      {
        q: "What plans does LoonaFlow offer?",
        a: "Free Tier ($0, 200 leads/month), Starter ($14/month, 1,000 leads), Growth ($35/month, 3,000 leads), Scale ($79/month, 7,000 leads), and Enterprise (custom pricing, 10,000+ leads). Every paid plan includes email warmup and basic analytics; Enterprise adds priority support and an agency dashboard.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Absolutely. Subscriptions are month-to-month — cancel anytime from your dashboard. No hidden fees.",
      },
      {
        q: "Can I change plans later?",
        a: "Yes, you can upgrade or downgrade from your dashboard at any time as your lead volume and sending needs change.",
      },
      {
        q: "Is there a free trial or free plan?",
        a: "Yes — the Free Tier is free forever, not a time-limited trial. It's meant for testing the full workflow (sourcing, downloading, and even sending a small campaign) before committing to a paid plan.",
      },
    ],
  },
  {
    name: "Compliance & privacy",
    items: [
      {
        q: "Is LoonaFlow GDPR compliant?",
        a: "LoonaFlow is built to support GDPR-friendly workflows: lawful-basis outreach (typically legitimate interest for B2B), clear opt-out handling with suppression lists, data minimization (skipping personal/free emails), and a Data Processing Addendum (DPA) available on request. Customers remain responsible for how they contact recipients in their own markets.",
      },
      {
        q: "Where does the business data come from?",
        a: "Publicly available business listings on Google Maps and trusted third-party directories — the same information anyone can already find by searching Google Maps themselves. LoonaFlow doesn't scrape personal profiles or private data.",
      },
      {
        q: "Can recipients opt out of emails?",
        a: "Yes. LoonaFlow maintains suppression lists so recipients who opt out or unsubscribe won't be contacted again in future campaigns.",
      },
      {
        q: "Do you sell or share my leads with other customers?",
        a: "No. Lists you source are yours — LoonaFlow doesn't resell or share the leads or contact data you generate with other customers.",
      },
    ],
  },
  {
    name: "Account & support",
    items: [
      {
        q: "How do I get help if something goes wrong?",
        a: "Reach out any time from the Contact page, or email support directly — Enterprise customers get priority support.",
      },
      {
        q: "Can multiple people on my team use one account?",
        a: "Enterprise plans include an agency dashboard built for teams managing multiple clients or campaigns. Reach out via Contact to discuss team access.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "Your account and its data remain accessible if you downgrade to the Free Tier. If you'd like your data fully deleted after cancellation, contact support and we'll take care of it.",
      },
    ],
  },
];

export default function FaqFull() {
  const [openKey, setOpenKey] = useState<string | null>("Getting started-0");

  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: categories.flatMap((cat) =>
        cat.items.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        }))
      ),
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

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
            <Link
              href="/login"
              className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about finding leads and sending outreach with LoonaFlow.
              Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="text-violet-600 hover:text-violet-700 font-medium">
                Get in touch
              </Link>
              .
            </p>
          </div>

          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.name}>
                <h2 className="text-sm font-bold uppercase tracking-widest text-violet-600 mb-4">
                  {category.name}
                </h2>
                <div className="space-y-3">
                  {category.items.map((faq, i) => {
                    const key = `${category.name}-${i}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={key}
                        className="rounded-2xl bg-white/40 backdrop-blur-md ring-1 ring-white/30 shadow-md shadow-purple-100/40 transition-all duration-300 hover:ring-white/50 text-left overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${key}`}
                        >
                          <span id={`faq-${key}`} className="text-base font-semibold text-slate-900">
                            {faq.q}
                          </span>
                          <span
                            className={`shrink-0 w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-sm font-bold transition-transform duration-300 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                        <div
                          id={`faq-answer-${key}`}
                          role="region"
                          aria-labelledby={`faq-${key}`}
                          className="grid transition-all duration-300 ease-out"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-white/40 backdrop-blur-md p-8 ring-1 ring-white/30 shadow-lg shadow-purple-100/50 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
            <p className="text-slate-600 mb-6">Our team is happy to help with anything not covered here.</p>
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-[1.02]"
            >
              Contact Us
            </Link>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
