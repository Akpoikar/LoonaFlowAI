import Logo from '../../components/Logo';
import SEOHead from '../../components/SEOHead';
import industriesData from '../../data/industries.json';
import keywordsData from '../../data/keywords.json';

export const metadata = {
  title: 'All Topics | LoonaFlow AI',
  description: 'List of all industry and SEO pages on LoonaFlow',
};

export default function SlugsPage() {
  // Sort alphabetically for easier scanning
  const industries = [...(industriesData as any[])].sort((a, b) => a.title.localeCompare(b.title));
  const keywords = [...(keywordsData as any[])].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <SEOHead title="All Topics" description="All industry and SEO pages" />

      <div className="min-h-screen py-20 bg-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-8 text-center">
            <Logo />
            <h1 className="text-3xl font-extrabold mt-4">All Topics</h1>
            <p className="text-slate-600 mt-2">Browse every industry and SEO page to ensure pages are discoverable.</p>
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Industry Pages (/for)</h2>
              <ul className="space-y-2">
                {industries.map((ind: any) => (
                  <li key={ind.industry}>
                    <a href={`/for/${ind.industry}`} className="text-slate-700 hover:text-violet-600 transition-colors">
                      {ind.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">SEO Pages (/seo)</h2>
              <ul className="space-y-2">
                {keywords.map((kw: any) => (
                  <li key={kw.slug}>
                    <a href={`/seo/${kw.slug}`} className="text-slate-700 hover:text-violet-600 transition-colors">
                      {kw.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </main>

          <div className="mt-10 text-sm text-slate-500">If you want this list elsewhere (sitemap, robots, or programmatic exports), I can add automated generation.</div>
        </div>
      </div>
    </>
  );
}
