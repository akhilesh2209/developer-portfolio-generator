import express from "express";
import axios from "axios";

const router = express.Router();

// GET GitHub repos
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const repos = response.data.map(repo => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url
    }));

    res.json(repos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch GitHub repos" });
  }
});

export default router;