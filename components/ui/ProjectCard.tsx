"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectStatus } from "@/lib/data";
import { EASE } from "@/lib/variants";
import ProjectVisual from "@/components/ui/ProjectVisual";

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  githubLink?: string;
  category: string;
  gradient: { from: string; to: string };
  status: ProjectStatus;
  progress?: number;
  index?: number;
}

export const STATUS_META: Record<ProjectStatus, { text: string; color: string }> = {
  active: { text: "In progress", color: "#fbbf24" },
  completed: { text: "Shipped", color: "#4ade80" },
  archived: { text: "Archived", color: "#a8a29e" },
};

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  githubLink,
  category,
  gradient,
  status,
  progress,
  index = 0,
}: ProjectCardProps) {
  const s = STATUS_META[status];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.08 }}
      className="group flex flex-col"
    >
      <a href={link} target="_blank" rel="noopener noreferrer" data-cursor="Open" className="block">
        <div className="relative overflow-hidden rounded-[22px]">
          <ProjectVisual
            title={title}
            category={category}
            gradient={gradient}
            className="aspect-[4/3] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.97]"
          />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-[0.15em]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.text}
          </span>
        </div>
      </a>

      <div className="pt-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
          <span className="font-mono text-xs text-[var(--fg-3)] mt-2">{category}</span>
        </div>
        <p className="text-sm text-[var(--fg-2)] leading-relaxed mb-4 flex-1">{description}</p>

        {progress !== undefined && (
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[3px] flex-1 rounded-full bg-[var(--bg-3)] overflow-hidden">
              <motion.div
                className="h-full rounded-full origin-left"
                style={{ background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: progress / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
              />
            </div>
            <span className="font-mono text-xs text-[var(--fg-3)] tabular-nums">{progress}%</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full border border-[var(--line)] text-[var(--fg-2)]">
              {tag}
            </span>
          ))}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source code`}
              className="ml-auto w-9 h-9 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--fg-2)] hover:text-[var(--bg)] hover:bg-[var(--fg)] transition-colors"
            >
              <Github size={15} />
            </a>
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title}`}
            className={`${githubLink ? "" : "ml-auto"} w-9 h-9 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-500 hover:rotate-45`}
          >
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
