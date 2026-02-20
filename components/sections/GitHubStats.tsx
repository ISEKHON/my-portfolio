"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, BookOpen, Users } from "lucide-react";
import { PORTFOLIO } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/variants";

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
          fetch(
            `https://api.github.com/users/${username}/repos?sort=stars&per_page=6&type=owner`
          ),
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
        { label: "Repositories", value: profile.public_repos, icon: BookOpen },
        { label: "Followers", value: profile.followers, icon: Users },
        { label: "Following", value: profile.following, icon: Users },
        { label: "Gists", value: profile.public_gists, icon: BookOpen },
      ]
    : [];

  return (
    <section className="py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs font-mono font-semibold text-[#8b5cf6] tracking-widest uppercase">
            <Github size={12} />
            GitHub
          </div>
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">
            Open Source Activity
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Profile stats */}
            {profile && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {stats.map(({ label, value }) => (
                  <motion.div
                    key={label}
                    variants={fadeInUp}
                    className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-center"
                  >
                    <div className="text-2xl font-extrabold font-mono gradient-text">
                      {value}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{label}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Top repos */}
            {repos.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {repos.map((repo) => (
                  <motion.a
                    key={repo.id}
                    variants={fadeInUp}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[#8b5cf6]/40 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[#8b5cf6] transition-colors truncate">
                        {repo.name}
                      </span>
                      <Github
                        size={14}
                        className="shrink-0 text-[var(--text-muted)] group-hover:text-[#8b5cf6] transition-colors"
                      />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-auto text-xs text-[var(--text-muted)]">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                LANG_COLORS[repo.language] ?? "#6b7280",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star size={11} />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={11} />
                        {repo.forks_count}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}

            {!profile && !repos.length && (
              <p className="text-center text-[var(--text-muted)] font-mono text-sm py-10">
                Could not load GitHub data (rate limited or offline).
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
