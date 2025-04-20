import ContactMe from "@/components/ContactMe";
import Home from "../../components/Home";
import Projects from "../../components/Projects";
import Link from "next/link";
import BlogSection from "@/components/blog/BlogSection";
import { getBlogPosts } from "@/lib/data";
import { Suspense } from "react";
import MusicContent from "@/components/Music";

export default async function HomePage() {
  const posts = await getBlogPosts(4);
  return (
    <>
      <section>
        <Home />
      </section>

      <section className="border-y border-white/10 space-y-4  ">
        <Projects n={4} />
        <div className="flex justify-center mt-10">
          <Link
            href={"/projects"}
            className="px-5 py-2 border rounded-full hover:text-black hover:bg-white duration-300 transition-colors mb-5"
          >
            View All
          </Link>
        </div>
      </section>
      <section>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogSection posts={posts} />
          <div className="flex justify-center mt-10">
            <Link
              href={"/posts/"}
              className="px-5 py-2 border rounded-full hover:text-black hover:bg-white duration-300 transition-colors mb-5"
            >
              View All
            </Link>
          </div>
        </Suspense>
      </section>
      <section className="border-y border-white/10 py-5">
        <MusicContent />
      </section>
      <section>
        <ContactMe />
      </section>
    </>
  );
}
