import React from "react";
import { skillGroups } from "../data/portfolio";
import TechMarquee from "./TechMarquee";
import { SectionHeader } from "./ui";

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
        intro="The languages, frameworks and platforms I work with."
      />
    </div>
    <TechMarquee />
    {/* The marquee is aria-hidden, so name the skills for screen readers and crawlers. */}
    <ul className="sr-only">
      {skillGroups.flatMap((g) => g.items).map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ul>
  </section>
);

export default Skills;
