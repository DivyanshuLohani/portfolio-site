import React from "react";
import { motion } from "framer-motion";
import { CalendarFold, ExternalLink, LucideClock } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";

interface Project {
  year: Date;
  name: string;
  description: string;
  url: string;
  icons: string[];
  duration?: string;
  liveUrl?: string;
  imageUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      className="flex flex-col p-6 rounded-lg shadow-lg text-white bg-black/10 backdrop-blur-lg border border-white/10 group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="flex flex-col mb-4 gap-3">
        <span className="">
          <motion.i
            className={`${project.icons[0]} ${
              project.icons[0] === "devicon-nextjs-plain" ? "" : "colored"
            } p-2 border border-white/10 rounded-full group-hover:bg-white/10`}
            style={{ fontSize: "2rem" }}
            initial={{ rotate: 0 }}
            whileInView={{ rotate: [0, 10, -10, 0] }}
            viewport={{ once: true, amount: 0.05 }}
          />
        </span>
        <h2 className="text-2xl font-bold">{project.name}</h2>
      </div>
      {project.imageUrl && (
        <motion.div
          className="-px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <a
            href={project.liveUrl ?? project.url}
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <Image
              height={300}
              width={300}
              src={project.imageUrl}
              alt="Project Image"
            />
          </a>
        </motion.div>
      )}
      <motion.div
        className="border-t border-gray-600 my-4"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, staggerChildren: 0.2 }}
      >
        {project.duration && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <LucideClock className="text-gray-400" />
            <span>Duration: {project.duration}</span>
          </motion.div>
        )}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <CalendarFold className="text-gray-400" />
          <span>{formatTime(project.year)}</span>
        </motion.div>
      </motion.div>
      <motion.div
        className="border-t border-gray-600 my-4"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.5 }}
      />
      <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.icons.map((icon, index) => (
          <motion.span
            key={index}
            className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <i className={`${icon} mr-1`} />
            {icon.split("-")[1]} {/* Display a simplified tech name */}
          </motion.span>
        ))}
      </div>
      <div className="flex w-full gap-1 justify-between">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 hover:underline mt-auto border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex gap-2 items-center w-full"
          >
            <ExternalLink size={15} />
            <span>Demo</span>
          </a>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 hover:underline mt-auto border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors duration-300 flex justify-center gap-1 items-center w-full"
          >
            <FaGithub size={15} />
            <span>Source</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
