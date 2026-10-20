import React, { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { skillGroups } from "../data/portfolio";
import skillIcons from "./skillIcons";
import { EASE, SectionHeader, trackGlow } from "./ui";

// Bento spans on the 4-column desktop grid: two rows of 2+1+1 / 1+1+2.
const spans = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

const panel = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: (i % 3) * 0.08, delayChildren: 0.25 + (i % 3) * 0.08, staggerChildren: 0.045 },
  }),
};
const chip = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 420, damping: 26 } },
};
const icon = {
  hidden: { rotate: -90, scale: 0.4 },
  show: { rotate: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

// Ticks the group's item count up from 00 when the panel comes into view.
const Count = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? value : 0);
  const text = useTransform(count, (v) => String(Math.round(v)).padStart(2, "0"));
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(count, value, { duration: 0.9, ease: EASE, delay: 0.2 });
    return () => controls.stop();
  }, [inView, reduce, value, count]);
  return <motion.span ref={ref} className="font-mono text-xs tabular-nums text-subtle">{text}</motion.span>;
};

const Skills = () => (
  <section id="skills" className="section" aria-labelledby="skills-title">
    <div className="shell">
      <SectionHeader
        id="skills-title"
        index="04"
        eyebrow="Skills & tools"
        title={
          <>
            A practical, <em className="text-muted">full-stack toolkit.</em>
          </>
        }
        intro="The languages, frameworks and platforms I work with, grouped by where they sit in the stack."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.title}
            custom={i}
            variants={panel}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            onPointerMove={trackGlow}
            className={`glow-card p-6 sm:p-7 ${spans[i]}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-semibold tracking-tight text-ink">{g.title}</h3>
              <Count value={g.items.length} />
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => {
                const Icon = skillIcons[s];
                return (
                  <motion.li
                    key={s}
                    variants={chip}
                    whileHover={{ y: -2 }}
                    className="chip group/chip hover:border-accent/40 hover:bg-accent/[0.08] hover:text-ink"
                  >
                    {Icon && (
                      <motion.span variants={icon} className="inline-flex">
                        <Icon
                          aria-hidden="true"
                          className="shrink-0 text-[0.95rem] text-subtle transition-[color,transform] duration-base ease-out group-hover/chip:-rotate-6 group-hover/chip:scale-110 group-hover/chip:text-accent"
                        />
                      </motion.span>
                    )}
                    {s}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
