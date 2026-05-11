import { Router } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { VitatrackAiCoachBody } from "@workspace/api-zod";

const router = Router();

let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY ?? "placeholder",
      baseURL: process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL,
    });
  }
  return anthropicClient;
}

router.post("/vitatrack/ai-coach", async (req, res): Promise<void> => {
  const parsed = VitatrackAiCoachBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid AI coach request body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { prompt } = parsed.data;

  try {
    const client = getClient();
    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map(block => block.text)
      .join("");

    res.json({ text });
  } catch (err) {
    req.log.error({ err }, "AI coach request failed");
    res.status(500).json({ error: "AI Coach is temporarily unavailable. Please try again later." });
  }
});

export default router;
