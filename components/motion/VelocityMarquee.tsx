"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
  wrap,
} from "framer-motion";

interface VelocityMarqueeProps {
  children: React.ReactNode;
  /** Base speed in % of one copy per second; negative scrolls right. */
  baseVelocity?: number;
  className?: string;
}

/**
 * Endless marquee that speeds up and reverses with scroll velocity, then eases back to cruise speed.
 */
export default function VelocityMarquee({ children, baseVelocity = 3, className = "" }: VelocityMarqueeProps) {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [6, 0, -6]);
  const direction = useRef(1);

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div className="flex whitespace-nowrap shrink-0" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} aria-hidden={i > 0} className="flex shrink-0">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
