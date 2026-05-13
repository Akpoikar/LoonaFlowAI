import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import PulsingBorderShader from "../../../components/PulsingBorderShader";
import Logo from "../../../components/Logo";
import Footer from "../../../components/Footer";
import { getWorkflowArticle, workflowArticles } from "../../../data/workflowArticles";

type WorkflowArticlePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return workflowArticles.map((article) => ({
    slug: article.slug
  }));
}

export function generateMetadata({ params }: WorkflowArticlePageProps): Metadata {
  const article = getWorkflowArticle(params.slug);

  if (!article) {
    return {
      title: "Article Not Found | LoonaFlow AI",
      description: "The requested article could not be found."
    };
  }

  const canonical = `https://loonaflow.app/articles/${article.slug}`;

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    authors: [{ name: "LoonaFlow AI Team" }],
    creator: "LoonaFlow AI",
    publisher: "LoonaFlow AI",
    metadataBase: new URL("https://loonaflow.app"),
    alternates: {
      canonical
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonical,
      siteName: "LoonaFlow AI",
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: ["LoonaFlow AI Team"],
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: article.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
      images: ["/og-image.jpg"],
      creator: "@loonaflowai"
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

export default function WorkflowArticlePage({ params }: WorkflowArticlePageProps) {
  const article = getWorkflowArticle(params.slug);

  if (!article) {
    notFound();
  }

  const canonical = `https://loonaflow.app/articles/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    image: "https://loonaflow.app/og-image.jpg",
    datePublished: article.date,
    dateModified: article.updated,
    author: {
      "@type": "Organization",
      name: "LoonaFlow AI",
      url: "https://loonaflow.app"
    },
    publisher: {
      "@type": "Organization",
      name: "LoonaFlow AI",
      logo: {
        "@type": "ImageObject",
        url: "https://loonaflow.app/images/logo.png"
      }
    },
    mainEntityOfPage: canonical
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://loonaflow.app/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: "https://loonaflow.app/articles"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonical
      }
    ]
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Script
        id={`article-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id={`faq-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id={`breadcrumb-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
      <div className="pointer-events-none absolute top-2/3 right-1/3 h-48 w-48 rounded-full bg-gradient-to-br from-yellow-200/25 to-orange-200/20 blur-3xl" />

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

          <article className="mx-auto max-w-5xl">
            <nav className="mb-8 text-sm">
              <Link href="/articles" className="text-violet-600 transition-colors hover:text-violet-700">
                Back to Articles
              </Link>
            </nav>

            <header className="mb-12">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">
                  {article.category}
                </span>
                <span className="text-sm text-slate-500">{article.readTime}</span>
                <span className="text-sm text-slate-500">Updated May 14, 2026</span>
              </div>

              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
                {article.eyebrow}
              </p>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                {article.heroTitle}
              </h1>
              <p className="max-w-3xl text-xl leading-relaxed text-slate-600">
                {article.heroDescription}
              </p>
            </header>

            <section className="mb-10 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-purple-50 p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Quick Answer</p>
              <p className="mt-3 text-lg leading-relaxed text-slate-800">{article.quickAnswer}</p>
            </section>

            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              <div className="min-w-0">
                <section className="mb-12 space-y-5">
                  {article.intro.map((paragraph) => (
                    <p key={paragraph} className="text-lg leading-relaxed text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </section>

                <section className="mb-12 space-y-8">
                  {article.sections.map((section) => (
                    <div key={section.title} className="rounded-2xl bg-white/65 p-6 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-indigo-100 backdrop-blur-lg sm:p-8">
                      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{section.title}</h2>
                      <p className="mt-4 leading-relaxed text-slate-700">{section.body}</p>
                      {section.bullets && (
                        <ul className="mt-5 space-y-3 text-slate-700">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.callout && (
                        <div className="mt-6 rounded-xl border border-violet-100 bg-white/70 p-4 text-sm font-medium text-slate-700">
                          {section.callout}
                        </div>
                      )}
                    </div>
                  ))}
                </section>

                <section className="mb-12 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900">{article.exampleTitle}</h2>
                  <p className="mt-4 leading-relaxed text-slate-700">{article.exampleBody}</p>
                  <div className="mt-6 grid gap-3">
                    {article.exampleItems.map((item) => (
                      <div key={item} className="rounded-xl border border-white/60 bg-white/70 p-4 text-sm text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mb-12 rounded-2xl border border-rose-100 bg-white/70 p-6 shadow-[0_10px_30px_rgba(99,102,241,0.08)] backdrop-blur-lg sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900">Mistakes to Avoid</h2>
                  <ul className="mt-5 space-y-3 text-slate-700">
                    {article.mistakes.map((mistake) => (
                      <li key={mistake} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose-400" />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mb-12 rounded-2xl border border-violet-200/40 bg-gradient-to-r from-violet-600/10 to-purple-600/10 p-6 text-center sm:p-8">
                  <h2 className="text-2xl font-bold text-slate-900">{article.getStarted.title}</h2>
                  <p className="mx-auto mt-3 max-w-2xl text-slate-600">{article.getStarted.body}</p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                      href={article.getStarted.primaryHref}
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-bold text-white shadow-xl shadow-violet-600/25 transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-600/40"
                    >
                      {article.getStarted.primaryLabel}
                    </Link>
                    <Link
                      href={article.getStarted.secondaryHref}
                      className="rounded-xl border border-white/30 bg-white/40 px-8 py-4 font-semibold text-slate-700 shadow-lg shadow-purple-100/50 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/50 hover:shadow-xl hover:shadow-purple-200/50"
                    >
                      {article.getStarted.secondaryLabel}
                    </Link>
                  </div>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
                  <div className="mt-5 space-y-4">
                    {article.faqs.map((faq) => (
                      <details key={faq.question} className="rounded-xl bg-white/80 p-5 shadow-sm ring-1 ring-white/60">
                        <summary className="cursor-pointer font-semibold text-slate-900">{faq.question}</summary>
                        <p className="mt-3 leading-relaxed text-slate-700">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
                <div className="rounded-2xl bg-white/70 p-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-indigo-100 backdrop-blur-lg">
                  <h2 className="text-base font-bold text-slate-900">Related Guides</h2>
                  <div className="mt-4 space-y-4">
                    {article.relatedLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="block rounded-xl bg-white/70 p-4 transition-colors hover:bg-white">
                        <span className="font-semibold text-violet-700">{link.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-slate-600">{link.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-xl">
                  <h2 className="font-bold">Need a faster workflow?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    Find leads by niche or country, personalize outreach, and track replies inside LoonaFlow AI.
                  </p>
                  <Link
                    href="/signup"
                    className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-violet-50"
                  >
                    Get Started
                  </Link>
                </div>
              </aside>
            </div>
          </article>

          <div className="mt-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
