"use client";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechItem {
  name: string;
  icon: string;
}

interface TechCarouselProps {
  items: TechItem[];
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const TechCarousel: React.FC<TechCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevClick = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <button onClick={handlePrevClick} className="p-2">
          <span className="text-3xl">
            <ChevronLeftCircle />
          </span>
        </button>
        <div className="flex flex-col items-center mx-4 w-32 h-32 overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute flex flex-col items-center justify-center h-full w-full"
            >
              <i
                className={`${items[currentIndex].icon}`}
                style={{ fontSize: "5rem" }}
              ></i>

              <p className="mt-2 text-lg">{items[currentIndex].name}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={handleNextClick} className="p-2">
          <span className="text-3xl">
            <ChevronRightCircle />
          </span>
        </button>
      </div>
    </div>
  );
};

export default TechCarousel;
