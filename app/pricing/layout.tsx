import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LoonaFlow AI Pricing - Simple, Transparent Plans for Local Business Outreach",
  description: "Choose from our simple pricing plans starting at $0. Scale your local business outreach with AI-powered lead generation and email automation. No hidden fees.",
  keywords: [
    "loonaflow pricing",
    "local business outreach pricing",
    "lead generation pricing",
    "email automation pricing",
    "business outreach plans",
    "loonaflow ai pricing",
    "local marketing pricing",
  ],
  alternates: { canonical: "https://loonaflow.app/pricing" },
  openGraph: {
    title: "LoonaFlow AI Pricing - Simple, Transparent Plans for Local Business Outreach",
    description: "Choose from our simple pricing plans starting at $0. Scale your local business outreach with AI-powered lead generation and email automation. No hidden fees.",
    url: "https://loonaflow.app/pricing",
    siteName: "LoonaFlow AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoonaFlow AI Pricing - Simple, Transparent Plans for Local Business Outreach",
    description: "Choose from our simple pricing plans starting at $0. Scale your local business outreach with AI-powered lead generation and email automation. No hidden fees.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
