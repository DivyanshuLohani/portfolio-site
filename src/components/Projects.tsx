"use client";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    imageUrl:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fqxwlml29q8z34yorz9xp.png",
    liveUrl: "https://guessdoodle.com",
    url: "https://github.com/DivyanshuLohani/SyncDrawGuess",
    year: new Date("2024-08-05"),
    name: "Sync Draw Guess",
    description: "A realtime multiplayer doodle guessing game",
    icons: [
      "devicon-nodejs-plain",
      "devicon-react-plain",
      "devicon-socketio-original",
      "devicon-tailwindcss-plain",
      "devicon-websockets-plain",
    ],
  },
  {
    imageUrl:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F10d9xj7y9iw9u2uhycmn.png",
    url: "https://github.com/DivyanshuLohani/GroceryDeliveryApp",
    liveUrl: "https://x.com/i/status/1872324261920346577",
    year: new Date("2024-12-01"),
    name: "Grocery Dilevery App",
    description:
      "A grocery delivery app built with React Native, Django, and Python.  It allows users to browse products, add items to their cart, and place orders for delivery. Handles delivery with auto rider management",
    icons: [
      "devicon-reactnavigation-plain",
      "devicon-python-plain",
      "devicon-django-plain",
      "devicon-tailwindcss-plain",
    ],
  },
  {
    imageUrl:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F6alnho4w4jwj4bn5acx0.png",
    url: "https://github.com/DivyanshuLohani/ClassToCloud",
    liveUrl: "https://x.com/DivyanshuLohani/status/1839622747288203433",
    year: new Date("2024-09-01"),
    name: "Classroom To Cloud",
    description:
      "An app for coaching businesses to take their coaching to online classes",
    icons: [
      "devicon-reactnavigation-plain",
      "devicon-python-plain",
      "devicon-django-plain",
      "devicon-tailwindcss-plain",
    ],
  },
  {
    imageUrl:
      "https://github.com/user-attachments/assets/9b6a3769-f8e2-431c-a044-86c06f74152e",
    liveUrl: "https://finflow.divyanshulohani.xyz",
    url: "https://github.com/DivyanshuLohani/FinFlow",
    year: new Date("2024-11-01"),
    name: "FinFlow",
    description:
      "An expense tracker app that helps users track expenses and generate CSV reports for the month",
    icons: ["devicon-react-plain", "devicon-tailwindcss-plain"],
  },


];

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
