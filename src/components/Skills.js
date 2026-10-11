import React from "react";
import {
  SiAngular, SiBootstrap, SiCplusplus, SiCss3, SiDocker, SiGit, SiGithub, SiGnubash, SiGraphql,
  SiHtml5, SiIntellijidea, SiJavascript, SiJsonwebtokens, SiMicrosoftsqlserver, SiMongodb, SiPython,
  SiReact, SiSalesforce, SiSap, SiSpringboot, SiSpringsecurity, SiTailwindcss, SiVuedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi, TbSql } from "react-icons/tb";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { skillGroups } from "../data/portfolio";
import { Reveal, SectionHeader, trackGlow } from "./ui";

const icons = {
  Java: FaJava, JavaScript: SiJavascript, Python: SiPython, "C++": SiCplusplus, SQL: TbSql,
  HTML: SiHtml5, CSS: SiCss3, Bash: SiGnubash, React: SiReact, Angular: SiAngular, "Vue.js": SiVuedotjs,
  "Tailwind CSS": SiTailwindcss, Bootstrap: SiBootstrap, "Spring Boot": SiSpringboot,
  "Spring Security": SiSpringsecurity, "REST API": TbApi, GraphQL: SiGraphql, JWT: SiJsonwebtokens,
  "Microsoft SQL Server": SiMicrosoftsqlserver, MongoDB: SiMongodb, Azure: VscAzure, Docker: SiDocker,
  Git: SiGit, GitHub: SiGithub, Salesforce: SiSalesforce, SAP: SiSap, "IntelliJ IDEA": SiIntellijidea,
  "VS Code": VscVscode,
};

// Bento spans on the 4-column desktop grid: two rows of 2+1+1 / 1+1+2.
const spans = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Reveal
            key={g.title}
            delay={(i % 3) * 0.06}
            onPointerMove={trackGlow}
            className={`glow-card p-6 sm:p-7 ${spans[i]}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-semibold tracking-tight text-ink">{g.title}</h3>
              <span className="font-mono text-xs text-subtle">{String(g.items.length).padStart(2, "0")}</span>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.items.map((s) => {
                const Icon = icons[s];
                return (
                  <li key={s} className="chip group/chip hover:border-accent/40 hover:bg-accent/[0.08] hover:text-ink">
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className="shrink-0 text-[0.95rem] text-subtle transition-[color,transform] duration-base ease-out group-hover/chip:-rotate-6 group-hover/chip:scale-110 group-hover/chip:text-accent"
                      />
                    )}
                    {s}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
