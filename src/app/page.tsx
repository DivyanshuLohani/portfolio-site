import Home from "../components/Home";
import Projects from "../components/Projects";
import Timeline from "../components/Experiences";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Home />
      <Projects n={4} />
      <div className="flex justify-center mt-10">
        <Link
          href={"/projects"}
          className="px-5 py-2 border rounded-full hover:text-black hover:bg-white duration-300 transition-colors"
        >
          View All
        </Link>
      </div>
      <Timeline />
    </>
  );
}
