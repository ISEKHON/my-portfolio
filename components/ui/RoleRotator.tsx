"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE } from "@/lib/variants";

/** Cycles through phrases with a masked vertical slide. */
export default function RoleRotator({
  phrases,
  interval = 2600,
  className = "",
}: {
  phrases: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), interval);
    return () => clearInterval(id);
  }, [phrases.length, interval]);

  return (
    <span className={`relative block overflow-hidden h-[1.25em] ${className}`}>
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
