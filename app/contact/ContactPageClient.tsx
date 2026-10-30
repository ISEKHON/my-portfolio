"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Send, Loader2, AlertCircle, ArrowUpRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { PORTFOLIO } from "@/lib/data";
import { EASE } from "@/lib/variants";
import CopyButton from "@/components/ui/CopyButton";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import LocalTime from "@/components/ui/LocalTime";

const CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: PORTFOLIO.email,
    href: `mailto:${PORTFOLIO.email}`,
    desc: "Best way to reach me",
    copyValue: PORTFOLIO.email,
  },
  {
    icon: MessageCircle,
    label: "Discord",
    value: PORTFOLIO.discord.tag,
    href: PORTFOLIO.socials.discord,
    desc: "Chat with me directly",
    copyValue: null,
  },
  {
    icon: Send,
    label: "Telegram",
    value: PORTFOLIO.telegram,
    href: PORTFOLIO.telegramUrl,
    desc: "Quick messages welcome",
    copyValue: null,
  },
];

const SOCIALS = [
  { href: PORTFOLIO.socials.github, label: "GitHub" },
  { href: PORTFOLIO.socials.twitter, label: "Twitter" },
  { href: PORTFOLIO.socials.linkedin, label: "LinkedIn" },
];

type Status = "idle" | "loading" | "success" | "error";

function Field({
  id,
  label,
  textarea,
  ...props
}: {
  id: string;
  label: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const base =
    "peer w-full bg-transparent border-0 border-b border-[var(--line-strong)] pt-7 pb-3 text-lg text-[var(--fg)] placeholder-transparent focus:outline-none resize-none";
  return (
    <div className="relative group">
      {textarea ? (
        <textarea id={id} placeholder={label} rows={4} className={base} {...props} />
      ) : (
        <input id={id} placeholder={label} className={base} {...props} />
      )}
      <label
        htmlFor={id}
        className="absolute left-0 top-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] transition-all duration-300 peer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-sans peer-focus:top-1 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:font-mono peer-focus:text-[var(--accent-text)] pointer-events-none"
      >
        {label}
      </label>
      <span className="absolute left-0 bottom-0 h-[2px] w-full bg-[var(--accent-text)] origin-left scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
    </div>
  );
}

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
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { x: 0.7, y: 0.6 },
          colors: ["#c8f560", "#f2f0ea", "#7dd3fc", "#a3e635"],
        });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <main className="pt-36 md:pt-44 pb-28 px-5 md:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display font-semibold tracking-[-0.05em] leading-[0.9] text-[14vw] md:text-[9vw] xl:text-[9rem] mb-16 md:mb-24">
            <SplitText text="Let's build" />
            <br />
            <SplitText text="something" delay={0.1} />{" "}
            <SplitText text="great." className="serif-accent text-[var(--accent-text)]" delay={0.2} />
          </h1>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">
            {/* Left — direct channels */}
            <div>
              <Reveal>
                <p className="text-[var(--fg-2)] text-lg leading-relaxed mb-10 max-w-md">
                  Have a project idea, job opportunity, or just want to chat about tech? Fill in the form or
                  reach out directly — it&apos;s currently <LocalTime className="text-[var(--fg)]" /> for me.
                </p>
              </Reveal>

              <ul className="border-t border-[var(--line)]">
                {CONTACTS.map(({ icon: Icon, label, value, href, desc, copyValue }, i) => (
                  <Reveal key={label} delay={i * 0.08}>
                    <li className="relative border-b border-[var(--line)] overflow-hidden group">
                      <span className="absolute inset-0 bg-[var(--bg-2)] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex items-center gap-5 py-6 px-2"
                      >
                        <span className="w-11 h-11 shrink-0 rounded-full border border-[var(--line)] flex items-center justify-center transition-colors duration-500 group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] group-hover:border-transparent">
                          <Icon size={18} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)]">
                            {label} · {desc}
                          </span>
                          <span className="block font-display text-xl md:text-2xl font-semibold tracking-tight truncate transition-transform duration-500 group-hover:translate-x-2">
                            {value}
                          </span>
                        </span>
                        {copyValue ? (
                          <CopyButton value={copyValue} />
                        ) : (
                          <ArrowUpRight className="text-[var(--fg-3)] transition-all duration-500 group-hover:rotate-45 group-hover:text-[var(--fg)]" />
                        )}
                      </a>
                    </li>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={0.2}>
                <div className="flex gap-6 mt-8 text-sm">
                  {SOCIALS.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-[length:0%_1px] bg-left-bottom hover:bg-[length:100%_1px] [transition:background-size_0.5s,color_0.3s]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.15}>
              <div className="relative rounded-[28px] border border-[var(--line)] bg-[var(--bg-2)]/70 backdrop-blur-sm p-6 md:p-10 min-h-[520px]">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="flex flex-col items-center justify-center gap-6 text-center min-h-[440px]"
                    >
                      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden>
                        <motion.circle
                          cx="44" cy="44" r="40" fill="none" stroke="var(--accent-text)" strokeWidth="3"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, ease: EASE }}
                        />
                        <motion.path
                          d="M28 45 L39 56 L61 33" fill="none" stroke="var(--accent-text)" strokeWidth="4"
                          strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
                        />
                      </svg>
                      <div>
                        <p className="font-display text-3xl font-semibold tracking-tight">Message sent!</p>
                        <p className="text-[var(--fg-2)] mt-2">I&apos;ll get back to you soon.</p>
                      </div>
                      <button
                        onClick={() => setStatus("idle")}
                        className="text-sm font-medium underline underline-offset-4 decoration-[var(--line-strong)] hover:decoration-[var(--fg)]"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-8"
                    >
                      <div>
                        <h2 className="font-display text-2xl font-semibold tracking-tight">Send a message</h2>
                        <p className="text-sm text-[var(--fg-3)] mt-1">
                          Goes straight to my Telegram — I&apos;ll reply fast.
                        </p>
                      </div>

                      <Field
                        id="name"
                        label="Your name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        required
                        autoComplete="name"
                      />
                      <Field
                        id="email"
                        label="Your email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        required
                        autoComplete="email"
                      />
                      <Field
                        id="message"
                        label="Tell me about your project"
                        textarea
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        required
                      />

                      <AnimatePresence>
                        {status === "error" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                          >
                            <AlertCircle size={16} className="shrink-0" />
                            {errorMsg}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Magnetic strength={0.2} className="self-start">
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="group inline-flex items-center gap-3 h-14 pl-7 pr-2 rounded-full bg-[var(--fg)] text-[var(--bg)] font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {status === "loading" ? "Sending…" : "Send message"}
                          <span className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                            {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <ArrowUpRight size={18} />}
                          </span>
                        </button>
                      </Magnetic>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
