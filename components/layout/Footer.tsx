import { PORTFOLIO } from "@/lib/data";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col items-center gap-5">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
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

        {/* Visitor counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hits.sh/isekhon.me.svg?style=flat-square&label=Visitors&color=8b5cf6&labelColor=13131a"
            alt="Visitor count"
            height={20}
            className="h-5 rounded-sm"
          />
        </div>
      </div>
    </footer>
  );
}
