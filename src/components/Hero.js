import React, { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { links, profile, timeline } from "../data/portfolio";
import { EASE, ExternalLink } from "./ui";

const stack = ["React", "Angular", "Java", "Spring Boot", "Azure"];
const job = timeline.find((t) => t.type === "experience");
const school = timeline.find((t) => t.type === "education");

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const Str = ({ children }) => <span className="text-emerald-300">"{children}"</span>;
const Key = ({ children }) => <span className="text-sky-300">{children}</span>;

const CodeCard = () => {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="float-slow" style={{ perspective: 1000 }}>
      <motion.figure
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-panel border border-line-strong bg-surface-1/80 shadow-lift backdrop-blur"
        aria-label="Profile summary written as a code snippet"
      >
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="h-3 w-3 rounded-full bg-white/10" />
          <span className="ml-3 font-mono text-xs text-subtle">developer.js</span>
        </div>
        <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-7 text-muted">
          <code>
            <span className="text-accent">const</span> <span className="text-ink">developer</span> = {"{"}
            {"\n  "}<Key>name</Key>: <Str>{profile.name}</Str>,
            {"\n  "}<Key>role</Key>: <Str>{job.title}</Str>,
            {"\n  "}<Key>company</Key>: <Str>Fujitsu Consulting India</Str>,
            {"\n  "}<Key>education</Key>: <Str>B.E. Computer Eng., PICT</Str>,
            {"\n  "}<Key>stack</Key>: [
            {stack.map((s, i) => (
              <React.Fragment key={s}>
                {i % 3 === 0 ? "\n    " : " "}
                <Str>{s}</Str>
                {i < stack.length - 1 ? "," : ""}
              </React.Fragment>
            ))}
            {"\n  ],\n};"}
          </code>
        </pre>
        <figcaption className="sr-only">
          {profile.name}, {job.title} at {job.org}; {school.title}, {school.org}.
        </figcaption>
      </motion.figure>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);

  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--sx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-[calc(var(--header-h)+3rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-a" />
        <div className="aurora aurora-b" />
        <div className="hero-grid absolute inset-0" />
        <div className="hero-spotlight absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.title} · {profile.location}
          </motion.p>

          <motion.h1
            variants={item}
            id="hero-title"
            className="mt-6 font-display text-[clamp(3.25rem,11vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
          >
            Ashutosh <em className="text-gradient pr-2 not-italic sm:italic">Gaikwad</em>
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-xl text-xl leading-snug text-ink sm:text-2xl">
            {profile.headline}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Currently a {job.title} at {job.org.replace(" Pvt. Ltd.", "")}. Computer Engineering
            graduate from {school.org}, working across React, Angular, Java and Azure.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary">
              View projects <FiArrowRight aria-hidden="true" className="btn-icon btn-icon-x" />
            </a>
            <a href={links.resumeDownload} className="btn-ghost">
              Download resume <FiArrowDown aria-hidden="true" className="btn-icon btn-icon-y" />
            </a>
            <div className="flex items-center gap-2 sm:ml-2">
              <ExternalLink href={links.github} className="icon-btn" aria-label="GitHub profile">
                <FaGithub size={18} />
              </ExternalLink>
              <ExternalLink href={links.linkedin} className="icon-btn" aria-label="LinkedIn profile">
                <FaLinkedinIn size={17} />
              </ExternalLink>
            </div>
          </motion.div>

          <motion.ul variants={item} className="mt-10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-subtle lg:hidden">
            {stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.45 }}
        >
          <CodeCard />
        </motion.div>
      </div>

      <a
        href="#about"
        className="group absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-subtle transition-colors hover:text-ink [@media(min-width:640px)_and_(min-height:820px)]:flex"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em]">Scroll</span>
        <span className="relative h-9 w-5 rounded-full border border-line-strong">
          <span className="scroll-dot absolute left-[calc(50%-2px)] top-1.5 h-1.5 w-1 rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
};

export default Hero;
