import type { Metadata } from "next";
import ExperiencePageClient from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Experience — iSekhon",
  description: "Work history, journey, and timeline of Jagdeep (iSekhon) — Android Developer.",
  openGraph: {
    title: "Experience — iSekhon",
    description: "Work history and developer journey of Jagdeep (iSekhon).",
    images: ["https://github.com/isekhon.png"],
  },
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
