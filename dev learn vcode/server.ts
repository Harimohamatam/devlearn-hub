import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://harimohamatam.github.io"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
const PORT = 3000;

// Attachments are sent as base64 JSON from the browser.
// 20 MB is enough for normal screenshots/code files while
// preventing accidentally huge requests.
app.use(express.json({ limit: "20mb" }));

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  return aiClient;
}

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    aiAvailable: !!process.env.GEMINI_API_KEY,
  });
});

// ============================================================
// AI CONCEPT / CODE EXPLAINER
// ============================================================

app.post("/api/ai/explain", async (req, res) => {
  try {
    const { concept, code, language, question } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        explanation: `**${concept || "Concept"} in ${
          language || "Programming"
        }**\n\n*Note: Add GEMINI_API_KEY in Secrets for live AI explanations.*\n\nKey Concept Breakdown:\n- ${
          concept || "Understanding syntax and fundamentals."
        }\n- Practice writing small functions to test your understanding.\n- Pay attention to memory, scope, and error handling.`,
        success: false,
      });
    }

    const prompt = `You are a friendly, encouraging computer science professor and programming tutor for students.
Explain the following concept or code snippet clearly for a student:
Language: ${language || "General Programming"}
Concept: ${concept || "General Syntax & Usage"}
Code Snippet: ${
      code
        ? `\n\`\`\`${language || ""}\n${code}\n\`\`\``
        : "N/A"
    }
User Question: ${
      question ||
      "Explain how this works step-by-step with real-world analogies, line-by-line breakdown, and common beginner pitfalls."
    }

Format the response nicely in Markdown with clear subheadings, analogies, code tips, and key takeaways. Keep it engaging, easy to read, and educational.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({
      explanation: response.text,
      success: true,
    });
  } catch (error: any) {
    console.error("AI Explain error:", error);

    res.status(500).json({
      error:
        error.message ||
        "Failed to generate explanation",
    });
  }
});

// ============================================================
// AI DYNAMIC PRACTICE QUIZ GENERATOR
// ============================================================

app.post("/api/ai/quiz", async (req, res) => {
  try {
    const { language, difficulty, topic } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(400).json({
        error:
          "Gemini API key is required for dynamic quiz generation.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Generate 3 multiple-choice practice quiz questions for a student learning ${language}.
Difficulty level: ${difficulty || "beginner"}.
Specific Topic: ${
        topic ||
        "Core concepts, syntax, and problem solving"
      }.

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
                items: { type: Type.STRING },
              },
              correctAnswerIndex: {
                type: Type.INTEGER,
              },
              explanation: {
                type: Type.STRING,
              },
              hint: {
                type: Type.STRING,
              },
            },
            required: [
              "question",
              "options",
              "correctAnswerIndex",
              "explanation",
            ],
          },
        },
      },
    });

    const quizData = JSON.parse(
      response.text || "[]"
    );

    res.json({
      questions: quizData,
    });
  } catch (error: any) {
    console.error("AI Quiz error:", error);

    res.status(500).json({
      error:
        error.message ||
        "Failed to generate dynamic quiz",
    });
  }
});

// ============================================================
// AI STUDENT TUTOR CHAT
// ============================================================

/*
Expected optional attachment shape from AITutorModal:

attachment: {
  name: string,
  mimeType: string,
  data: string,       // base64 WITHOUT the data:... prefix
  kind?: "image" | "file"
}

For text/code files, the frontend may instead send:

attachment: {
  name: string,
  mimeType: "text/plain",
  textContent: string
}

Gemini supports multimodal content parts such as text and
inline base64 media. This keeps the API key on the server.
*/

type TutorAttachment = {
  name?: string;
  mimeType?: string;
  data?: string;
  textContent?: string;
  kind?: "image" | "file";
};

