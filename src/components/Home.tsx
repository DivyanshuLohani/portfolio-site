"use client";
import { useEffect } from "react";
import { ReactTyped } from "react-typed";
import SocialLinks from "./common/SocialLinks";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

// const techItems = [
//   { name: "JavaScript", icon: "devicon-javascript-plain colored" },
//   { name: "TypeScript", icon: "devicon-typescript-plain colored" },
//   { name: "Python", icon: "devicon-python-plain-wordmark colored" },
//   { name: "C++", icon: "devicon-cplusplus-plain-wordmark colored" },
//   { name: "HTML5", icon: "devicon-html5-plain-wordmark colored" },
//   { name: "CSS3", icon: "devicon-css3-plain-wordmark colored" },
//   { name: "NextJS", icon: "devicon-nextjs-plain" },
//   { name: "NodeJS", icon: "devicon-nodejs-plain colored" },
// ];

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
      className="flex items-center flex-col-reverse justify-center z-10 h-screen md:gap-10 md:flex-row px-5 md:px-0 gap-8"
      id="home"
    >
      <motion.div
        className="flex flex-col gap-3 md:w-1/2"
        initial={{ opacity: 0, x: -50, scale: 1.2 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex md:flex-col gap-3 items-center md:items-start flex-col-reverse">
          <SocialLinks />
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-center md:text-left"
            initial={{ filter: "blur(50px)" }}
            animate={{ filter: "blur(0px)", transition: { delay: 0.5 } }}
          >
            Divyanshu Lohani
            <br />
          </motion.h1>
        </div>

        <span className="text-lg text-center md:text-left mb-2">
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
        <p className="opacity-75 md:text-left text-[1.2em] font-extralight bg-white/10 p-3 rounded backdrop-blur-lg">
          A freelance web developer with extensive experience in both frontend
          and backend technologies. I specialize in building custom websites
          that are visually appealing, and I have master-level expertise in
          Python for handling complex backend tasks.
        </p>
      </motion.div>
      <motion.div
        className="w-52 h-52 md:w-auto md:h-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          height={400}
          width={400}
          src="https://pbs.twimg.com/media/GgMh34LaYAEhAC7?format=jpg&name=large"
          alt="Profile Image"
          className="rounded-full border-grey-500 border-4"
        />
      </motion.div>
    </section>
  );
}

export default Home;
