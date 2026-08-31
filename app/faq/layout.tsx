import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - LoonaFlow AI | Local Business Outreach Questions Answered",
  description: "Answers to common questions about finding local business leads, sending outreach emails, pricing, GDPR compliance, and getting started with LoonaFlow AI.",
  keywords: [
    "loonaflow faq",
    "loonaflow ai questions",
    "local business outreach faq",
    "lead generation questions",
    "email automation faq",
    "loonaflow pricing questions",
    "loonaflow gdpr compliance",
  ],
  alternates: { canonical: "https://loonaflow.app/faq" },
  openGraph: {
    title: "FAQ - LoonaFlow AI | Local Business Outreach Questions Answered",
    description: "Answers to common questions about finding local business leads, sending outreach emails, pricing, GDPR compliance, and getting started with LoonaFlow AI.",
    url: "https://loonaflow.app/faq",
    siteName: "LoonaFlow AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - LoonaFlow AI | Local Business Outreach Questions Answered",
    description: "Answers to common questions about finding local business leads, sending outreach emails, pricing, GDPR compliance, and getting started with LoonaFlow AI.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
