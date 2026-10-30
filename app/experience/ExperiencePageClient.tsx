"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/motion/Reveal";
import { PORTFOLIO } from "@/lib/data";
import { EASE } from "@/lib/variants";

export default function ExperiencePageClient() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 70%", "end 60%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <main className="pt-36 md:pt-44 pb-28 px-5 md:px-8 max-w-6xl mx-auto min-h-screen">
        <SectionHeader
          as="h1"
          tag="Journey"
          title="From first line"
          accent="to today."
          subtitle="My developer journey — the milestones, the stacks and what each chapter taught me."
        />

        <div ref={timelineRef} className="relative">
          {/* Track + scroll-driven fill */}
          <div className="absolute left-[7px] md:left-[calc(28%+7px)] top-2 bottom-2 w-px bg-[var(--line)]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[7px] md:left-[calc(28%+7px)] top-2 bottom-2 w-px bg-[var(--accent-text)] origin-top"
          />

          <div className="space-y-16 md:space-y-24">
            {PORTFOLIO.experience.map((entry, i) => (
              <div key={i} className="relative grid md:grid-cols-[28%_1fr] gap-4 md:gap-0 pl-10 md:pl-0">
                <Reveal y={20} className="md:pr-12 md:text-right">
                  <span className="font-mono text-sm text-[var(--fg-3)]">{entry.year}</span>
                </Reveal>

                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-30% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute left-0 md:left-[28%] top-1 w-[15px] h-[15px] rounded-full border-2 border-[var(--accent-text)] bg-[var(--bg)]"
                />

                <Reveal className="md:pl-14" delay={0.05}>
                  <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-tight">
                    {entry.title}
                  </h2>
                  <div className="mt-1 mb-5 text-[var(--accent-text)] font-medium">{entry.org}</div>
                  <p className="text-[var(--fg-2)] leading-relaxed max-w-xl mb-6">{entry.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.tech.map((t, ti) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.2 + ti * 0.05 }}
                        className="text-xs px-3 py-1 rounded-full border border-[var(--line)] text-[var(--fg-2)]"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <section className="mt-32 md:mt-44">
          <SectionHeader tag="Education" title="Still" accent="learning." />
          {PORTFOLIO.education.map((edu) => (
            <Reveal key={edu.degree}>
              <div className="group relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--bg-2)] p-8 md:p-12 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start">
                <div className="w-14 h-14 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg]">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">{edu.degree}</h3>
                  <div className="text-[var(--accent-text)] font-medium mt-1 mb-4">{edu.institution}</div>
                  <p className="text-[var(--fg-2)] leading-relaxed max-w-2xl">{edu.description}</p>
                </div>
                <span className="font-mono text-sm text-[var(--fg-3)]">{edu.year}</span>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
