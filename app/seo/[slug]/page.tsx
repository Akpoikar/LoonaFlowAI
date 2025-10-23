import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PulsingBorderShader from "../../../components/PulsingBorderShader";
import Logo from "../../../components/Logo";
import SEOHead from "../../../components/SEOHead";
import keywordsData from '../../../data/keywords.json';

interface SEOPageProps {
  params: {
    slug: string;
  };
}

interface KeywordData {
  slug: string;
  title: string;
  keyword: string;
  metaDescription: string;
  heading: string;
  content: string;
  related: string[];
}

// Generate static params for all SEO pages
export async function generateStaticParams() {
  return keywordsData.map((keyword: KeywordData) => ({
    slug: keyword.slug,
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: SEOPageProps): Promise<Metadata> {
  const keywordData = keywordsData.find((keyword: KeywordData) => keyword.slug === params.slug);
  
  if (!keywordData) {
    return {
      title: 'Page Not Found | LoonaFlow',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: keywordData.title,
    description: keywordData.metaDescription,
    keywords: [
      keywordData.keyword,
      ...keywordData.related,
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
      "AI-powered outreach",
      "lead generation tool",
      "email marketing automation",
      "business lead finder",
      "automated lead generation",
      "lead generation for businesses",
      "email outreach automation",
      "lead generation platform",
      "business development automation",
      "lead generation software",
      "email automation tool",
      "lead generation service",
      "business lead generation",
      "automated email marketing",
      "lead generation automation platform"
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
      title: keywordData.title,
      description: keywordData.metaDescription,
      url: `https://loonaflow.app/seo/${keywordData.slug}`,
      siteName: 'LoonaFlow AI',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: keywordData.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: keywordData.title,
      description: keywordData.metaDescription,
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
    other: {
      'DC.title': keywordData.title,
      'DC.creator': 'LoonaFlow AI',
      'DC.subject': `${keywordData.keyword}, AI Lead Generation, Outreach Automation, Email Marketing, Business Development`,
      'DC.description': keywordData.metaDescription,
      'DC.publisher': 'LoonaFlow AI',
      'DC.contributor': 'LoonaFlow AI Team',
      'DC.date': '2025',
      'DC.type': 'Software',
      'DC.format': 'text/html',
      'DC.identifier': `https://loonaflow.app/seo/${keywordData.slug}`,
      'DC.language': 'en',
      'DC.coverage': 'Worldwide',
      'DC.rights': 'Copyright 2025 LoonaFlow AI',
      'application-name': 'LoonaFlow AI',
      'apple-mobile-web-app-title': 'LoonaFlow AI',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#7c3aed',
      'msapplication-config': '/browserconfig.xml',
    },
  };
}

export default function SEOPage({ params }: SEOPageProps) {
  const keywordData = keywordsData.find((keyword: KeywordData) => keyword.slug === params.slug);
  
  if (!keywordData) {
    notFound();
  }

  // Get related keywords for internal linking
  const relatedKeywords = keywordsData.filter((keyword: KeywordData) => 
    keywordData.related.includes(keyword.slug)
  );

  return (
    <>
      <SEOHead 
        title={keywordData.title}
        description={keywordData.metaDescription}
        keywords={[keywordData.keyword, ...keywordData.related]}
        canonical={`https://loonaflow.app/seo/${keywordData.slug}`}
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

            {/* SEO Content */}
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
                    {keywordData.keyword}
                  </span>
                  <span className="text-slate-500 text-sm">5 min read</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 mb-6">
                  {keywordData.heading}
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-6">
                  {keywordData.content}
                </p>
                
                <div className="text-slate-500 text-sm">
                  Published on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </header>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-8 mb-12 border border-violet-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Why {keywordData.keyword} Matters in 2025</h2>
                  <p className="text-slate-700 leading-relaxed">
                    In today's competitive business landscape, {keywordData.keyword} has become essential for companies looking to scale their operations and increase revenue. 
                    LoonaFlow's AI-powered platform revolutionizes how businesses approach {keywordData.keyword}, making it more efficient and effective than ever before.
                  </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">The Power of AI in {keywordData.keyword}</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Artificial intelligence is transforming {keywordData.keyword} by automating complex processes, personalizing interactions, and providing actionable insights. 
                  LoonaFlow leverages cutting-edge AI technology to help businesses achieve better results with less manual effort.
                </p>
                
                <div className="bg-slate-50 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Key Benefits of {keywordData.keyword}:</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Increased Efficiency</h4>
                      <p className="text-slate-600 text-sm">Automate repetitive tasks and focus on high-value activities that drive results.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Better Personalization</h4>
                      <p className="text-slate-600 text-sm">AI-powered personalization ensures every interaction feels tailored and relevant.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Scalable Growth</h4>
                      <p className="text-slate-600 text-sm">Scale your operations without proportionally increasing your team size.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Data-Driven Insights</h4>
                      <p className="text-slate-600 text-sm">Make informed decisions based on real-time data and performance analytics.</p>
                    </div>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">How LoonaFlow Transforms {keywordData.keyword}</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  LoonaFlow's comprehensive platform addresses every aspect of {keywordData.keyword}, from initial setup to advanced optimization. 
                  Our AI-powered tools help you achieve better results while reducing manual work and human error.
                </p>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 mb-8 border border-emerald-100">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">LoonaFlow's {keywordData.keyword} Features:</h3>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>AI-Powered Automation:</strong> Intelligent automation that adapts to your specific business needs and goals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>Advanced Analytics:</strong> Comprehensive reporting and insights to track performance and optimize results</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>Seamless Integration:</strong> Connect with your existing tools and workflows for maximum efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-3">•</span>
                      <span><strong>24/7 Support:</strong> Expert support team available to help you succeed with your {keywordData.keyword} strategy</span>
                    </li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Getting Started with {keywordData.keyword}</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Implementing {keywordData.keyword} doesn't have to be complicated. LoonaFlow's intuitive platform makes it easy to get started, 
                  with guided setup and best practices built right into the system.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/50 rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Quick Setup Process:</h3>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li>• Connect your existing tools and data sources</li>
                      <li>• Configure your {keywordData.keyword} preferences</li>
                      <li>• Set up automated workflows and sequences</li>
                      <li>• Launch your first campaign and monitor results</li>
                    </ul>
                  </div>
                  <div className="bg-white/50 rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Best Practices:</h3>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li>• Start with clear goals and success metrics</li>
                      <li>• Test and optimize your approach regularly</li>
                      <li>• Monitor performance and adjust strategies</li>
                      <li>• Scale successful campaigns gradually</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">Related {keywordData.keyword} Solutions</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Explore these related solutions to maximize your {keywordData.keyword} success:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {relatedKeywords.map((related: KeywordData) => (
                    <div key={related.slug} className="bg-white/50 rounded-xl p-6 border border-white/20 hover:bg-white/70 transition-colors">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">{related.heading}</h3>
                      <p className="text-slate-600 text-sm mb-4">{related.content}</p>
                      <a 
                        href={`/seo/${related.slug}`}
                        className="text-violet-600 hover:text-violet-700 font-medium text-sm transition-colors"
                      >
                        Learn more →
                      </a>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12">The Future of {keywordData.keyword}</h2>
                <p className="text-slate-700 leading-relaxed mb-8">
                  {keywordData.keyword} is evolving rapidly, with new technologies and approaches emerging constantly. 
                  LoonaFlow stays ahead of these trends, ensuring our platform always provides the most advanced and effective solutions for your business.
                </p>

                <div className="bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-2xl p-8 border border-violet-200/20">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Transform Your {keywordData.keyword}?</h3>
                  <p className="text-slate-600 mb-6">
                    Join thousands of businesses already using LoonaFlow to revolutionize their {keywordData.keyword} approach. 
                    Start your free trial today and experience the power of AI-driven automation.
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
