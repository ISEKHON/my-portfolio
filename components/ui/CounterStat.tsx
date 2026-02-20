"use client";

import { useEffect, useRef, useState } from "react";

interface CounterStatProps {
  target: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export default function CounterStat({
  target,
  label,
  suffix = "+",
  duration = 2000,
}: CounterStatProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold gradient-text font-mono">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-[var(--text-muted)] mt-1 font-medium">{label}</div>
    </div>
  );
}
