"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Send, Github, Twitter, Linkedin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Background from "@/components/layout/Background";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { PORTFOLIO } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/variants";
import CopyButton from "@/components/ui/CopyButton";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: PORTFOLIO.email,
    href: `mailto:${PORTFOLIO.email}`,
    color: "#8b5cf6",
    desc: "Best way to reach me",
    copyValue: PORTFOLIO.email,
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: PORTFOLIO.discord.tag,
    href: PORTFOLIO.socials.discord,
    color: "#5865F2",
    desc: "Chat with me directly",
    copyValue: null,
  },
  {
    icon: Send,
    label: "Telegram",
    value: PORTFOLIO.telegram,
    href: PORTFOLIO.telegramUrl,
    color: "#2AABEE",
    desc: "Quick messages welcome",
    copyValue: null,
  },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[#8b5cf6]/60 focus:ring-1 focus:ring-[#8b5cf6]/30 transition-all";

  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <main className="flex-1 pt-28 pb-24 px-5">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* Left — header + contact links */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-[#8b5cf6] mb-4 px-3 py-1 border border-[#8b5cf6]/30 rounded-full bg-[#8b5cf6]/10">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] leading-tight mb-4">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Together</span>
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Have a project idea, job opportunity, or just want to chat about
              tech? Fill the form or reach out directly.
            </p>

            {/* Contact cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 mb-8"
            >
              {CONTACTS.map(({ icon: Icon, label, value, href, color, desc, copyValue }) => (
                <motion.a
                  key={label}
                  variants={fadeInUp}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[#8b5cf6]/30 transition-all group"
                >
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[var(--text-muted)]">{label}</div>
                    <div className="font-semibold text-[var(--text-primary)] text-sm truncate">{value}</div>
                    <div className="text-xs text-[var(--text-muted)]">{desc}</div>
                  </div>
                  {copyValue ? (
                    <CopyButton value={copyValue} />
                  ) : (
                    <span className="text-[var(--text-muted)] group-hover:text-[#8b5cf6] transition-colors text-lg">→</span>
                  )}
                </motion.a>
              ))}
            </motion.div>

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
                  className="w-11 h-11 flex items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[#8b5cf6] hover:border-[#8b5cf6]/40 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="p-5 md:p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">Send a Message</h2>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Goes straight to my Telegram — I&apos;ll reply fast.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-10 text-center"
                >
                  <CheckCircle2 size={48} className="text-[#10b981]" />
                  <div>
                    <p className="font-bold text-[var(--text-primary)] text-lg">Message sent!</p>
                    <p className="text-[var(--text-muted)] text-sm mt-1">
                      I&apos;ll get back to you soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm text-[#8b5cf6] hover:underline"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      placeholder="What's on your mind?"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      required
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                      <AlertCircle size={16} className="shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
