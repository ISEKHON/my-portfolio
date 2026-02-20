import { TerminalLine } from "./commands";

interface TerminalOutputProps {
  lines: TerminalLine[];
}

const typeClass: Record<TerminalLine["type"], string> = {
  command: "text-[#e2e2f0]",
  output: "text-[#a0a0b0]",
  error: "text-red-400",
  accent: "text-[#8b5cf6] font-semibold",
  ascii: "text-[#8b5cf6] font-mono text-xs",
  empty: "",
};

export default function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`font-mono text-sm leading-6 ${
            line.type === "ascii"
              ? "whitespace-pre overflow-x-visible"
              : "whitespace-pre-wrap break-all"
          } ${typeClass[line.type]}`}
        >
          {line.text || "\u00A0"}
        </div>
      ))}
    </div>
  );
}
