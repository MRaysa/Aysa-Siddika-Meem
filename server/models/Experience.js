import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g. "Software Engineer"
    company: { type: String, required: true }, // e.g. "Sharetasking"
    location: { type: String, default: "" }, // e.g. "Remote"
    period: { type: String, default: "" }, // e.g. "Present", "2023 - 2024"
    type: { type: String, default: "Full-time" }, // Full-time / Internship / etc.
    description: { type: [String], default: [] }, // responsibility bullet points
    technologies: { type: [String], default: [] },
    // gradient classes for the icon/badge, kept flexible as strings
    color: { type: String, default: "from-blue-500 to-cyan-500" },
    current: { type: Boolean, default: false }, // shows "Currently Working" badge
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Experience =
  mongoose.models.Experience ||
  mongoose.model("Experience", experienceSchema);
