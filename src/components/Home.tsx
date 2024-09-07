"use client";
import { useEffect } from "react";
import { ReactTyped } from "react-typed";
import TechCarousel from "./Carousel";
import SocialLinks from "./common/SocialLinks";
import { motion, useAnimation } from "framer-motion";

const techItems = [
  { name: "JavaScript", icon: "devicon-javascript-plain colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "Python", icon: "devicon-python-plain-wordmark colored" },
  { name: "C++", icon: "devicon-cplusplus-plain-wordmark colored" },
  { name: "HTML5", icon: "devicon-html5-plain-wordmark colored" },
  { name: "CSS3", icon: "devicon-css3-plain-wordmark colored" },
  { name: "NextJS", icon: "devicon-nextjs-plain" },
  { name: "NodeJS", icon: "devicon-nodejs-plain colored" },
];

function Home() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1, 0],
      transition: { duration: 1, repeat: Infinity },
    });
  }, [controls]);

  return (
    <section
      className="flex items-center justify-center z-10 h-screen md:gap-10 flex-col md:flex-row px-5 md:px-0 gap-8"
      id="home"
    >
      <motion.div
        className="flex flex-col gap-3 md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SocialLinks />
        <h1 className="text-5xl font-bold">
          Divyanshu Lohani
          <br />
          <span className="text-lg">
            {"I'm a "}
            <ReactTyped
              strings={[
                "Software Developer",
                "Web Developer",
                "Full Stack Developer",
                "Game Developer",
              ]}
              typeSpeed={80}
              backSpeed={40}
              loop={true}
            />
          </span>
        </h1>
        <p className="opacity-75 md:text-left text-[1.2em] font-extralight bg-white/10 p-3 rounded backdrop-blur-lg">
          A freelance web developer with extensive experience in both frontend
          and backend technologies. I specialize in building custom websites
          that are visually appealing, and I have master-level expertise in
          Python for handling complex backend tasks.
        </p>
      </motion.div>
      <motion.div
        className="md:1/2 hidden md:block"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TechCarousel items={techItems} />
      </motion.div>
    </section>
  );
}

export default Home;
