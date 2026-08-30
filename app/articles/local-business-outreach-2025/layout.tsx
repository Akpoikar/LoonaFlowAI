import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local Business Outreach in 2025: What Actually Works | LoonaFlow AI",
  description: "Discover the proven strategies that are driving real results in local business outreach this year. From AI-powered tools to personalized approaches that actually get responses.",
  keywords: ["local business outreach", "local lead generation", "AI outreach tools", "cold email automation", "local business marketing strategy", "business development", "lead generation", "local marketing", "outreach strategies", "B2B sales", "local business leads", "automated outreach", "local sales prospecting"],
  alternates: { canonical: "https://loonaflow.app/articles/local-business-outreach-2025" },
  openGraph: {
    title: "Local Business Outreach in 2025: What Actually Works | LoonaFlow AI",
    description: "Discover the proven strategies that are driving real results in local business outreach this year. From AI-powered tools to personalized approaches that actually get responses.",
    url: "https://loonaflow.app/articles/local-business-outreach-2025",
    siteName: "LoonaFlow AI",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Business Outreach in 2025: What Actually Works | LoonaFlow AI",
    description: "Discover the proven strategies that are driving real results in local business outreach this year. From AI-powered tools to personalized approaches that actually get responses.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
