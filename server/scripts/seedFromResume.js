// Populates Experience, Skills and Education from the resume.
// This REPLACES the contents of those three collections (clean set).
// Run with:  npm run seed:resume
//
// Projects are left untouched (managed separately via seed:projects / admin).

import mongoose from "mongoose";
import { connectDB } from "../db.js";
import { Experience } from "../models/Experience.js";
import { Skill } from "../models/Skill.js";
import { Education } from "../models/Education.js";

const experiences = [
  {
    title: "Junior Software Engineer",
    company: "NAFCORP Technologies",
    location: "Remote",
    period: "Jul 2026 – Present",
    type: "Full-time",
    color: "from-blue-500 to-cyan-500",
    current: true,
    description: [
      "Developing PluginChatbot (pluginchatbot.com) — an AI chatbot SaaS businesses embed on their sites for instant customer support and live AI responses",
      "Building and owning the full management dashboard (product, platform, and use-case pages) with fully responsive UI/UX",
      "Implementing human-handoff functionality so team members can step into conversations when human assistance is needed",
    ],
    technologies: ["Next.js", "Node.js", "TypeScript", "OpenAI", "Tailwind CSS", "PostgreSQL", "Prisma"],
    order: 0,
  },
  {
    title: "Software Engineer",
    company: "Sharetasking",
    location: "Remote, United States",
    period: "Aug 2025 – Jul 2026",
    type: "Full-time",
    color: "from-purple-500 to-fuchsia-500",
    current: false,
    description: [
      "Built and maintained multiple production SaaS products end-to-end — subscription-based, multi-tenant platforms with Stripe billing and role-based access control",
      "Built scalable full-stack applications using Next.js, Node.js, Fastify, Prisma, PostgreSQL and MongoDB",
      "Designed dashboard systems including authentication, RBAC, and core workflow functionalities",
      "Integrated Stripe subscription billing, REST APIs and third-party services including the Facebook Ads API",
      "Developed AI-powered features using OpenAI and Gemini APIs — chatbots and automated website generation workflows",
      "Worked on performance optimization, debugging and responsive UI/UX within Agile teams",
    ],
    technologies: ["Next.js", "Node.js", "Fastify", "Prisma", "PostgreSQL", "MongoDB", "Stripe", "OpenAI", "Gemini"],
    order: 1,
  },
  {
    title: "Full Stack Engineer",
    company: "JWeis Marketing",
    location: "Remote, United States",
    period: "Nov 2024 – Apr 2026",
    type: "Full-time",
    color: "from-amber-500 to-orange-500",
    current: false,
    description: [
      "Built and deployed a full-stack marketing automation platform using Next.js and Node.js, streamlining campaign workflows",
      "Integrated HubSpot CRM, Mailchimp and Facebook Ads APIs to automate customer data sync and multi-channel outreach",
      "Developed AI-powered automation for personalized email generation and lead management",
      "Architected backend APIs and optimized data workflows for growing campaign volume and faster response times",
    ],
    technologies: ["Next.js", "Node.js", "HubSpot", "Mailchimp", "Facebook Ads API", "REST APIs"],
    order: 2,
  },
];

