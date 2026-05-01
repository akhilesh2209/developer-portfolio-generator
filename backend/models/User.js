import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  githubUsername: String,
  skills: [String],
}, { timestamps: true });

export default mongoose.model("User", userSchema);