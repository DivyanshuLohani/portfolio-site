"use client";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    year: 2024,
    name: "Skribbl Clone",
    description:
      "A skribbl.io clone, a word guessing game made in React, Node.js.",
    url: "https://github.com/DivyanshuLohani/skribble-clone",
    icons: [
      "devicon-nodejs-plain",
      "devicon-react-original",
      "devicon-redis-plain",
      "devicon-socketio-plain",
    ],
  },
  {
    year: 2024,
    name: "Maa Kali Griha Udyog",
    description:
      "An eCommerce website for a religious products brand selling agarbattis and dhoopbattis.",
    url: "https://maakalidhoop.in",
    icons: [
      "devicon-nextjs-plain",
      "devicon-nodejs-plain",
      "devicon-react-original",
      "devicon-postgresql-plain",
      "devicon-prisma-plain",
    ],
  },
  {
    year: 2023,
    name: "Privaak",
    description:
      "A website for a safety company that handles user requests visible on the admin site.",
    url: "https://privaak.com",
    icons: [
      "devicon-django-plain",
      "devicon-react-original",
      "devicon-javascript-plain",
      "devicon-html5-plain",
      "devicon-css3-plain",
    ],
  },
  {
    year: 2024,
    name: "ProAdvisors",
    description:
      "An online counseling site with appointment booking and payment gateway features.",
    url: "https://career-site-divyanshu-lohanis-projects.vercel.app/",
    icons: [
      "devicon-nextjs-plain",
      "devicon-nodejs-plain",
      "devicon-react-original",
      "devicon-postgresql-plain",
    ],
  },
  {
    year: 2024,
    name: "WebBros",
    description: "A website for a social media marketing agency.",
    url: "https://webbros.online",
    icons: ["devicon-nextjs-plain", "devicon-react-original"],
  },
  {
    year: 2024,
    name: "Class 2 Cloud",
    description:
      "A landing page for a software company offering online classroom services with live streaming.",
    url: "https://class.webbros.online",
    icons: [
      "devicon-nextjs-plain",
      "devicon-nodejs-plain",
      "devicon-react-original",
      "devicon-mongodb-plain",
    ],
  },
  {
    year: 2024,
    name: "Coaching SaaS Application",
    description:
      "A platform where coaching centers can upload their materials such as notes and DPPs.",
    url: "https://coaching-saas.vercel.app/",
    icons: [
      "devicon-nextjs-plain",
      "devicon-nodejs-plain",
      "devicon-react-original",
      "devicon-postgresql-plain",
      "devicon-django-plain",
    ],
  },
  {
    year: 2022,
    name: "2D Ghost Game",
    description: "An endless runner game made with Pygame in Python.",
    url: "https://github.com/DivyanshuLohani/2DGhostGame",
    icons: ["devicon-python-plain", "devicon-pygame-plain"],
  },
  {
    year: 2022,
    name: "Simple Notes App",
    description: "A notes app built with Django backend and React frontend.",
    url: "https://github.com/DivyanshuLohani/notes-app",
    icons: ["devicon-django-plain", "devicon-react-original"],
  },
  {
    year: 2021,
    name: "TigerO™",
    description: "An all-rounder Discord bot made with Python.",
    url: "",
    icons: ["devicon-python-plain"],
  },
  {
    year: 2021,
    name: "News App",
    description: "A custom news app built with React and News API.",
    url: "",
    icons: ["devicon-react-original", "devicon-newsapi-plain"],
  },
  {
    year: 2021,
    name: "IForums",
    description: "A website similar to Stack Overflow.",
    url: "https://iforumsapp.herokuapp.com",
    icons: ["devicon-react-original", "devicon-nodejs-plain"],
  },
];

function Projects({ n }: { n?: number }) {
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

      <div className="resume__container">
        <motion.div
          variants={projectVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-3 px-5"
        >
          {projects.slice(0, n).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;
