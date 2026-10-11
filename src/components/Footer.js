import React from "react";
import { FiArrowUp } from "react-icons/fi";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { links, profile } from "../data/portfolio";
import { ExternalLink } from "./ui";

const Footer = () => (
  <footer className="border-t border-line">
    <div className="shell flex flex-col items-center justify-between gap-6 py-10 text-sm text-muted sm:flex-row">
      <p>
        &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
      <div className="flex items-center gap-2">
        <ExternalLink href={links.github} className="icon-btn" aria-label="GitHub profile">
          <FaGithub size={16} />
        </ExternalLink>
        <ExternalLink href={links.linkedin} className="icon-btn" aria-label="LinkedIn profile">
          <FaLinkedinIn size={15} />
        </ExternalLink>
        <a href="#home" className="icon-btn" aria-label="Back to top">
          <FiArrowUp size={16} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
