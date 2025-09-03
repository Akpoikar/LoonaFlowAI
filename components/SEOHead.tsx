import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export default function SEOHead({
  title = "LoonaFlow AI - All-in-One Local Business Outreach Platform | Find Leads & Generate AI Emails",
  description = "LoonaFlow AI helps local businesses find leads, generate AI-personalized emails, and track results. No CSVs, no headaches. Start your free trial today for local outreach automation.",
  keywords = [
    "local business outreach",
    "lead generation",
    "AI email marketing",
    "local lead scraping",
    "email automation",
    "local business marketing",
    "lead flow",
    "outreach automation",
    "local SEO leads",
    "business development",
    "email campaigns",
    "local marketing automation",
    "lead generation software",
    "email outreach tool",
    "local business leads",
    "loonaflow",
    "loonaflow ai",
    "business outreach platform"
  ],
  canonical = "https://loonaflow.app",
  ogImage = "https://loonaflow.app/og-image.jpg",
  noIndex = false
}: SEOHeadProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://loonaflow.app/#organization",
        "name": "LoonaFlow AI",
        "url": "https://loonaflow.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://loonaflow.app/images/logo.png",
          "width": 512,
          "height": 512
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "hello@loonaflow.app",
          "availableLanguage": "English"
        },
        "sameAs": [
          "https://twitter.com/loonaflowai",
          "https://www.linkedin.com/company/loonaflow-ai",
          "https://www.instagram.com/loonaflowai",
          "https://www.youtube.com/@loonaflowai"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://loonaflow.app/#website",
        "url": "https://loonaflow.app",
        "name": "LoonaFlow AI",
        "description": "All-in-one local business outreach platform for lead generation and email automation",
        "publisher": {
          "@id": "https://loonaflow.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://loonaflow.app/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "LoonaFlow AI",
        "description": "All-in-one local business outreach platform for lead generation and email automation",
        "url": "https://loonaflow.app",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Free trial available"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "127"
        },
        "author": {
          "@id": "https://loonaflow.app/#organization"
        },
        "publisher": {
          "@id": "https://loonaflow.app/#organization"
        }
      }
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="LoonaFlow AI" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="LoonaFlow AI" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@loonaflowai" />
      <meta name="twitter:creator" content="@loonaflowai" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon/web-app-manifest-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon/web-app-manifest-512x512.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="geo.position" content="37.0902;-95.7129" />
      <meta name="ICBM" content="37.0902, -95.7129" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="123 Business Ave" />
      <meta name="business:contact_data:locality" content="San Francisco" />
      <meta name="business:contact_data:region" content="CA" />
      <meta name="business:contact_data:postal_code" content="94105" />
      <meta name="business:contact_data:country_name" content="United States" />
      <meta name="business:contact_data:phone_number" content="+1-555-123-4567" />
      <meta name="business:contact_data:email" content="hello@loonaflow.app" />
      
      {/* Verification Codes (replace with actual codes) */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
    </Head>
  );
}
