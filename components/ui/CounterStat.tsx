"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

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
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const obj = { value: 0 };
          animate(obj, {
            value: target,
            duration,
            ease: "outExpo",
            onUpdate: () => setCount(Math.floor(obj.value)),
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

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
