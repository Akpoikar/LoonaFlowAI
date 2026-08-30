import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Future of B2B Lead Generation: AI, Automation, and GEO Optimization | LoonaFlow AI",
  description: "Discover how AI, automation, and geographic optimization are revolutionizing B2B lead generation in 2025. Learn the strategies that are driving 3x higher conversion rates.",
  keywords: ["B2B lead generation", "AI lead generation", "lead generation automation", "GEO optimization", "B2B sales automation", "lead generation strategies", "automated lead generation", "AI sales tools", "lead generation software", "B2B marketing automation"],
  alternates: { canonical: "https://loonaflow.app/articles/future-b2b-lead-generation-2025" },
  openGraph: {
    title: "The Future of B2B Lead Generation: AI, Automation, and GEO Optimization | LoonaFlow AI",
    description: "Discover how AI, automation, and geographic optimization are revolutionizing B2B lead generation in 2025. Learn the strategies that are driving 3x higher conversion rates.",
    url: "https://loonaflow.app/articles/future-b2b-lead-generation-2025",
    siteName: "LoonaFlow AI",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Future of B2B Lead Generation: AI, Automation, and GEO Optimization | LoonaFlow AI",
    description: "Discover how AI, automation, and geographic optimization are revolutionizing B2B lead generation in 2025. Learn the strategies that are driving 3x higher conversion rates.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
