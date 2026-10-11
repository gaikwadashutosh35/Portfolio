// All portfolio content lives here so copy can change without touching layout.
// Sources: the deployed site (gh-pages, Oct 2024), the original components in
// this repo, and the public ProjectManagementSystem README. Nothing here is invented.

export const profile = {
  name: "Ashutosh Gaikwad",
  title: "Full-Stack Web Developer",
  location: "India",
  headline:
    "I build full-stack web applications — React interfaces on top of secure Java and Spring Boot APIs.",
  summary:
    "A Computer Engineering graduate skilled in JavaScript and Java, with experience in ReactJS, Angular, and cloud platforms like Azure. Expertise in API development, database management, and automation tools.",
};

export const links = {
  github: "https://github.com/gaikwadashutosh35",
  linkedin: "https://www.linkedin.com/in/ashutosh-gaikwad-aa7335194/",
  resumePreview:
    "https://drive.google.com/file/d/1aYMjd3WrEKwwYWOSg9HRQpU3fsTPLoSa/preview",
  resumeDownload:
    "https://drive.google.com/uc?export=download&id=1aYMjd3WrEKwwYWOSg9HRQpU3fsTPLoSa",
};

export const about = {
  paragraphs: [
    profile.summary,
    "Over 3 years of experience in web development, focusing on full-stack technologies and project management.",
  ],
  focus: ["API development", "Database management", "Automation tools"],
  highlights: [
    { label: "Frontend", value: "React · Angular · Tailwind CSS" },
    { label: "Backend", value: "Java · Spring Boot · REST APIs" },
    { label: "Cloud & data", value: "Azure · SQL · MongoDB" },
  ],
};

export const timeline = [
  {
    type: "experience",
    title: "Technical Service Trainee",
    org: "Fujitsu Consulting India Pvt. Ltd.",
    period: "2022 — Present",
    description:
      "Web development with a focus on full-stack technologies and project management.",
  },
  {
    type: "education",
    title: "Bachelor of Engineering, Computer Engineering",
    org: "Pune Institute of Computer Technology",
    period: "2017 — 2021",
    description:
      "Majored in Computer Engineering. Acquired fundamental skills in software development and computer systems.",
  },
];

export const projects = [
  {
    id: "pms",
    title: "Project Task Management System",
    kind: "Full-stack · Collaboration",
    description:
      "A full-stack project management system built with ReactJS and Spring Boot. Teams create projects, invite members, and talk in real-time chat, with Spring Security and JWT protecting every request.",
    purpose:
      "Gives teams one place to manage tasks, onboard collaborators and resolve issues quickly.",
    role: "Built both the frontend and the backend.",
    highlights: [
      "Project creation, search and filtering",
      "Email invitations for team members",
      "Real-time team chat",
      "Free, monthly and annual subscription plans",
    ],
    stack: ["React", "Spring Boot", "Spring Security", "JWT", "Tailwind CSS", "shadcn/ui"],
    github: "https://github.com/gaikwadashutosh35/ProjectManagementSystem",
    visual: "board",
  },
  {
    id: "crypto",
    title: "Crypto Trading Platform",
    kind: "Full-stack · Fintech",
    description:
      "A full-stack cryptocurrency trading platform built with Spring Boot and React, featuring wallet management, two-factor authentication and an AI chatbot for real-time data.",
    purpose:
      "Brings market information from the CoinGecko API together with trading and community giveaways.",
    role: "Built both the frontend and the backend.",
    highlights: [
      "Wallet management",
      "Two-factor authentication",
      "AI chatbot for real-time market data",
      "CoinGecko API integration",
    ],
    stack: ["React", "Spring Boot", "CoinGecko API", "2FA"],
    // The previous link (github.com/gaikwadashutosh35/Crypto-Trading-Platform)
    // returns 404 — restore it here once the repository is public again.
    github: null,
    visual: "chart",
  },
];

// Grouped from the skills listed on the deployed site; Spring Boot / Spring
// Security / JWT come from the project descriptions above.
export const skillGroups = [
  { title: "Languages", items: ["Java", "JavaScript", "Python", "C++", "SQL", "HTML", "CSS", "Bash"] },
  { title: "Frontend", items: ["React", "Angular", "Vue.js", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend & APIs", items: ["Spring Boot", "Spring Security", "REST API", "GraphQL", "JWT"] },
  { title: "Databases", items: ["Microsoft SQL Server", "MongoDB"] },
  { title: "Cloud & DevOps", items: ["Azure", "Docker", "Git", "GitHub"] },
  { title: "Platforms & tools", items: ["Salesforce", "SAP", "IntelliJ IDEA", "VS Code"] },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
