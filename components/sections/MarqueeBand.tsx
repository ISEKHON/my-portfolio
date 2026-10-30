"use client";

import { Asterisk } from "lucide-react";
import VelocityMarquee from "@/components/motion/VelocityMarquee";

const ITEMS = ["Kotlin", "Jetpack Compose", "Android SDK", "Firebase", "Next.js", "TypeScript", "Material 3", "Clean Architecture"];

/** Two counter-scrolling bands that react to scroll speed. */
export default function MarqueeBand() {
  const row = (muted: boolean) =>
    ITEMS.map((item) => (
      <span key={item} className="flex items-center gap-8 pr-8">
        <span
          className={muted ? "text-[var(--fg-3)] opacity-50" : "text-[var(--fg)]"}
        >
          {item}
        </span>
        <Asterisk className="w-[0.6em] h-[0.6em] text-[var(--accent-text)]" strokeWidth={2.5} />
      </span>
    ));

  return (
    <section aria-label="Technologies" className="relative py-10 md:py-16 border-y border-[var(--line)] overflow-hidden">
      <VelocityMarquee baseVelocity={-2} className="font-display text-5xl md:text-8xl font-semibold tracking-tight leading-none py-2">
        {row(false)}
      </VelocityMarquee>
      <VelocityMarquee baseVelocity={2} className="font-display text-5xl md:text-8xl font-semibold tracking-tight leading-none py-2">
        {row(true)}
      </VelocityMarquee>
    </section>
  );
}
