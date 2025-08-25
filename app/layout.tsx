import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "../components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoonaFlow AI - All-in-One Local Business Outreach Platform | Find Leads & Generate AI Emails",
  description: "LoonaFlow AI helps local businesses find leads, generate AI-personalized emails, and track results. No CSVs, no headaches. Start your free trial today for local outreach automation.",
  keywords: [
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
    "local business leads"
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "LoonaFlow AI - All-in-One Local Business Outreach Platform",
    description: "Turn local businesses into clients — with AI that does the outreach for you.",
    url: 'https://loonaflow.app',
    siteName: 'LoonaFlow AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LoonaFlow AI - Local Business Outreach Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "LoonaFlow AI - All-in-One Local Business Outreach Platform",
    description: "Turn local businesses into clients — with AI that does the outreach for you.",
    images: ['/og-image.jpg'],
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  classification: 'Business Software',
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
    'geo.position': '37.0902;-95.7129',
    'ICBM': '37.0902, -95.7129',
    'DC.title': 'LoonaFlow AI - Local Business Outreach Platform',
    'DC.creator': 'LoonaFlow AI',
    'DC.subject': 'Local Business Outreach, Lead Generation, Email Marketing',
    'DC.description': 'All-in-one platform for local business outreach and lead generation',
    'DC.publisher': 'LoonaFlow AI',
    'DC.contributor': 'LoonaFlow AI Team',
    'DC.date': '2024',
    'DC.type': 'Software',
    'DC.format': 'text/html',
    'DC.identifier': 'https://loonaflow.app',
    'DC.language': 'en',
    'DC.coverage': 'Worldwide',
    'DC.rights': 'Copyright 2024 LoonaFlow AI',
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
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
                "@type": "Organization",
                "name": "LoonaFlow AI"
              },
              "publisher": {
                "@type": "Organization",
                "name": "LoonaFlow AI",
                "url": "https://loonaflow.app"
              }
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
