import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import PulsingBorderShader from "../../../components/PulsingBorderShader";
import Logo from "../../../components/Logo";
import Footer from "../../../components/Footer";
import { workflowArticles } from "../../../data/workflowArticles";

export const metadata: Metadata = {
  title: "Local Lead Generation Workflow Guides | LoonaFlow AI",
  description:
    "Practical, human workflow guides for finding local business leads, contacting prospects, personalizing cold emails, and validating agency offers before scaling.",
  keywords: [
    "local lead generation workflow",
    "local business outreach guides",
    "cold email workflow",
    "agency prospecting workflow",
    "how to find local business leads",
    "personalized cold outreach",
    "LoonaFlow AI guides"
  ],
  alternates: {
    canonical: "https://loonaflow.app/articles/workflows"
  },
  openGraph: {
    title: "Local Lead Generation Workflow Guides | LoonaFlow AI",
    description:
      "Human, practical guides for building prospect lists, writing better outreach, and turning local lead generation into a repeatable workflow.",
    url: "https://loonaflow.app/articles/workflows",
    siteName: "LoonaFlow AI",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Local Lead Generation Workflow Guides"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Lead Generation Workflow Guides | LoonaFlow AI",
    description:
      "Practical workflow guides for local business leads, agency prospecting, and cold email personalization.",
    images: ["/og-image.jpg"],
    creator: "@loonaflowai"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function WorkflowGuidesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Local Lead Generation Workflow Guides",
    description:
      "Practical guides for finding local business leads, writing human outreach, and personalizing cold emails.",
    url: "https://loonaflow.app/articles/workflows",
    publisher: {
      "@type": "Organization",
      name: "LoonaFlow AI",
      url: "https://loonaflow.app"
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: workflowArticles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `https://loonaflow.app/articles/${article.slug}`
      }))
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Script
        id="workflow-guides-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="absolute inset-0">
        <img src="/images/background.png" alt="Background" className="h-full w-full object-cover" />
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fdf2f8)",
            display: "none"
          }}
        />
      </div>

      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-60 w-60 rounded-full bg-gradient-to-br from-purple-200/35 to-pink-200/30 blur-3xl" />

      <div className="pointer-events-none absolute right-[2%] top-[5%] z-0">
        <PulsingBorderShader />
      </div>
      <div className="pointer-events-none absolute left-[2%] bottom-[5%] z-0">
        <PulsingBorderShader />
      </div>

      <div className="relative z-10 mx-auto mt-6 mb-10 w-[min(1400px,95vw)] rounded-2xl bg-white/8 shadow-[0_25px_80px_rgba(31,38,135,0.12)] ring-1 ring-white/80 backdrop-blur-[2px] sm:mt-10 sm:w-[min(1400px,92vw)] sm:rounded-3xl">
        <div className="absolute inset-0 rounded-2xl from-white/20 via-white/5 to-white/10 pointer-events-none sm:rounded-3xl" />
        <div className="px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
          <nav className="mb-8 flex flex-col items-center justify-between gap-4 sm:mb-12 sm:flex-row sm:gap-0">
            <Link href="/">
              <Logo size="lg" />
            </Link>
            <div className="flex items-center gap-4 text-sm sm:gap-6">
              <Link href="/pricing" className="text-slate-700 transition-colors hover:text-slate-900">
                Pricing
              </Link>
              <Link href="/contact" className="text-slate-700 transition-colors hover:text-slate-900">
                Contact
              </Link>
              <Link href="/articles" className="font-semibold text-violet-600">
                Articles
              </Link>
              <Link href="/login" className="text-slate-700 transition-colors hover:text-slate-900">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/20 transition-colors hover:bg-violet-700 sm:px-4"
              >
                Get Started
              </Link>
            </div>
          </nav>

          <main className="mx-auto max-w-6xl">
            <header className="mb-12 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                Workflow Guides
              </p>
              <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Human Guides for Local Lead Generation and Outreach
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Practical, non-generic playbooks for finding local business leads, testing agency offers,
                writing outreach that sounds real, and personalizing cold emails without overthinking it.
              </p>
            </header>

            <section className="mb-12 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-purple-50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Start here if you want traffic that can convert</h2>
              <p className="mt-3 leading-relaxed text-slate-700">
                These guides are built around the same problems LoonaFlow AI solves: finding the right businesses,
                organizing a focused list, writing useful emails, and tracking replies. They are meant for founders,
                agencies, freelancers, and sales teams who want a workflow they can actually use.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/seo/local-business-leads" className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 ring-1 ring-violet-100 hover:bg-white">
                  Local Business Leads
                </Link>
                <Link href="/seo/cold-email-automation" className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 ring-1 ring-violet-100 hover:bg-white">
                  Cold Email Automation
                </Link>
                <Link href="/geo" className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-violet-700 ring-1 ring-violet-100 hover:bg-white">
                  Find Leads by Country
                </Link>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              {workflowArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-white/65 p-6 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-indigo-100 backdrop-blur-lg transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200 sm:p-8"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
                      {article.category}
                    </span>
                    <span className="text-sm text-slate-500">{article.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-violet-700">
                    {article.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-slate-600">{article.metaDescription}</p>
                  <span className="mt-6 inline-block font-medium text-violet-600 group-hover:text-violet-700">
                    Read the guide
                  </span>
                </Link>
              ))}
            </section>

            <section className="mt-12 rounded-2xl border border-violet-200/40 bg-gradient-to-r from-violet-600/10 to-purple-600/10 p-6 text-center sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Want to put the workflow into action?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                LoonaFlow AI helps you find leads by niche or country, personalize outreach, and track replies from one simple dashboard.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-bold text-white shadow-xl shadow-violet-600/25 transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-600/40"
                >
                  Get Started Free
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-xl border border-white/30 bg-white/40 px-8 py-4 font-semibold text-slate-700 shadow-lg shadow-purple-100/50 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:shadow-xl hover:shadow-purple-200/50"
                >
                  View Pricing
                </Link>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
