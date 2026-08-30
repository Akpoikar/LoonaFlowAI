import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Study: How EscapeSpark.com Tripled Leads with AI Outreach | LoonaFlow AI",
  description: "Discover how EscapeSpark.com achieved 300% lead growth using AI-powered outreach automation. Learn the strategies and results from this real-world case study.",
  keywords: ["EscapeSpark case study", "AI outreach results", "lead generation automation", "B2B outreach success", "AI sales automation", "outreach case study", "lead generation results", "automated outreach ROI", "B2B sales automation", "AI marketing success"],
  alternates: { canonical: "https://loonaflow.app/articles/escapespark-case-study-ai-outreach" },
  openGraph: {
    title: "Case Study: How EscapeSpark.com Tripled Leads with AI Outreach | LoonaFlow AI",
    description: "Discover how EscapeSpark.com achieved 300% lead growth using AI-powered outreach automation. Learn the strategies and results from this real-world case study.",
    url: "https://loonaflow.app/articles/escapespark-case-study-ai-outreach",
    siteName: "LoonaFlow AI",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Study: How EscapeSpark.com Tripled Leads with AI Outreach | LoonaFlow AI",
    description: "Discover how EscapeSpark.com achieved 300% lead growth using AI-powered outreach automation. Learn the strategies and results from this real-world case study.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
