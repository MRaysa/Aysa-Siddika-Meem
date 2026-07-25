import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "React"
    // grouping bucket shown as a card header (e.g. "Frontend", "Backend")
    category: { type: String, default: "Other" },
    // react-icons component name resolved on the frontend, e.g. "TbBrandReact"
    icon: { type: String, default: "" },
    // tailwind text color class for the icon, e.g. "text-blue-500"
    iconColor: { type: String, default: "text-blue-500" },
    percentage: { type: Number, default: 80, min: 0, max: 100 },
    // whether this skill also appears in the orbiting animation ring
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Skill =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);
