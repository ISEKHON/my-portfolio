"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate } from "animejs";
import type { IconType } from "react-icons";
import {
  SiKotlin, SiJavascript, SiTypescript, SiPython,
  SiCplusplus, SiPhp, SiAndroid, SiJetpackcompose, SiReact,
  SiNextdotjs, SiNodedotjs, SiVuedotjs, SiFirebase, SiSqlite,
  SiMongodb, SiPostgresql, SiDocker, SiRedis, SiAndroidstudio,
  SiGit, SiIntellijidea, SiFigma, SiPostman, SiDotnet,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { PORTFOLIO } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/variants";

const SKILL_ICONS: Record<string, IconType> = {
  // Languages
  "Java": FaJava,
  "Kotlin": SiKotlin,
  "JavaScript": SiJavascript,
  "TypeScript": SiTypescript,
  "Python": SiPython,
  "C++": SiCplusplus,
  "C#": SiDotnet,
  "PHP": SiPhp,
  // Mobile
  "Android SDK": SiAndroid,
  "Jetpack Compose": SiJetpackcompose,
  "React Native": SiReact,
  // Web
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "Vue.js": SiVuedotjs,
  // Cloud & Database
  "Firebase": SiFirebase,
  "SQLite / Room": SiSqlite,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "Docker": SiDocker,
  "Redis": SiRedis,
  // Tools
  "Android Studio": SiAndroidstudio,
  "Git": SiGit,
  "VS Code": VscVscode,
  "IntelliJ IDEA": SiIntellijidea,
  "Figma": SiFigma,
  "Postman": SiPostman,
};

const levelColor: Record<string, string> = {
  EXPERT: "#10b981",
  ADVANCED: "#3b82f6",
  INTERMEDIATE: "#f59e0b",
  LEARNING: "#6b7280",
};

function SkillCard({
  name,
  iconBg,
  level,
  levelLabel,
  barColor,
  desc,
}: {
  name: string;
  iconBg: string;
  level: number;
  levelLabel: string;
  barColor: string;
  desc: string;
}) {
  const labelColor = levelColor[levelLabel] ?? "#6b7280";
  const Icon = SKILL_ICONS[name];
  const barRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    animated.current = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          animate(el, {
            width: [`0%`, `${level}%`],
            duration: 900,
            ease: "outCubic",
            delay: 60,
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <motion.div
      variants={fadeInUp}
      className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[rgba(139,92,246,0.3)] transition-colors duration-300"
    >
      {/* Top row: icon + name + label */}
      <div className="flex items-center gap-3 mb-1">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${iconBg}22`, border: `1px solid ${iconBg}44` }}
        >
          {Icon ? (
            <Icon size={20} style={{ color: iconBg }} />
          ) : (
            <span className="text-lg" style={{ color: iconBg }}>?</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[var(--text-primary)] text-sm leading-tight">{name}</div>
          <div className="text-xs text-[var(--text-muted)] font-mono">{level}% Mastery</div>
        </div>
        <span
          className="text-xs font-mono font-semibold tracking-wider shrink-0"
          style={{ color: labelColor }}
        >
          {levelLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden my-3">
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{ backgroundColor: barColor, width: 0 }}
        />
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--text-muted)] leading-relaxed font-mono">{desc}</p>
    </motion.div>
  );
}

export default function SkillsSection() {
  const categories = PORTFOLIO.skills.map((g) => g.category);
  const [active, setActive] = useState(categories[0]);
  const activeGroup = PORTFOLIO.skills.find((g) => g.category === active)!;

  return (
    <section id="skills" className="py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            tag="Tech Stack"
            title="Skills & Technologies"
            subtitle="Technologies and tools I use to bring ideas to life."
          />
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                active === cat
                  ? "bg-[#8b5cf6] border-[#8b5cf6] text-white"
                  : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[#8b5cf6]/40 hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeGroup.items.map((item) => (
              <SkillCard key={item.name} {...item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
