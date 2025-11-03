import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { countryCodes } from '@/lib/countryCodes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://loonaflow.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/pricing',
    '/login',
    '/signup',
    '/contact',
    '/articles',
  ].map((route) => ({
    url: `${baseUrl}${route ? route : '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  // Country pages: try JSON, fall back to auto from countryCodes
  const seoJsonPath = path.join(process.cwd(), 'data', 'country-seo.json');
  let countryEntries: MetadataRoute.Sitemap = [];
  try {
    const raw = fs.readFileSync(seoJsonPath, 'utf8');
    const countries: Array<{ slug: string }> = JSON.parse(raw);
    if (countries?.length) {
      countryEntries = countries.map((c) => ({
        url: `${baseUrl}/geo/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    }
  } catch {}
  if (!countryEntries.length) {
    const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    countryEntries = countryCodes.slice(0, 100).map((c) => ({
      url: `${baseUrl}/geo/${slugify(c.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  }

  return [...staticRoutes, ...countryEntries];
}


