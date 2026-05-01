import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Analytics", analyticsSchema);