"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import LocalTime from "@/components/ui/LocalTime";

const SOCIALS = [
  { href: PORTFOLIO.socials.github, label: "GitHub" },
  { href: PORTFOLIO.socials.linkedin, label: "LinkedIn" },
  { href: PORTFOLIO.socials.twitter, label: "Twitter" },
  { href: PORTFOLIO.socials.telegram, label: "Telegram" },
  { href: PORTFOLIO.socials.discord, label: "Discord" },
];

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Journey" },
  { href: "/terminal", label: "Terminal" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["0.08em", "-0.04em"]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg-2)]">
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-4">
              Got an idea?
            </p>
            <a
              href={`mailto:${PORTFOLIO.email}`}
              className="group inline-flex items-center gap-3 font-display text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_2px] bg-left-bottom group-hover:bg-[length:100%_2px] transition-[background-size] duration-500">
                {PORTFOLIO.email}
              </span>
              <ArrowUpRight className="shrink-0 transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-4">Pages</p>
            <ul className="space-y-2">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-4">Socials</p>
            <ul className="space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors"
                  >
                    {s.label}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          style={{ letterSpacing }}
          className="font-display font-bold leading-[0.8] text-[19vw] md:text-[17vw] lg:text-[15rem] text-center select-none text-[var(--fg)]"
          aria-hidden
        >
          {PORTFOLIO.handle}
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--fg-3)]">
          <span>© {new Date().getFullYear()} {PORTFOLIO.name}. Crafted with care.</span>
          <LocalTime />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hits.sh/isekhon.me.svg?style=flat-square&label=Visitors&color=c8f560&labelColor=121214"
            alt="Visitor count"
            height={20}
            className="h-5 rounded-sm"
          />
        </div>
      </motion.div>
    </footer>
  );
}
