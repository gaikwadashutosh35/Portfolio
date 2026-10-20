import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { links, projects } from "../data/portfolio";
import { ExternalLink, Reveal, SectionHeader, trackGlow, useScrollValue } from "./ui";

// Abstract illustrations of each product idea. These are deliberately stylised
// (and labelled) so they are never mistaken for real screenshots.
const BoardVisual = () => {
  const columns = [
    { name: "To do", cards: [70, 48, 60] },
    { name: "In progress", cards: [56, 80] },
    { name: "Done", cards: [64, 40, 52] },
  ];
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-5 sm:p-6">
      {columns.map((col, c) => (
        <div key={col.name} className="flex flex-col gap-2.5 rounded-xl bg-white/[0.03] p-2.5">
          <div className="flex items-center gap-1.5 px-1 font-mono text-[0.625rem] uppercase tracking-wider text-subtle">
            <span className={`h-1.5 w-1.5 rounded-full ${["bg-subtle", "bg-accent", "bg-emerald-400"][c]}`} />
            {col.name}
          </div>
          {col.cards.map((w, i) => (
            <div
              key={i}
              className="rounded-lg border border-line bg-surface-2 p-2.5 transition-transform duration-slow ease-out group-hover:-translate-y-0.5"
              style={{ transitionDelay: `${(c * 3 + i) * 30}ms` }}
            >
              <div className="h-1.5 rounded-full bg-white/20" style={{ width: `${w}%` }} />
              <div className="mt-2 h-1.5 w-2/5 rounded-full bg-white/10" />
              <div className="mt-3 flex -space-x-1">
                {Array.from({ length: (i % 2) + 1 }).map((_, k) => (
                  <span key={k} className="h-3.5 w-3.5 rounded-full border border-surface-2 bg-gradient-to-br from-accent/80 to-sky-400/60" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ChartVisual = () => {
  const candles = [38, 46, 41, 55, 50, 62, 58, 70, 64, 76, 72, 84];
  return (
    <div className="flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-1.5 w-16 rounded-full bg-white/15" />
          <div className="h-3 w-28 rounded-full bg-white/30" />
        </div>
        <div className="flex gap-1.5">
          {["1D", "1W", "1M"].map((t, i) => (
            <span key={t} className={`rounded-md px-2 py-1 font-mono text-[0.625rem] ${i === 1 ? "bg-accent/20 text-accent-soft" : "text-subtle"}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 240 110" className="mt-4 w-full flex-1" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(139 141 255)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(139 141 255)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M0 110 ${candles.map((v, i) => `L${i * 20 + 10} ${110 - v}`).join(" ")} L240 110 Z`}
          fill="url(#area)"
        />
        {candles.map((v, i) => {
          const up = i === 0 || v >= candles[i - 1];
          const x = i * 20 + 10;
          return (
            <g key={i} className={up ? "text-emerald-400" : "text-rose-400"}>
              <line x1={x} x2={x} y1={110 - v - 9} y2={110 - v + 12} stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
              <rect x={x - 4} y={110 - v - 4} width="8" height="12" rx="1.5" fill="currentColor" fillOpacity="0.85" />
            </g>
          );
        })}
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-line bg-surface-2 p-2">
            <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
            <div className="mt-2 h-2 w-3/4 rounded-full bg-white/25" />
          </div>
        ))}
      </div>
    </div>
  );
};

const visuals = { board: BoardVisual, chart: ChartVisual };

const ProjectCard = ({ project, index }) => {
  const Visual = visuals[project.visual];
  const flip = index % 2 === 1;
  const ref = useRef(null);

  // Entrance is scrubbed by scroll position (not time), springed so it never feels jumpy.
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.5"] });
  const eased = useSpring(enter, { stiffness: 160, damping: 32, mass: 0.4 });
  const scale = useScrollValue(eased, [0, 1], [0.9, 1]);
  const rotateX = useScrollValue(eased, [0, 1], [12, 0]);
  const opacity = useScrollValue(eased, [0, 0.7], [0.15, 1]);
  // Illustration drifts inside its frame while the card passes through the viewport.
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const visualY = useScrollValue(pass, [0, 1], ["-5%", "5%"]);

  return (
    <motion.article
      ref={ref}
      style={{ scale, rotateX, opacity, transformOrigin: "50% 0%" }}
      className="glow-card group"
      onPointerMove={trackGlow}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="grid overflow-hidden rounded-card lg:grid-cols-2">
        <div className={`relative border-b border-line bg-surface-2/60 lg:flex lg:items-center lg:border-b-0 ${flip ? "lg:order-2 lg:border-l" : "lg:border-r"}`}>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--c-accent)/0.16),transparent_60%)]"
          />
          <div className="relative m-4 flex-1 overflow-hidden rounded-xl border border-line-strong bg-surface-1 shadow-lift sm:m-8">
            <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-wider text-subtle">Illustration</span>
            </div>
            <div aria-hidden="true" className="aspect-[16/10] transition-transform duration-slow ease-out group-hover:scale-[1.03]">
              <motion.div style={{ y: visualY, scale: 1.1 }} className="h-full">
                <Visual />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex items-center gap-3 font-mono text-xs text-subtle">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            {project.kind}
          </div>
          <h3 id={`${project.id}-title`} className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">Purpose</dt>
              <dd className="mt-1.5 leading-relaxed text-ink/90">{project.purpose}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">My role</dt>
              <dd className="mt-1.5 leading-relaxed text-ink/90">{project.role}</dd>
            </div>
          </dl>

          <ul className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <FiCheck aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.stack.map((t) => (
              <li key={t} className="chip !py-1 !text-xs">
                {t}
              </li>
            ))}
          </ul>

          {project.github && (
            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <ExternalLink href={project.github} className="btn-ghost">
                <FaGithub aria-hidden="true" /> View source
                <FiArrowUpRight aria-hidden="true" className="btn-icon btn-icon-x" />
                <span className="sr-only"> for {project.title} (opens in a new tab)</span>
              </ExternalLink>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="section" aria-labelledby="projects-title">
    <div className="shell">
      <SectionHeader
        id="projects-title"
        index="02"
        eyebrow="Selected work"
        title={
          <>
            Full-stack projects, <em className="text-muted">end to end.</em>
          </>
        }
        intro="Two applications where I built both the React frontend and the Spring Boot backend — from authentication to real-time features."
      />
      <div className="flex flex-col gap-8 sm:gap-10" style={{ perspective: 1400 }}>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
      <Reveal className="mt-12 flex justify-center">
        <ExternalLink href={links.github} className="link-underline min-h-[1.5rem] font-mono text-sm">
          More on GitHub <FiArrowUpRight aria-hidden="true" />
        </ExternalLink>
      </Reveal>
    </div>
  </section>
);

export default Projects;