// Grouped by category. icon "" means the chip renders text-only.
const skillGroups = {
  Frontend: [
    ["React", "TbBrandReact", "text-cyan-400"],
    ["Next.js", "SiNextdotjs", "text-gray-900 dark:text-white"],
    ["TypeScript", "SiTypescript", "text-blue-500"],
    ["JavaScript", "SiJavascript", "text-yellow-400"],
    ["Redux", "SiRedux", "text-purple-500"],
    ["Tailwind CSS", "SiTailwindcss", "text-cyan-500"],
    ["HTML5", "SiHtml5", "text-orange-500"],
    ["CSS3", "SiCss3", "text-blue-500"],
    ["Bootstrap", "SiBootstrap", "text-purple-600"],
  ],
  Backend: [
    ["Node.js", "SiNodedotjs", "text-green-600"],
    ["Express.js", "SiExpress", "text-gray-700 dark:text-gray-300"],
    ["Fastify", "SiFastify", "text-gray-800 dark:text-white"],
    ["REST API", "", ""],
    ["Socket.io", "SiSocketdotio", "text-gray-800 dark:text-white"],
    ["WebSockets", "", ""],
  ],
  Database: [
    ["PostgreSQL", "SiPostgresql", "text-blue-600"],
    ["MongoDB", "SiMongodb", "text-green-500"],
    ["MySQL", "SiMysql", "text-blue-500"],
    ["Redis", "SiRedis", "text-red-500"],
    ["Prisma", "SiPrisma", "text-teal-500"],
    ["Firebase", "SiFirebase", "text-amber-500"],
  ],
  "DevOps & Cloud": [
    ["Docker", "SiDocker", "text-blue-400"],
    ["AWS", "FaAws", "text-orange-500"],
    ["Linux", "SiLinux", "text-yellow-600"],
    ["Nginx", "SiNginx", "text-green-600"],
    ["GitHub Actions", "SiGithubactions", "text-blue-500"],
    ["CI/CD", "", ""],
    ["Vercel", "SiVercel", "text-gray-900 dark:text-white"],
    ["Netlify", "SiNetlify", "text-teal-500"],
  ],
  Security: [
    ["JWT", "SiJsonwebtokens", "text-pink-500"],
    ["OAuth", "", ""],
    ["NextAuth", "", ""],
    ["RBAC", "", ""],
    ["RSA", "", ""],
  ],
  Programming: [
    ["JavaScript", "SiJavascript", "text-yellow-400"],
    ["TypeScript", "SiTypescript", "text-blue-500"],
    ["Python", "SiPython", "text-blue-500"],
    ["Java", "FaJava", "text-red-500"],
    ["C", "SiC", "text-blue-600"],
    ["C++", "SiCplusplus", "text-blue-500"],
  ],
  "AI & Research": [
    ["AI Integration", "SiOpenai", "text-emerald-500"],
    ["Machine Learning", "https://cdn-icons-png.flaticon.com/512/7017/7017557.png", ""],
    ["Computer Vision", "", ""],
    ["HPC", "", ""],
    ["Parallel Computing", "", ""],
    ["Geospatial Analysis", "", ""],
    ["Data Structures", "", ""],
    ["Algorithms", "", ""],
  ],
  Tools: [
    ["Git", "SiGit", "text-orange-600"],
    ["GitHub", "SiGithub", "text-gray-900 dark:text-white"],
    ["Axios", "SiAxios", "text-purple-600"],
    ["Prisma", "SiPrisma", "text-teal-500"],
  ],
};

let skillOrder = 0;
const skills = Object.entries(skillGroups).flatMap(([category, list]) =>
  list.map(([name, icon, iconColor]) => ({
    name,
    category,
    icon,
    iconColor,
    order: skillOrder++,
  }))
);

const education = [
  {
    degree: "M.Sc. in Computer Science",
    institution: "Independent University, Bangladesh (IUB)",
    location: "Dhaka, Bangladesh",
    details: "Currently pursuing",
    year: "2026 - Present",
    icon: "FaGraduationCap",
    iconColor: "text-blue-500",
    achievements: ["Graduate Studies in Computer Science"],
    order: 0,
  },
  {
    degree: "B.Sc. in Computer Science & Engineering (CSE)",
    institution: "Independent University, Bangladesh (IUB)",
    location: "Dhaka, Bangladesh",
    details: "CGPA: 3.82 / 4.00 | Minor: Big Data & High-Performance Computing",
    year: "2022 - 2026",
    icon: "FaUniversity",
    iconColor: "text-purple-500",
    achievements: [
      "Vice Chancellor's Honour List",
      "Dean's Honour List & Dean's Merit List",
      "Undergraduate Researcher at CCDS (Remote Sensing & Geospatial Analysis)",
    ],
    order: 1,
  },
  {
    degree: "Higher Secondary Certificate (HSC) – Science",
    institution: "Barguna Residential Model College",
    location: "Barguna, Bangladesh",
    details: "GPA: 5.00 / 5.00",
    year: "2020",
    icon: "FaSchool",
    iconColor: "text-green-500",
    achievements: ["Perfect GPA 5.00"],
    order: 2,
  },
];

async function run() {
  await connectDB();

  await Experience.deleteMany({});
  await Experience.insertMany(experiences);
  console.log(`✅ Experience: inserted ${experiences.length}`);

  await Skill.deleteMany({});
  await Skill.insertMany(skills);
  console.log(`✅ Skills: inserted ${skills.length}`);

  await Education.deleteMany({});
  await Education.insertMany(education);
  console.log(`✅ Education: inserted ${education.length}`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed from resume failed:", err);
  process.exit(1);
});
