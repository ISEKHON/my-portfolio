"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectVisual from "@/components/ui/ProjectVisual";
import Magnetic from "@/components/motion/Magnetic";
import { STATUS_META } from "@/components/ui/ProjectCard";

type Project = (typeof PORTFOLIO.projects)[number];

function StackCard({
  project,
  i,
  total,
  progress,
}: {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks and dims as the next one slides over it
  const targetScale = 1 - (total - i - 1) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [i / total, 1], [0, (total - i - 1) * 0.18]);
  const s = STATUS_META[project.status];

  return (
    <div className="h-[92vh] md:h-screen sticky top-0 flex items-center">
      <motion.article
        style={{ scale, top: `calc(${i * 28}px)` }}
        className="relative w-full origin-top rounded-[32px] border border-[var(--line)] bg-[var(--bg-2)] p-4 md:p-5 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.5)]"
      >
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-6 md:gap-10 items-stretch">
          <div className="flex flex-col p-3 md:p-6">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-8 md:mb-auto">
              <span>
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                {s.text}
              </span>
            </div>

            <h3 className="font-display text-3xl md:text-6xl font-semibold tracking-[-0.04em] leading-[0.95] mb-4 md:mb-5">
              {project.title}
            </h3>
            <p className="text-[var(--fg-2)] leading-relaxed mb-6 max-w-md line-clamp-3 md:line-clamp-none">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-[var(--line)] text-[var(--fg-2)]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Magnetic strength={0.3}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 h-12 pl-5 pr-1.5 rounded-full bg-[var(--fg)] text-[var(--bg)] text-sm font-semibold"
                >
                  View project
                  <span className="w-9 h-9 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </Magnetic>
              {project.githubLink && (
                <Magnetic strength={0.3}>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="w-12 h-12 rounded-full border border-[var(--line-strong)] flex items-center justify-center hover:bg-[var(--bg-3)] transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </Magnetic>
              )}
              {project.progress !== undefined && (
                <span className="ml-auto font-mono text-xs text-[var(--fg-3)]">{project.progress}% built</span>
              )}
            </div>
          </div>

          <a href={project.link} target="_blank" rel="noopener noreferrer" data-cursor="Open" tabIndex={-1} aria-hidden>
            <ProjectVisual
              title={project.title}
              category={project.category}
              gradient={project.gradient}
              className="h-[26vh] md:h-[62vh] w-full"
            />
          </a>
        </div>

        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className="absolute inset-0 rounded-[32px] bg-black pointer-events-none"
        />
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const featured = PORTFOLIO.projects.slice(0, 4);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="pt-28 md:pt-40 pb-20 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            index="03"
            tag="Selected work"
            title="Things I've"
            accent="built."
            subtitle="A few projects I've designed, engineered and shipped."
          />
          <Link
            href="/projects"
            className="group mb-14 md:mb-20 inline-flex items-center gap-2 font-medium text-[var(--fg)] shrink-0"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:100%_1px] bg-left-bottom group-hover:bg-[length:0%_1px] bg-right-bottom transition-[background-size] duration-500">
              All projects
            </span>
            <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>

        <div ref={container} className="relative">
          {featured.map((project, i) => (
            <StackCard key={project.id} project={project} i={i} total={featured.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
