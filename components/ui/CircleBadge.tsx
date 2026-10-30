/** Text set on a circle that slowly rotates — wraps whatever sits in the middle. */
export default function CircleBadge({
  text,
  size = 140,
  children,
  className = "",
}: {
  text: string;
  size?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full spin-slow" aria-hidden>
        <defs>
          <path id="circle-badge-path" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
        </defs>
        <text className="fill-[var(--fg)] font-mono uppercase" style={{ fontSize: 8.4, letterSpacing: 2.2 }}>
          <textPath href="#circle-badge-path">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
