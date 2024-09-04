import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

interface Project {
  year: number;
  name: string;
  description: string;
  url: string;
  icons: string[];
  duration?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      className="flex flex-col p-6 rounded-lg shadow-lg text-white border border-white/10 "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex flex-col mb-4">
        <motion.i
          className={`${project.icons[0]} ${
            project.icons[0] === "devicon-nextjs-plain" ? "" : "colored"
          }`}
          style={{ fontSize: "2rem" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
        />
        <h2 className="text-2xl font-bold">{project.name}</h2>
      </div>
      <motion.div
        className="border-t border-gray-600 my-4"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
      >
        {project.duration && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaClock className="text-gray-400" />
            <span>Duration: {project.duration}</span>
          </motion.div>
        )}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaCalendarAlt className="text-gray-400" />
          <span>{project.year}</span>
        </motion.div>
      </motion.div>
      <motion.div
        className="border-t border-gray-600 my-4"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.icons.map((icon, index) => (
          <motion.span
            key={index}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <i className={`${icon} mr-1`} />
            {icon.split("-")[1]} {/* Display a simplified tech name */}
          </motion.span>
        ))}
      </div>
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 hover:underline mt-auto border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
        >
          View Project
        </a>
      )}
    </motion.div>
  );
};

export default ProjectCard;
