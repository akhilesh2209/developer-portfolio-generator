import Project from "../models/Project.js";
import mongoose from "mongoose";

export const getProjects = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Try to convert to ObjectId, if it fails, return empty array
    let projects = [];
    try {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        projects = await Project.find({ userId }).sort({ createdAt: -1 });
      }
    } catch (mongoErr) {
      console.log('Invalid ObjectId, returning empty projects');
    }
    
    res.json(projects);
  } catch (err) {
    console.error('Error in getProjects:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { userId, name, description, language, stars, url, visible, githubRepoId } = req.body;
    
    const project = await Project.create({
      userId,
      name,
      description,
      language,
      stars,
      url,
      visible,
      githubRepoId
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, language, stars, url, visible } = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, language, stars, url, visible },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleProjectVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.visible = !project.visible;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
