"use client";
import { motion } from "framer-motion";
import React from "react";

export default function MusicContent() {
  return (
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
          I recently released my first single with a friend, pouring my passion
          for music into every note. Check it out and let me know your thoughts!
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
  );
}
