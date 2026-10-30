"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { EASE } from "@/lib/variants";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";

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

const LEVEL_COLOR: Record<string, string> = {
  EXPERT: "#c8f560",
  ADVANCED: "#7dd3fc",
  INTERMEDIATE: "#fbbf24",
  LEARNING: "#a8a29e",
};

type Skill = (typeof PORTFOLIO.skills)[number]["items"][number];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = SKILL_ICONS[skill.name];
  const color = LEVEL_COLOR[skill.levelLabel] ?? "#a8a29e";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.05 }}
    >
      <SpotlightCard className="h-full p-6">
        <div className="flex items-start justify-between gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[var(--bg-3)] flex items-center justify-center text-[var(--fg)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
            {Icon ? <Icon size={22} /> : <span>?</span>}
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-[var(--fg-2)]">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            {skill.levelLabel}
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-display text-xl font-semibold tracking-tight">{skill.name}</h3>
          <span className="font-mono text-sm text-[var(--fg-3)] tabular-nums">{skill.level}%</span>
        </div>

        <div className="h-[3px] w-full rounded-full bg-[var(--bg-3)] overflow-hidden mb-5">
          <motion.div
            className="h-full rounded-full origin-left"
            style={{ backgroundColor: color }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: skill.level / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 + index * 0.05 }}
          />
        </div>

        <p className="text-sm text-[var(--fg-3)] leading-relaxed">{skill.desc}</p>
      </SpotlightCard>
    </motion.div>
  );
}

export default function SkillsSection() {
  const categories = PORTFOLIO.skills.map((g) => g.category);
  const [active, setActive] = useState(categories[0]);
  const activeGroup = PORTFOLIO.skills.find((g) => g.category === active)!;

  return (
    <section id="skills" className="py-28 md:py-40 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="02"
          tag="Tech stack"
          title="Tools of the"
          accent="trade."
          subtitle="The languages, frameworks and tools I reach for to bring ideas to life."
        />

        <div className="flex flex-wrap gap-2 mb-10" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium border transition-colors duration-300 ${
                active === cat
                  ? "text-[var(--bg)] border-transparent"
                  : "text-[var(--fg-2)] border-[var(--line)] hover:text-[var(--fg)] hover:border-[var(--line-strong)]"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-full bg-[var(--fg)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {activeGroup.items.map((item, i) => (
              <SkillCard key={`${active}-${item.name}`} skill={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
