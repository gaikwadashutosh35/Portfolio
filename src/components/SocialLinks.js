// SocialLinks.js
import React from "react";
import "../ComponentsCSS/SocialLinks.css"; // Make sure to create this CSS file
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
const SocialLinks = () => {
  return (
    <div className="social-links">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-white transition"
      >
        <FaGithub size={24} />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-white transition"
      >
        <FaLinkedin size={24} />
      </a>
      <a
        href="path/to/your-resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="social-link resume"
      >
        <FaFileDownload size={24} />
        Resume
      </a>
    </div>
  );
};

export default SocialLinks;
