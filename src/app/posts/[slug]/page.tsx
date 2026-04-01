import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Ravi Chahal`,
    description: post.preview,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <article className="max-w-3xl mx-auto px-6 md:px-8 pt-40 md:pt-48 mb-32">
          {/* Back link */}
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 text-sm uppercase tracking-widest mb-12 group"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            <ArrowLeft
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
              strokeWidth={2}
            />
            All Posts
          </Link>

          {/* Tag + date */}
          <div className="flex items-center gap-3 mb-6">
            <span
              className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                post.tag === "ai"
                  ? "bg-ai-accent/10 text-ai-accent"
                  : "bg-btc-accent/10 text-btc-accent"
              }`}
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {post.tag === "ai" ? "Agentic AI" : "Bitcoin"}
            </span>
            <time
              className="text-[11px] uppercase tracking-widest text-text-muted/50"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {post.date}
            </time>
          </div>

          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tighter text-text-primary leading-tight ${post.subtitle ? "mb-3" : "mb-12"}`}
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p
              className="text-text-muted text-lg mb-10 leading-snug"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {post.subtitle}
            </p>
          )}

          {/* MDX Content */}
          <div className="prose-content">
            <MDXRemote source={post.content} />
          </div>

          {/* Join the Feed CTA */}
          <div className="mt-20 p-10 rounded-2xl bg-surface/60 border border-white/5 text-center">
            <h3
              className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-tight"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Enjoyed this?
            </h3>
            <p
              className="text-text-muted mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Subscribe to get new posts on Agentic AI and Bitcoin — written by
              a human, delivered by agents.
            </p>
            <Link
              href="/#join"
              className="inline-block text-slate-900 font-black px-8 py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,212,236,0.4)]"
              style={{
                background: "linear-gradient(135deg, #80ecff 0%, #00d4ec 100%)",
                fontFamily: "var(--font-headline)",
              }}
            >
              Join the Feed
            </Link>
          </div>

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <nav className="mt-12 grid grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/posts/${prev.slug}`}
                  className="group p-6 rounded-xl bg-surface/60 border border-white/5 hover:bg-surface-high/60 transition-colors duration-200"
                >
                  <span
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted mb-2"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    <ArrowLeft className="w-3 h-3" strokeWidth={2} />
                    Newer
                  </span>
                  <span
                    className="font-bold text-text-primary group-hover:text-ai-accent transition-colors duration-200 line-clamp-2"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/posts/${next.slug}`}
                  className="group p-6 rounded-xl bg-surface/60 border border-white/5 hover:bg-surface-high/60 transition-colors duration-200 text-right col-start-2"
                >
                  <span
                    className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest text-text-muted mb-2"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Older
                    <ArrowRight className="w-3 h-3" strokeWidth={2} />
                  </span>
                  <span
                    className="font-bold text-text-primary group-hover:text-ai-accent transition-colors duration-200 line-clamp-2"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
