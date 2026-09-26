"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-20 right-6 z-[9999] pointer-events-auto">
          <div className="relative flex items-center justify-center">
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-black border border-white/20 text-white text-xs font-medium rounded-lg shadow-2xl backdrop-blur-md whitespace-nowrap pointer-events-none flex items-center gap-1.5"
                >
                  <span>Scroll to top</span>
                  <div className="absolute top-full right-4 w-2 h-2 bg-black border-r border-b border-white/20 transform rotate-45 -translate-y-1/2" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              title="Scroll to top"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-black text-white border border-white/20 shadow-xl transition-all duration-300 hover:bg-neutral-900 hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
            >
              <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300" />
              <ArrowUp className="w-5 h-5 text-gray-300 transition-colors duration-300 group-hover:text-white relative z-10" />
            </motion.button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
