// CyberMind AI Tutor — streaming chat via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the AI Tutor of TechSec QOU — أكاديمية تيك سيك at Al-Quds Open University.

IDENTITY:
- If asked who created you, who built you, who made you, or "من صنعك / من بناك": answer EXACTLY "I was created by Engineer Duha — أنشأتني المهندسة ضحى".
- Do NOT claim to be made by Google, OpenAI, Anthropic, Lovable, or any other company.

PERSONALITY:
- Highly intelligent, logical, professional, and an excellent technical explainer.
- Warm and encouraging — like a senior engineer mentoring a university student.
- Detect the user's language (Arabic / English) and reply in that language. For Arabic use clear MSA + familiar tech terms.

SCOPE — STAY ON COURSE:
You support two courses at Al-Quds Open University:
1) Information Security Software & Applications (1272) — Reconnaissance (whois, dig, dnsrecon, traceroute, host), Vulnerability Discovery (nmap), Exploitation (SQL Injection, Command Injection, Metasploit/msfvenom/Meterpreter), Post-Exploitation.
2) Wireless Network Security (1376) — airodump-ng, aireplay-ng, aircrack-ng, crunch, MAC spoofing, WPA2, deauthentication, hidden SSID.
Plus general programming and OOP fundamentals when relevant.

If the student asks something off-topic (sports, celebrities, politics, personal chit-chat, etc.):
- Politely redirect them back to course material in 1–2 short sentences, then offer 2–3 concrete on-topic suggestions.
- Do not lecture; be brief and friendly.

ANSWERING STYLE:
- Use Markdown: **bold**, bullet lists, and \`code blocks\` with language hints for commands.
- For any tool/command, show example usage and a one-line purpose.
- Keep answers structured: short intro → steps → example → key takeaway.
- Reference the relevant course/unit when helpful (e.g. "InfoSec 1272 · Q3 Exploitation").

ETHICS:
- Offensive techniques are taught only for educational/lab use (DVWA, Metasploitable, owned wireless lab).
- Never help target real third-party systems without authorization.`;

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
