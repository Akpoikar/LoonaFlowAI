import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "../components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoonaFlow AI - AI-Powered Lead Generation & Outreach Automation",
  description: "LoonaFlow AI helps businesses find leads & send personalized outreach. Scrape by niche or country, launch campaigns, and track replies — all in one platform.",
  keywords: [
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
    title: "LoonaFlow AI - AI-Powered Lead Generation & Outreach Automation",
    description: "LoonaFlow AI helps businesses find leads & send personalized outreach. Scrape by niche or country, launch campaigns, and track replies — all in one platform.",
    url: 'https://loonaflow.app',
    siteName: 'LoonaFlow AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LoonaFlow AI - AI-Powered Lead Generation & Outreach Automation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "LoonaFlow AI - AI-Powered Lead Generation & Outreach Automation",
    description: "LoonaFlow AI helps businesses find leads & send personalized outreach. Scrape by niche or country, launch campaigns, and track replies — all in one platform.",
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
    google: 'elm5m5fvxxxu', // <-- your unique Google verification code
  },
  category: 'technology',
  classification: 'Business Software',
  other: {
    'DC.title': 'LoonaFlow AI - AI-Powered Lead Generation & Outreach Automation',
    'DC.creator': 'LoonaFlow AI',
    'DC.subject': 'AI Lead Generation, Outreach Automation, Email Marketing, Business Development',
    'DC.description': 'AI-powered lead generation and outreach automation platform for businesses',
    'DC.publisher': 'LoonaFlow AI',
    'DC.contributor': 'LoonaFlow AI Team',
    'DC.date': '2025',
    'DC.type': 'Software',
    'DC.format': 'text/html',
    'DC.identifier': 'https://loonaflow.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <Script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="a7ecaac3-1382-461b-b32e-8c64f3fb9236"
          async
        />
        
        {/* Enhanced Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "LoonaFlow AI",
              "description": "AI-powered lead generation and outreach automation platform. Scrape businesses by niche or country, launch campaigns, and track replies — all in one simple platform.",
              "url": "https://loonaflow.app",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free trial available",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "LoonaFlow AI",
                "url": "https://loonaflow.app"
              },
              "publisher": {
                "@type": "Organization",
                "name": "LoonaFlow AI",
                "url": "https://loonaflow.app",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://loonaflow.app/images/logo.png"
                }
              },
              "featureList": [
                "AI-powered lead generation",
                "Business scraping by niche or country",
                "Personalized outreach automation",
                "Campaign tracking and analytics",
                "Email automation",
                "Lead management"
              ],
              "screenshot": "https://loonaflow.app/og-image.jpg",
              "softwareVersion": "1.0",
              "releaseNotes": "AI-powered lead generation and outreach automation platform",
              "downloadUrl": "https://loonaflow.app/signup",
              "installUrl": "https://loonaflow.app/signup",
              "softwareHelp": "https://loonaflow.app/contact"
            })
          }}
        />

        {/* Additional structured data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LoonaFlow AI",
              "url": "https://loonaflow.app",
              "logo": "https://loonaflow.app/images/logo.png",
              "description": "AI-powered lead generation and outreach automation platform",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@loonaflow.app"
              },
              "sameAs": [
                "https://www.producthunt.com/products/loonaflow-ai",
                "https://www.instagram.com/loonaflowai",
                "https://www.youtube.com/@loonaflowai"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
