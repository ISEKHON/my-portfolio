"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PORTFOLIO } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import { staggerContainer } from "@/lib/variants";
import { ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  const featured = PORTFOLIO.projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              tag="Portfolio"
              title="Featured Projects"
              subtitle="A selection of projects I've built and shipped."
            />
          </motion.div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-[#8b5cf6] hover:gap-3 transition-all font-medium"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featured.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#8b5cf6] font-medium"
          >
            View all projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
