"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import { EASE } from "@/lib/variants";
import { useIntroDone } from "@/components/motion/IntroProvider";
import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import RoleRotator from "@/components/ui/RoleRotator";
import CircleBadge from "@/components/ui/CircleBadge";
import LocalTime from "@/components/ui/LocalTime";

export default function HeroSection() {
  const play = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const nameY = useTransform(smooth, [0, 1], ["0%", "45%"]);
  const nameScale = useTransform(smooth, [0, 1], [1, 0.88]);
  const contentY = useTransform(smooth, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(smooth, [0, 0.7], [1, 0]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] flex flex-col pt-28 pb-10 px-5 md:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60 pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Meta row */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-[var(--fg-3)]"
        >
          <span>
            Based in {PORTFOLIO.location} · <LocalTime />
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--line)] text-[var(--fg-2)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-70 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
            </span>
            Available for work
          </span>
        </motion.div>

        {/* Giant name */}
        <motion.h1
          style={{ y: nameY, scale: nameScale, opacity: fade }}
          className="origin-bottom-left mt-auto pt-10 font-display font-bold tracking-[-0.055em] leading-[0.82] whitespace-nowrap text-[21vw] md:text-[20vw] xl:text-[17.5rem]"
        >
          <SplitText text={PORTFOLIO.name} by="char" play={play} delay={0.15} stagger={0.05} duration={1.2} />
          <motion.span
            initial={{ scale: 0 }}
            animate={play ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
            className="inline-block w-[0.14em] h-[0.14em] ml-[0.04em] rounded-full bg-[var(--accent)] align-baseline"
            aria-hidden
          />
        </motion.h1>

        {/* Bottom row */}
        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="mt-8 md:mt-10 grid gap-10 md:grid-cols-[1fr_auto] items-end"
        >
          <div className="max-w-2xl">
            <motion.p
              {...fadeUp(0.55)}
              className="font-display text-xl sm:text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-4"
            >
              <RoleRotator phrases={PORTFOLIO.roles} className="text-[var(--accent-text)]" />
            </motion.p>
            <motion.p {...fadeUp(0.65)} className="text-[var(--fg-2)] text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              I craft <span className="serif-accent text-[var(--fg)] text-[1.2em]">fluid</span>, performant mobile
              apps with Kotlin &amp; Jetpack Compose — and I&apos;m bringing the same obsession for
              detail to the web.
            </motion.p>
            <motion.div {...fadeUp(0.75)} className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 h-14 pl-7 pr-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-semibold"
                >
                  View my work
                  <span className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center h-14 px-7 rounded-full border border-[var(--line-strong)] font-semibold hover:bg-[var(--bg-2)] transition-colors"
                >
                  Get in touch
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={play ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
            className="hidden md:block"
          >
            <CircleBadge text="• Android developer • Open to work • Kotlin & Compose " size={168}>
              <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-[var(--line)]">
                <Image
                  src={PORTFOLIO.avatar}
                  alt={PORTFOLIO.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </CircleBadge>
          </motion.div>
        </motion.div>

        <motion.a
          href="#about"
          {...fadeUp(1)}
          className="mt-10 self-start inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] hover:text-[var(--fg)] transition-colors"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowDownRight size={14} />
          </motion.span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
