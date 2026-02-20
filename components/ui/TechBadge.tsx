"use client";

import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  color: string;
  text?: string;
}

export default function TechBadge({ name, color, text = "#fff" }: TechBadgeProps) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold cursor-default select-none"
      style={{
        backgroundColor: color,
        color: text,
        boxShadow: `0 2px 8px ${color}40`,
      }}
    >
      {name}
    </motion.span>
  );
}
