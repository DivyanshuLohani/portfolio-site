import React from "react";
import { FaCode, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface Experience {
  techName: string;
  experienceLevel: string;
  duration: string;
  description: string;
  url?: string;
}

interface TimelineCardProps {
  experience: Experience;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ experience }) => {
  return (
    <motion.div
      className="flex flex-col p-6 rounded-lg shadow-lg text-white border border-white/10 bg-black "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <FaCode className="text-gray-400" />
        <h2 className="text-xl font-bold">{experience.techName}</h2>
      </div>
      <h3 className="text-lg font-semibold text-gray-300">
        {experience.experienceLevel}
      </h3>
      <div className="flex items-center gap-2 my-2">
        <FaCalendarAlt className="text-gray-400" />
        <span>{experience.duration}</span>
      </div>
      <p className="text-gray-400 mb-4">{experience.description}</p>
    </motion.div>
  );
};

export default TimelineCard;
