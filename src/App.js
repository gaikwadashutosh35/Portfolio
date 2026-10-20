import React, { useEffect } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent-strong via-accent to-sky-400"
      style={{ scaleX }}
    />
  );
};

// Inertial wheel scrolling. Touch keeps native scrolling (Lenis default) and
// users who ask for reduced motion get the browser's own scrolling.
const useSmoothScroll = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, []);
};

const App = () => {
  useSmoothScroll();
  return (
    // reducedMotion="user": Motion drops transform animations when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <ScrollProgressBar />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
};

export default App;
