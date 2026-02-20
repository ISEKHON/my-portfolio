import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — iSekhon",
  description: "Get in touch with Jagdeep (iSekhon) — open to freelance, collaborations, and Android projects.",
  openGraph: {
    title: "Contact — iSekhon",
    description: "Get in touch with Jagdeep (iSekhon).",
    images: ["https://github.com/isekhon.png"],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
