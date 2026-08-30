import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - LoonaFlow AI | Legal Terms and Conditions",
  description: "Read the terms and conditions for using LoonaFlow AI's local business outreach platform. Understand your rights and obligations.",
  keywords: [
    "loonaflow terms of service",
    "terms and conditions",
    "legal terms",
    "user agreement",
    "loonaflow ai terms",
    "service agreement",
    "platform terms",
  ],
  alternates: { canonical: "https://loonaflow.app/terms" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
