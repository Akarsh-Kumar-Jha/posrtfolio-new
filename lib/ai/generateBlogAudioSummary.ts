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
Your task is to write a short, ultra-concise, natural conversational spoken-word summary of a technical blog article.

STRICT INSTRUCTIONS FOR THE AUDIO SUMMARY:
1. Every summary MUST start EXACTLY with the greeting phrase: "Namaste from Akarsh Jha!"
2. Immediately after "Namaste from Akarsh Jha!", transition into a 2-3 sentence overview of what the article covers.
3. DO NOT include any headings, bullet points, asterisks, or markdown formatting whatsoever.
4. Keep the summary concise and punchy: between 40 and 65 words (~200 to 320 characters max).
5. Focus on the core key takeaway and architectural concept.
6. Accurately preserve technical terms (like React, Next.js, Redis, LangChain, Supabase, etc.).
7. Output ONLY the plain text script to be read aloud. No intro note, no quote marks around the summary.`;

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
