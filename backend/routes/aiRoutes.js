import express from "express";
import OpenAI from "openai";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { name, description, language } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      // Fallback: generate a decent description without AI
      const fallback = `${name} is a ${language || 'software'} project that demonstrates strong engineering fundamentals. ${description ? description + ' ' : ''}Built with modern best practices and clean code architecture.`;
      return res.json({ description: fallback });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `Write a professional 2-sentence portfolio description for a GitHub project.
Project name: ${name}
Language: ${language || 'Unknown'}
Existing description: ${description || 'None'}

Write a compelling, professional description that highlights the technical skills and impact. Keep it under 60 words. No quotes, just the description.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const aiDescription = completion.choices[0]?.message?.content?.trim();
    res.json({ description: aiDescription || description || `A ${language || 'software'} project showcasing development expertise.` });

  } catch (err) {
    console.error("AI Error:", err.message);
    // Always return something useful
    const { name, description, language } = req.body;
    const fallback = `${name} is a ${language || 'software'} project that showcases problem-solving and technical expertise. ${description || 'Built with clean architecture and modern development practices.'}`;
    res.json({ description: fallback });
  }
});

export default router;