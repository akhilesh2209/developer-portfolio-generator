import User from "../models/User.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const projects = await Project.find({ userId: id, visible: true });
    const skills = await Skill.find({ userId: id, visible: true });

    res.json({
      user,
      projects,
      skills
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, githubUsername, skills } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, githubUsername, skills },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ githubUsername: username }).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const projects = await Project.find({ userId: user._id, visible: true });
    const skills = await Skill.find({ userId: user._id, visible: true });

    res.json({
      user,
      projects,
      skills
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
