// Resolves react-icons component names (stored as strings in the DB)
// into actual components for rendering.

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaFigma,
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaAward,
  FaAws,
  FaJava,
} from "react-icons/fa";
import {
  SiDjango,
  SiMongodb,
  SiTailwindcss,
  SiThreedotjs,
  SiFirebase,
  SiVite,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGithub,
  SiFigma,
  SiFastify,
  SiPostgresql,
  SiNextdotjs,
  SiPrisma,
  SiDocker,
  SiGit,
  SiRedux,
  SiRedis,
  SiMysql,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiSocketdotio,
  SiVercel,
  SiNetlify,
  SiLinux,
  SiNginx,
  SiGithubactions,
  SiJsonwebtokens,
  SiC,
  SiCplusplus,
  SiOpenai,
  SiAxios,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandReact, TbDatabase } from "react-icons/tb";
import { GiDiploma, GiBrain } from "react-icons/gi";

const ICONS = {
  // Fa
  FaReact,
  FaNodeJs,
  FaPython,
  FaFigma,
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaAward,
  FaAws,
  FaJava,
  // Si
  SiDjango,
  SiMongodb,
  SiTailwindcss,
  SiThreedotjs,
  SiFirebase,
  SiVite,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiGithub,
  SiFigma,
  SiFastify,
  SiPostgresql,
  SiNextdotjs,
  SiPrisma,
  SiDocker,
  SiGit,
  SiRedux,
  SiRedis,
  SiMysql,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiSocketdotio,
  SiVercel,
  SiNetlify,
  SiLinux,
  SiNginx,
  SiGithubactions,
  SiJsonwebtokens,
  SiC,
  SiCplusplus,
  SiOpenai,
  SiAxios,
  // Tb
  TbBrandNextjs,
  TbBrandReact,
  TbDatabase,
  // Gi
  GiDiploma,
  GiBrain,
};

// Returns a rendered icon element for a given name, or null.
export function renderIcon(name, props = {}) {
  const Icon = ICONS[name];
  return Icon ? <Icon {...props} /> : null;
}

export function getIconComponent(name) {
  return ICONS[name] || null;
}
