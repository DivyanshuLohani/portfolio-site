"use client";

import { motion } from "framer-motion";
import SocialLinks from "./common/SocialLinks";
import Link from "next/link";

export default function Home() {
  return (
    <section
      className="flex flex-col items-center justify-center h-screen px-6 text-center"
      id="home"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
          <span className="animate-pulse">Divyanshu Lohani</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-70">
          Full-stack developer building scalable web apps and developer tools.
        </p>

        <div className="mt-6 flex justify-center">
          <SocialLinks />
        </div>

        <div className="mt-8">
          <Link
            href="/projects"
            className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
          >
            View Work
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

