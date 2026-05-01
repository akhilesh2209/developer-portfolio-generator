import express from "express";

const router = express.Router();

router.get("/suggest/:language", (req, res) => {
  const suggestions = {
    JavaScript: ["React", "Node.js", "Express", "TypeScript", "Next.js", "MongoDB", "REST APIs"],
    TypeScript: ["React", "Next.js", "Node.js", "Express", "Prisma", "PostgreSQL", "TailwindCSS"],
    Python: ["Django", "Flask", "FastAPI", "NumPy", "Pandas", "TensorFlow", "PostgreSQL"],
    Java: ["Spring Boot", "Hibernate", "Maven", "MySQL", "REST APIs", "Microservices"],
    "C++": ["Data Structures", "Algorithms", "STL", "OOP", "System Design"],
    Go: ["Gin", "gRPC", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
    Rust: ["Tokio", "Actix", "WebAssembly", "Systems Programming"],
  };
  const lang = req.params.language;
  res.json({ skills: suggestions[lang] || ["Git", "GitHub", "REST APIs", "Docker", "Linux"] });
});

export default router;