var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGeminiClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiAvailable: !!process.env.GEMINI_API_KEY });
});
app.post("/api/ai/explain", async (req, res) => {
  try {
    const { concept, code, language, question } = req.body;
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        explanation: `**${concept || "Concept"} in ${language || "Programming"}**

*Note: Add GEMINI_API_KEY in Secrets for live AI explanations.*

Key Concept Breakdown:
- ${concept || "Understanding syntax and fundamentals."}
- Practice writing small functions to test your understanding.
- Pay attention to memory, scope, and error handling.`,
        success: false
      });
    }
    const prompt = `You are a friendly, encouraging computer science professor and programming tutor for students.
Explain the following concept or code snippet clearly for a student:
Language: ${language || "General Programming"}
Concept: ${concept || "General Syntax & Usage"}
Code Snippet: ${code ? `
\`\`\`${language || ""}
${code}
\`\`\`` : "N/A"}
User Question: ${question || "Explain how this works step-by-step with real-world analogies, line-by-line breakdown, and common beginner pitfalls."}

Format the response nicely in Markdown with clear subheadings, analogies, code tips, and key takeaways. Keep it engaging, easy to read, and educational.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt
    });
    res.json({ explanation: response.text, success: true });
  } catch (error) {
    console.error("AI Explain error:", error);
    res.status(500).json({ error: error.message || "Failed to generate explanation" });
  }
});
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
Difficulty level: ${difficulty || "beginner"}.
Specific Topic: ${topic || "Core concepts, syntax, and problem solving"}.

Ensure questions have accurate code snippets, 4 options, the 0-based index of the correct answer, and a clear explanation for why the answer is correct.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.ARRAY,
          items: {
            type: import_genai.Type.OBJECT,
            properties: {
              id: { type: import_genai.Type.STRING },
              question: { type: import_genai.Type.STRING },
              codeSnippet: { type: import_genai.Type.STRING },
              options: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              correctAnswerIndex: { type: import_genai.Type.INTEGER },
              explanation: { type: import_genai.Type.STRING },
              hint: { type: import_genai.Type.STRING }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });
    const quizData = JSON.parse(response.text || "[]");
    res.json({ questions: quizData });
  } catch (error) {
    console.error("AI Quiz error:", error);
    res.status(500).json({ error: error.message || "Failed to generate dynamic quiz" });
  }
});
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
Current language context: ${currentLanguage || "All Programming Languages"}.
Always break down concepts, format code blocks properly with language tags, highlight common bugs, and offer helpful practice hints.`;
    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: { systemInstruction }
    });
    if (history && Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role && item.text) {
          await chat.sendMessage({ message: item.text });
        }
      }
    }
    const response = await chat.sendMessage({ message: prompt });
    res.json({ reply: response.text });
  } catch (error) {
    console.error("AI Tutor error:", error);
    res.status(500).json({ error: error.message || "Failed to respond" });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
