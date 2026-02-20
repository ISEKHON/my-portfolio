"use client";

import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/variants";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
  githubLink?: string;
  gradient: { from: string; to: string };
  status: "active" | "completed" | "archived";
  progress?: number;
}

const statusLabel = {
  active: { text: "Active", color: "#f59e0b" },
  completed: { text: "Completed", color: "#10b981" },
  archived: { text: "Archived", color: "#6b7280" },
};

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  githubLink,
  gradient,
  status,
  progress,
}: ProjectCardProps) {
  const s = statusLabel[status];

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[#8b5cf6]/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]"
    >
      {/* Color header */}
      <div
        className="h-2 w-full"
        style={{
          background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
        }}
      />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
          <span
            className="shrink-0 text-xs font-mono px-2 py-0.5 rounded-full border"
            style={{ color: s.color, borderColor: `${s.color}40`, backgroundColor: `${s.color}10` }}
          >
            {s.text}
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">
          {description}
        </p>

        {/* Progress bar */}
        {progress !== undefined && (
          <div className="mb-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--text-muted)]">Progress</span>
              <span className="font-mono font-semibold" style={{ color: s.color }}>
                {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${gradient.from}, ${gradient.to})`,
                }}
                initial={{ width: 0 }}
                whileInView={{ width: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)] border border-[var(--border-color)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[#8b5cf6] transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#8b5cf6] hover:text-[#6366f1] transition-colors ml-auto"
          >
            View <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
