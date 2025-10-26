import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PulsingBorderShader from "../../../components/PulsingBorderShader";
import Logo from "../../../components/Logo";
import SEOHead from "../../../components/SEOHead";
import industriesData from '../../../data/industries.json';

interface IndustryPageProps {
  params: {
    industry: string;
  };
}

interface IndustryData {
  industry: string;
  title: string;
  pageTitle: string;
  metaDescription: string;
  heading: string;
  intro: string;
  problemStatement: string;
  solutionDescription: string;
  searchStrategies: string[];
  useCases: string[];
  keywords: string[];
  dataPoints: string[];
  ctaHeading: string;
  ctaDescription: string;
}

// Industry-specific data from JSON
const industryDataMap: Record<string, IndustryData> = industriesData.reduce((acc, industry) => {
  acc[industry.industry] = industry;
  return acc;
}, {} as Record<string, IndustryData>);

// Generate static params for all industry pages
export async function generateStaticParams() {
  return Object.keys(industryDataMap).map((industry) => ({
    industry,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industryData = industryDataMap[params.industry];
  
  if (!industryData) {
    return {
      title: 'Page Not Found | LoonaFlow AI',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: industryData.pageTitle,
    description: industryData.metaDescription,
    keywords: [
      ...industryData.keywords,
      "AI lead generation",
      "outreach automation",
      "lead generation software",
      "email automation",
      "business lead scraping",
      "AI email marketing",
      "lead generation platform",
      "email outreach tool",
      "business development",
      "email campaigns",
      "marketing automation",
      "lead generation automation",
      "cold email automation",
      "business prospecting",
      "lead flow automation",
      "AI-powered outreach"
    ],
    authors: [{ name: "LoonaFlow AI Team" }],
    creator: "LoonaFlow AI",
    publisher: "LoonaFlow AI",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://loonaflow.app'),
    openGraph: {
      title: industryData.pageTitle,
      description: industryData.metaDescription,
      url: `https://loonaflow.app/for/${params.industry}`,
      siteName: 'LoonaFlow AI',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: industryData.pageTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: industryData.pageTitle,
      description: industryData.metaDescription,
      images: ['/og-image.jpg'],
      creator: '@loonaflowai',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'elm5m5fvxxxu',
    },
    category: 'technology',
    classification: 'Business Software',
  };
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industryData = industryDataMap[params.industry];
  
  if (!industryData) {
    notFound();
  }

  // Get other industries for cross-linking
  const otherIndustries = Object.entries(industryDataMap)
    .filter(([key]) => key !== params.industry)
    .slice(0, 3);

  return (
    <>
      <SEOHead 
        title={industryData.pageTitle}
        description={industryData.metaDescription}
        keywords={industryData.keywords}
        canonical={`https://loonaflow.app/for/${params.industry}`}
      />
      <div className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/background.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Fallback gradient background */}
          <div 
            className="w-full h-full"
            style={{ 
              background: "linear-gradient(to bottom right, #e0e7ff, #f3e8ff, #fdf2f8)",
              display: "none"
            }}
          />
        </div>

        {/* Background blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-300/50 to-purple-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-gradient-to-br from-pink-300/50 to-rose-200/40 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-300/40 to-violet-300/30 blur-3xl" />

        {/* Glowing circles */}
        <div className="pointer-events-none absolute right-[2%] top-[5%] z-0">
          <PulsingBorderShader />
        </div>
        <div className="pointer-events-none absolute left-[2%] bottom-[5%] z-0">
          <PulsingBorderShader />
        </div>

        {/* Main glass panel */}
        <div className="relative z-10 mx-auto mt-6 sm:mt-10 mb-10 w-[min(1400px,95vw)] sm:w-[min(1400px,92vw)] rounded-2xl sm:rounded-3xl bg-white/8 backdrop-blur-[2px] ring-1 ring-white/80 shadow-[0_25px_80px_rgba(31,38,135,0.12)]">
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl from-white/20 via-white/5 to-white/10 pointer-events-none"></div>
          <div className="px-4 sm:px-8 py-6 sm:py-8 lg:px-12">
            
            {/* Navbar */}
            <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
              <Logo size="lg" />
              <div className="flex items-center gap-4 sm:gap-6 text-sm">
                <a href="/pricing" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Pricing
                </a>
                <a href="/contact" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Contact
                </a>
                <a href="/articles" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Articles
                </a>
                <a href="/login" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Sign in
                </a>
                <a
                  href="/login"
                  className="rounded-xl bg-violet-600 px-3 sm:px-4 py-2 font-medium text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 text-sm transition-colors"
                >
                  Get Started
                </a>
              </div>
            </nav>

            {/* Industry Content */}
            <article className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <nav className="mb-8">
                <a href="/" className="text-violet-600 hover:text-violet-700 transition-colors">
                  ← Back to Home
                </a>
              </nav>

              {/* Article Header */}
              <header className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-violet-100 text-violet-700 text-sm font-medium rounded-full">
                    {industryData.title}
                  </span>
                  <span className="text-slate-500 text-sm">6 min read</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6">
                  {industryData.heading}
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  {industryData.intro}
                </p>
                
                <div className="text-slate-500 text-sm">
                  Updated {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </header>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 mb-12 border border-violet-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Finding {industryData.title} Matters in 2025</h2>
                  <p className="text-slate-700 leading-relaxed">
                    LoonaFlow AI makes finding {industryData.title.toLowerCase()} in your target area faster, more efficient, and more scalable than manual methods. Whether you're selling products, offering services, or building partnerships, connecting with the right {industryData.title.toLowerCase()} is essential for growth.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">The Challenge with Finding {industryData.title}</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {industryData.problemStatement}
                </p>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">How LoonaFlow AI Solves This</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {industryData.solutionDescription}
                </p>
                
                <div className="bg-slate-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Search Strategies for Finding {industryData.title}:</h3>
                  <div className="space-y-4">
                    {industryData.searchStrategies.map((strategy, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-slate-700 text-sm">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Perfect Use Cases for Finding {industryData.title}</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {industryData.useCases.map((useCase, index) => (
                    <div key={index} className="bg-white/50 rounded-xl p-4 border border-white/20">
                      <p className="text-slate-700 text-sm">{useCase}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Data Points You'll Find</h3>
                  <p className="text-slate-700 mb-4">
                    When you search for {industryData.industry.toLowerCase()} with LoonaFlow AI, you'll gather comprehensive contact and business data:
                  </p>
                  <ul className="space-y-2 text-slate-700">
                    {industryData.dataPoints.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-3">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-100">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">LoonaFlow AI Features:</h3>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>AI-Powered Targeting:</strong> Automatically find the right prospects based on location, industry, and business characteristics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>Personalized Email Templates:</strong> Create templates with dynamic placeholders that automatically personalize each message</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>Safe Sending Engine:</strong> Built-in deliverability protection to ensure your emails reach the inbox, not spam</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>Campaign Analytics:</strong> Track opens, clicks, replies, and conversions to optimize your outreach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>24/7 Automation:</strong> Run campaigns 24/7 without manual intervention</span>
                    </li>
                  </ul>
                </div>

                {otherIndustries.length > 0 && (
                  <>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">LoonaFlow AI Works for Other Industries Too</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {otherIndustries.map(([key, data]) => (
                        <div key={key} className="bg-white/50 rounded-xl p-6 border border-white/20 hover:bg-white/70 transition-colors">
                          <h3 className="text-lg font-semibold text-slate-900 mb-3">{data.title}</h3>
                          <p className="text-slate-600 text-sm mb-4">{data.intro.substring(0, 120)}...</p>
                          <a 
                            href={`/for/${key}`}
                            className="text-violet-600 hover:text-violet-700 font-medium text-sm transition-colors"
                          >
                            Learn more →
                          </a>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">The Future of Finding {industryData.title}</h2>
                <p className="text-slate-700 leading-relaxed mb-8">
                  Finding and connecting with {industryData.title.toLowerCase()} is evolving rapidly, with AI and automation becoming essential tools for efficient lead generation. 
                  LoonaFlow AI stays ahead of these trends, ensuring our platform provides the most advanced and effective solutions 
                  for businesses looking to find and contact {industryData.title.toLowerCase()} at scale.
                </p>

                <div className="bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-2xl p-8 mb-8 border border-violet-200/20">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{industryData.ctaHeading}</h3>
                  <p className="text-slate-600 mb-6">
                    {industryData.ctaDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/login"
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
                  <p className="text-slate-500 text-sm mt-4 text-center">
                    Need help getting started? <a href="/contact" className="text-violet-600 hover:text-violet-700 underline">Contact our team</a> for a personalized consultation.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

