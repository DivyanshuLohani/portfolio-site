"use client";
import React from "react";
import { Music, Code } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import SocialLinks from "@/components/common/SocialLinks";

const MusicPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-black text-gray-100 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background:
          "radial-gradient(circle, rgba(8,8,8,1) 0%, rgba(0,0,0,1) 100%)",
      }}
    >
      {/* Header */}
      <motion.header
        className="py-6 px-8 border-b border-gray-800 flex items-center justify-between"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
      >
        <div>
          <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-2">
            <Music className="text-green-500" /> My Music Journey
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Developer by day, artist by passion
          </p>
        </div>
        <Link href={"/"}>
          <Code className="text-gray-500 w-10 h-10" />
        </Link>
      </motion.header>

      {/* Content */}
      <motion.main
        className="flex-grow flex flex-col items-center justify-center px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <section className="">
          <motion.h2
            className="text-3xl font-semibold mb-4 flex items-center gap-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Debut Release
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-xl mx-auto mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            I recently released my first single with a friend, pouring my
            passion for music into every note. Check it out and let me know your
            thoughts!
          </motion.p>
          {/* Song Cover and Link */}
          <motion.iframe
            src="https://open.spotify.com/embed/track/4TxXfXrmlOlkOopl70zmtQ?utm_source=generator&theme=1"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          ></motion.iframe>
        </section>
      </motion.main>
      <motion.div
        className="flex flex-col px-10 py-10 backdrop-blur-lg"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <motion.h2 className="text-3xl font-bold mb-4">
          Let me know about your thoughts about this side of me
        </motion.h2>
        <motion.p className="text-white/50">
          {"I'm"} excited to connect with you and explore how we can work
          together.
        </motion.p>

        <div className="mt-3">
          <SocialLinks />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MusicPage;
