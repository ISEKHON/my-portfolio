"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate, stagger } from "animejs";

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
  { text: "  Welcome, explorer.", delay: 2500 },
  { text: "  Portfolio loaded successfully.", delay: 2900 },
];

const WELCOME_IDX = 6;

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [fading, setFading] = useState(false);
  const welcomeRef = useRef<HTMLDivElement>(null);

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

  // Trigger typewriter on welcome line once it appears
  useEffect(() => {
    if (visibleCount >= WELCOME_IDX + 1 && welcomeRef.current) {
      const spans = welcomeRef.current.querySelectorAll<HTMLSpanElement>("span");
      animate(spans, {
        opacity: [0, 1],
        duration: 1,
        delay: stagger(45),
        ease: "linear",
      });
    }
  }, [visibleCount]);

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
              {LINES.slice(0, visibleCount).map((line, i) => {
                const isWelcome = i === WELCOME_IDX && line.text;
                const colorClass =
                  i >= WELCOME_IDX
                    ? "text-[#8b5cf6] font-semibold"
                    : i === 0
                    ? "text-[#6b6b7f]"
                    : "text-[#a0a0b0]";

                if (isWelcome) {
                  return (
                    <div key={i} ref={welcomeRef} className={colorClass}>
                      {line.text.split("").map((char, ci) => (
                        <span key={ci} style={{ opacity: 0 }}>
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={colorClass}
                  >
                    {line.text || "\u00A0"}
                  </motion.div>
                );
              })}
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
