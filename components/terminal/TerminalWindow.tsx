"use client";

import { useState, useRef, useEffect } from "react";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import { TerminalLine, runCommand } from "./commands";
import { useTheme } from "@/context/ThemeContext";

interface HistoryEntry {
  command: string;
  output: TerminalLine[];
}

const WELCOME_LINES: TerminalLine[] = [
  { type: "accent", text: "iSekhon Portfolio Terminal v1.0.0" },
  { type: "output", text: "Type 'help' to see available commands." },
  { type: "output", text: "Use ↑↓ arrows to navigate command history." },
  { type: "empty", text: "" },
];

export default function TerminalWindow() {
  const { theme, toggleTheme } = useTheme();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, input]);

  const handleSubmit = (cmd: string) => {
    if (!cmd.trim()) {
      setHistory((h) => [
        ...h,
        { command: cmd, output: [] },
      ]);
      setInput("");
      return;
    }

    const { lines, shouldClear } = runCommand(cmd, { toggleTheme, theme });

    if (shouldClear) {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { command: cmd, output: lines }]);
    }

    setCommandHistory((h) => [cmd, ...h]);
    setHistoryIndex(-1);
    setInput("");
  };

  const onHistoryUp = () => {
    const next = Math.min(historyIndex + 1, commandHistory.length - 1);
    setHistoryIndex(next);
    setInput(commandHistory[next] ?? "");
  };

  const onHistoryDown = () => {
    const next = historyIndex - 1;
    if (next < 0) {
      setHistoryIndex(-1);
      setInput("");
    } else {
      setHistoryIndex(next);
      setInput(commandHistory[next] ?? "");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto rounded-2xl overflow-x-hidden border border-[var(--border-color)] bg-[#0d0d14] shadow-[0_20px_60px_rgba(0,0,0,0.6)]" style={{ colorScheme: "dark" }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#13131a] border-b border-[var(--border-color)]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center text-xs font-mono text-[var(--text-muted)]">
          jagdeep@portfolio:~
        </span>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-5 space-y-3"
        style={{ minHeight: "60vh", maxHeight: "70vh" }}
        onClick={() => {
          const inp = document.querySelector<HTMLInputElement>("input[type=text]");
          inp?.focus();
        }}
      >
        {/* Welcome */}
        <TerminalOutput lines={WELCOME_LINES} />

        {/* History entries */}
        {history.map((entry, i) => (
          <div key={i} className="space-y-1">
            {entry.command && (
              <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                <span className="text-[#8b5cf6] shrink-0">
                  <span className="hidden sm:inline">jagdeep@portfolio:~$</span>
                  <span className="sm:hidden">~$</span>
                </span>
                <span className="text-[#e2e2f0] break-all">{entry.command}</span>
              </div>
            )}
            {entry.output.length > 0 && <TerminalOutput lines={entry.output} />}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="px-3 sm:px-5 pb-3 sm:pb-5 pt-2 border-t border-[var(--border-color)]">
        <TerminalInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          onHistoryUp={onHistoryUp}
          onHistoryDown={onHistoryDown}
        />
      </div>
    </div>
  );
}
