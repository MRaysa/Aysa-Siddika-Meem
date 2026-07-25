import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String, default: "" },
    details: { type: String, default: "" }, // e.g. "GPA: 5.00"
    year: { type: String, default: "" }, // e.g. "2022 - Present"
    // react-icons component name (e.g. "FaUniversity") + color class
    icon: { type: String, default: "FaUniversity" },
    iconColor: { type: String, default: "text-blue-500" },
    achievements: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education =
  mongoose.models.Education ||
  mongoose.model("Education", educationSchema);
