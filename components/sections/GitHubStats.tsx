"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import { EASE } from "@/lib/variants";
import SectionHeader from "@/components/ui/SectionHeader";
import SpotlightCard from "@/components/ui/SpotlightCard";
import CounterStat from "@/components/ui/CounterStat";

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface RepoData {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  fork: boolean;
}

const LANG_COLORS: Record<string, string> = {
  Kotlin: "#A97BFF",
  Java: "#B07219",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  Python: "#3572A5",
  "C++": "#F34B7D",
  "C#": "#178600",
  PHP: "#4F5D95",
  Dart: "#00B4AB",
  Swift: "#F05138",
  HTML: "#E34C26",
  CSS: "#563D7C",
};

export default function GitHubStats() {
  const [profile, setProfile] = useState<GitHubData | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const username = PORTFOLIO.github;

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6&type=owner`),
        ]);
        if (profileRes.ok) setProfile(await profileRes.json());
        if (reposRes.ok) {
          const data: RepoData[] = await reposRes.json();
          setRepos(data.filter((r) => !r.fork).slice(0, 6));
        }
      } catch {
        // silently fail — GitHub API may rate-limit
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [username]);

  const stats = profile
    ? [
        { label: "Repositories", value: profile.public_repos },
        { label: "Followers", value: profile.followers },
        { label: "Following", value: profile.following },
        { label: "Gists", value: profile.public_gists },
      ]
    : [];

  return (
    <section className="py-28 md:py-40 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader index="04" tag="Open source" title="Live from" accent="GitHub." />
          <a
            href={PORTFOLIO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-14 md:mb-20 inline-flex items-center gap-2 font-medium shrink-0"
          >
            <Github size={18} /> @{username}
            <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-[var(--bg-2)] animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {profile && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
                {stats.map(({ label, value }) => (
                  <CounterStat key={label} target={value} label={label} suffix="" />
                ))}
              </div>
            )}

            {repos.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo, i) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-5% 0px" }}
                    transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
                    className="block"
                  >
                    <SpotlightCard className="h-full p-6 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="font-display font-semibold text-lg tracking-tight truncate">{repo.name}</span>
                        <ArrowUpRight
                          size={18}
                          className="shrink-0 text-[var(--fg-3)] transition-all duration-500 group-hover:rotate-45 group-hover:text-[var(--accent-text)]"
                        />
                      </div>
                      <p className="text-sm text-[var(--fg-3)] leading-relaxed line-clamp-2 min-h-[2.5rem] mb-6">
                        {repo.description ?? "No description provided."}
                      </p>
                      <div className="flex items-center gap-4 text-xs font-mono text-[var(--fg-3)]">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#6b7280" }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={12} /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} /> {repo.forks_count}
                        </span>
                      </div>
                    </SpotlightCard>
                  </motion.a>
                ))}
              </div>
            )}

            {!profile && !repos.length && (
              <p className="text-center text-[var(--fg-3)] font-mono text-sm py-10">
                Could not load GitHub data (rate limited or offline).
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
