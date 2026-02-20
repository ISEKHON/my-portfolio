"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import SectionHeader from "@/components/ui/SectionHeader";
import TechBadge from "@/components/ui/TechBadge";
import { PORTFOLIO } from "@/lib/data";
import { staggerContainer, fadeInLeft } from "@/lib/variants";

export default function ExperiencePageClient() {
  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      <main className="pt-28 pb-24 px-5 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            tag="Journey"
            title="Experience & Timeline"
            subtitle="My developer journey from the first line of code to today."
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#8b5cf6] via-[#6366f1] to-transparent opacity-30" />

          <div className="space-y-10 pl-10 md:pl-14">
            {PORTFOLIO.experience.map((entry, i) => (
              <motion.div
                key={i}
                variants={fadeInLeft}
                className="relative"
              >
                {/* Dot */}
                <div className="absolute -left-[1.875rem] md:-left-[2.375rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#8b5cf6] bg-[var(--bg-primary)]" />

                <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[#8b5cf6]/30 transition-colors">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)]">{entry.title}</h3>
                      <div className="text-sm text-[#8b5cf6] font-medium">{entry.org}</div>
                    </div>
                    <span className="shrink-0 text-xs font-mono bg-[var(--bg-tertiary)] border border-[var(--border-color)] px-2 py-1 rounded-lg text-[var(--text-muted)]">
                      {entry.year}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {entry.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-color)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
