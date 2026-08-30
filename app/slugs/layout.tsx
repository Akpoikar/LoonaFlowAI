import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Topics | LoonaFlow AI",
  description: "Browse every industry and SEO page on LoonaFlow AI.",
  alternates: { canonical: "https://loonaflow.app/slugs" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
