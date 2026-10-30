"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/variants";
import Magnetic from "@/components/motion/Magnetic";

const BOOT_LINES = [
  "ERROR: Route not found",
  "SCANNING filesystem...",
  "ATTEMPTING recovery...",
  "RESULT: 404 — Page does not exist",
];

export default function NotFound() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 400);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 pt-28 pb-16 text-center">
      <div className="max-w-xl w-full">
        <div className="flex justify-center font-display font-bold tracking-[-0.06em] leading-none text-[38vw] md:text-[16rem] select-none mb-6">
          {"404".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "60%", opacity: 0, rotate: i === 1 ? -20 : 10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: i * 0.1 }}
              className={i === 1 ? "serif-accent text-[var(--accent-text)]" : ""}
            >
              <motion.span
                className="inline-block"
                animate={{ y: [0, i === 1 ? -14 : -8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              >
                {ch}
              </motion.span>
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          className="mb-8 rounded-2xl border border-[var(--line)] bg-[#0d0d0e] overflow-hidden text-left"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#151517] border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="flex-1 text-center text-xs font-mono text-[#6f6c66]">error — bash</span>
          </div>
          <div className="p-4 font-mono text-sm space-y-1.5 min-h-[9.5rem]">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  i === 0 ? "text-red-400" : i === BOOT_LINES.length - 1 ? "text-[#fbbf24]" : "text-[#a9a69e]"
                }
              >
                <span className="text-[#c8f560] mr-2">$</span>
                {line}
              </motion.div>
            ))}
            {visibleLines === BOOT_LINES.length && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#c8f560]">$</span>
                <span className="inline-block w-2 h-4 bg-[#c8f560] cursor-blink" />
              </div>
            )}
          </div>
        </motion.div>

        <p className="text-[var(--fg-2)] mb-10">
          The page you are looking for has been moved, deleted, or never existed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 h-12 pl-6 pr-1.5 rounded-full bg-[var(--fg)] text-[var(--bg)] text-sm font-semibold"
            >
              Go home
              <span className="w-9 h-9 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </Magnetic>
          <Link
            href="/projects"
            className="inline-flex items-center h-12 px-6 rounded-full border border-[var(--line-strong)] text-sm font-semibold hover:bg-[var(--bg-2)] transition-colors"
          >
            View projects
          </Link>
          <Link
            href="/terminal"
            className="inline-flex items-center h-12 px-6 rounded-full border border-[var(--line-strong)] text-sm font-semibold font-mono hover:bg-[var(--bg-2)] transition-colors"
          >
            Open terminal
          </Link>
        </div>
      </div>
    </main>
  );
}
