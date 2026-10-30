"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { EASE, EASE_IN_OUT } from "@/lib/variants";
import { PORTFOLIO } from "@/lib/data";

const WORDS = ["Kotlin", "Compose", "Android", "Next.js", "Hello"];

interface PreloaderProps {
  onComplete: () => void;
  onExit: () => void;
}

export default function Preloader({ onComplete, onExit }: PreloaderProps) {
  const lenis = useLenis();
  const progress = useMotionValue(0);
  const rounded = useTransform(progress, (v) => Math.round(v).toString().padStart(3, "0"));
  const barScale = useTransform(progress, [0, 100], [0, 1]);
  const [wordIndex, setWordIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setLeaving(true);
        onComplete();
      },
    });
    const wordTimer = setInterval(
      () => setWordIndex((i) => Math.min(i + 1, WORDS.length - 1)),
      440
    );
    return () => {
      controls.stop();
      clearInterval(wordTimer);
    };
  }, [progress, onComplete]);

  return (
    <motion.div
      className="preloader fixed inset-0 z-[200] flex flex-col justify-between bg-[var(--bg-2)] p-6 md:p-10"
      initial={{ y: 0 }}
      animate={{ y: leaving ? "-100%" : 0 }}
      transition={{ duration: 1.1, ease: EASE_IN_OUT }}
      onAnimationComplete={() => leaving && onExit()}
    >
      {/* Curved bottom edge that drags as the curtain lifts */}
      <svg
        className="absolute left-0 top-full w-full h-[18vh] pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="var(--bg-2)"
          initial={{ d: "M0 0 L100 0 Q50 0 0 0 Z" }}
          animate={{ d: leaving ? "M0 0 L100 0 Q50 100 0 0 Z" : "M0 0 L100 0 Q50 0 0 0 Z" }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
        />
      </svg>

      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)]">
        <span>{PORTFOLIO.handle}</span>
        <span>Portfolio ©{new Date().getFullYear()}</span>
      </div>

      <div className="flex justify-center">
        <div className="relative h-[1.2em] overflow-hidden text-4xl md:text-6xl font-display font-semibold tracking-tight">
          <motion.div
            key={wordIndex}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
            {WORDS[wordIndex]}
          </motion.div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)]">
            Loading experience
          </span>
          <motion.span className="font-display font-semibold leading-none text-[18vw] md:text-[10rem] tracking-tighter tabular-nums">
            {rounded}
          </motion.span>
        </div>
        <div className="h-px w-full bg-[var(--line)] overflow-hidden">
          <motion.div
            className="h-full bg-[var(--accent)] origin-left"
            style={{ scaleX: barScale }}
          />
        </div>
      </div>
    </motion.div>
  );
}
