"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

interface BlogItemProps {
	index?: number;
	title: string;
	date: string;
	href: string;
}

export default function BlogItem({ title, date, href }: BlogItemProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{
				duration: 0.45,
				ease: "easeOut",
			}}
		>
			<Link
				href={href}
				className="
          group
          grid
          grid-cols-[90px_1fr_30px]
          md:grid-cols-[110px_1fr_40px]
          gap-4
          md:gap-7
          items-center
          py-7
          border-b
          border-white/10
          transition-all
          duration-300
          hover:bg-white/[0.02]
          hover:px-3
        "
			>
				{/* Date */}
				<span className="text-[10px] md:text-[11px] text-white/30 uppercase tracking-wide">
					{date}
				</span>

				{/* Title */}
				<h3
					className="
            text-lg
            md:text-2xl
            font-normal
            tracking-[-0.03em]
            text-white/90
            transition-colors
            duration-200
            group-hover:text-white
          "
				>
					{title}
				</h3>

				{/* Arrow */}
				<span
					className="
            text-lg
            text-white/25
            text-right
            transition-all
            duration-200
            group-hover:text-white/70
            group-hover:translate-x-1
          "
				>
					<ArrowUpRightIcon className="w-4 h-4 md:w-5 md:h-5" />
				</span>
			</Link>
		</motion.div>
	);
}
