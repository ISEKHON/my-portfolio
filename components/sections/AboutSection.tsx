"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Lightbulb, Rocket, Mail, type LucideIcon } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import { EASE_IN_OUT } from "@/lib/variants";
import ScrollWords from "@/components/motion/ScrollWords";
import Reveal from "@/components/motion/Reveal";
import CounterStat from "@/components/ui/CounterStat";
import CopyButton from "@/components/ui/CopyButton";

const CARD_ICONS: Record<string, LucideIcon> = { Code2, Lightbulb, Rocket };

export default function AboutSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.08, 1.25]);

  return (
    <section id="about" className="relative py-28 md:py-40 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal y={16}>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-10">
            <span className="text-[var(--accent-text)]">(01)</span> About me
            <span className="h-px w-10 bg-[var(--line-strong)]" />
          </span>
        </Reveal>

        <ScrollWords
          text="I'm an Android developer who has spent the last five years turning ideas into clean, performant and intuitive apps — and I'm now bringing that craft to the web."
          className="font-display text-3xl md:text-5xl lg:text-6xl font-medium tracking-[-0.03em] leading-[1.1] max-w-6xl"
        />

        <div className="mt-20 md:mt-32 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] items-start">
          {/* Portrait with clip reveal + parallax */}
          <motion.div
            ref={imgRef}
            initial={{ clipPath: "inset(100% 0% 0% 0% round 28px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.4, ease: EASE_IN_OUT }}
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] bg-[var(--bg-2)]"
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <Image
                src={PORTFOLIO.avatar}
                alt={PORTFOLIO.name}
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover grayscale-[30%]"
              />
            </motion.div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-[var(--bg)]/70 backdrop-blur-md px-4 py-3 text-sm">
              <span className="font-semibold">{PORTFOLIO.name}</span>
              <span className="font-mono text-xs text-[var(--fg-2)]">{PORTFOLIO.title}</span>
            </div>
          </motion.div>

          <div>
            {PORTFOLIO.bio.map((para, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-[var(--fg-2)] text-lg leading-relaxed mb-6">{para}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-3 mb-14">
                <a
                  href={`mailto:${PORTFOLIO.email}`}
                  className="inline-flex items-center gap-2 text-[var(--fg)] hover:text-[var(--accent-text)] transition-colors"
                >
                  <Mail size={16} /> {PORTFOLIO.email}
                </a>
                <CopyButton value={PORTFOLIO.email} />
              </div>
            </Reveal>

            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-16">
              {PORTFOLIO.stats.map((stat) => (
                <CounterStat key={stat.label} target={stat.value} label={stat.label} suffix={stat.suffix} />
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {PORTFOLIO.floatingCards.map((card, i) => {
                const Icon = CARD_ICONS[card.icon];
                return (
                  <Reveal key={card.title} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="group h-full p-5 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)]/60 hover:border-[var(--line-strong)] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[var(--bg-3)] flex items-center justify-center mb-6 transition-colors duration-500 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]">
                        {Icon && <Icon size={18} />}
                      </div>
                      <div className="font-display font-semibold text-lg">{card.title}</div>
                      <div className="text-sm text-[var(--fg-3)] mt-1">{card.desc}</div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
