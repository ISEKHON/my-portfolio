"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Background from "@/components/layout/Background";
import Navbar from "@/components/layout/Navbar";

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
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          {/* Glitch 404 */}
          <div className="relative mb-8 select-none">
            <span className="text-[8rem] font-extrabold font-mono leading-none gradient-text">
              404
            </span>
          </div>

          {/* Terminal block */}
          <div className="mb-8 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden text-left">
            <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="flex-1 text-center text-xs font-mono text-[var(--text-muted)]">
                error — bash
              </span>
            </div>
            <div className="p-4 font-mono text-sm space-y-1.5">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <div
                  key={i}
                  className={
                    i === 0
                      ? "text-red-400"
                      : i === BOOT_LINES.length - 1
                      ? "text-[#f59e0b]"
                      : "text-[var(--text-muted)]"
                  }
                >
                  <span className="text-[#8b5cf6] mr-2">$</span>
                  {line}
                </div>
              ))}
              {visibleLines === BOOT_LINES.length && (
                <div className="flex items-center gap-2 text-[var(--text-primary)] mt-1">
                  <span className="text-[#8b5cf6]">$</span>
                  <span className="inline-block w-2 h-4 bg-[#8b5cf6] cursor-blink" />
                </div>
              )}
            </div>
          </div>

          <p className="text-[var(--text-secondary)] mb-8 text-sm">
            The page you are looking for has been moved, deleted, or never existed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-[#8b5cf6] text-white text-sm font-semibold hover:bg-[#7c3aed] transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/projects"
              className="px-6 py-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-semibold hover:border-[#8b5cf6]/50 hover:text-[var(--text-primary)] transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/terminal"
              className="px-6 py-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-semibold hover:border-[#8b5cf6]/50 hover:text-[var(--text-primary)] transition-colors font-mono"
            >
              Open Terminal
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
