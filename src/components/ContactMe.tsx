"use client";

import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import SocialLinks from "./common/SocialLinks";

interface FormError {
	name?: string;
	email?: string;
	message?: string;
}

export default function ContactMe() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [errors, setErrors] = useState<FormError>({});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const googleFormUrl =
		"https://docs.google.com/forms/d/e/1FAIpQLSc7gyty4cm79pb9ml2DztGRHLjiNj-2GTddJXMrC8UBNuttyg/formResponse";

	const formEntries = {
		name: "entry.2005620554",
		email: "entry.1045781291",
		message: "entry.839337160",
	};

	const validate = () => {
		const newErrors: FormError = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required.";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required.";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid.";
		}

		if (!formData.message.trim()) {
			newErrors.message = "Message is required.";
		}

		return newErrors;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationErrors = validate();

		if (Object.keys(validationErrors).length !== 0) {
			setErrors(validationErrors);
			return;
		}

		const formParams = new URLSearchParams();

		formParams.append(formEntries.name, formData.name);
		formParams.append(formEntries.email, formData.email);
		formParams.append(formEntries.message, formData.message);

		try {
			await fetch(googleFormUrl, {
				method: "POST",
				mode: "no-cors",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formParams.toString(),
			});

			setFormData({
				name: "",
				email: "",
				message: "",
			});

			setErrors({});
			setIsSubmitted(true);
		} catch (error) {
			console.error("Form submission failed:", error);
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { id, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[id]: "",
		}));

		if (isSubmitted) {
			setIsSubmitted(false);
		}
	};

	const fieldVariants = {
		hidden: {
			opacity: 0,
			y: 15,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.45,
				ease: "easeOut",
			},
		},
	};

	return (
		<section id="contact">
			<motion.div
				className="max-w-[1180px] mx-auto px-6 md:px-10 py-28 md:py-36"
				initial="hidden"
				whileInView="visible"
				viewport={{
					once: true,
					amount: 0.1,
				}}
				variants={{
					hidden: {},
					visible: {
						transition: {
							staggerChildren: 0.08,
						},
					},
				}}
			>
				{/* Header */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
					{/* LEFT */}
					<motion.div variants={fieldVariants}>
						<h2 className="text-[17vw] sm:text-[13vw] md:text-[9vw] lg:text-[7rem] leading-[0.82] tracking-[-0.07em] font-bold">
							Let&apos;s
							<br />
							<span className="text-transparent [-webkit-text-stroke:1px_#666]">
								build.
							</span>
						</h2>

						<p className="mt-10 max-w-md text-sm md:text-base leading-7 text-white/45">
							Have a project, an idea, or a sufficiently questionable technical
							problem?
							<br />
							Send it over.
						</p>

						<div className="mt-8">
							<SocialLinks />
						</div>
					</motion.div>

					{/* RIGHT */}
					<motion.form
						onSubmit={handleSubmit}
						variants={fieldVariants}
						className="lg:pt-12"
					>
						{isSubmitted && (
							<motion.div
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								className="
                  mb-8
                  border border-[#7c9cff]/20
                  bg-[#7c9cff]/5
                  px-4 py-3
                  text-xs
                  text-[#a9bbff]
                "
							>
								Message received. I&apos;ll get back to you soon.
							</motion.div>
						)}

						{/* NAME */}
						<motion.div variants={fieldVariants} className="mb-7">
							<label
								htmlFor="name"
								className="
                  flex items-center justify-between
                  mb-2
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  text-white/40
                "
							>
								<span>Name</span>
								<span className="text-white/20">01</span>
							</label>

							<input
								id="name"
								type="text"
								value={formData.name}
								onChange={handleInputChange}
								placeholder="Your name"
								className="
                  w-full
                  bg-transparent
                  border-0
                  border-b
                  border-white/15
                  bg-[#070707]
                  px-2 py-3
                  text-sm
                  text-white
                  placeholder:text-white/20
                  outline-none
                  transition-colors
                  focus:border-white/60
                "
							/>

							{errors.name && (
								<p className="mt-2 text-xs text-red-400">{errors.name}</p>
							)}
						</motion.div>

						{/* EMAIL */}
						<motion.div variants={fieldVariants} className="mb-7">
							<label
								htmlFor="email"
								className="
                  flex items-center justify-between
                  mb-2
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  text-white/40
                "
							>
								<span>Email</span>
								<span className="text-white/20">02</span>
							</label>

							<input
								id="email"
								type="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="you@example.com"
								className="
                  w-full
                  bg-transparent
                  border-0
                  border-b
                  border-white/15
                  px-2 py-3
                  text-sm
                  text-white
                  placeholder:text-white/20
                  outline-none
                  transition-colors
                  focus:border-white/60
                  bg-[#070707]
                "
							/>

							{errors.email && (
								<p className="mt-2 text-xs text-red-400">{errors.email}</p>
							)}
						</motion.div>

						{/* MESSAGE */}
						<motion.div variants={fieldVariants} className="mb-9">
							<label
								htmlFor="message"
								className="
                  flex items-center justify-between
                  mb-2
                  text-[10px]
                  uppercase
                  tracking-[0.12em]
                  text-white/40
                "
							>
								<span>Message</span>
								<span className="text-white/20">03</span>
							</label>

							<textarea
								id="message"
								rows={5}
								value={formData.message}
								onChange={handleInputChange}
								placeholder="Tell me what you're building..."
								className="
                  w-full
                  resize-none
                  bg-transparent
                  border-0
                  border-b
                  bg-[#070707]
                  border-white/15
                  px-2 py-3
                  text-sm
                  text-white
                  placeholder:text-white/20
                  outline-none
                  transition-colors
                  focus:border-white/60
                "
							/>

							{errors.message && (
								<p className="mt-2 text-xs text-red-400">{errors.message}</p>
							)}
						</motion.div>

						{/* SUBMIT */}
						<motion.button
							variants={fieldVariants}
							type="submit"
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.98 }}
							className="
                group
                flex
                w-full
                items-center
                justify-between
                border
                border-white/20
                px-5 py-4
                text-xs
                font-medium
                text-white
                transition-all
                hover:border-white
                hover:bg-white
                hover:text-black
              "
						>
							<span>Send message</span>
						</motion.button>
					</motion.form>
				</div>
			</motion.div>
		</section>
	);
}
