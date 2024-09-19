import React, { useState, useEffect } from "react";
import { FaDownload, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
const Contact = () => {
  const [isResumeOpen, setResumeOpen] = useState(false); // State to control modal

  // const handleDownloadClick = () => {
  //   window.location.href = "https://drive.google.com/file/d/13QF0tqkaAlacHTs3LyoFk5brQGilQjaD/view"; // Replace with your resume file path
  // };
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };
  const handleDownloadClick = () => {
    setResumeOpen(true); // Open modal when clicked
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/gaikwadashutosh35", "_blank"); // Replace with your GitHub URL
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/ashutosh-gaikwad-aa7335194/",
      "_blank"
    ); // Replace with your LinkedIn URL
  };

  const closeResume = () => {
    setResumeOpen(false); // Close modal
  };
  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset scroll on cleanup
    };
  }, [isResumeOpen]);
  return (
    <motion.section
      id="contact"
      className="h-auto flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.h2
          className="text-4xl font-bold mb-8 text-white"
          variants={buttonVariants}
        >
          Get in Touch
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-4"
          variants={buttonVariants}
        >
          <motion.button
            onClick={handleDownloadClick}
            className="flex items-center justify-center py-3 px-6 bg-gray-800 hover:bg-gray-700 rounded text-lg font-semibold text-white transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaDownload className="mr-2" />
            Download Resume
          </motion.button>

          <motion.button
            onClick={handleGitHubClick}
            className="flex items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded text-white transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaGithub className="text-2xl" />
          </motion.button>

          <motion.button
            onClick={handleLinkedInClick}
            className="flex items-center justify-center p-3 bg-gray-800 hover:bg-gray-700 rounded text-white transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FaLinkedin className="text-2xl" />
          </motion.button>
        </motion.div>
        {/* Resume Modal (Floating Window) */}
        {isResumeOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-gray-500 p-4 rounded-lg shadow-lg w-full max-w-4xl h-3/4 relative"
              initial={{ scale: 0.5, y: -100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Close button */}
              <button
                onClick={closeResume}
                className="absolute top-0.5 right-0.5 text-white text-4xl"
              >
                &times;
              </button>

              {/* Resume Display */}
              <iframe
                src="https://drive.google.com/file/d/13QF0tqkaAlacHTs3LyoFk5brQGilQjaD/preview"
                title="Resume"
                className="w-full h-full"
                allow="autoplay"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Contact;
