import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API client
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Ensure error handling for Gemini API or lack thereof doesn't crash the server
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Promotional Copy Generator utilizing Gemini-3.5-flash
app.post("/api/generate-copy", async (req, res) => {
  try {
    const { topic, type, tone, customPrompt } = req.body;

    if (!topic || !type) {
      res.status(400).json({ error: "Missing required fields: topic and type" });
      return;
    }

    let pMessage = "";
    if (type === "headline") {
      pMessage = `Generate 3 catchy and high-clickrate CashTask Social Media Hooks/Headline Ideas about "${topic}". They must be under 150 characters, contain descriptive emojis, use clear and direct Bangladeshi contexts when appropriate (highlighting bKash/Nagad), and emphasize immediate reward/money. Avoid overly formal text; keep it punchy and engaging.`;
    } else if (type === "email") {
      pMessage = `Write a high-converting promotional newsletter/email blast for CashTask focusing on "${topic}". Include an exciting email subject line starting with 💰, bullet points detailing how easy it is to register, complete simple tasks, refer friends, and withdraw instantly through bKash/Nagad. Conclude with a strong [Join Now] button CTA. Context tone should be: ${tone || 'enthusiastic'}.`;
    } else if (type === "blast") {
      pMessage = `Write a powerful, short direct messaging blast for Telegram/WhatsApp for CashTask emphasizing "${topic}". Keep it highly readable with bullet points and bold sections, utilizing emojis. Highlight that they can sign up right now and earn daily pockets money with bKash and Nagad.`;
    } else if (type === "cta") {
      pMessage = `Provide 3 short, striking Call-to-Action (CTA) advertising snippets for CashTask based on "${topic}". Keep them highly punchy (maximum 15 words per CTA option, labelled option A, Option B, Option C).`;
    } else {
      pMessage = `Create promotional content of type "${type}" for CashTask on the topic of "${topic}". Mention instant payouts (bKash/Nagad) and simple daily activities.`;
    }

    if (customPrompt) {
      pMessage += ` Additionally, take into account this special instruction: ${customPrompt}`;
    }

    // Lazy load and invoke
    const ai = getGemini();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: pMessage,
      config: {
        systemInstruction: `You are an expert growth marketer and lead copywriter specialized in viral micro-earning apps (like CashTask). Your style is highly engaging, trusted, convincing, and directly addresses the audience's pain points. CashTask allows Bangladeshi users to complete simple everyday tasks and get paid instantly to bKash and Nagad. Keep headings clean and formatting perfectly readable with markdown. Avoid dry business jargon.`
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini copy generation failed: ", error);
    res.status(500).json({
      error: error.message || "Failed to generate copywriting content",
      isConfigMissing: !process.env.GEMINI_API_KEY
    });
  }
});

// Setup Vite server middleware in dev mode, standard static folder in production
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CashTask Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
