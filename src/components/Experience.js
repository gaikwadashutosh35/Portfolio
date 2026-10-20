import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiBookOpen, FiBriefcase } from "react-icons/fi";
import { timeline } from "../data/portfolio";
import { Reveal, SectionHeader } from "./ui";

const Experience = () => {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeader
          id="experience-title"
          index="03"
          eyebrow="Experience & education"
          title={
            <>
              The path <em className="text-muted">so far.</em>
            </>
          }
        />

        <div ref={listRef} className="relative ml-5 max-w-3xl sm:ml-6">
          <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute bottom-2 left-0 top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-sky-400/40"
          />
          <ol>
          {timeline.map((t, i) => {
            const Icon = t.type === "education" ? FiBookOpen : FiBriefcase;
            return (
              <Reveal as="li" key={t.title} delay={i * 0.08} className="relative pb-12 pl-10 last:pb-0 sm:pl-14">
                <span className="absolute -left-5 top-0 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface-2 text-accent shadow-card">
                  <Icon aria-hidden="true" size={16} />
                </span>
                <div className="rounded-card border border-line bg-surface-1 p-6 shadow-card transition-colors duration-base hover:border-line-strong sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      {t.type === "education" ? "Education" : "Experience"}
                    </p>
                    <p className="font-mono text-sm text-muted">{t.period}</p>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">{t.title}</h3>
                  <p className="mt-1 text-muted">{t.org}</p>
                  <p className="mt-4 leading-relaxed text-muted">{t.description}</p>
                </div>
              </Reveal>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Experience;
