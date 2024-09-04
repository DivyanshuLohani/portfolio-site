import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Projects from "../components/Projects";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Home />
      <Projects n={4} />
    </>
  );
}
