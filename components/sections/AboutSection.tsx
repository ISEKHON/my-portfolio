"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeInLeft, fadeInRight } from "@/lib/variants";
import CopyButton from "@/components/ui/CopyButton";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Avatar */}
          <motion.div variants={fadeInLeft} className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden ring-4 ring-[#8b5cf6]/40 ring-offset-4 ring-offset-[var(--bg-primary)] glow-sm">
                <Image
                  src={PORTFOLIO.avatar}
                  alt={PORTFOLIO.name}
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Status badge */}
              <div className="absolute bottom-4 right-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                Open to work
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={fadeInRight}>
            <SectionHeader tag="About Me" title="Who I Am" />
            {PORTFOLIO.bio.map((para, i) => (
              <p
                key={i}
                className="text-[var(--text-secondary)] leading-relaxed mb-4"
              >
                {para}
              </p>
            ))}

            <div className="flex flex-col gap-3 mt-6 mb-8">
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Mail size={16} className="text-[#8b5cf6] shrink-0" />
                <a href={`mailto:${PORTFOLIO.email}`} className="hover:text-[#8b5cf6] transition-colors">
                  {PORTFOLIO.email}
                </a>
                <CopyButton value={PORTFOLIO.email} />
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <MapPin size={16} className="text-[#8b5cf6] shrink-0" />
                <span>{PORTFOLIO.location}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {[
                { href: PORTFOLIO.socials.github, icon: Github, label: "GitHub" },
                { href: PORTFOLIO.socials.twitter, icon: Twitter, label: "Twitter" },
                { href: PORTFOLIO.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[#8b5cf6] hover:border-[#8b5cf6]/40 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
