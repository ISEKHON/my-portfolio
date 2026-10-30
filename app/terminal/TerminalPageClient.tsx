"use client";

import { motion } from "framer-motion";
import TerminalWindow from "@/components/terminal/TerminalWindow";
import SplitText from "@/components/motion/SplitText";
import { EASE } from "@/lib/variants";

export default function TerminalPageClient() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-3 sm:px-5 pt-32 pb-24 overflow-x-hidden">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-4">
            Interactive
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.04em] leading-[0.95]">
            <SplitText text="Portfolio" />{" "}
            <SplitText text="terminal." className="serif-accent text-[var(--accent-text)]" delay={0.1} />
          </h1>
          <p className="text-[var(--fg-2)] mt-4">Explore my portfolio through the command line.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          style={{ transformPerspective: 1200 }}
        >
          <TerminalWindow />
        </motion.div>
      </div>
    </main>
  );
}
