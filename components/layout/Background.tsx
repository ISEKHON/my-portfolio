"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

/** Fixed backdrop: soft spotlight that trails the pointer, drifting blobs and film grain. */
export default function Background() {
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, var(--spot), transparent 70%)`;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div aria-hidden className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div
        className="absolute -top-[20vh] -right-[10vw] w-[55vw] h-[55vw] max-w-[760px] max-h-[760px] opacity-[0.10] blur-[100px] bg-[var(--accent)]"
        style={{ animation: "blob 26s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-[25vh] -left-[15vw] w-[50vw] h-[50vw] max-w-[680px] max-h-[680px] opacity-[0.07] blur-[110px] bg-[#7dd3fc]"
        style={{ animation: "blob 32s ease-in-out infinite reverse" }}
      />
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      <div className="grain" />
    </div>
  );
}
