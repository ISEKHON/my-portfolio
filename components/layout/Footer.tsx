import { PORTFOLIO } from "@/lib/data";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-muted)]">
          © {year}{" "}
          <span className="gradient-text font-semibold">{PORTFOLIO.handle}</span>. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={PORTFOLIO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-muted)] hover:text-[#8b5cf6] transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href={PORTFOLIO.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-[var(--text-muted)] hover:text-[#8b5cf6] transition-colors"
          >
            <Twitter size={18} />
          </a>
          <a
            href={PORTFOLIO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--text-muted)] hover:text-[#8b5cf6] transition-colors"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
