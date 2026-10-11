import React, { useRef, useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiFileText, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { links } from "../data/portfolio";
import { ExternalLink, Reveal, SectionHeader, trackGlow } from "./ui";

const channels = [
  {
    label: "LinkedIn",
    detail: "Message me directly",
    href: links.linkedin,
    Icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    detail: "@gaikwadashutosh35",
    href: links.github,
    Icon: FaGithub,
  },
];

const Contact = () => {
  const dialogRef = useRef(null);
  const [resumeLoaded, setResumeLoaded] = useState(false);

  // Native <dialog>: focus containment, Escape-to-close and an inert page come for free.
  const openResume = () => {
    setResumeLoaded(true);
    dialogRef.current?.showModal();
  };
  const closeResume = () => dialogRef.current?.close();

  return (
    <section id="contact" className="section pb-16" aria-labelledby="contact-title">
      <div className="shell">
        <div className="relative overflow-hidden rounded-panel border border-line bg-surface-1 px-6 py-14 shadow-lift sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] max-w-[150%] -translate-x-1/2 rounded-full bg-accent-strong/25 blur-[100px]"
          />
          <div className="relative">
            <SectionHeader
              id="contact-title"
              index="05"
              eyebrow="Contact"
              title={
                <>
                  Let’s build something <em className="text-gradient">useful.</em>
                </>
              }
              intro="Have a role, a project or a question? Reach out on LinkedIn, browse my code on GitHub, or grab my resume."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {channels.map(({ label, detail, href, Icon }, i) => (
                <Reveal key={label} delay={i * 0.06} className="glow-card bg-surface-2/60" onPointerMove={trackGlow}>
                  <ExternalLink
                    href={href}
                    className="group flex h-full items-center gap-4 rounded-card p-5 sm:p-6"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-3 text-ink transition-colors duration-base group-hover:border-accent/50 group-hover:text-accent">
                      <Icon aria-hidden="true" size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{label}</span>
                      <span className="block truncate text-sm text-muted">{detail}</span>
                    </span>
                    <FiArrowUpRight
                      aria-hidden="true"
                      className="shrink-0 text-subtle transition-[transform,color] duration-base ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ExternalLink>
                </Reveal>
              ))}

              <Reveal delay={0.12} className="glow-card bg-surface-2/60 p-5 sm:p-6" onPointerMove={trackGlow}>
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-3 text-ink">
                    <FiFileText aria-hidden="true" size={18} />
                  </span>
                  <span>
                    <span className="block font-medium text-ink">Resume</span>
                    <span className="block text-sm text-muted">PDF via Google Drive</span>
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={openResume} className="btn-ghost !min-h-[2.5rem] flex-1 !px-3 !text-sm">
                    Preview
                  </button>
                  <a href={links.resumeDownload} className="btn-primary !min-h-[2.5rem] flex-1 !px-3 !text-sm">
                    Download <FiArrowDown aria-hidden="true" className="btn-icon btn-icon-y" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="resume-dialog"
        aria-labelledby="resume-title"
        onClick={(e) => e.target === e.currentTarget && closeResume()}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <h2 id="resume-title" className="font-medium text-ink">
              Resume — Ashutosh Gaikwad
            </h2>
            <div className="flex items-center gap-2">
              <a href={links.resumeDownload} className="btn-ghost hidden !min-h-[2.25rem] !px-3 !text-sm sm:inline-flex">
                Download <FiArrowDown aria-hidden="true" />
              </a>
              <button type="button" onClick={closeResume} className="icon-btn !h-9 !w-9" aria-label="Close resume preview">
                <FiX size={18} />
              </button>
            </div>
          </div>
          {resumeLoaded && (
            <iframe src={links.resumePreview} title="Resume preview" className="w-full flex-1 bg-surface-2" allow="autoplay" />
          )}
        </div>
      </dialog>
    </section>
  );
};

export default Contact;
