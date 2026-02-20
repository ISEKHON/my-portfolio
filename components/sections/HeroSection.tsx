"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import TypeWriter from "@/components/ui/TypeWriter";
import CounterStat from "@/components/ui/CounterStat";
import { PORTFOLIO } from "@/lib/data";
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from "@/lib/variants";
import { ArrowRight, MessageCircle, Code2, Lightbulb, Rocket, type LucideIcon } from "lucide-react";

const CARD_ICONS: Record<string, LucideIcon> = {
  Code2,
  Lightbulb,
  Rocket,
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 pb-24 px-5"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-[#8b5cf6] px-3 py-1.5 border border-[#8b5cf6]/30 rounded-full bg-[#8b5cf6]/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{PORTFOLIO.name}</span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="text-xl md:text-2xl font-mono text-[var(--text-secondary)] mb-6 h-8"
            >
              <TypeWriter phrases={PORTFOLIO.roles} />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-[var(--text-secondary)] max-w-lg leading-relaxed mb-8"
            >
              {PORTFOLIO.bio[0]}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white hover:opacity-90 transition-opacity shadow-[0_4px_20px_rgba(139,92,246,0.4)]"
              >
                View My Work <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[#8b5cf6]/40 bg-[var(--bg-secondary)] transition-all"
              >
                Get In Touch <MessageCircle size={16} />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-3 gap-3 md:gap-6 pt-6 border-t border-[var(--border-color)]"
            >
              {PORTFOLIO.stats.map((stat) => (
                <CounterStat
                  key={stat.label}
                  target={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — floating cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-4 items-end"
          >
            {PORTFOLIO.floatingCards.map((card, i) => {
              const Icon = CARD_ICONS[card.icon];
              return (
                <motion.div
                  key={card.title}
                  variants={fadeInRight}
                  className="float-card w-56 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[#8b5cf6]/40 transition-all"
                  style={{ animationDelay: `${i * 1.5}s` }}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center mb-2">
                    {Icon && <Icon size={18} className="text-[#8b5cf6]" />}
                  </div>
                  <div className="font-bold text-[var(--text-primary)] text-sm">
                    {card.title}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{card.desc}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-muted)]"
        >
          <span className="text-xs font-mono">scroll</span>
          <div className="w-5 h-8 border-2 border-[var(--text-muted)] rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-[#8b5cf6]" style={{ animation: "bounce-scroll 1.5s ease-in-out infinite" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
