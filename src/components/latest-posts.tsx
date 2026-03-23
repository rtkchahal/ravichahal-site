import Link from "next/link";
import { POSTS } from "@/lib/data";

export default function LatestPosts() {
  // Show only the 6 most recent posts on the homepage
  const posts = POSTS.slice(0, 6);

  return (
    <section id="latest" className="max-w-7xl mx-auto px-6 md:px-8 mb-32">
      {/* Section header */}
      <div className="flex items-end justify-between mb-12">
        <h2
          className="text-5xl font-bold tracking-tighter text-text-primary uppercase"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          Latest
        </h2>
        <div className="h-px flex-1 mx-8 bg-surface-high/40 mb-3" />
        <Link
          href="/posts"
          className="text-text-muted hover:text-ai-accent text-sm uppercase tracking-widest pb-2 transition-colors duration-200"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          View all →
        </Link>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group block"
            aria-label={`Read: ${post.title}`}
          >
            <article className="bg-surface/60 p-8 group-hover:bg-surface-high/60 transition-colors duration-200 cursor-pointer border border-white/5 h-full">
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
              <h4
                className="text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-ai-accent transition-colors duration-200"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                {post.title}
              </h4>

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
        ))}
      </div>
    </section>
  );
}
