import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

interface SectionHeaderProps {
  index?: string;
  tag: string;
  title: string;
  /** Word in the title rendered in the italic serif accent. */
  accent?: string;
  subtitle?: string;
  center?: boolean;
  as?: "h1" | "h2";
}

export default function SectionHeader({
  index,
  tag,
  title,
  accent,
  subtitle,
  center = false,
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 md:mb-20 ${center ? "text-center flex flex-col items-center" : ""}`}>
      <Reveal y={16}>
        <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--fg-3)] mb-6">
          {index && <span className="text-[var(--accent-text)]">({index})</span>}
          {tag}
          <span className="h-px w-10 bg-[var(--line-strong)]" />
        </span>
      </Reveal>
      <Tag className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]">
        <SplitText text={title} />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} className="serif-accent text-[var(--accent-text)]" delay={0.15} />
          </>
        )}
      </Tag>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-[var(--fg-2)] max-w-xl text-base md:text-lg leading-relaxed ${center ? "mx-auto" : ""}`}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
