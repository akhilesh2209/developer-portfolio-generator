import express from "express";

const router = express.Router();

// In-memory store for projects (replace with MongoDB model if needed)
const projects = [];

router.get("/user/:userId", async (req, res) => {
  try {
    const userProjects = projects.filter(p => p.userId === req.params.userId);
    res.json(userProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = { ...req.body, _id: Date.now().toString(), createdAt: new Date() };
    projects.push(project);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const idx = projects.findIndex(p => p._id === req.params.id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });
    projects[idx] = { ...projects[idx], ...req.body };
    res.json(projects[idx]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const idx = projects.findIndex(p => p._id === req.params.id);
    if (idx !== -1) projects.splice(idx, 1);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;