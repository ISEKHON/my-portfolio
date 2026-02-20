"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Github, Twitter, Linkedin } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { staggerContainer, fadeInUp } from "@/lib/variants";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: PORTFOLIO.email,
    href: `mailto:${PORTFOLIO.email}`,
    color: "#8b5cf6",
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: PORTFOLIO.discord.tag,
    href: PORTFOLIO.socials.discord,
    color: "#5865F2",
  },
  {
    icon: Send,
    label: "Telegram",
    value: PORTFOLIO.telegram,
    href: PORTFOLIO.telegramUrl,
    color: "#2AABEE",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionHeader
            tag="Contact"
            title="Get In Touch"
            subtitle="Have a project in mind? Let's build something amazing together."
            center
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-5 mb-10"
        >
          {CONTACTS.map(({ icon: Icon, label, value, href, color }) => (
            <motion.a
              key={label}
              variants={fadeInUp}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, borderColor: `${color}60` }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 text-center"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>
              <div>
                <div className="text-xs text-[var(--text-muted)] font-mono mb-0.5">{label}</div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">{value}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
