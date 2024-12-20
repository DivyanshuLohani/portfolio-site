"use client";
import { Code2, Package, Gamepad2, Music } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: {
    y: -1000,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: { y: -1000, opacity: 0 },
};

const menuVariants = {
  hidden: { x: 100, opacity: 0 }, // Start offscreen to the right
  visible: { x: 0, opacity: 1 }, // Slide to the center
  exit: { x: 100, opacity: 0 }, // Slide back offscreen to the right
};

const links = [
  {
    href: "/projects",
    text: "Projects",
    icon: Package,
  },
  {
    href: "/experience",
    text: "Skills",
    icon: Gamepad2,
  },
  {
    href: "/songs",
    text: "Music",
    icon: Music,
  },
];

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  // Handle body overflow based on menu open state
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [open]);

  return (
    <nav className="sticky top-0 flex md:px-10 border-b bg-black md:bg-transparent md:backdrop-blur-sm border-white/10 z-10 justify-between items-center">
      {/* Hide Home link when the menu is open */}

      <motion.div
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          y: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <Link
          href="/"
          className="text-lg md:text-xl flex items-center gap-2 hover:bg-white/10 px-2 md:p-5"
        >
          <Code2 size={25} />
          Divyanshu Lohani
        </Link>
      </motion.div>

      {/* Menu opener */}
      <div
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-1 p-5"
      >
        <motion.div
          className={`w-5 h-1 bg-white `}
          animate={{ rotate: open ? 45 : 0 }}
        />
        <motion.div
          className={`w-5 h-1 bg-white`}
          animate={{ opacity: open ? 0 : 1 }}
        />
        <motion.div
          className={`w-5 h-1 bg-white`}
          animate={{ rotate: open ? -45 : 0 }}
        />
      </div>

      <ul className="hidden md:flex items-center p-0">
        {links.map((link) => {
          return (
            <li key={link.href} className="p-0">
              <Link
                href={link.href}
                className="flex items-center gap-2 hover:bg-white/10 cursor-pointer p-5"
              >
                <link.icon size={18} />
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Slide in/out mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-16 left-0  backdrop-blur-sm z-10"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <ul className="flex flex-col items-center p-0 w-full">
              {links.map((link) => (
                <li className="p-0 w-full" key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 hover:bg-white/10 cursor-pointer p-5 w-full"
                  >
                    <link.icon size={18} />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
