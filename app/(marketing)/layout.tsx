import type { Metadata } from "next";
import "./runtime-home.css";

export const metadata: Metadata = {
  title: {
    absolute: "Astrail | Connect your tools. Run them anywhere.",
  },
  description:
    "One hosted runtime for every agent, API, and workflow. Control access, rotate credentials once, and stop maintaining separate integrations.",
  openGraph: {
    images: [{ url: "/runtime-home/og.png", width: 1731, height: 909, alt: "Astrail runtime" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/runtime-home/og.png"],
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
