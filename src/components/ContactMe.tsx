"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
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

  // Validate the form inputs
  const validate = () => {
    const newErrors: FormError = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit to Google Forms
      const formParams = new URLSearchParams();
      formParams.append(formEntries.name, formData.name);
      formParams.append(formEntries.email, formData.email);
      formParams.append(formEntries.message, formData.message);

      try {
        await fetch(googleFormUrl, {
          method: "POST",
          mode: "no-cors", // Google Forms doesn't allow CORS
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formParams.toString(),
        });

        // Clear form and show confirmation message
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(true);
      } catch (error) {
        console.error("Form submission failed:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear errors on change
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 sm:p-8"
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
      viewport={{ once: true, amount: 0.05 }}
    >
      {/* Left section */}
      <motion.div
        className="flex flex-col "
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <motion.h2 className="text-3xl font-bold mb-4">
          {"Let's"} start something together
        </motion.h2>
        <motion.p className="text-white/50">
          {"I'm"} excited to connect with you and explore how we can work
          together. Fill out the form on the right to get in touch.
        </motion.p>
        <motion.p className="text-white/50">
          Or connect to me on my socials
        </motion.p>
        <div className="mt-3">
          <SocialLinks />
        </div>
      </motion.div>

      {/* Right section - form */}
      <motion.form className="space-y-4" onSubmit={handleSubmit}>
        {isSubmitted && (
          <p className="text-green-500 font-bold">
            Thank you for reaching out! {"I'll"} get back to you soon.
          </p>
        )}

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <label
            htmlFor="name"
            className="block text-sm font-medium border-white/80 mb-1"
          >
            What is your name?
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="block w-full p-3 border border-white/10 rounded-lg bg-black"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium border-white/80 mb-1"
          >
            What is your email?
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className="block w-full p-3 border border-white/10 rounded-lg  bg-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <label
            htmlFor="message"
            className="block text-sm font-medium border-white/80 mb-1"
          >
            What are you looking for?
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Enter your message"
            className="block w-full p-3 border border-white/10 rounded-lg bg-black"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </motion.div>

        <motion.div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-white/80 duration-300 transition-colors focus:ring-opacity-50"
          >
            Submit
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
