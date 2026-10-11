import React from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

// Fades content up once when it enters the viewport. Opacity + transform only.
export const Reveal = ({ as = "div", delay = 0, y = 24, className, children, ...rest }) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// The title rises out of a clipping mask; the eyebrow rule draws in first.
// whileInView sits on the parent because a fully clipped child never "intersects".
const header = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const rule = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } } };
const rise = { hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1.1, ease: EASE } } };
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };

export const SectionHeader = ({ index, eyebrow, title, intro, id }) => (
  <motion.div
    className="mb-12 max-w-2xl sm:mb-16"
    variants={header}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.5 }}
  >
    <motion.p variants={fade} className="eyebrow">
      <span className="text-subtle">{index}</span>
      <motion.span variants={rule} aria-hidden="true" className="h-px w-6 origin-left bg-accent/50" />
      {eyebrow}
    </motion.p>
    <h2 id={id} className="section-title mt-5 overflow-hidden pb-2">
      <motion.span variants={rise} className="block">
        {title}
      </motion.span>
    </h2>
    {intro && (
      <motion.p variants={fade} className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
        {intro}
      </motion.p>
    )}
  </motion.div>
);

// Scroll-linked value that switches itself off for reduced-motion users.
export const useScrollValue = (progress, input, output) => {
  const reduce = useReducedMotion();
  const value = useTransform(progress, input, output);
  return reduce ? undefined : value;
};

// Pointer position -> CSS vars consumed by .glow-card::before
export const trackGlow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export const ExternalLink = ({ href, children, ...rest }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
);
