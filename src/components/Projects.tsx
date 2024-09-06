"use client";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    url: "https://x.com/DivyanshuLohani/status/1811997184566657384",
    year: new Date("2024-05-01"),
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
    url: "https://maakalidhoop.in/",
    year: new Date("2024-07-01"),
    name: "Maakali Griha Udyog",
    description:
      "An ecommerce website with payment gateway integration for a business that sells religious products",
    icons: [
      "devicon-nextjs-plain",
      "devicon-nodejs-plain",
      "devicon-react-plain",
      "devicon-tailwindcss-plain",
    ],
  },
  {
    url: "https://master--expense-trackie.netlify.app/",
    year: new Date("2024-04-01"),
    name: "Expense Tracker",
    description:
      "An expense tracker app that helps users track expenses and generate CSV reports for the month",
    icons: ["devicon-react-plain", "devicon-tailwindcss-plain"],
  },
  {
    url: "https://youtu.be/MyUtX_VAC4Q",
    year: new Date("2024-08-01"),
    name: "Beattock",
    description:
      "A project made for a 48-hour online hackathon PeddieHacks 2024, featuring an AI beat generator and beat exploring platform",
    icons: [
      "devicon-python-plain",
      "devicon-flask-original",
      "devicon-react-plain",
      "devicon-scikitlearn-plain",
    ],
  },
  {
    url: "https://game-of-life-three-kohl.vercel.app/",
    year: new Date("2024-05-01"),
    name: "Game of Life Simulation",
    description: "A simulator for Conway's Game of Life built in React",
    icons: ["devicon-react-plain"],
  },
  {
    url: "https://youtu.be/rnjLcbqNqd0?si=bjD4nv9LR4GBy088",
    year: new Date("2024-08-01"),
    name: "Skribbl Clone",
    description:
      "A clone of Skribbl.io with all the original features and additional settings",
    icons: [
      "devicon-nodejs-plain",
      "devicon-react-plain",
      "devicon-socketio-original",
      "devicon-tailwindcss-plain",
      "devicon-websockets-plain",
    ],
  },
  {
    url: "https://privaak.com",
    year: new Date("2023-06-01"),
    name: "Privaak",
    description:
      "A website for a safety company that deals with barriers and equipment for construction",
    icons: [
      "devicon-django-plain",
      "devicon-python-plain",
      "devicon-amazonwebservices-plain",
      "devicon-docker-plain",
      "devicon-nginx-original",
    ],
  },
  {
    url: "https://webbros.online",
    year: new Date("2024-06-01"),
    name: "Webbros Site",
    description:
      "A website for a social media marketing agency dealing with website development and running ads for businesses",
    icons: [
      "devicon-react-plain",
      "devicon-nextjs-plain",
      "devicon-tailwindcss-plain",
    ],
  },
  {
    url: "https://class.webbros.online/",
    year: new Date("2024-07-01"),
    name: "Classroom To Cloud Landing Page",
    description: "A landing page for my coaching SaaS project",
    icons: ["devicon-nextjs-plain", "devicon-tailwindcss-plain"],
  },
  {
    url: "https://coaching-saas.vercel.app/",
    year: new Date("2024-04-01"),
    name: "ProAdvisors",
    description:
      "A website for a career counseling business with booking of appointments and scheduled emails",
    icons: [
      "devicon-nextjs-plain",
      "devicon-mongodb-plain",
      "devicon-tailwindcss-plain",
    ],
  },
  {
    url: "https://x.com/DivyanshuLohani/status/1801315718795039177",
    year: new Date("2024-05-01"),
    name: "Threads Clone",
    description: "A clone of the popular social media platform Threads",
    icons: [
      "devicon-react-plain",
      "devicon-mongodb-plain",
      "devicon-nodejs-plain",
      "devicon-express-original",
    ],
  },
  {
    url: "https://github.com/DivyanshuLohani/insta-client",
    year: new Date("2022-06-01"),
    name: "Instagram Clone",
    description: "A clone of the popular social media platform Instagram",
    icons: [
      "devicon-django-plain",
      "devicon-react-plain",
      "devicon-python-plain",
    ],
  },
  {
    url: "https://github.com/DivyanshuLohani/2DghostGame",
    year: new Date("2022-01-01"),
    name: "2D Ghost Game",
    description: "An endless runner game made in Python and Pygame",
    icons: ["devicon-python-plain", "devicon-pygame-original"],
  },
  {
    url: "https://top.gg/bot/732860855645110272",
    year: new Date("2021-11-01"),
    name: "TigerO",
    description:
      "A Discord music bot with various functions such as moderation, image manipulation, and more",
    icons: ["devicon-python-plain"],
  },
  {
    url: "https://github.com/DivyanshuLohani/notes-app",
    year: new Date("2022-07-01"),
    name: "Simple Notes App",
    description:
      "A notes app with persistent note-saving functionality using a backend",
    icons: [
      "devicon-django-plain",
      "devicon-python-plain",
      "devicon-react-plain",
      "devicon-materialui-plain",
    ],
  },
  {
    url: "https://github.com/DivyanshuLohani/flappy-bird",
    year: new Date("2023-03-01"),
    name: "Flappy Bird",
    description: "A Flappy Bird clone built using Raylib",
    icons: [
      "devicon-cplusplus-plain",
      "devicon-raylib-plain",
      "devicon-android-plain",
    ],
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
    <section className="border-t border-white/10 ">
      <div className="text-center md:py-5 py-24">
        <h1 className="text-3xl font-bold mb-4 ">Projects</h1>
      </div>

      <div className="py-5 px-5 flex gap-3 flex-wrap">
        {techs.map((icon, index) => {
          return (
            <motion.button
              key={index}
              className={`${
                selectedFilter === icon ? "bg-white/10" : "bg-black"
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

      <div className="resume__container">
        <motion.div
          variants={projectVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 px-5"
        >
          {prjects
            .sort((a, b) => b.year.getTime() - a.year.getTime())
            .slice(0, n)
            .map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
