import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login to LoonaFlow AI - Access Your Local Business Outreach Dashboard",
  description: "Sign in to your LoonaFlow AI account to manage your local business outreach campaigns, leads, and email automation.",
  alternates: { canonical: "https://loonaflow.app/login" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
