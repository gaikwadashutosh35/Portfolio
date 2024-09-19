import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Project Task Management System",
    description:
      "Developed and deployed a full-stack task management system using React and Spring Boot, showcasing self-reliance and proficiency in both frontend and backend development.",
    videoId: "FAxay2A9tCs",
    previewImage:
      "https://i.ytimg.com/an_webp/3VbUz5dbNCg/mqdefault_6s.webp?du=3000&sqp=CKiSsLcG&rs=AOn4CLAV35zLP2XyuN2OjzitEDmyhXmsRg",
    github: "https://github.com/gaikwadashutosh35/ProjectManagementSystem",
    // live: "https://project-one.live",
  },
  {
    title: "Project Two",
    description: "Crypto Trading Platform.",
    videoId: "o2Co_kC9VMU",
    previewImage:
      "https://i.ytimg.com/an_webp/o2Co_kC9VMU/mqdefault_6s.webp?du=3000&sqp=CIGwsLcG&rs=AOn4CLDwX0kgPGiWilZyJI4OmjvFTF70QQ",
    github: "https://github.com/gaikwadashutosh35/Crypto-Trading-Platform",
    live: "https://project-two.live",
  },
  // Add more projects as needed
];

const Projects = () => {
  const [videoIndex, setVideoIndex] = useState(null);
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3, // Delay between cards
        duration: 0.8,
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8 } },
    hover: {
      scale: 1.05,
      boxShadow: "0px 15px 30px rgba(0,0,0,0.3)",
      transition: { duration: 0.3 },
    }, // Hover animation for cards
  };

  // Image animation for zoom and fade-in effect
  const imageVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: { opacity: 1, scale: 1.05, transition: { duration: 1 } },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
    hover: { scale: 1.1 },
  };
  // Staggered animation for the text (title, description, icons)
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const handlePlayClick = (index) => {
    setVideoIndex(index); // Set the index of the video to be played
  };

  return (
    <motion.section
      id="projects"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br py-20 bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
        <div className="grid gap-12 md:grid-cols-2">
          {projects.map((project, index) => (
            // <motion.div
            //   key={index}
            //   className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            //   variants={cardVariants} // Use card variants
            //   whileInView="visible" // Trigger animation for each card when in view
            //   viewport={{ once: false, amount: 0.2 }} // 20% of the card in view to trigger animation
            //   whileHover="hover" // Trigger hover animation when hovered
            // >
            //   {/* Project Video (YouTube Embed) */}
            //   <motion.div
            //     className="w-full h-56"
            //     variants={videoVariants}
            //     initial="hidden"
            //     whileInView="visible"
            //     viewport={{ once: false, amount: 0.2 }}
            //     whileHover="hover"
            //   >
            //     <iframe
            //       width="100%"
            //       height="100%"
            //       src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
            //       title={project.title}
            //       frameBorder="0"
            //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            //       allowFullScreen
            //     />
            //   </motion.div>
            //   {/* Project Info */}
            //   <div className="p-6">
            //     <motion.h3
            //       className="text-2xl font-semibold mb-4 text-white"
            //       variants={textVariants}
            //     >
            //       {project.title}
            //     </motion.h3>
            //     {/* Description */}
            //     <motion.p
            //       className="text-gray-400 mb-6"
            //       variants={textVariants}
            //       transition={{ delay: 0.2 }}
            //     >
            //       {project.description}
            //     </motion.p>

            //     <motion.div
            //       className="flex space-x-4"
            //       variants={textVariants}
            //       transition={{ delay: 0.4 }}
            //     >
            //       <a
            //         href={project.github}
            //         target="_blank"
            //         rel="noopener noreferrer"
            //         className="text-gray-400 hover:text-white transition"
            //       >
            //         <FaGithub size={24} />
            //       </a>
            //       {/* <a
            //         href={project.live}
            //         target="_blank"
            //         rel="noopener noreferrer"
            //         className="text-gray-400 hover:text-white transition"
            //       >
            //         <FaExternalLinkAlt size={24} />
            //       </a> */}
            //     </motion.div>
            //   </div>
            // </motion.div>
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              variants={cardVariants}
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              whileHover="hover"
            >
              {/* Project Video (YouTube Embed) */}
              <div className="relative  w-full h-64 flex items-center justify-center">
                {videoIndex === index ? (
                  <motion.div
                    className="w-auto h-auto"
                    variants={videoVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    whileHover="hover"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </motion.div>
                ) : (
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    className="w-auto h-60 object-cover cursor-pointer"
                    onClick={() => handlePlayClick(index)}
                  />
                )}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    videoIndex === index ? "hidden" : ""
                  }`}
                >
                  {/* <button
                    className="bg-gray-900 text-white p-2 rounded-full"
                    onClick={() => handlePlayClick(index)}
                  >
                    ▶
                  </button> */}
                </div>
              </div>
              {/* Project Info */}
              <div className="p-6">
                <motion.h3
                  className="text-2xl font-semibold mb-4 text-white"
                  variants={textVariants}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-400 mb-6"
                  variants={textVariants}
                  transition={{ delay: 0.2 }}
                >
                  {project.description}
                </motion.p>

                <motion.div
                  className="flex space-x-4"
                  variants={textVariants}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <FaExternalLinkAlt size={24} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
