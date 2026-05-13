import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { countryCodes } from '@/lib/countryCodes';
import { workflowArticles } from '@/data/workflowArticles';

// Regenerate on every request so changes in data/country-seo.json appear immediately
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://loonaflow.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/pricing',
    '/login',
    '/signup',
    '/contact',
    '/geo',
    '/for',
    '/seo',
    '/articles',
    '/articles/workflows',
  ].map((route) => ({
    url: `${baseUrl}${route ? route : '/'}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));

  const existingArticleSlugs = [
    'local-business-outreach-2025',
    'cold-email-strategies-2025',
    'future-b2b-lead-generation-2025',
    'google-maps-lead-generation-2025',
    'escapespark-case-study-ai-outreach',
  ];

  const articleEntries: MetadataRoute.Sitemap = [
    ...existingArticleSlugs,
    ...workflowArticles.map((article) => article.slug),
  ].map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Industry pages (/for/*)
  let industryEntries: MetadataRoute.Sitemap = [];
  try {
    const industriesRaw = fs.readFileSync(path.join(process.cwd(), 'data', 'industries.json'), 'utf8');
    const industries: Array<{ industry: string }> = JSON.parse(industriesRaw);
    if (Array.isArray(industries) && industries.length) {
      industryEntries = industries
        .filter((i) => typeof i?.industry === 'string' && i.industry.length > 0)
        .map((i) => ({
          url: `${baseUrl}/for/${i.industry}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        }));
    }
  } catch {}

  // SEO pages (/seo/*)
  let seoEntries: MetadataRoute.Sitemap = [];
  try {
    const keywordsRaw = fs.readFileSync(path.join(process.cwd(), 'data', 'keywords.json'), 'utf8');
    const keywords: Array<{ slug: string }> = JSON.parse(keywordsRaw);
    if (Array.isArray(keywords) && keywords.length) {
      seoEntries = keywords
        .filter((k) => typeof k?.slug === 'string' && k.slug.length > 0)
        .map((k) => ({
          url: `${baseUrl}/seo/${k.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        }));
    }
  } catch {}

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

  return [...staticRoutes, ...articleEntries, ...industryEntries, ...seoEntries, ...countryEntries];
}


