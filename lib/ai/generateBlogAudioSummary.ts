import { ChatGroq } from "@langchain/groq";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

export async function generateBlogAudioSummary(
  blogTitle: string,
  blogDescription: string,
  fullTextContent: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY || process.env.AI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY or AI_API_KEY environment variable is missing"
    );
  }

  const llm = new ChatGroq({
    apiKey: apiKey,
    model: "openai/gpt-oss-120b",
    temperature: 0.5,
  });

  const systemPrompt = `You are a professional audio summary writer for Akarsh Jha's tech blog.
Your task is to write a short, natural, conversational spoken-word summary of a technical blog article.

STRICT INSTRUCTIONS FOR THE AUDIO SUMMARY:
1. Every summary MUST start EXACTLY with the greeting phrase: "Namaste from Akarsh Jha!"
2. Immediately after "Namaste from Akarsh Jha!", transition into an engaging explanation of what the article covers (e.g. "Namaste from Akarsh Jha! In this post, we'll explore...").
3. DO NOT include any headings, bullet points, asterisks, or markdown formatting whatsoever.
4. DO NOT say "This article was written by..." or similar metadata.
5. Keep the speech length between 45 and 80 seconds when spoken aloud (approximately 110 to 170 words).
6. Focus on the main architectural concepts, practical insights, and key takeaways.
7. Accurately preserve technical terms (like React, Next.js, Redis, LangChain, Supabase, etc.).
8. Output ONLY the plain text script to be read aloud. No intro note, no quote marks around the summary.`;

  const userPrompt = `Blog Title: ${blogTitle}

Blog Description: ${blogDescription}

Full Article Content:
${fullTextContent.slice(0, 8000)}

Please generate the conversational spoken-word audio summary text now starting with "Namaste from Akarsh Jha!".`;

  const response = await llm.invoke([
    new SystemMessage(systemPrompt),
    new HumanMessage(userPrompt),
  ]);

  const summaryText =
    typeof response.content === "string"
      ? response.content.trim()
      : Array.isArray(response.content)
      ? response.content
          .map((c) => (typeof c === "string" ? c : (c as { text?: string }).text || ""))
          .join(" ")
          .trim()
      : String(response.content).trim();

  // Strip any remaining markdown symbols like asterisks or hashtags if present
  let cleanSummary = summaryText
    .replace(/[*#_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Guarantee summary starts with "Namaste from Akarsh Jha!"
  if (!cleanSummary.toLowerCase().startsWith("namaste from akarsh jha")) {
    cleanSummary = `Namaste from Akarsh Jha! ${cleanSummary}`;
  }

  return cleanSummary;
}
