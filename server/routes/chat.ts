import { Router } from "express";
import { generateChatResponse } from "../services/gemini.js";

const router = Router();

/**
 * POST /api/chat
 * Body: { message: string, history?: [{role, content}], countryCode?: string }
 * Returns: { response: string, showLeadForm: boolean, sources: string[] }
 */
router.post("/", async (req, res) => {
  try {
    const { message, history, countryCode } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await generateChatResponse({
      message: message.trim(),
      history: history || [],
      countryCode: countryCode || "IN",
    });

    res.json(result);
  } catch (err) {
    console.error("Chat route error:", err);
    res.status(500).json({
      error: "Failed to generate response",
      response: "I'm sorry, I'm having trouble right now. Please try again or reach out at zenloftstudio@gmail.com.",
      showLeadForm: false,
      sources: [],
    });
  }
});

export default router;
