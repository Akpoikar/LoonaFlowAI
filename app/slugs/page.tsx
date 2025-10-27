import Logo from '../../components/Logo';
import PulsingBorderShader from '../../components/PulsingBorderShader';
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

      <div className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Fallback gradient background (kept for design parity) */}
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fdf2f8)',
              display: 'none',
            }}
          />
        </div>

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />

        {/* Pulsing shaders */}
        <div className="pointer-events-none absolute right-[2%] top-[5%] z-0">
          <PulsingBorderShader />
        </div>
        <div className="pointer-events-none absolute left-[2%] bottom-[5%] z-0">
          <PulsingBorderShader />
        </div>

        {/* Main content */}
        <div className="relative z-10 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <nav className="mb-8">
              <a href="/" className="text-violet-600 hover:text-violet-700 transition-colors">← Back to Home</a>
            </nav>

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
          </div>
        </div>
      </div>
    </>
  );
}
