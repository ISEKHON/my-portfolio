"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/variants";

interface SplitTextProps {
  text: string;
  by?: "word" | "char";
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** When provided, animation is driven by this flag instead of entering the viewport. */
  play?: boolean;
}

/**
 * Masked text reveal: each word (or character) slides up from behind an overflow mask.
 */
export default function SplitText({
  text,
  by = "word",
  className = "",
  wordClassName = "",
  delay = 0,
  stagger,
  duration = 1,
  play,
}: SplitTextProps) {
  const words = text.split(" ");
  const step = stagger ?? (by === "char" ? 0.035 : 0.07);
  let index = 0;

  const trigger =
    play === undefined
      ? { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-10% 0px" } }
      : { initial: "hidden", animate: play ? "visible" : "hidden" };

  const piece = (content: string, i: number, key: string) => (
    <span key={key} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="inline-block will-change-transform"
        variants={{
          hidden: { y: "110%", rotate: 4 },
          visible: {
            y: 0,
            rotate: 0,
            transition: { duration, ease: EASE, delay: delay + i * step },
          },
        }}
      >
        {content}
      </motion.span>
    </span>
  );

  return (
    <motion.span className={className} aria-label={text} {...trigger}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden className={`inline-block whitespace-nowrap ${wordClassName}`}>
          {by === "char"
            ? word.split("").map((ch, ci) => piece(ch, index++, `${wi}-${ci}`))
            : piece(word, index++, `${wi}`)}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
