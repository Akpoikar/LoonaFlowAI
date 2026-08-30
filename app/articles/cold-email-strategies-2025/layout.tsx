import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email in 2025: Strategies That Boost Reply Rates | LoonaFlow AI",
  description: "Learn the latest cold email techniques that are generating 3x higher reply rates in 2025. From subject line optimization to follow-up sequences that convert.",
  keywords: ["cold email strategies", "cold email automation", "email marketing", "reply rates", "email outreach", "B2B sales", "email templates", "cold email best practices", "email personalization", "follow-up sequences", "email deliverability", "B2B email marketing"],
  alternates: { canonical: "https://loonaflow.app/articles/cold-email-strategies-2025" },
  openGraph: {
    title: "Cold Email in 2025: Strategies That Boost Reply Rates | LoonaFlow AI",
    description: "Learn the latest cold email techniques that are generating 3x higher reply rates in 2025. From subject line optimization to follow-up sequences that convert.",
    url: "https://loonaflow.app/articles/cold-email-strategies-2025",
    siteName: "LoonaFlow AI",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Email in 2025: Strategies That Boost Reply Rates | LoonaFlow AI",
    description: "Learn the latest cold email techniques that are generating 3x higher reply rates in 2025. From subject line optimization to follow-up sequences that convert.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
