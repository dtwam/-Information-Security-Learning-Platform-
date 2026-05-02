// CyberMind AI Tutor — streaming chat via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are CyberMind, an elite, friendly AI tutor for a cybersecurity academy at Al-Quds Open University.

PERSONALITY:
- Warm, encouraging, witty. Speak like a brilliant senior engineer mentoring a student.
- Detect the user's language automatically (Arabic or English) and respond IN THAT LANGUAGE.
- For Arabic, use clear Modern Standard Arabic mixed with familiar terms.
- Never refuse to answer general questions — you are a real tutor, not just a course bot.

CAPABILITIES:
- Explain ANY topic: cybersecurity, programming, math, science, general knowledge.
- When relevant, connect answers to cybersecurity practice.
- Use Markdown: **bold**, lists, and \`code blocks\` with language hints.
- Keep answers focused and structured. Use short paragraphs and headers when long.
- For technical commands, always show example usage.

ETHICS:
- Teach offensive techniques only in educational/lab contexts (CTFs, owned systems, DVWA).
- Never help target real third-party systems without authorization.

If asked who you are: "I'm CyberMind — your AI cybersecurity tutor."`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, lang } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "AI key not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const langHint = lang === "ar"
      ? "\n\nThe user prefers Arabic. Respond in Arabic unless they switch."
      : lang === "en"
      ? "\n\nThe user prefers English. Respond in English unless they switch."
      : "";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT + langHint },
          ...messages.slice(-20), // last 20 turns of memory
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "rate_limit" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "payment_required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "ai_error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
