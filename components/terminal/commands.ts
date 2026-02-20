import { PORTFOLIO } from "@/lib/data";

export interface TerminalLine {
  type: "command" | "output" | "error" | "accent" | "ascii" | "empty";
  text: string;
}

interface CommandContext {
  toggleTheme?: () => void;
  theme?: string;
}

type CommandFn = (args: string[], ctx: CommandContext) => TerminalLine[];

const HELP_TEXT: TerminalLine[] = [
  { type: "accent", text: "Available commands:" },
  { type: "empty", text: "" },
  { type: "output", text: "  help       — Show this help message" },
  { type: "output", text: "  whoami     — Display profile info" },
  { type: "output", text: "  skills     — List tech skills" },
  { type: "output", text: "  projects   — Show projects" },
  { type: "output", text: "  contact    — Contact information" },
  { type: "output", text: "  github     — Open GitHub profile" },
  { type: "output", text: "  ls         — List directory" },
  { type: "output", text: "  cat bio    — Read bio" },
  { type: "output", text: "  neofetch   — System info" },
  { type: "output", text: "  date       — Show current date/time" },
  { type: "output", text: "  theme      — Toggle dark/light mode" },
  { type: "output", text: "  clear      — Clear terminal" },
  { type: "output", text: "  exit       — Go back to home" },
];

export const COMMANDS: Record<string, CommandFn> = {
  help: () => HELP_TEXT,

  whoami: () => [
    { type: "accent", text: `${PORTFOLIO.name} (${PORTFOLIO.handle})` },
    { type: "output", text: `Title:    ${PORTFOLIO.title}` },
    { type: "output", text: `Location: ${PORTFOLIO.location}` },
    { type: "output", text: `Email:    ${PORTFOLIO.email}` },
    { type: "output", text: `GitHub:   github.com/${PORTFOLIO.github}` },
    { type: "output", text: `Twitter:  @${PORTFOLIO.twitter}` },
  ],

  skills: () => [
    { type: "accent", text: "Tech Stack:" },
    { type: "empty", text: "" },
    ...PORTFOLIO.skills.map((g) => ({
      type: "output" as const,
      text: `  ${g.category.padEnd(20)} ${g.items.map((i) => i.name).join(", ")}`,
    })),
  ],

  projects: () => [
    { type: "accent", text: "Projects:" },
    { type: "empty", text: "" },
    ...PORTFOLIO.projects.flatMap((p) => [
      { type: "output" as const, text: `  ▶ ${p.title} [${p.status.toUpperCase()}]` },
      { type: "output" as const, text: `    ${p.description.slice(0, 80)}...` },
      { type: "output" as const, text: `    Tags: ${p.tags.join(", ")}` },
      { type: "empty" as const, text: "" },
    ]),
  ],

  contact: () => [
    { type: "accent", text: "Contact Info:" },
    { type: "empty", text: "" },
    { type: "output", text: `  Email:    ${PORTFOLIO.email}` },
    { type: "output", text: `  Discord:  ${PORTFOLIO.discord.tag}` },
    { type: "output", text: `  Telegram: ${PORTFOLIO.telegram}` },
    { type: "output", text: `  GitHub:   github.com/${PORTFOLIO.github}` },
    { type: "output", text: `  LinkedIn: ${PORTFOLIO.linkedin}` },
  ],

  github: () => {
    if (typeof window !== "undefined") {
      window.open(`https://github.com/${PORTFOLIO.github}`, "_blank");
    }
    return [{ type: "output", text: `Opening github.com/${PORTFOLIO.github}...` }];
  },

  ls: () => [
    { type: "output", text: "drwxr-xr-x  about/" },
    { type: "output", text: "drwxr-xr-x  projects/" },
    { type: "output", text: "drwxr-xr-x  skills/" },
    { type: "output", text: "drwxr-xr-x  experience/" },
    { type: "output", text: "-rw-r--r--  bio.txt" },
    { type: "output", text: "-rw-r--r--  resume.pdf" },
    { type: "output", text: "-rw-r--r--  contact.json" },
  ],

  cat: (args) => {
    if (args[0] === "bio") {
      return [
        { type: "accent", text: "bio.txt" },
        { type: "empty", text: "" },
        ...PORTFOLIO.bio.map((p) => ({ type: "output" as const, text: p })),
      ];
    }
    if (args[0] === "contact.json") {
      return [
        { type: "output", text: JSON.stringify({ email: PORTFOLIO.email, telegram: PORTFOLIO.telegram, discord: PORTFOLIO.discord.tag }, null, 2) },
      ];
    }
    return [{ type: "error", text: `cat: ${args[0] || "(none)"}: No such file` }];
  },

  neofetch: (_args, ctx) => {
    const pkg = PORTFOLIO.skills.reduce((a, b) => a + b.items.length, 0);
    const theme = ctx.theme === "light" ? "Light Mode" : "Cyberpunk Dark";
    const pad = (k: string) => k.padEnd(12);
    return [
      { type: "output", text: "  +----------------------------------------+" },
      { type: "accent", text: "  |        iSekhon  @  portfolio            |" },
      { type: "output", text: "  +----------------------------------------+" },
      { type: "empty",  text: "" },
      { type: "output", text: `  ${pad("OS")}  Android / Web` },
      { type: "output", text: `  ${pad("Host")}  ${PORTFOLIO.name}'s Portfolio` },
      { type: "output", text: `  ${pad("Shell")}  Next.js 16 + TypeScript` },
      { type: "output", text: `  ${pad("Theme")}  ${theme}` },
      { type: "output", text: `  ${pad("Packages")}  ${pkg} skills` },
      { type: "output", text: `  ${pad("Location")}  ${PORTFOLIO.location}` },
      { type: "output", text: `  ${pad("Email")}  ${PORTFOLIO.email}` },
      { type: "empty",  text: "" },
      { type: "output", text: "  +----------------------------------------+" },
    ];
  },

  date: () => {
    const now = new Date();
    return [{ type: "output", text: now.toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }) }];
  },

  theme: (_args, ctx) => {
    if (ctx.toggleTheme) {
      ctx.toggleTheme();
      const next = ctx.theme === "dark" ? "light" : "dark";
      return [{ type: "accent", text: `Theme switched to: ${next}` }];
    }
    return [{ type: "output", text: "Theme toggled." }];
  },

  exit: () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return [{ type: "output", text: "Redirecting to home..." }];
  },

  clear: () => [],
};

export function runCommand(input: string, ctx: CommandContext = {}): {
  lines: TerminalLine[];
  shouldClear: boolean;
} {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (!cmd) return { lines: [], shouldClear: false };

  if (cmd === "clear") return { lines: [], shouldClear: true };

  const fn = COMMANDS[cmd];
  if (fn) {
    return { lines: fn(args, ctx), shouldClear: false };
  }

  return {
    lines: [
      {
        type: "error",
        text: `Command not found: ${cmd}. Type 'help' for available commands.`,
      },
    ],
    shouldClear: false,
  };
}
