import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PulsingBorderShader from '../../../components/PulsingBorderShader';
import Logo from '../../../components/Logo';
import Footer from '../../../components/Footer';
import competitorsData from '../../../data/competitors.json';

interface CompetitorPageProps {
  params: {
    competitor: string;
  };
}

interface CompetitorData {
  slug: string;
  name: string;
  pageTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  theirStrength: string;
  differentiators: string[];
  faq: Array<{ question: string; answer: string }>;
  published: boolean;
}

const competitorsMap: Record<string, CompetitorData> = (competitorsData as CompetitorData[]).reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, CompetitorData>
);

export async function generateStaticParams() {
  return Object.keys(competitorsMap).map((competitor) => ({ competitor }));
}

export async function generateMetadata({ params }: CompetitorPageProps): Promise<Metadata> {
  const data = competitorsMap[params.competitor];
  if (!data) {
    return { title: 'Page Not Found | LoonaFlow AI', description: 'The requested page could not be found.' };
  }

  return {
    title: data.pageTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://loonaflow.app/vs/${data.slug}` },
    openGraph: {
      title: data.pageTitle,
      description: data.metaDescription,
      url: `https://loonaflow.app/vs/${data.slug}`,
      siteName: 'LoonaFlow AI',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.pageTitle,
      description: data.metaDescription,
    },
    robots: data.published
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

export default function CompetitorPage({ params }: CompetitorPageProps) {
  const data = competitorsMap[params.competitor];
  if (!data) {
    notFound();
  }

  const otherCompetitors = Object.values(competitorsMap).filter((c) => c.slug !== params.competitor);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/background.png" alt="Background" className="w-full h-full object-cover" />
        <div className="w-full h-full" style={{ background: "linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fdf2f8)", display: "none" }} />
      </div>

      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />

      <div className="pointer-events-none absolute right-[2%] top-[5%] z-0"><PulsingBorderShader /></div>
      <div className="pointer-events-none absolute left-[2%] bottom-[5%] z-0"><PulsingBorderShader /></div>

      <div className="relative z-10 mx-auto mt-6 sm:mt-10 mb-10 w-[min(1400px,95vw)] sm:w-[min(1400px,92vw)] rounded-2xl sm:rounded-3xl bg-white/8 backdrop-blur-[2px] ring-1 ring-white/80 shadow-[0_25px_80px_rgba(31,38,135,0.12)]">
        <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12">
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
            <Link href="/"><Logo size="lg" /></Link>
            <div className="flex items-center gap-4 sm:gap-6 text-sm">
              <a href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">Contact</a>
              <a href="/articles" className="text-slate-700 hover:text-slate-900 transition-colors">Articles</a>
              <a href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">Sign in</a>
              <a href="/signup" className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 text-sm transition-colors">Get Started</a>
            </div>
          </nav>

          <article className="max-w-4xl mx-auto">
            <nav className="mb-8">
              <a href="/vs" className="text-violet-600 hover:text-violet-700 transition-colors">← Back to Comparisons</a>
            </nav>

            {!data.published && (
              <div className="mb-8 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 text-amber-900">
                <strong>Draft — not indexed:</strong> This comparison page contains placeholder claims that must be fact-checked
                before it can be published (set <code>published: true</code> in data/competitors.json).
              </div>
            )}

            <header className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6">
                {data.heading}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-6">{data.intro}</p>
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 mb-12 border border-violet-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">What {data.name} Does Well</h2>
                <p className="text-slate-700 leading-relaxed">{data.theirStrength}</p>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Key Differences</h2>
              <div className="space-y-4 mb-8">
                {data.differentiators.map((diff, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
                    <p className="text-slate-700 text-sm">{diff}</p>
                  </div>
                ))}
              </div>

              {data.faq.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {data.faq.map((faq, index) => (
                      <div key={index} className="bg-white/50 rounded-xl p-6 border border-white/20">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">{faq.question}</h3>
                        <p className="text-slate-700">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {otherCompetitors.length > 0 && (
                <>
                  <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">More Comparisons</h2>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {otherCompetitors.map((c) => (
                      <div key={c.slug} className="bg-white/50 rounded-xl p-6 border border-white/20 hover:bg-white/70 transition-colors">
                        <h3 className="text-lg font-semibold text-slate-900 mb-3">vs {c.name}</h3>
                        <a href={`/vs/${c.slug}`} className="text-violet-600 hover:text-violet-700 font-medium text-sm transition-colors">
                          Compare →
                        </a>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-2xl p-8 mb-8 border border-violet-200/20">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">See LoonaFlow AI in Action</h3>
                <p className="text-slate-600 mb-6">
                  Start your free trial and find out why teams choose LoonaFlow AI to source leads and automate outreach in one platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/signup"
                    className="inline-block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-bold text-white shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-purple-700"
                  >
                    Start Your Free Trial
                  </a>
                  <a
                    href="/pricing"
                    className="inline-block rounded-xl bg-white/40 backdrop-blur-md px-8 py-4 font-semibold text-slate-700 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 transition-all duration-300 hover:scale-105 border border-white/30 hover:border-white/50"
                  >
                    View Pricing
                  </a>
                </div>
              </div>
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
