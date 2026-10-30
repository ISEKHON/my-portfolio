"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "lenis/react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Magnetic from "@/components/motion/Magnetic";
import { PORTFOLIO } from "@/lib/data";
import { EASE, EASE_IN_OUT } from "@/lib/variants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Journey" },
  { href: "/terminal", label: "Terminal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Tuck the bar away while scrolling down, bring it back on any upward scroll
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev && !menuOpen);
  });

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const indicator = hovered ?? NAV_LINKS.find((l) => active(l.href))?.href;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed top-0 inset-x-0 z-50 px-4 md:px-6 pt-4"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-display font-semibold text-lg tracking-tight"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative w-9 h-9 rounded-full bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center text-sm font-bold overflow-hidden">
              <span className="transition-transform duration-500 group-hover:-translate-y-[150%]">
                {PORTFOLIO.handle[0]}
              </span>
              <span className="absolute translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0">
                {PORTFOLIO.handle[1]?.toUpperCase()}
              </span>
            </span>
            <span className="hidden sm:inline">{PORTFOLIO.handle}</span>
          </Link>

          {/* Desktop pill */}
          <ul
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500 ${
              scrolled
                ? "bg-[var(--bg-2)]/75 backdrop-blur-xl border-[var(--line)] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
                : "bg-transparent border-transparent"
            }`}
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  className={`relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    indicator === link.href ? "text-[var(--bg)]" : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                  }`}
                >
                  {link.label}
                </Link>
                {indicator === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--fg)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Magnetic strength={0.25} className="hidden md:inline-block">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-sm font-semibold overflow-hidden"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-ink)] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-ink)]" />
                </span>
                Let&apos;s talk
              </Link>
            </Magnetic>
            <button
              className="md:hidden relative w-10 h-10 rounded-full bg-[var(--fg)] flex flex-col items-center justify-center gap-[5px]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block w-4 h-[1.5px] bg-[var(--bg)]"
                animate={menuOpen ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="block w-4 h-[1.5px] bg-[var(--bg)]"
                animate={menuOpen ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-40 bg-[var(--bg-2)] md:hidden flex flex-col justify-between px-6 pt-28 pb-10"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-baseline gap-4 font-display text-5xl font-semibold tracking-tight py-1 ${
                        active(link.href) ? "text-[var(--accent-text)]" : "text-[var(--fg)]"
                      }`}
                    >
                      <span className="font-mono text-xs text-[var(--fg-3)]">0{i + 1}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              className="flex flex-col gap-2 text-sm text-[var(--fg-2)]"
            >
              <a href={`mailto:${PORTFOLIO.email}`} className="text-[var(--fg)]">
                {PORTFOLIO.email}
              </a>
              <div className="flex gap-5">
                <a href={PORTFOLIO.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={PORTFOLIO.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={PORTFOLIO.socials.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
