import Projects from "@/components/Projects";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
	return <Projects projects={projects} />;
}
