import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - LoonaFlow AI | How We Use Your Data",
  description: "Learn about how LoonaFlow AI collects, uses, and protects your personal information and data privacy practices.",
  keywords: [
    "loonaflow privacy policy",
    "data protection",
    "cookie policy",
    "privacy practices",
    "loonaflow ai privacy",
    "user data protection",
    "GDPR compliance",
  ],
  alternates: { canonical: "https://loonaflow.app/privacy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
