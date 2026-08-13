import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiAvailable: !!process.env.GEMINI_API_KEY });
});

// AI Concept / Code Explainer Endpoint
app.post("/api/ai/explain", async (req, res) => {
  try {
    const { concept, code, language, question } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        explanation: `**${concept || 'Concept'} in ${language || 'Programming'}**\n\n*Note: Add GEMINI_API_KEY in Secrets for live AI explanations.*\n\nKey Concept Breakdown:\n- ${concept || 'Understanding syntax and fundamentals.'}\n- Practice writing small functions to test your understanding.\n- Pay attention to memory, scope, and error handling.`,
        success: false
      });
    }

    const prompt = `You are a friendly, encouraging computer science professor and programming tutor for students.
Explain the following concept or code snippet clearly for a student:
Language: ${language || 'General Programming'}
Concept: ${concept || 'General Syntax & Usage'}
Code Snippet: ${code ? `\n\`\`\`${language || ''}\n${code}\n\`\`\`` : 'N/A'}
User Question: ${question || 'Explain how this works step-by-step with real-world analogies, line-by-line breakdown, and common beginner pitfalls.'}

Format the response nicely in Markdown with clear subheadings, analogies, code tips, and key takeaways. Keep it engaging, easy to read, and educational.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ explanation: response.text, success: true });
  } catch (error: any) {
    console.error("AI Explain error:", error);
    res.status(500).json({ error: error.message || "Failed to generate explanation" });
  }
});

// AI Dynamic Practice Quiz Generator
app.post("/api/ai/quiz", async (req, res) => {
  try {
    const { language, difficulty, topic } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(400).json({ error: "Gemini API key is required for dynamic quiz generation." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate 3 multiple-choice practice quiz questions for a student learning ${language}.
Difficulty level: ${difficulty || 'beginner'}.
Specific Topic: ${topic || 'Core concepts, syntax, and problem solving'}.

Ensure questions have accurate code snippets, 4 options, the 0-based index of the correct answer, and a clear explanation for why the answer is correct.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              codeSnippet: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              hint: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    const quizData = JSON.parse(response.text || "[]");
    res.json({ questions: quizData });
  } catch (error: any) {
    console.error("AI Quiz error:", error);
    res.status(500).json({ error: error.message || "Failed to generate dynamic quiz" });
  }
});

// AI Student Tutor Chat Endpoint
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { prompt, history, currentLanguage } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: "I am your AI Study Buddy! Add a GEMINI_API_KEY in the Secrets panel to chat with me live for custom code explanations, bug debugging, and study advice."
      });
    }

    const systemInstruction = `You are "DevBot", an expert AI Programming Tutor and Study Companion for CS students.
You provide clear, accurate, enthusiastic, and easy-to-understand programming assistance.
Current language context: ${currentLanguage || 'All Programming Languages'}.
Always break down concepts, format code blocks properly with language tags, highlight common bugs, and offer helpful practice hints.`;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: { systemInstruction },
    });

    // Send history if present or prompt directly
    if (history && Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role && item.text) {
          await chat.sendMessage({ message: item.text });
        }
      }
    }

    const response = await chat.sendMessage({ message: prompt });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("AI Tutor error:", error);
    res.status(500).json({ error: error.message || "Failed to respond" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
