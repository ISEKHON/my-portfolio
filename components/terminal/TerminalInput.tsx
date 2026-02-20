"use client";

import { KeyboardEvent, useRef } from "react";

interface TerminalInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  prompt?: string;
}

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
  onHistoryUp,
  onHistoryDown,
  prompt = "jagdeep@portfolio:~$",
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onHistoryUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onHistoryDown();
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className="text-[#8b5cf6] shrink-0">{prompt}</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        autoFocus
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent text-[#e2e2f0] outline-none caret-[#8b5cf6] placeholder-[#6b6b7f]"
        placeholder="type 'help' to get started..."
      />
    </div>
  );
}
