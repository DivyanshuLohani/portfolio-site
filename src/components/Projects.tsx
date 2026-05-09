"use client";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";


function getTechStacks() {
  const ret: string[] = [];
  projects.forEach((project) => {
    if (!ret.includes(project.icons[0])) ret.push(project.icons[0]);
  });
  return ret;
}

function Projects({ n }: { n?: number }) {
  const [prjects, setProjects] = useState(projects);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const techs = useMemo(() => getTechStacks(), []);

  useEffect(() => {
    if (!selectedFilter) {
      setProjects(projects);
    } else {
      setProjects(
        projects.filter((project) => project.icons.includes(selectedFilter))
      );
    }
  }, [selectedFilter]);

  if (!n) n = projects.length;

  // Variants for Framer Motion animations
  const projectVariants = {
    hover: {
      scale: 1.05, // Slightly scale up on hover
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <div className="text-center md:py-5 py-24">
        <h1 className="text-3xl font-bold mb-4 ">Projects</h1>
      </div>

      <div className="p-5 flex gap-3 flex-wrap border-b border-white/15">
        {techs.map((icon, index) => {
          return (
            <motion.button
              key={index}
              className={`${selectedFilter === icon ? "bg-white/10" : "bg-black"
                } border border-white/10 text-gray-300 px-3 py-1 rounded-full flex items-center gap-3 hover:bg-white/10 cursor-pointer`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() =>
                setSelectedFilter(selectedFilter === icon ? null : icon)
              }
              suppressHydrationWarning
            >
              <i className={`${icon} mr-1`} suppressHydrationWarning />
              {icon.split("-")[1].replace("reactnavigation", "react-native")}
            </motion.button>
          );
        })}
      </div>

      <motion.div
        variants={projectVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 px-5 mt-10"
      >
        {prjects
          .sort((a, b) => b.year.getTime() - a.year.getTime())
          .slice(0, n)
          .map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
      </motion.div>
    </>
  );
}

export default Projects;
