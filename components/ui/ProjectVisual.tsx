"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ProjectVisualProps {
  title: string;
  category: string;
  gradient: { from: string; to: string };
  className?: string;
}

/** Gradient stage with a device mockup that tilts toward the pointer. */
export default function ProjectVisual({ title, category, gradient, className = "" }: ProjectVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  const isPhone = category.toLowerCase() === "android";
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`relative overflow-hidden rounded-[22px] [perspective:1200px] ${className}`}
      style={{ background: `linear-gradient(140deg, ${gradient.from}, ${gradient.to})` }}
    >
      {/* Drifting light blobs */}
      <div
        className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-white/25 blur-3xl"
        style={{ animation: "blob 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-black/30 blur-3xl"
        style={{ animation: "blob 22s ease-in-out infinite reverse" }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className={`relative bg-[#0b0b0c] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ${
            isPhone
              ? "w-[42%] max-w-[200px] aspect-[9/19] rounded-[28px] p-[6px]"
              : "w-[82%] max-w-[460px] aspect-[16/10] rounded-xl p-[6px] pt-6"
          }`}
        >
          {!isPhone && (
            <div className="absolute top-2 left-3 flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          )}
          <div
            className={`relative w-full h-full overflow-hidden ${isPhone ? "rounded-[22px]" : "rounded-md"}`}
            style={{ background: `linear-gradient(160deg, ${gradient.to}, ${gradient.from})` }}
          >
            {isPhone && <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 rounded-full bg-black" />}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
              <span className="font-display font-bold text-5xl tracking-tighter drop-shadow-lg">{initials}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">{title}</span>
            </div>
            {/* Mock UI rows */}
            <div className="absolute bottom-4 inset-x-4 space-y-1.5">
              <div className="h-1.5 w-2/3 rounded-full bg-white/40" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/25" />
            </div>
            <motion.div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
                backgroundSize: "250% 100%",
                backgroundPositionX: glareX,
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
