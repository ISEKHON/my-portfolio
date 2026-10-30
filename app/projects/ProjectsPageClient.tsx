"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { PORTFOLIO } from "@/lib/data";

const FILTERS = ["All", "Active", "Completed", "Archived"] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectsPageClient() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = PORTFOLIO.projects.filter((p) => {
    if (active === "All") return true;
    return p.status === active.toLowerCase();
  });

  const counts: Record<Filter, number> = {
    All: PORTFOLIO.projects.length,
    Active: PORTFOLIO.projects.filter((p) => p.status === "active").length,
    Completed: PORTFOLIO.projects.filter((p) => p.status === "completed").length,
    Archived: PORTFOLIO.projects.filter((p) => p.status === "archived").length,
  };

  return (
    <>
      <main className="pt-36 md:pt-44 pb-28 px-5 md:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
        <SectionHeader
          as="h1"
          tag="Portfolio"
          title="Selected"
          accent="work."
          subtitle="Everything I've built — from Android apps to web tools and games."
        />

        <div className="flex flex-wrap gap-2 mb-12" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => setActive(f)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
                active === f
                  ? "text-[var(--bg)] border-transparent"
                  : "border-[var(--line)] text-[var(--fg-2)] hover:text-[var(--fg)] hover:border-[var(--line-strong)]"
              }`}
            >
              {active === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-[var(--fg)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f}</span>
              <sup className="relative z-10 font-mono text-[10px] opacity-60">{counts[f]}</sup>
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-x-6 gap-y-14">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} {...project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-[var(--fg-3)] font-mono"
            >
              No projects match this filter — yet.
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
