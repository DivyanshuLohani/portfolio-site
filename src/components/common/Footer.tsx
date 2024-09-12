"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full text-center py-5 border-t bg-black border-white/10 z-10"
    >
      Made with ❤️ by Divyanshu Lohani
    </motion.div>
  );
}
