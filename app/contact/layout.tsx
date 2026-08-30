import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact LoonaFlow AI - Get Support for Local Business Outreach",
  description: "Get in touch with the LoonaFlow AI team. We're here to help with your local business outreach, lead generation, and email automation needs.",
  keywords: [
    "contact loonaflow",
    "loonaflow support",
    "local business outreach help",
    "lead generation support",
    "email automation help",
    "loonaflow ai contact",
    "business outreach support",
  ],
  alternates: { canonical: "https://loonaflow.app/contact" },
  openGraph: {
    title: "Contact LoonaFlow AI - Get Support for Local Business Outreach",
    description: "Get in touch with the LoonaFlow AI team. We're here to help with your local business outreach, lead generation, and email automation needs.",
    url: "https://loonaflow.app/contact",
    siteName: "LoonaFlow AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact LoonaFlow AI - Get Support for Local Business Outreach",
    description: "Get in touch with the LoonaFlow AI team. We're here to help with your local business outreach, lead generation, and email automation needs.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
