import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../ComponentsCSS/Skills.css";
import "animate.css";

const skills = [
  {
    name: "Java",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg",
    proficiency: 80,
  },
  {
    name: "Angular",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    proficiency: 60,
  },
  {
    name: "React",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
    proficiency: 80,
  },
  {
    name: "C++",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    proficiency: 50,
  },
  {
    name: "JavaScript",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg",
    proficiency: 90,
  },
  {
    name: "HTML",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    proficiency: 90,
  },
  {
    name: "CSS",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    proficiency: 90,
  },
  {
    name: "Python",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg",
    proficiency: 50,
  },
  {
    name: "GraphQL",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain-wordmark.svg",
    proficiency: 70,
  },
  {
    name: "SQL",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
    proficiency: 75,
  },
  {
    name: "MongoDB",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg",
    proficiency: 70,
  },
  {
    name: "Azure",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original-wordmark.svg",
    proficiency: 60,
  },
  {
    name: "REST API",
    imgSrc: "https://cdn.svgapi.com/vector/10073/api-page.svg",
    proficiency: 80,
  },
  {
    name: "Salesforce",
    imgSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg",
    proficiency: 40,
  },
  {
    name: "SAP",
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
    proficiency: 65,
  },
];
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2, // Delay between child elements
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};
const Skills = () => {
  const [flippedCard, setFlippedCard] = useState(null); // Track the flipped card index
  const [progressStart, setProgressStart] = useState(null); // Track which card should animate the progress bar

  const handleCardHover = (index) => {
    setFlippedCard(index); // Set the card to be flipped
    setProgressStart(null); // Reset progress before starting the animation
    setTimeout(() => {
      setProgressStart(index); // Start progress bar fill after the card has flipped
    }, 300); // Add a delay to simulate the flip animation
  };

  const handleCardLeave = () => {
    setFlippedCard(null); // Reset card flip on mouse leave
    setProgressStart(null); // Reset progress bar animation
  };

  const handleCardClick = (index) => {
    if (flippedCard === index) {
      setFlippedCard(null); // Reset flip if the same card is clicked again
      setProgressStart(null); // Reset progress bar
    } else {
      handleCardHover(index); // Flip and start progress
    }
  };

  return (
    <motion.section
      id="skills"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br py-20 bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Trigger animation once when in view
      variants={containerVariants} // Apply the container variants
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          My Skills
        </h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Trigger animation once when in view
          variants={containerVariants} // Apply the container variants
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`flip-card ${flippedCard === index ? "flipped" : ""}`}
              onMouseEnter={() => handleCardHover(index)} // Flip on hover
              onMouseLeave={handleCardLeave} // Unflip when mouse leaves
              onClick={() => handleCardClick(index)} // Flip on click for mobile
              variants={cardVariants} // Use card variants for animation
              whileHover={{ scale: 1.05 }} // Slight scale on hover
            >
              <div className="flip-card-inner">
                {/* Front side */}
                <div className="flip-card-front">
                  <img
                    src={skill.imgSrc}
                    alt={skill.name}
                    className="w-20 h-20 object-contain mb-2"
                  />
                  <p className="text-white text-lg font-medium">{skill.name}</p>
                </div>

                {/* Back side */}
                <div className="flip-card-back">
                  <p className="text-white">{skill.name} - Proficiency</p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width:
                          progressStart === index
                            ? `${skill.proficiency}%`
                            : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
