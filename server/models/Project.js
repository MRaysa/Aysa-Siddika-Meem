import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    text: String,
    author: String,
  },
  { _id: false }
);

const detailsSchema = new mongoose.Schema(
  {
    features: { type: [String], default: [] },
    challenges: String,
    solutions: String,
    testimonial: { type: testimonialSchema, default: undefined },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: {
      type: String,
      default: "Web Apps",
      // matches the frontend filter buttons
      enum: ["Web Apps", "Mobile", "Full Stack", "UI/UX", "Innovative"],
    },
    image: { type: String, default: "" },
    github: { type: String, default: "" },
    live: { type: String, default: "" },
    // icon component names resolved on the frontend (e.g. "FaReact")
    techIcons: { type: [String], default: [] },
    accentColor: {
      type: String,
      default: "bg-gradient-to-br from-blue-500 to-purple-600",
    },
    details: { type: detailsSchema, default: () => ({}) },
    // controls display order (lower shows first)
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
