import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects — iSekhon",
  description: "Android and web projects built by Jagdeep (iSekhon) — apps using Kotlin, Jetpack Compose, Firebase, and more.",
  openGraph: {
    title: "Projects — iSekhon",
    description: "Android and web projects built by Jagdeep (iSekhon).",
    images: ["https://github.com/isekhon.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
