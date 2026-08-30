import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles - LoonaFlow AI | Local Business Outreach Strategies",
  description: "Expert insights on local business outreach, cold email strategies, and lead generation techniques that actually work in 2025.",
  keywords: ["local business outreach", "cold email strategies", "lead generation", "business development", "email marketing"],
  alternates: { canonical: "https://loonaflow.app/articles" },
  openGraph: {
    title: "Articles - LoonaFlow AI | Local Business Outreach Strategies",
    description: "Expert insights on local business outreach, cold email strategies, and lead generation techniques that actually work in 2025.",
    url: "https://loonaflow.app/articles",
    siteName: "LoonaFlow AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles - LoonaFlow AI | Local Business Outreach Strategies",
    description: "Expert insights on local business outreach, cold email strategies, and lead generation techniques that actually work in 2025.",
  },
};

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
