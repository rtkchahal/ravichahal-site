import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Pillars from "@/components/pillars";
import LatestPosts from "@/components/latest-posts";
import TheLab from "@/components/the-lab";
import About from "@/components/about";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-hidden pb-20">
        <Hero />
        <Pillars />
        <LatestPosts />
        <TheLab />
        <About />
      </main>
      <Footer />
    </>
  );
}
