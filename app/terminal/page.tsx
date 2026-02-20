import type { Metadata } from "next";
import TerminalPageClient from "./TerminalPageClient";

export const metadata: Metadata = {
  title: "Terminal — iSekhon",
  description: "Interactive CLI to explore Jagdeep's portfolio. Try: help, skills, projects, whoami.",
  openGraph: {
    title: "Terminal — iSekhon",
    description: "Interactive terminal — explore iSekhon's portfolio via command line.",
    images: ["https://github.com/isekhon.png"],
  },
};

export default function TerminalPage() {
  return <TerminalPageClient />;
}
