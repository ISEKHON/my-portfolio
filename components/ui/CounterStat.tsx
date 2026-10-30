"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

interface CounterStatProps {
  target: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export default function CounterStat({ target, label, suffix = "+", duration = 2.2 }: CounterStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, target, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, target, duration, value]);

  return (
    <div ref={ref} className="border-t border-[var(--line)] pt-5">
      <div className="font-display text-5xl md:text-6xl font-semibold tracking-tight tabular-nums">
        <motion.span>{display}</motion.span>
        <span className="text-[var(--accent-text)]">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-[var(--fg-3)]">{label}</div>
    </div>
  );
}
