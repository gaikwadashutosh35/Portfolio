import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import React, { useEffect } from "react"; 
import { motion, useScroll, useSpring } from "framer-motion";
import { Element } from "react-scroll"; 
import { Link } from "react-scroll";
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gray-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const App = () => {
  useEffect(() => {
    const smoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    };
    // Attach smooth scroll behavior to all anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", smoothScroll);
    });

    // Cleanup the event listeners when the component unmounts
    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", smoothScroll);
      });
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <ScrollProgressBar />

      <main>
        <Element name="hero">
          <Hero />
        </Element>
        <Element name="about">
          <About />
        </Element>
        <Element name="projects">
          <Projects />
        </Element>
        <Element name="skills">
          <Skills />
        </Element>
        <Element name="contact">
          <Contact />
        </Element>
      </main>
      <Footer />
    </div>
  );
};

export default App;
