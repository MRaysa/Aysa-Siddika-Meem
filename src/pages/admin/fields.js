// Declarative field definitions for each resource.
// The generic ResourceManager renders forms + list rows from these.
//
// Field types: text | textarea | number | boolean | select | tags | image
// Dotted keys (e.g. "details.testimonial.text") map into nested objects.

import {
  projectsApi,
  experienceApi,
  skillsApi,
  educationApi,
} from "../../lib/api";

const PROJECT_CATEGORIES = [
  "Web Apps",
  "Mobile",
  "Full Stack",
  "UI/UX",
  "Innovative",
];

// react-icons names supported by the Projects section renderer
const SUPPORTED_TECH_ICONS =
  "FaReact, FaNodeJs, FaPython, FaFigma, SiDjango, SiMongodb, SiTailwindcss, SiThreedotjs, TbBrandNextjs, SiFirebase, SiVite";

export const RESOURCES = {
  projects: {
    label: "Projects",
    api: projectsApi,
    // shown in the list row
    titleKey: "title",
    subtitleKey: "category",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      {
        key: "description",
        label: "Short Description",
        type: "textarea",
        required: true,
      },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: PROJECT_CATEGORIES,
      },
      { key: "image", label: "Cover Image", type: "image" },
      { key: "github", label: "GitHub URL", type: "text" },
      { key: "live", label: "Live URL", type: "text" },
      { key: "tags", label: "Tags", type: "tags" },
      {
        key: "techIcons",
        label: "Tech Icons",
        type: "tags",
        help: `Icon names. Supported: ${SUPPORTED_TECH_ICONS}`,
      },
      {
        key: "accentColor",
        label: "Accent Color (Tailwind classes)",
        type: "text",
        placeholder: "bg-gradient-to-br from-blue-500 to-purple-600",
      },
      { key: "order", label: "Display Order", type: "number" },
      {
        key: "details.features",
        label: "Features (one per line)",
        type: "tags",
        multiline: true,
      },
      { key: "details.challenges", label: "Challenges", type: "textarea" },
      { key: "details.solutions", label: "Solutions", type: "textarea" },
      {
        key: "details.testimonial.text",
        label: "Testimonial Text",
        type: "textarea",
      },
      {
        key: "details.testimonial.author",
        label: "Testimonial Author",
        type: "text",
      },
    ],
  },

  experience: {
    label: "Experience",
    api: experienceApi,
    titleKey: "title",
    subtitleKey: "company",
    fields: [
      { key: "title", label: "Job Title", type: "text", required: true },
      { key: "company", label: "Company", type: "text", required: true },
      { key: "location", label: "Location", type: "text" },
      {
        key: "period",
        label: "Period",
        type: "text",
        placeholder: "Present  /  2023 - 2024",
      },
      {
        key: "type",
        label: "Type",
        type: "text",
        placeholder: "Full-time / Internship",
      },
      { key: "current", label: "Currently Working Here", type: "boolean" },
      {
        key: "description",
        label: "Responsibilities (one per line)",
        type: "tags",
        multiline: true,
      },
      { key: "technologies", label: "Technologies", type: "tags" },
      {
        key: "color",
        label: "Accent Color (Tailwind)",
        type: "text",
        placeholder: "from-blue-500 to-cyan-500",
      },
      { key: "order", label: "Display Order", type: "number" },
    ],
  },

  skills: {
    label: "Skills",
    api: skillsApi,
    titleKey: "name",
    subtitleKey: "category",
    fields: [
      { key: "name", label: "Skill Name", type: "text", required: true },
      {
        key: "category",
        label: "Category",
        type: "select",
        options: [
          "Frontend",
          "Backend",
          "Database",
          "DevOps & Cloud",
          "Security",
          "Programming",
          "AI & Research",
          "Tools",
          "Other",
        ],
      },
      {
        key: "icon",
        label: "Icon (react-icons name) — optional",
        type: "text",
        placeholder: "TbBrandReact / SiJavascript",
        help: "Component name from react-icons (Tb/Si/Fa sets). Leave blank for no icon.",
      },
      {
        key: "iconColor",
        label: "Icon Color (Tailwind)",
        type: "text",
        placeholder: "text-blue-500",
      },
      { key: "order", label: "Display Order", type: "number" },
    ],
  },

  education: {
    label: "Education",
    api: educationApi,
    titleKey: "degree",
    subtitleKey: "institution",
    fields: [
      { key: "degree", label: "Degree", type: "text", required: true },
      {
        key: "institution",
        label: "Institution",
        type: "text",
        required: true,
      },
      { key: "location", label: "Location", type: "text" },
      {
        key: "details",
        label: "Details",
        type: "text",
        placeholder: "GPA: 5.00",
      },
      {
        key: "year",
        label: "Year",
        type: "text",
        placeholder: "2022 - Present",
      },
      {
        key: "icon",
        label: "Icon (react-icons name)",
        type: "text",
        placeholder: "FaUniversity / FaSchool / GiDiploma",
      },
      {
        key: "iconColor",
        label: "Icon Color (Tailwind)",
        type: "text",
        placeholder: "text-blue-500",
      },
      {
        key: "achievements",
        label: "Achievements (one per line)",
        type: "tags",
        multiline: true,
      },
      { key: "order", label: "Display Order", type: "number" },
    ],
  },
};
