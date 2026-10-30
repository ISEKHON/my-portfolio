"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/variants";

// Re-mounts on every navigation, giving each page a soft rise-in transition
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
