import React from "react";
import { motion, useInView } from "framer-motion";
import boyImage from "../Assets/A Boy 2.jpg";
const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3, // Delay between child elements
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const progressVariants = {
    hidden: { height: "0%" },
    visible: { height: "100%", transition: { duration: 1.5 } },
  };

  return (
    <motion.section
      id="about"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br py-20 bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Trigger animation once when in view
      variants={containerVariants} // Apply the container variants
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6 text-center text-white"
          variants={textVariants} // Apply the text variants to animate on scroll
        >
          About Me
        </motion.h2>
        <div className="container bg-gray-700 py-8 px-6 sm:py-12 rounded-xl shadow-lg ">
          <div className="flex flex-col md:flex-row items-center ">
            {/* Image Animation */}
            <motion.div
              className="w-full md:w-1/2 mb-6 md:mb-0"
              variants={imageVariants} // Apply the image animation on scroll
            >
              <img
                src={boyImage}
                alt="About me"
                className="rounded-full shadow-lg mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60"
              />
            </motion.div>

            {/* Text Animation */}
            <motion.div
              className="w-full md:w-1/2 md:pl-12"
              variants={textVariants}
            >
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                scelerisque aliquam odio et faucibus. Proin eget urna varius,
                gravida purus sit amet, mattis enim.
              </p>
              <p className="text-base sm:text-lg text-white leading-relaxed mt-4">
                Fusce porta tincidunt justo, non tincidunt felis sagittis eget.
                Vivamus nec commodo turpis. Donec scelerisque condimentum
                mauris, sed tempor arcu ultrices eu.
              </p>
            </motion.div>
          </div>
        </div>
        <div
          className="flex flex-col ml-0 md:ml-36 md:flex-row items-center justify-center
        mt-12 md:mt-16"
        >
          <div className="md:w-1/2 space-y-12">
            {/* Education Section */}
            <motion.div
              className="flex flex-row md:flex-row items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="flex mr-0 md:mr-8 md:w-1/4 items-start mb-4 md:mb-0">
                <motion.p
                  className="text-md md:text-lg text-white mb-2"
                  variants={textVariants}
                >
                  Bachelor of Engineering (Computer Engineering)
                </motion.p>
              </div>

              <div className="relative ml-4 w-2 h-48  border-2 border-white flex-shrink-0">
                <div className="absolute mx-4 top-0 w-full text-center text-gray-400 text-xs md:text-sm">
                  2017
                </div>
                <div className="absolute mx-4 bottom-0 w-full text-center text-gray-400 text-xs md:text-sm">
                  2021
                </div>
                <motion.div
                  className="absolute top-0 left-0 w-full bg-indigo-500"
                  variants={progressVariants}
                  initial="hidden"
                  whileInView="visible"
                />
              </div>

              <motion.p
                className="text-md md:text-lg text-white md:w-3/4 ml-4"
                variants={textVariants}
              >
                Completed in 2021, majoring in Computer Engineering. Acquired
                fundamental skills in software development and computer systems.
              </motion.p>
            </motion.div>

            {/* Experience Section */}
            <motion.div
              className="flex flex-row items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="flex mr-3.5 md:mr-8 w-1/4 items-start mb-4 md:mb-0">
                <motion.p
                  className="text-md md:text-lg text-white mb-2"
                  variants={textVariants}
                >
                  Fujitsu Consulting India
                </motion.p>
              </div>

              <div className="relative w-2 ml-4  h-48 border-2 border-white flex-shrink-0">
                <div className="absolute mx-4  top-0 w-full text-center text-gray-400 text-xs md:text-sm">
                  2022
                </div>
                <div className="absolute mx-4  bottom-0 w-full text-center text-gray-400 text-xs md:text-sm">
                  Present
                </div>
                <motion.div
                  className="absolute top-0 left-0 w-full bg-green-500"
                  variants={progressVariants}
                  initial="hidden"
                  whileInView="visible"
                />
              </div>

              <motion.p
                className="text-md  md:text-lg text-white md:w-3/4 ml-4"
                variants={textVariants}
              >
                Over 3 years of experience in web development, focusing on
                full-stack technologies and project management.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
