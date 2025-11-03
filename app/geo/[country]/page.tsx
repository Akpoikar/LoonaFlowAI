import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import PulsingBorderShader from '../../../components/PulsingBorderShader';
import Footer from '../../../components/Footer';
import Logo from '../../../components/Logo';
import { countryCodes } from '@/lib/countryCodes';

type CountrySeo = {
  slug: string;
  code: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  geo: {
    continent: string;
    primary_cities: string[];
    languages: string[];
    currency: string;
  };
};

const seoJsonPath = path.join(process.cwd(), 'data', 'country-seo.json');
const jsonCountries: CountrySeo[] = JSON.parse(fs.readFileSync(seoJsonPath, 'utf8'));

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const autoCountries: CountrySeo[] = countryCodes.slice(0, 100).map(c => {
  const slug = slugify(c.name);
  return {
    slug,
    code: c.code,
    name: c.name,
    title: `Find B2B Leads in ${c.name} | LoonaFlow AI`,
    description: `Discover and reach verified B2B leads in ${c.name}. Scrape local businesses by city and niche, personalize outreach, and track replies with LoonaFlow AI.`,
    keywords: [
      `${c.name} B2B leads`,
      `${c.name} business leads`,
      `email outreach ${c.name}`,
      `local business leads ${c.name}`,
      `AI lead generation ${c.name}`
    ],
    h1: `B2B Leads in ${c.name}`,
    geo: {
      continent: '',
      primary_cities: [],
      languages: [],
      currency: ''
    }
  } as CountrySeo;
});

const countries: CountrySeo[] = (() => {
  const bySlug = new Map<string, CountrySeo>();
  autoCountries.forEach(c => bySlug.set(c.slug, c));
  jsonCountries.forEach(c => bySlug.set(c.slug, { ...bySlug.get(c.slug), ...c }));
  return Array.from(bySlug.values());
})();

export async function generateStaticParams() {
  return countries.map(c => ({ country: c.slug }));
}