function isAllowedAttachmentMime(
  mimeType: string
): boolean {
  const mime = mimeType.toLowerCase();

  if (mime.startsWith("image/")) {
    return true;
  }

  if (mime === "application/pdf") {
    return true;
  }

  if (mime.startsWith("text/")) {
    return true;
  }

  // Common coding-file MIME types sent by browsers.
  const allowedCodeMimes = new Set([
    "application/json",
    "application/javascript",
    "application/typescript",
    "application/xml",
    "application/x-javascript",
    "application/x-python",
    "application/x-httpd-php",
    "application/x-sh",
    "application/sql",
    "text/javascript",
    "text/typescript",
    "text/css",
    "text/html",
    "text/x-python",
    "text/x-java-source",
    "text/x-c",
    "text/x-c++",
    "text/x-csharp",
    "text/x-rust",
    "text/x-go",
  ]);

  return allowedCodeMimes.has(mime);
}

function estimateBase64Bytes(
  base64: string
): number {
  const padding =
    base64.endsWith("==")
      ? 2
      : base64.endsWith("=")
        ? 1
        : 0;

  return Math.floor(
    (base64.length * 3) / 4
  ) - padding;
}

app.post("/api/ai/tutor", async (req, res) => {
  try {
    const {
      prompt,
      history,
      currentLanguage,
      attachment,
    }: {
      prompt?: string;
      history?: any[];
      currentLanguage?: string;
      attachment?: TutorAttachment | null;
    } = req.body;

    const ai = getGeminiClient();

    // If Gemini API key is not available
    if (!ai) {
      return res.json({
        reply:
          "I am your AI Study Buddy! Add a GEMINI_API_KEY in the Secrets panel to chat with me.",
      });
    }

    const cleanPrompt = String(
      prompt || ""
    ).trim();

    const hasAttachment =
      !!attachment &&
      !!attachment.mimeType &&
      (!!attachment.data ||
        !!attachment.textContent);

    if (!cleanPrompt && !hasAttachment) {
      return res.status(400).json({
        error:
          "Please enter a question or attach a file/image.",
      });
    }

    // ==========================================================
    // Validate attachment before sending anything to Gemini
    // ==========================================================

    if (attachment) {
      const mimeType = String(
        attachment.mimeType || ""
      ).trim();

      if (!mimeType) {
        return res.status(400).json({
          error:
            "The attached file does not have a MIME type.",
        });
      }

      if (!isAllowedAttachmentMime(mimeType)) {
        return res.status(400).json({
          error:
            "This file type is not supported yet. Please attach a coding file, image, screenshot, or PDF.",
        });
      }

      if (attachment.data) {
        const approximateBytes =
          estimateBase64Bytes(
            attachment.data
          );

        // Keep the decoded attachment comfortably
        // below the JSON request limit.
        if (
          approximateBytes >
          12 * 1024 * 1024
        ) {
          return res.status(413).json({
            error:
              "That attachment is too large. Please use a file or image smaller than 12 MB.",
          });
        }
      }

      if (
        attachment.textContent &&
        attachment.textContent.length >
          1_500_000
      ) {
        return res.status(413).json({
          error:
            "That code/text file is too large to analyze in one request.",
        });
      }
    }

    // ==========================================================
    // DevBot system instructions
    // ==========================================================

    const systemInstruction = `
You are "DevBot", an AI Programming Tutor and Study Buddy.

YOUR MAIN PURPOSE:
Help students with programming, computer science, software development,
coding concepts, debugging, algorithms, databases, web development,
and other study-related technical topics.

STUDY-ONLY RULE:
You should primarily answer questions related to:
- Programming
- Computer Science
- Software Development
- Coding
- Algorithms and Data Structures
- Databases
- Web Development
- Computer Networks
- Operating Systems
- Software Engineering
- Technical learning

If the user asks something unrelated to studies, programming,
computer science, or learning, politely respond:

"I'm here mainly to help you with studies 💡
Ask me something about programming, computer science, or another
study topic and I'll help you!"

If a question is ambiguous but could reasonably be related to learning,
answer it from a study/technical perspective.

CURRENT LANGUAGE:
${currentLanguage || "All Programming Languages"}

ATTACHMENT / IMAGE ANALYSIS:
If the user provides an image, screenshot, PDF, or coding file:
- Actually inspect the provided material before answering.
- If it is a code screenshot, read the visible code and error carefully.
- Identify the exact error when possible.
- Explain WHY the problem occurs.
- Give corrected code when appropriate.
- If the image is blurry or some code cannot be read reliably, say which part is unclear instead of inventing it.
- For screenshots of terminals or IDEs, explain the visible error and the likely fix.
- For diagrams, explain the technical information shown.
- For code files, analyze the supplied code rather than assuming different code.
- Never claim that an attachment was analyzed if no attachment was actually received.

FOR VALID STUDY QUESTIONS:
- Explain concepts clearly and accurately.
- Use simple language suitable for students.
- Break difficult concepts into small steps.
- Give practical real-world examples when useful.
- Show code examples when appropriate.
- Explain code line by line when requested.
- Highlight common mistakes.
- Use Markdown formatting.
- Format code blocks properly.
- Encourage understanding instead of simply giving an answer.

Be friendly, encouraging, and concise while still being useful.
`;

    // ==========================================================
    // Prepare previous conversation history
    // ==========================================================

    const chatHistory = Array.isArray(history)
      ? history
          .filter(
            (item: any) =>
              item &&
              item.text &&
              (item.role === "user" ||
                item.role === "model")
          )
          .slice(-10)
          .map((item: any) => ({
            role: item.role as
              | "user"
              | "model",
            parts: [
              {
                text: String(item.text),
              },
            ],
          }))
      : [];

    // ==========================================================
    // Create Gemini chat WITH history
    // ==========================================================

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
      },
      history: chatHistory,
    });

    // ==========================================================
    // Build the NEW multimodal message
    // ==========================================================

    const messageParts: any[] = [];

    if (cleanPrompt) {
      messageParts.push({
        text: cleanPrompt,
      });
    }

    if (attachment) {
      const fileName =
        attachment.name ||
        "attached file";

      const mimeType =
        attachment.mimeType ||
        "application/octet-stream";

      // Text/code files can be sent as text so the model
      // can inspect the source directly.
      if (attachment.textContent) {
        messageParts.push({
          text: `Attached coding/text file: ${fileName}\n\n--- FILE CONTENT ---\n${attachment.textContent}\n--- END FILE CONTENT ---`,
        });
      }

      // Images/PDFs and other supported binary inputs
      // are sent as inline base64 data.
      if (attachment.data) {
        messageParts.push({
          inlineData: {
            mimeType,
            data: attachment.data,
          },
        });
      }
    }

    // This should always be true because we validated
    // prompt/attachment above.
    if (messageParts.length === 0) {
      return res.status(400).json({
        error:
          "Nothing was provided to analyze.",
      });
    }

    // ==========================================================
    // Send the new question + optional attachment
    // ==========================================================

    const response =
      await chat.sendMessage({
        message: messageParts,
      });

    // ==========================================================
    // Send response back to React
    // ==========================================================

    return res.json({
      reply:
        response.text ||
        "Sorry, I couldn't generate a response. Please try again.",
    });
  } catch (error: any) {
    console.error(
      "AI Tutor error:",
      error
    );

    console.error(
      "AI Tutor error status:",
      error?.status
    );

    return res.status(
      error?.status || 500
    ).json({
      error:
        error?.message ||
        "Failed to generate AI response.",
    });
  }
});

// ============================================================
// START SERVER
// ============================================================

async function startServer() {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: "spa",
  });

  app.use(vite.middlewares);

  app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
  console.log(
    `Network access: http://YOUR_LAPTOP_IPV4:${PORT}`
  );
});
}

startServer().catch((error) => {
  console.error(
    "Failed to start server:",
    error
  );
});