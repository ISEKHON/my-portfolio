interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  center = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <span className="inline-block text-xs font-mono font-semibold tracking-widest uppercase text-[#8b5cf6] mb-3 px-3 py-1 border border-[#8b5cf6]/30 rounded-full bg-[#8b5cf6]/10">
        {tag}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mt-2 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] max-w-xl text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
