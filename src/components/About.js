import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import avatar from "../Assets/avatar.webp";
import avatarSmall from "../Assets/avatar-400.webp";
import { about, timeline } from "../data/portfolio";
import { Reveal, SectionHeader, useScrollValue } from "./ui";

const school = timeline.find((t) => t.type === "education");

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitY = useScrollValue(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={ref} className="section" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeader
          id="about-title"
          index="01"
          eyebrow="About"
          title={
            <>
              Computer engineer, <em className="text-muted">building for the web.</em>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
            <motion.figure style={{ y: portraitY }} className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-px rounded-panel bg-gradient-to-br from-accent/60 via-white/10 to-sky-400/30"
              />
              <div className="relative overflow-hidden rounded-panel bg-surface-1 p-2">
                <img
                  src={avatar}
                  srcSet={`${avatarSmall} 400w, ${avatar} 720w`}
                  sizes="(min-width: 640px) 368px, calc(100vw - 3rem)"
                  alt="Illustrated avatar of Ashutosh Gaikwad"
                  width="720"
                  height="720"
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full rounded-[1.4rem] object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between font-mono text-xs text-subtle">
                <span>{school.org}</span>
                <span>{school.period.replace(/\s/g, "")}</span>
              </figcaption>
            </motion.figure>
          </Reveal>

          <div>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 0.08} className="mb-5 text-lg leading-relaxed text-muted first:text-xl first:text-ink sm:first:text-2xl sm:first:leading-snug">
                {p}
              </Reveal>
            ))}

            <Reveal delay={0.15} className="mt-10">
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle">Where I focus</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.focus.map((f) => (
                  <li key={f} className="chip text-ink">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {about.highlights.map((h, i) => (
                <Reveal key={h.label} delay={0.2 + i * 0.07} className="rounded-card border border-line bg-surface-1 p-5 shadow-card transition-colors duration-base hover:border-line-strong">
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">{h.label}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ink">{h.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
