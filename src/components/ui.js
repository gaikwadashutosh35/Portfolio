import React from "react";
import { motion } from "framer-motion";

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

export const SectionHeader = ({ index, eyebrow, title, intro, id }) => (
  <Reveal className="mb-12 max-w-2xl sm:mb-16">
    <p className="eyebrow">
      <span className="text-subtle">{index}</span>
      <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
      {eyebrow}
    </p>
    <h2 id={id} className="section-title mt-5">
      {title}
    </h2>
    {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
  </Reveal>
);

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
