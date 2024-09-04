import Home from "../components/Home";
import Projects from "../components/Projects";
import Timeline from "../components/Experiences";

export default function HomePage() {
  return (
    <>
      <Home />
      <Projects n={4} />
      <Timeline />
    </>
  );
}