export async function generateMetadata(
  { params }: { params: { country: string } }
): Promise<Metadata> {
  const country = countries.find(c => c.slug === params.country);
  if (!country) return {};
  return {
    title: country.title,
    description: country.description,
    keywords: country.keywords,
    alternates: {
      canonical: `https://loonaflow.app/geo/${country.slug}`
    },
    openGraph: {
      title: country.title,
      description: country.description,
      url: `https://loonaflow.app/geo/${country.slug}`,
      siteName: 'LoonaFlow AI',
      type: 'website'
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const country = countries.find(c => c.slug === params.country);
  if (!country) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-3xl font-bold">Country not found</h1>
        <p className="mt-4 text-gray-600">Try exploring our supported regions.</p>
        <Link className="mt-6 inline-block text-indigo-600 hover:underline" href="/for">Explore use-cases</Link>
      </div>
    );
  }

  const continentText = country.geo?.continent && country.geo.continent.trim().length > 0
    ? country.geo.continent
    : `All regions of ${country.name}`;
  const citiesText = country.geo?.primary_cities && country.geo.primary_cities.length > 0
    ? country.geo.primary_cities.join(', ')
    : `Major metropolitan areas across ${country.name}`;
  const languagesText = country.geo?.languages && country.geo.languages.length > 0
    ? country.geo.languages.join(', ')
    : 'Predominantly local language(s)';
  const currencyText = country.geo?.currency && country.geo.currency.trim().length > 0
    ? country.geo.currency
    : 'Local currency';

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img src="/images/background.png" alt="Background" className="w-full h-full object-cover" />
        <div className="w-full h-full" style={{ background: "linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fdf2f8)", display: "none" }} />
      </div>

      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/25 blur-3xl" />

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
      <Script
        id="breadcrumb-ldjson"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://loonaflow.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "GEO",
                "item": "https://loonaflow.app/geo"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": country.name,
                "item": `https://loonaflow.app/geo/${country.slug}`
              }
            ]
          })
        }}
      />
      {/* Hero */}
      <header className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-medium ring-1 ring-indigo-100">
          <span>GEO Guide</span>
          <span>•</span>
          <span>{country.code}</span>
        </div>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          {country.h1}
        </h1>
        <p className="mt-4 text-slate-600 max-w-3xl">
          {country.description}
        </p>

        {/* Removed stat badges by request */}
      </header>

      <section className="mb-12 grid gap-4 sm:gap-5 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
          <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
          <h2 className="text-lg font-semibold">GEO Focus</h2>
          <ul className="mt-3 text-sm text-gray-700">
            <li><strong>Continent:</strong> {continentText}</li>
            <li><strong>Primary cities:</strong> {citiesText}</li>
            <li><strong>Languages:</strong> {languagesText}</li>
            <li><strong>Currency:</strong> {currencyText}</li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
          <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
          <h2 className="text-lg font-semibold">Best-performing niches</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
            <li>Local services (HVAC, plumbing, roofing)</li>
            <li>Professional services (agencies, accounting, legal)</li>
            <li>Health & wellness clinics</li>
            <li>Real estate & property services</li>
            <li>Software & B2B SaaS</li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
          <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
          <h2 className="text-lg font-semibold">Compliance-friendly outreach</h2>
          <p className="mt-3 text-sm text-gray-700">
            LoonaFlow AI helps you run region-aware outreach with unsubscribe handling, rate limits,
            and templates tailored for {country.name}.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">How it works in {country.name}</h2>
        <div className="mt-4 grid gap-4 sm:gap-5 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
            <h3 className="font-semibold">1) Scrape local businesses</h3>
            <p className="mt-2 text-sm text-gray-700">Search by city, niche, and keywords. Export clean CSVs.</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
            <h3 className="font-semibold">2) Personalize with AI</h3>
            <p className="mt-2 text-sm text-gray-700">Use dynamic variables and AI suggestions for higher replies.</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
            <h3 className="font-semibold">3) Send & track</h3>
            <p className="mt-2 text-sm text-gray-700">Monitor opens, clicks, and replies in one dashboard.</p>
          </div>
        </div>
      </section>

      {/* Why prospect in this country */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold">Why prospect in {country.name}</h2>
        <div className="mt-4 grid gap-4 sm:gap-5 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
            <h3 className="font-semibold">Local service density</h3>
            <p className="mt-2 text-sm text-gray-700">Cities in {country.name} host thousands of SMBs across home services, healthcare, and professional firms—ideal for geo-targeted outreach.</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
            <h3 className="font-semibold">Clear regional targeting</h3>
            <p className="mt-2 text-sm text-gray-700">Segment by city or postcode for high-intent messaging and improved deliverability.</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
            <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
            <h3 className="font-semibold">Strong template performance</h3>
            <p className="mt-2 text-sm text-gray-700">Localized subject lines and first lines consistently boost open and reply rates.</p>
          </div>
        </div>
      </section>

      {/* Regulatory notes & best practices */}
      <section className="mb-12 grid gap-4 sm:gap-5 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
          <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
          <h2 className="text-xl font-semibold">Regulatory notes</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
            <li>Always include a clear opt-out link and honor unsubscribes.</li>
            <li>Limit daily send volumes and warm up new inboxes gradually.</li>
            <li>Personalize messages with public business info; avoid sensitive data.</li>
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white/65 backdrop-blur-lg ring-1 ring-indigo-100 shadow-[0_10px_30px_rgba(99,102,241,0.08)] p-5 sm:p-6 transition-all duration-200 hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(99,102,241,0.16)] hover:ring-indigo-200">
          <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200/60 to-purple-200/40 blur-xl" />
          <h2 className="text-xl font-semibold">Recommended templates</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>• Local services outreach (city + service)</li>
            <li>• Multi-location franchise offer</li>
            <li>• New website/SEO audit intro</li>
            <li>• Partnership / referral opener</li>
          </ul>
          <Link href="/dashboard/templates" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">Browse templates</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold">FAQs about {country.name}</h2>
        <div className="mt-4 space-y-3">
          <details className="group rounded-lg bg-white/90 ring-1 ring-white/60 shadow-sm p-4">
            <summary className="cursor-pointer font-medium text-slate-900">What niches work best?</summary>
            <p className="mt-2 text-sm text-slate-700">Local services, professional services, healthcare clinics, and B2B SaaS see consistent results with geo-personalization.</p>
          </details>
          <details className="group rounded-lg bg-white/90 ring-1 ring-white/60 shadow-sm p-4">
            <summary className="cursor-pointer font-medium text-slate-900">How many emails should I send daily?</summary>
            <p className="mt-2 text-sm text-slate-700">Start with 20–30 per inbox per day and ramp gradually while monitoring reputation and reply quality.</p>
          </details>
          <details className="group rounded-lg bg-white/90 ring-1 ring-white/60 shadow-sm p-4">
            <summary className="cursor-pointer font-medium text-slate-900">Can I target multiple cities?</summary>
            <p className="mt-2 text-sm text-slate-700">Yes. Create separate campaigns per city for higher relevance and cleaner analytics.</p>
          </details>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">Top cities we cover</h2>
        {country.geo.primary_cities && country.geo.primary_cities.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {country.geo.primary_cities.map(city => (
              <span key={city} className="rounded-full bg-white/90 backdrop-blur-sm ring-1 ring-white/60 shadow-sm px-3 py-1 text-sm text-gray-700">{city}</span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-700">We cover major metropolitan areas and regional hubs across {country.name}. Use city filters in your campaign to target the locations that matter most.</p>
        )}
      </section>

      <section className="mb-16 rounded-2xl bg-white/95 backdrop-blur-sm ring-1 ring-white/60 shadow-md p-6 sm:p-8">
        <h3 className="text-xl font-semibold">Start finding leads in {country.name} today</h3>
        <p className="mt-2 text-gray-700">Create your campaign, choose a city, pick a niche, and launch your AI-powered outreach.</p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Link href="/signup" className="rounded-md bg-indigo-600 px-5 py-3 text-center text-white hover:bg-indigo-700">Get Started</Link>
          <Link href="/pricing" className="rounded-md border px-5 py-3 text-center hover:bg-gray-50">View Pricing</Link>
        </div>
      </section>

      <nav className="mt-10 text-sm text-gray-600">
        <h4 className="font-semibold">Explore more regions</h4>
        <div className="mt-3 flex flex-wrap gap-3">
          {countries.slice(0, 24).map(c => (
            <Link key={c.slug} href={`/geo/${c.slug}`} className="hover:text-indigo-600">{c.name}</Link>
          ))}
        </div>
      </nav>
          <div className="mt-12">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}


