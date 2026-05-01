import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const skills = await Skill.find({ userId }).sort({ createdAt: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { userId, name, category, level, visible } = req.body;
    
    const skill = await Skill.create({
      userId,
      name,
      category,
      level,
      visible
    });

    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, level, visible } = req.body;

    const skill = await Skill.findByIdAndUpdate(
      id,
      { name, category, level, visible },
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleSkillVisibility = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findById(id);
    if (!skill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    skill.visible = !skill.visible;
    await skill.save();

    res.json(skill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
