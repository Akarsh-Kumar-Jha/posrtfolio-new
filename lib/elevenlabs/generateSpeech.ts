export async function generateSpeech(text: string): Promise<Buffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY environment variable is missing");
  }

  // Default to "Rachel" (21m00Tcm4TlvDq8ikWAM) if no specific ELEVENLABS_VOICE_ID is configured
  const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

  // Safe text limit to prevent quota exhaustion (~300 characters max)
  let safeText = text.trim();
  if (safeText.length > 320) {
    // Truncate at last space before 300 chars and add a period
    const truncated = safeText.slice(0, 300);
    safeText = truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: safeText,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    if (errorText.includes("quota_exceeded") || response.status === 401) {
      throw new Error(
        "ElevenLabs character quota exceeded for this API key. Please update ELEVENLABS_API_KEY with a fresh ElevenLabs key in your Vercel Environment Variables."
      );
    }
    throw new Error(
      `ElevenLabs TTS API error (${response.status}): ${errorText}`
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
