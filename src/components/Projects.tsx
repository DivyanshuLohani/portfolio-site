"use client";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
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
      "https://github.com/user-attachments/assets/3570874a-744a-4c09-9e08-730c388e2f60",
    liveUrl: "https://maakalidhoop.in/",
    url: "https://github.com/DivyanshuLohani/maa-kali-griha-udyog-ecommerce",
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
  {
    imageUrl:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgtnp315xgu2pbptsuc0l.png",
    liveUrl: "https://youtu.be/MyUtX_VAC4Q",
    url: "https://github.com/Sharko123/aibeatmaker",
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
    imageUrl:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fqxwlml29q8z34yorz9xp.png",
    liveUrl: "https://youtu.be/rnjLcbqNqd0?si=bjD4nv9LR4GBy088",
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
    imageUrl: "",
    liveUrl: "",
    url: "https://github.com/DivyanshuLohani/Privaak",
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
    url: "https://github.com/DivyanshuLohani/insta-client",
    year: new Date("2022-06-01"),
    name: "Pixel Wave",
    description:
      "A social media site for sharing memes and posts that users can interact with",
    icons: [
      "devicon-django-plain",
      "devicon-react-plain",
      "devicon-python-plain",
    ],
  },
  {
    imageUrl:
      "https://github.com/DivyanshuLohani/2DghostGame/raw/main/resources/imgs/readme.png",
    url: "https://github.com/DivyanshuLohani/2DghostGame",
    year: new Date("2022-01-01"),
    name: "2D Ghost Game",
    description: "An endless runner game made in Python and Pygame",
    icons: ["devicon-python-plain", "devicon-pygame-original"],
  },
  {
    imageUrl:
      "https://images.discordapp.net/avatars/732860855645110272/14b61800b57a82b1841c6cc2eb2baf47.png?size=512&w=512&q=75",
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
