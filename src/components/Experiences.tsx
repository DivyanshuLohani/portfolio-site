import React from "react";
import TimelineCard from "../components/ExperienceCard";

const experiences = [
  {
    techName: "Python",
    experienceLevel: "Advanced",
    duration: "6 years",
    description:
      "Extensive experience in Python development, including web applications and automation scripts.",
    url: "https://www.python.org",
  },
  {
    techName: "PostgreSQL",
    experienceLevel: "Intermediate",
    duration: "5 years",
    description:
      "Experienced in designing and managing relational databases with PostgreSQL.",
    url: "https://www.postgresql.org",
  },
  {
    techName: "HTML",
    experienceLevel: "Advanced",
    duration: "4 years",
    description:
      "Skilled in creating structured and accessible web content using HTML.",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    techName: "CSS",
    experienceLevel: "Advanced",
    duration: "4 years",
    description: "Proficient in styling and designing web pages with CSS.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    techName: "JavaScript",
    experienceLevel: "Advanced",
    duration: "4 years",
    description:
      "Experienced in client-side scripting and dynamic web content with JavaScript.",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    techName: "React",
    experienceLevel: "Advanced",
    duration: "3 years",
    description:
      "Developed multiple projects including eCommerce sites and interactive web applications.",
    url: "https://reactjs.org",
  },
  {
    techName: "TypeScript",
    experienceLevel: "Advanced",
    duration: "3 years",
    description:
      "Used TypeScript to build scalable and maintainable applications.",
    url: "https://www.typescriptlang.org",
  },
  {
    techName: "Next.js",
    experienceLevel: "Intermediate",
    duration: "2 years",
    description:
      "Experience with server-side rendering and static site generation using Next.js.",
    url: "https://nextjs.org",
  },
  {
    techName: "MongoDB",
    experienceLevel: "Intermediate",
    duration: "1 year",
    description:
      "Worked with MongoDB for NoSQL database management and development.",
    url: "https://www.mongodb.com",
  },
  //   {
  //     techName: "Socket.IO",
  //     experienceLevel: "Beginner",
  //     duration: "5 months",
  //     description:
  //       "Basic experience with real-time web applications using Socket.IO.",
  //     url: "https://socket.io",
  //   },
];

const Timeline: React.FC = () => {
  return (
    <section className="py-10 px-5">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Experience Timeline</h1>
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 h-full border-l border-gray-600"></div>
        <div className="flex flex-col gap-16">
          {experiences.reverse().map((exp, index) => (
            <div key={index} className="relative">
              <TimelineCard experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
