import { getAllPosts } from "@/lib/posts";
import PostsGrid from "@/components/posts-grid";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

type FilterParam = "ai" | "btc" | undefined;

interface PostsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export const metadata = {
  title: "Posts | Ravi Chahal",
  description:
    "All writing on Agentic AI and Bitcoin — patterns, experiments, and raw takes.",
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { filter } = await searchParams;
  const posts = getAllPosts();

  const normalizedFilter: FilterParam =
    filter === "ai" || filter === "btc" ? filter : undefined;

  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-40 md:pt-48 mb-32">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <h1
              className="text-5xl font-bold tracking-tighter text-text-primary uppercase"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              All Posts
            </h1>
            <div className="h-px flex-1 mx-8 bg-surface-high/40 mb-3" />
            <p
              className="text-text-muted text-sm uppercase tracking-widest pb-2"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {posts.length} Articles
            </p>
          </div>

          {/* Client-side filter + grid */}
          <PostsGrid
            posts={posts}
            initialFilter={normalizedFilter ?? "all"}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
