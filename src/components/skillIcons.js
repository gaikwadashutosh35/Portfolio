import {
  SiAngular, SiBootstrap, SiCplusplus, SiCss3, SiDocker, SiGit, SiGithub, SiGnubash, SiGraphql,
  SiHtml5, SiIntellijidea, SiJavascript, SiJsonwebtokens, SiMicrosoftsqlserver, SiMongodb, SiPython,
  SiReact, SiSalesforce, SiSap, SiSpringboot, SiSpringsecurity, SiTailwindcss, SiVuedotjs,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi, TbSql } from "react-icons/tb";
import { VscAzure, VscVscode } from "react-icons/vsc";

// One icon per skill name in src/data/portfolio.js (shared by Skills and TechMarquee).
const skillIcons = {
  Java: FaJava, JavaScript: SiJavascript, Python: SiPython, "C++": SiCplusplus, SQL: TbSql,
  HTML: SiHtml5, CSS: SiCss3, Bash: SiGnubash, React: SiReact, Angular: SiAngular, "Vue.js": SiVuedotjs,
  "Tailwind CSS": SiTailwindcss, Bootstrap: SiBootstrap, "Spring Boot": SiSpringboot,
  "Spring Security": SiSpringsecurity, "REST API": TbApi, GraphQL: SiGraphql, JWT: SiJsonwebtokens,
  "Microsoft SQL Server": SiMicrosoftsqlserver, MongoDB: SiMongodb, Azure: VscAzure, Docker: SiDocker,
  Git: SiGit, GitHub: SiGithub, Salesforce: SiSalesforce, SAP: SiSap, "IntelliJ IDEA": SiIntellijidea,
  "VS Code": VscVscode,
};

export default skillIcons;
