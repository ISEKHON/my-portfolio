"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Background from "@/components/layout/Background";
import TerminalWindow from "@/components/terminal/TerminalWindow";

export default function TerminalPageClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-3 sm:px-5 pt-24 pb-24 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-[#8b5cf6] mb-3 px-3 py-1 border border-[#8b5cf6]/30 rounded-full bg-[#8b5cf6]/10">
              Interactive
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mt-2">
              Portfolio Terminal
            </h1>
            <p className="text-[var(--text-secondary)] mt-2 text-sm">
              Explore my portfolio through the command line
            </p>
          </div>
          <TerminalWindow />
        </motion.div>
      </main>
    </div>
  );
}
