import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { generateBlogAudioSummary } from "@/lib/ai/generateBlogAudioSummary";
import { generateSpeech } from "@/lib/elevenlabs/generateSpeech";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const { blogId } = await params;
  if (!blogId) {
    return NextResponse.json({ error: "Missing blogId" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: existingSummary } = await supabase
    .from("blog_audio_summaries")
    .select("*")
    .eq("blog_id", blogId)
    .maybeSingle();

  if (
    existingSummary &&
    existingSummary.status === "completed" &&
    existingSummary.audio_url
  ) {
    return NextResponse.json({
      success: true,
      cached: true,
      summary: existingSummary.summary,
      audioUrl: existingSummary.audio_url,
      duration: existingSummary.duration || 60,
      status: "completed",
    });
  }

  if (existingSummary) {
    return NextResponse.json({
      success: true,
      status: existingSummary.status,
      summary: existingSummary.summary,
      audioUrl: existingSummary.audio_url,
      duration: existingSummary.duration || 60,
    });
  }

  return NextResponse.json({
    success: true,
    status: "none",
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const { blogId } = await params;

  if (!blogId) {
    return NextResponse.json({ error: "Missing blogId" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Step 1: Check existing cache and status in DB
  const { data: existingSummary } = await supabase
    .from("blog_audio_summaries")
    .select("*")
    .eq("blog_id", blogId)
    .maybeSingle();

  // If completed and audio URL exists, return instantly (cached)
  if (
    existingSummary &&
    existingSummary.status === "completed" &&
    existingSummary.audio_url
  ) {
    return NextResponse.json({
      success: true,
      cached: true,
      summary: existingSummary.summary,
      audioUrl: existingSummary.audio_url,
      duration: existingSummary.duration || 60,
      status: "completed",
    });
  }

  // If currently processing and was updated < 2 minutes ago, prevent duplicate concurrent generation
  if (existingSummary && existingSummary.status === "processing") {
    const updatedAt = new Date(
      existingSummary.updated_at || existingSummary.created_at
    ).getTime();
    const now = Date.now();
    // 2 minutes lock timeout
    if (now - updatedAt < 2 * 60 * 1000) {
      return NextResponse.json({
        success: true,
        status: "processing",
        message: "Audio summary generation is already in progress",
      });
    }
  }

  // Step 2: Validate blog exists in DB
  const { data: blog, error: blogError } = await supabase
    .from("blogs")
    .select("id, title, description")
    .eq("id", blogId)
    .single();

  if (blogError || !blog) {
    return NextResponse.json(
      { error: "Blog not found in database" },
      { status: 404 }
    );
  }

  // Set / Upsert status to processing to lock against duplicate requests
  if (existingSummary) {
    await supabase
      .from("blog_audio_summaries")
      .update({
        status: "processing",
        updated_at: new Date().toISOString(),
        error_message: null,
      })
      .eq("blog_id", blogId);
  } else {
    await supabase.from("blog_audio_summaries").insert({
      blog_id: blogId,
      status: "processing",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  try {
    // Step 3: Retrieve full blog content securely from DB
    const { data: sections } = await supabase
      .from("blog_scetions")
      .select("heading, content")
      .eq("blog_id", blogId)
      .order("order", { ascending: true });

    const fullContent = (sections || [])
      .map((sec) => `${sec.heading}\n${sec.content || ""}`)
      .join("\n\n");

    // Step 4: Generate conversational AI audio summary using LangChain + Groq
    const summaryText = await generateBlogAudioSummary(
      blog.title,
      blog.description || "",
      fullContent
    );

    // Step 5: Convert summary to speech MP3 using ElevenLabs API
    const audioBuffer = await generateSpeech(summaryText);

    // Step 6: Upload generated MP3 to Supabase Storage bucket 'blog-audio'
    const storagePath = `${blogId}/summary.mp3`;
    const { error: uploadError } = await supabase.storage
      .from("blog-audio")
      .upload(storagePath, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Supabase Storage upload failed: ${uploadError.message}`);
    }

    // Step 7: Get public URL for playback
    const { data: publicUrlData } = supabase.storage
      .from("blog-audio")
      .getPublicUrl(storagePath);

    const audioUrl = publicUrlData.publicUrl;

    // Estimate duration based on word count (~150 words per minute -> 2.5 words per second)
    const wordCount = summaryText.split(/\s+/).filter(Boolean).length;
    const estimatedDuration = Math.max(15, Math.round(wordCount / 2.5));

    // Step 8: Save metadata in Supabase DB
    const { error: updateError } = await supabase
      .from("blog_audio_summaries")
      .update({
        summary: summaryText,
        audio_url: audioUrl,
        duration: estimatedDuration,
        status: "completed",
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq("blog_id", blogId);

    if (updateError) {
      console.error(
        "Failed to update blog_audio_summaries status:",
        updateError
      );
    }

    return NextResponse.json({
      success: true,
      cached: false,
      summary: summaryText,
      audioUrl: audioUrl,
      duration: estimatedDuration,
      status: "completed",
    });
  } catch (error: any) {
    console.error("Audio Summary Generation Error:", error);

    // Mark status as failed in DB
    await supabase
      .from("blog_audio_summaries")
      .update({
        status: "failed",
        error_message: error?.message || "Generation failed",
        updated_at: new Date().toISOString(),
      })
      .eq("blog_id", blogId);

    return NextResponse.json(
      {
        success: false,
        status: "failed",
        error: "Unable to generate audio summary right now.",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}
