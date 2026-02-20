"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { PORTFOLIO } from "@/lib/data";
import { staggerContainer } from "@/lib/variants";

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
    <div className="min-h-screen">
      <Background />
      <Navbar />
      <main className="pt-28 pb-24 px-5 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            tag="Portfolio"
            title="All Projects"
            subtitle="Everything I've built — from Android apps to web tools."
          />
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                active === f
                  ? "bg-[#8b5cf6] border-[#8b5cf6] text-white"
                  : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#8b5cf6]/40 hover:text-[var(--text-primary)]"
              }`}
            >
              {f}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                  active === f
                    ? "bg-white/20 text-white"
                    : "bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)] font-mono">
            No projects match this filter.
          </div>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
