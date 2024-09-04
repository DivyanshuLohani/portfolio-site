import { useLocation } from "react-router-dom";
import Projects from "../components/Projects";
import { useEffect } from "react";

export default function ProjectsPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Projects />
    </>
  );
}
