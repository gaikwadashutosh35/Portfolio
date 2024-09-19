import React from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { useMotionValue, useTransform } from "framer-motion";

// import { Particles } from "react-tsparticles";
// import { loadFull } from "tsparticles";
const Hero = () => {
  const scrollY = useMotionValue(0);
  const yTransform = useTransform(scrollY, [0, 500], [0, -100]);

  // const particlesInit = async (main) => {
  //   await loadFull(main);
  // };

  // const particlesOptions = {
  //   fullScreen: { enable: false },
  //   particles: {
  //     number: { value: 60 },
  //     size: { value: 3 },
  //     move: { enable: true, speed: 1 },
  //     opacity: { value: 0.7 },
  //     links: { enable: true, distance: 150, color: "#ffffff" },
  //     color: { value: "#00ff99" }, // Customize particle color
  //   },
  //   background: { color: "#000" },
  // };
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3, // Delay between child elements
      },
    },
  };

  // Text animation
  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  // Button hover animation
  const buttonVariants = {
    whileHover: { scale: 1.1, transition: { type: "spring", stiffness: 200 } },
  };

  return (
    <motion.section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-br"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Trigger animation once when in view
      variants={containerVariants} // Apply the container variants
    >
      {/* {" "}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0" // Ensure particles are behind content
      /> */}
      <div className="text-center px-4 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible" // Triggers the animation when in view
          viewport={{ once: false, amount: 0.3 }} // Customize when the animation starts
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delayChildren: 0.5, staggerChildren: 0.3 },
            },
          }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={textVariants} // Use text variants for animation
          >
            Hello, I'm Ashutosh Gaikwad
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            variants={textVariants} // Use text variants for animation
          >
            A passionate Web Developer
          </motion.p>
          <motion.div variants={buttonVariants}>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="px-8 py-4 bg-indigo-500 text-white rounded-full text-lg hover:bg-indigo-600 transition duration-300 cursor-pointer"
            >
              View My Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
