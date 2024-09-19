import React, { useState, useEffect, useRef } from "react";
import { Link, Element } from "react-scroll";
import { motion, useScroll, useSpring } from "framer-motion";
import "../ComponentsCSS/Header.css";

const sections = [
  { id: "hero", title: "Hero" },
  { id: "about", title: "About" },
  { id: "projects", title: "Projects" },
  { id: "skills", title: "Skills" },
  { id: "contact", title: "Contact" },
];

const NavItem = ({ section, isActive, onClick }) => (
  <motion.li
    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
    whileTap={{ scale: 0.95 }}
    className={`transition-transform ${
      isActive ? "text-white font-bold" : "text-gray-300"
    }`}
  >
    <Link
      to={section.id}
      smooth={true}
      duration={500}
      spy={true}
      className={`cursor-pointer px-4 py-2 rounded-full ${
        isActive
          ? "bg-white bg-opacity-20"
          : "hover:bg-white hover:bg-opacity-10"
      }`}
      onClick={onClick}
    >
      {section.title}
    </Link>
  </motion.li>
);
const menuVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2, // Delay each child animation
      delayChildren: 0.1, // Wait a moment before starting the animation
    },
  },
  closed: {
    opacity: 0.5,
    x: "100%",
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1, // Reverse the order when closing
    },
  },
};

const menuItemVariants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
  closed: {
    opacity: 1,
    x: 50, // Slide out to the right when closing
    transition: { duration: 0.5 },
  },
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSetActive = (to) => {
    setActiveSection(to);
    setMenuOpen(false);
  };

  const handleScrollCloseMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= windowHeight / 2 && bottom >= windowHeight / 2) {
            setActiveSection(section.id);
          }
        }
      });
    };

    handleScroll(); // Call initially to set the active section
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollCloseMenu); // Close menu on scroll
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollCloseMenu); // Clean up event listeners
    };
  }, [menuOpen]);
  const { scrollY } = useScroll();
  const backgroundColor = useSpring(scrollY, {
    stiffness: 300,
    damping: 30,
  });
  return (
    <motion.header
      className="header"
      style={{
        backgroundColor: scrollY > 50 ? "bg-gray-800" : "bg-gray-800",
        transition: "background-color 0.3s ease",
      }}
      initial={{ y: -20 }}
      animate={{ y: window.scrollY > 0 ? 0 : 10 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={`menuButton ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="bar"
          animate={{
            rotate: menuOpen ? 45 : 0,
            y: menuOpen ? 6 : 0,
            backgroundColor: menuOpen ? "#5a5656" : "#000",
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.div
          className="bar"
          animate={{
            opacity: menuOpen ? 0 : 1,
            backgroundColor: menuOpen ? "#5a5656" : "#000",
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.div
          className="bar"
          animate={{
            rotate: menuOpen ? -45 : 0,
            y: menuOpen ? -6 : 0,
            backgroundColor: menuOpen ? "#5a5656" : "#000",
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </motion.div>

      <motion.div
        className={`menu ${menuOpen ? "open" : ""}`}
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <ul>
          {sections.map((section) => {
            const isActive = activeSection === section.id; // Check if this section is active
            return (
              <motion.li
                key={section.id}
                className={`menu-item ${isActive ? "active" : ""}`} // Add "active" class if isActive is true
                variants={menuItemVariants} // Individual menu item animation
              >
                <a
                  href={`#${section.id}`}
                  onClick={() => {
                    setMenuOpen(false);
                    setActiveSection(section.id); // Set the active section on click
                  }}
                  className={isActive ? "active" : ""} // Optionally, add active class to anchor as well
                >
                  {section.title}
                </a>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </motion.header>
  );
};

export default Header;
