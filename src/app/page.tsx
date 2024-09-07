import ContactMe from "@/components/ContactMe";
import Home from "../components/Home";
import Projects from "../components/Projects";
import Link from "next/link";
import BlogSection from "@/components/blog/BlogSection";
import { getBlogPosts } from "@/lib/data";

export default async function HomePage() {
  const posts = await getBlogPosts();
  return (
    <>
      <Home />
      <Projects n={4} />
      <div className="flex justify-center mt-10">
        <Link
          href={"/projects"}
          className="px-5 py-2 border rounded-full hover:text-black hover:bg-white duration-300 transition-colors mb-5"
        >
          View All
        </Link>
      </div>
      <BlogSection posts={posts} />
      <ContactMe />
    </>
  );
}
