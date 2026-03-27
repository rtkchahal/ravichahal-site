"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Post } from "@/lib/posts";
import { RevealSection } from "./motion/RevealSection";
import { StaggerGrid } from "./motion/StaggerGrid";
import { TiltCard } from "./motion/TiltCard";

type Filter = "all" | "ai" | "btc";

interface PostsGridProps {
  posts: Post[];
  initialFilter?: Filter;
}

export default function PostsGrid({ posts, initialFilter = "all" }: PostsGridProps) {
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const filtered =
    filter === "all" ? posts : posts.filter((p) => p.tag === filter);

  return (
    <>
      {/* Filter tabs */}
      <RevealSection>
        <div className="flex items-center gap-2 mb-12">
          {(["all", "ai", "btc"] as Filter[]).map((tab) => {
            const isActive = filter === tab;
            const label = tab === "all" ? "All" : tab === "ai" ? "AI" : "Bitcoin";
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                  isActive
                    ? tab === "ai"
                      ? "bg-ai-accent text-slate-900"
                      : tab === "btc"
                      ? "bg-btc-accent text-slate-900"
                      : "bg-text-primary text-slate-900"
                    : "bg-surface border border-white/10 text-text-muted hover:text-text-primary hover:border-white/20"
                }`}
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </RevealSection>

      {/* Post grid */}
      <AnimatePresence mode="wait">
        <StaggerGrid
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1"
        >
          {filtered.map((post) => (
            <TiltCard key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group block h-full"
                aria-label={`Read: ${post.title}`}
              >
                <article className="bg-surface/60 p-8 group-hover:bg-surface-high/60 transition-colors duration-200 cursor-pointer border border-white/5 h-full rounded-xl">
                  {/* Tag */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter mb-6 ${
                      post.tag === "ai"
                        ? "bg-ai-accent/10 text-ai-accent"
                        : "bg-btc-accent/10 text-btc-accent"
                    }`}
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {post.tag === "ai" ? "Agentic AI" : "Bitcoin"}
                  </span>

                  {/* Title */}
                  <h2
                    className="text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-ai-accent transition-colors duration-200"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {post.title}
                  </h2>

                  {/* Preview */}
                  <p
                    className="text-text-muted text-sm line-clamp-2 mb-6 opacity-80 leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {post.preview}
                  </p>

                  {/* Date */}
                  <time
                    className="text-[10px] uppercase tracking-widest text-text-muted/40"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {post.date}
                  </time>
                </article>
              </Link>
            </TiltCard>
          ))}
        </StaggerGrid>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-3 py-24 text-center text-text-muted"
        >
          <p style={{ fontFamily: "var(--font-body)" }}>
            No posts found for this filter.
          </p>
        </motion.div>
      )}
    </>
  );
}
