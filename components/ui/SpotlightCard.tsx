"use client";

import { useRef } from "react";

/** Card with a soft radial highlight that follows the pointer while hovered. */
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-2)]/60 transition-colors duration-500 hover:border-[var(--line-strong)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(320px circle at var(--mx) var(--my), var(--spot), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
