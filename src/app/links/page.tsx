import Links from "@/components/Links";
import { getBlogPosts } from "@/lib/data";

export const metadata = {
  title: "Links - Divyanshu Lohani",
  description: "All links in one place - social, projects, and more",
};

export default async function LinksPage() {
  const posts = await getBlogPosts(5);
  return <Links posts={posts} />;
}
