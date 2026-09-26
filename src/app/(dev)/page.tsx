import BlogSection from "@/components/blog/BlogSectionHome";
import ContactMe from "@/components/ContactMe";
import MusicContent from "@/components/Music";
import SelectedWork from "@/components/projects/SelectedWork";
import { getBlogPosts } from "@/lib/data";
import Home from "../../components/Home";

export default async function HomePage() {
	const posts = await getBlogPosts(3);

	return (
		<>
			<section>
				<Home />
			</section>
			<SelectedWork />
			<BlogSection posts={posts} />
			<MusicContent />
			<ContactMe />
		</>
	);
}
