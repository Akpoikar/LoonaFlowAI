import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import PulsingBorderShader from '../../components/PulsingBorderShader';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';

type IndustrySummary = {
  industry: string;
  title: string;
  intro: string;
};

export const metadata: Metadata = {
  title: 'Find Leads by Industry | LoonaFlow AI',
  description: 'Browse industries LoonaFlow AI helps you find and reach — from dental clinics to SaaS companies. See tailored search strategies and outreach tips for each.',
  alternates: { canonical: 'https://loonaflow.app/for' },
  openGraph: {
    title: 'Find Leads by Industry | LoonaFlow AI',
    description: 'Browse industries LoonaFlow AI helps you find and reach — from dental clinics to SaaS companies. See tailored search strategies and outreach tips for each.',
    url: 'https://loonaflow.app/for',
    siteName: 'LoonaFlow AI',
    type: 'website',
  },
};

export default function ForIndexPage() {
  const industriesPath = path.join(process.cwd(), 'data', 'industries.json');
  let industries: IndustrySummary[] = [];
  try {
    industries = JSON.parse(fs.readFileSync(industriesPath, 'utf8')) as IndustrySummary[];
  } catch {}

  const sorted = [...industries].sort((a, b) => a.title.localeCompare(b.title));

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

      <div className="relative z-10 mx-auto mt-10 mb-12 w-[min(1400px,95vw)] sm:w-[min(1400px,92vw)] rounded-2xl sm:rounded-3xl bg-white/8 backdrop-blur-[2px] ring-1 ring-white/80 shadow-[0_25px_80px_rgba(31,38,135,0.12)]">
        <div className="px-4 sm:px-8 py-8 lg:px-12">
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
            <Link href="/"><Logo size="lg" /></Link>
            <div className="flex items-center gap-4 sm:gap-6 text-sm">
              <a href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">Contact</a>
              <a href="/articles" className="text-slate-700 hover:text-slate-900 transition-colors">Articles</a>
              <a href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">Sign in</a>
              <a href="/signup" className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 text-sm transition-colors">Get Started</a>
            </div>
          </nav>
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight">Find Leads by Industry</h1>
            <p className="mt-3 max-w-3xl text-gray-600">
              Choose an industry to see tailored search strategies, use cases, and outreach tips for finding and contacting that type of business with LoonaFlow AI.
            </p>
          </header>
          <section>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {sorted.map((ind) => (
                <Link
                  key={ind.industry}
                  href={`/for/${ind.industry}`}
                  className="group relative block overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] transition-all duration-200 p-5 sm:p-6 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200"
                >
                  <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
                  <span className="font-medium text-slate-800 transition-colors group-hover:text-indigo-700">{ind.title}</span>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{ind.intro.slice(0, 100)}...</p>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
