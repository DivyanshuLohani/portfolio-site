"use client";
import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";

export default function Footer() {
	return (
		<motion.div
			whileInView={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			className="flex items-center justify-center gap-2 w-full text-center py-5 border-t border-white/10 z-10"
		>
			Made with <HeartIcon fill={"red"} strokeWidth={0} className="h-6 w-6" />{" "}
			by Divyanshu Lohani
		</motion.div>
	);
}
