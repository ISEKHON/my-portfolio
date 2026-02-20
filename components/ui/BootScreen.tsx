"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

const LINES = [
  { text: "$ ~/portfolio/boot.sh", delay: 0 },
  { text: "▶ Initializing neural link...", delay: 500 },
  { text: "▶ Loading portfolio modules... [OK]", delay: 1000 },
  { text: "▶ Mounting skill dependencies... [OK]", delay: 1500 },
  { text: "▶ Establishing connection...", delay: 2000 },
  { text: "", delay: 2300 },
  { text: "  Welcome, Jagdeep.", delay: 2500 },
  { text: "  Portfolio loaded successfully.", delay: 2900 },
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), line.delay));
    });

    timers.push(
      setTimeout(() => {
        setFading(true);
        setTimeout(onComplete, 600);
      }, 3600)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!fading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#0a0a0f" }}
        >
          <div className="w-full max-w-lg px-6">
            <div className="font-mono text-sm leading-7">
              {LINES.slice(0, visibleCount).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={
                    i >= 6
                      ? "text-[#8b5cf6] font-semibold"
                      : i === 0
                      ? "text-[#6b6b7f]"
                      : "text-[#a0a0b0]"
                  }
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}
              {visibleCount < LINES.length && (
                <span className="inline-block w-2 h-4 bg-[#8b5cf6] cursor-blink" />
              )}
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
