import fs from 'fs';
import path from 'path';
import Link from 'next/link';

type CountrySeo = {
  slug: string;
  code: string;
  name: string;
};

export const metadata = {
  title: 'Find B2B Leads by Country | LoonaFlow AI',
  description: 'Explore top countries to find and reach B2B leads. Browse country-specific pages with GEO-focused tips, niches, and outreach best practices.',
  alternates: { canonical: 'https://loonaflow.app/geo' }
};

export default function GeoIndexPage() {
  const seoJsonPath = path.join(process.cwd(), 'data', 'country-seo.json');
  let countries: CountrySeo[] = [];
  try {
    countries = JSON.parse(fs.readFileSync(seoJsonPath, 'utf8')) as CountrySeo[];
  } catch {}

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Find B2B Leads by Country</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Choose a country to discover GEO-focused tips, best-performing niches, and how to launch compliant outreach with LoonaFlow AI.
        </p>
      </header>
      <section>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countries.slice(0, 100).map((c) => (
            <Link key={c.slug} href={`/geo/${c.slug}`} className="group rounded-lg border p-4 hover:border-indigo-300 hover:bg-indigo-50">
              <div className="flex items-center justify-between">
                <span className="font-medium group-hover:text-indigo-700">{c.name}</span>
                <span className="text-xs text-gray-500">{c.code}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Find leads, niches, and GEO insights</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


