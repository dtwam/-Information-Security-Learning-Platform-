import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import cyberMindLogo from "@/assets/cybermind-logo.png";
import { useLanguage } from "@/hooks/useLanguage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const MEMORY_KEY = "cybermind-chat-memory";
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function CyberMindAssistant() {
  const { t, lang, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem(MEMORY_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Localized greeting (only show when no memory)
  const displayMessages: Message[] = messages.length > 0
    ? messages
    : [{ role: "assistant", content: t("chat.greeting") }];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isStreaming]);
  useEffect(() => { localStorage.setItem(MEMORY_KEY, JSON.stringify(messages)); }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;
    setError(null);
    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setIsStreaming(true);

    abortRef.current = new AbortController();
    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next, lang }),
        signal: abortRef.current.signal,
      });

      if (resp.status === 429) { setError(t("chat.error.rate")); setIsStreaming(false); return; }
      if (resp.status === 402) { setError(t("chat.error.payment")); setIsStreaming(false); return; }
      if (!resp.ok || !resp.body) { setError(t("chat.error.generic")); setIsStreaming(false); return; }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { value, done: rDone } = await reader.read();
        if (rDone) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantSoFar += delta;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") setError(t("chat.error.generic"));
    } finally {
      setIsStreaming(false);
    }
  };

  const quickButtons = [
    t("chat.quick.simpler"),
    t("chat.quick.example"),
    t("chat.quick.summary"),
    t("chat.quick.quiz"),
  ];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl overflow-hidden shadow-[0_0_30px_hsl(var(--primary)/0.5)] border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-xl"
        whileHover={{ scale: 1.08, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open CyberMind AI"
      >
        {isOpen ? (
          <div className="w-full h-full gradient-cyber flex items-center justify-center">
            <X className="w-6 h-6 text-primary-foreground" />
          </div>
        ) : (
          <img src={cyberMindLogo} alt="CyberMind" className="w-full h-full object-contain p-1.5" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] glass-strong rounded-3xl overflow-hidden flex flex-col border border-primary/20"
            style={{ maxHeight: "min(620px, 78vh)" }}
            dir={dir}
          >
            <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-gradient-to-r from-primary/15 via-accent/10 to-transparent">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-background/40">
                <img src={cyberMindLogo} alt="" className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm flex items-center gap-1.5">
                  CyberMind <Sparkles className="w-3 h-3 text-primary" />
                </div>
                <div className="text-[10px] text-muted-foreground truncate">{t("chat.title")}</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgb(52_211_153)]" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide" style={{ minHeight: 200 }}>
              {displayMessages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "gradient-cyber text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-pre:my-2 prose-pre:bg-background/50 prose-code:text-xs prose-headings:my-2">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isStreaming && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>CyberMind…</span>
                </div>
              )}
              {error && (
                <div className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</div>
              )}
              <div ref={endRef} />
            </div>

            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {quickButtons.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  disabled={isStreaming}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-secondary text-secondary-foreground text-xs hover:bg-primary/10 hover:text-primary transition-all hover:scale-105 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder={t("chat.placeholder")}
                disabled={isStreaming}
                className="flex-1 bg-secondary rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow disabled:opacity-50"
              />
              <button
                onClick={() => send(input)}
                disabled={isStreaming || !input.trim()}
                className="p-2.5 rounded-xl gradient-cyber text-primary-foreground hover:opacity-90 hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send"
              >
                {isStreaming ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
