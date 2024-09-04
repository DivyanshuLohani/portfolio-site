import { FaLinkedin, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const iconVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2, // Adjust the delay here
      duration: 0.5,
    },
  }),
};

export default function SocialLinks() {
  return (
    <div className="flex justify-self-start gap-4 text-white/50">
      <motion.a
        href="https://x.com/DivyanshuLohani"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-white transition-colors duration-150"
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        custom={0} // Delay for this icon
      >
        <FaXTwitter className="h-6 w-6" />
        <span className="sr-only">Twitter</span>
      </motion.a>
      <motion.a
        href="https://github.com/DivyanshuLohani"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-white transition-colors duration-150"
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        custom={1} // Delay for this icon
      >
        <FaGithub className="h-6 w-6" />
        <span className="sr-only">GitHub</span>
      </motion.a>
      <motion.a
        href="https://instagram.com/divyanshuxwb"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-white transition-colors duration-150"
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        custom={2} // Delay for this icon
      >
        <FaInstagram className="h-6 w-6" />
        <span className="sr-only">Instagram</span>
      </motion.a>
      <motion.a
        href="https://www.linkedin.com/in/divyanshulohani/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-white transition-colors duration-150"
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        custom={3} // Delay for this icon
      >
        <FaLinkedin className="h-6 w-6" />
        <span className="sr-only">Linkedin</span>
      </motion.a>
    </div>
  );
}
