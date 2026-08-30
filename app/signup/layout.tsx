import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up for LoonaFlow AI - Start Your Local Business Outreach Journey",
  description: "Create your free LoonaFlow AI account and start generating leads, automating emails, and growing your local business outreach today.",
  alternates: { canonical: "https://loonaflow.app/signup" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
