import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

// Helper to hash a plain password
adminSchema.statics.hashPassword = function (plain) {
  return bcrypt.hash(plain, 10);
};

// Instance method to verify a password against the stored hash
adminSchema.methods.verifyPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
