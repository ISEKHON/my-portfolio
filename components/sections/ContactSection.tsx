"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, Send } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";

const CHANNELS = [
  { icon: Mail, label: "Email", value: PORTFOLIO.email, href: `mailto:${PORTFOLIO.email}` },
  { icon: MessageCircle, label: "Discord", value: PORTFOLIO.discord.tag, href: PORTFOLIO.socials.discord },
  { icon: Send, label: "Telegram", value: PORTFOLIO.telegram, href: PORTFOLIO.telegramUrl },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-90, 0]);

  return (
    <section ref={ref} id="contact" className="relative py-28 md:py-40 px-5 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal y={16}>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-10">
            <span className="text-[var(--accent-text)]">(05)</span> Contact
            <span className="h-px w-10 bg-[var(--line-strong)]" />
          </span>
        </Reveal>

        <motion.h2
          style={{ x }}
          className="font-display font-semibold tracking-[-0.05em] leading-[0.9] text-[15vw] md:text-[11vw] xl:text-[10rem]"
        >
          <SplitText text="Let's work" />
          <br />
          <SplitText text="together" className="serif-accent text-[var(--accent-text)]" delay={0.15} />
        </motion.h2>

        <div className="relative mt-16 md:mt-20 border-t border-[var(--line)] pt-10 grid gap-10 md:grid-cols-[1fr_auto] items-center">
          <div className="grid sm:grid-cols-3 gap-6">
            {CHANNELS.map(({ icon: Icon, label, value, href }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-2">
                    <Icon size={13} /> {label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[var(--fg)] font-medium break-all">
                    {value}
                    <ArrowUpRight size={16} className="shrink-0 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <motion.div style={{ rotate }} className="justify-self-start md:justify-self-end">
            <Magnetic strength={0.4}>
              <Link
                href="/contact"
                data-cursor="Say hi"
                className="group relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex flex-col items-center justify-center font-semibold overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full bg-[var(--fg)] scale-0 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative z-10 flex flex-col items-center gap-1 transition-colors duration-500 group-hover:text-[var(--bg)]">
                  <ArrowUpRight size={28} className="transition-transform duration-500 group-hover:rotate-45" />
                  Get in touch
                </span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
