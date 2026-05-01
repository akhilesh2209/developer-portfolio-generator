import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  language: {
    type: String,
    default: ""
  },
  stars: {
    type: Number,
    default: 0
  },
  url: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean,
    default: true
  },
  githubRepoId: {
    type: String,
    default: ""
  }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
