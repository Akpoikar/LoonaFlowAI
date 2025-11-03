import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
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
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">{country.h1} { /* country.flag could be added if needed */ }</h1>
        <p className="mt-4 text-gray-600 max-w-3xl">{country.description}</p>
      </header>

      <section className="mb-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">GEO Focus</h2>
          <ul className="mt-3 text-sm text-gray-700">
            <li><strong>Continent:</strong> {country.geo.continent}</li>
            <li><strong>Primary cities:</strong> {country.geo.primary_cities.join(', ')}</li>
            <li><strong>Languages:</strong> {country.geo.languages.join(', ')}</li>
            <li><strong>Currency:</strong> {country.geo.currency}</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Best-performing niches</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700">
            <li>Local services (HVAC, plumbing, roofing)</li>
            <li>Professional services (agencies, accounting, legal)</li>
            <li>Health & wellness clinics</li>
            <li>Real estate & property services</li>
            <li>Software & B2B SaaS</li>
          </ul>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Compliance-friendly outreach</h2>
          <p className="mt-3 text-sm text-gray-700">
            LoonaFlow AI helps you run region-aware outreach with unsubscribe handling, rate limits,
            and templates tailored for {country.name}.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">How it works in {country.name}</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold">1) Scrape local businesses</h3>
            <p className="mt-2 text-sm text-gray-700">Search by city, niche, and keywords. Export clean CSVs.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold">2) Personalize with AI</h3>
            <p className="mt-2 text-sm text-gray-700">Use dynamic variables and AI suggestions for higher replies.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="font-semibold">3) Send & track</h3>
            <p className="mt-2 text-sm text-gray-700">Monitor opens, clicks, and replies in one dashboard.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold">Top cities we cover</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {country.geo.primary_cities.map(city => (
            <span key={city} className="rounded-full border px-3 py-1 text-sm text-gray-700">{city}</span>
          ))}
        </div>
      </section>

      <section className="mb-16 rounded-xl border p-8 bg-white">
        <h3 className="text-xl font-semibold">Start finding leads in {country.name} today</h3>
        <p className="mt-2 text-gray-700">Create your campaign, choose a city, pick a niche, and launch your AI-powered outreach.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/signup" className="rounded-md bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700">Get Started</Link>
          <Link href="/pricing" className="rounded-md border px-5 py-2.5 hover:bg-gray-50">View Pricing</Link>
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
    </div>
  );
}


