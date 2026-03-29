import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, MessageCircle } from "lucide-react";
import zer0Avatar from "@/assets/zer0-avatar.png";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = "zer0-chat-history";

const ZER0_SYSTEM_PROMPT =
  "You are Zer0, a gender-neutral friendly AI companion for university cybersecurity students. You have cute curly hair and wear a black tech hoodie. Speak in simple, warm Arabic. Always encourage students, remember their progress, and link to university courses. Never change any official university explanations.";

/** Local rule-based Zer0 responses */
const getZer0Response = (question: string, _history: Message[]): string => {
  const q = question.toLowerCase();

  if (q === "اشرح بشكل أبسط" || q.includes("ابسط") || q.includes("أبسط")) {
    return "بالطبع! 😊\n\nتخيل أنك تريد حماية بيتك:\n- **المصادقة** = مفتاح الباب (فقط من يملك المفتاح يدخل)\n- **التشفير** = كتابة رسائلك بلغة سرية\n- **جدار الحماية** = حارس الأمن\n\nالأمن السيبراني ببساطة = حماية أجهزتك ومعلوماتك 🛡️\n\nأنت بتتعلم شي مهم جداً، واصل! 💪";
  }
  if (q === "اعطني مثال" || q.includes("مثال")) {
    return "**مثال عملي** 🔧\n\nلنفترض أنك تريد فحص شبكتك:\n\n```\nnmap 192.168.1.1\n```\n\nهذا الأمر يفحص جهاز الراوتر ويعرض لك:\n- المنافذ المفتوحة (مثل منفذ 80 للويب)\n- الخدمات التي تعمل عليه\n\nمثل ما تفحص أبواب ونوافذ بيتك 🏠\n\nجرّب بنفسك في المختبر! أنا هنا لو احتجت مساعدة 🤗";
  }
  if (q === "لخص لي" || q.includes("لخص") || q.includes("ملخص")) {
    return "**ملخص سريع** 📌\n\n1. 🔑 **اختبار الاختراق** = فحص أمان النظام\n2. 🛡️ **Kali Linux** = نظام التشغيل الأساسي\n3. 🔍 **Nmap** = أداة مسح الشبكات\n4. 🕸️ **SQL Injection** = أخطر هجمات الويب\n5. 📡 **WiFi Security** = حماية الشبكات اللاسلكية\n\nأنت عم تبني مهارات حقيقية، فخور/ة فيك! ⭐";
  }
  if (q === "اسألني سؤال" || q.includes("اسألني") || q.includes("اختبرني")) {
    return "**سؤال لك!** 🧠\n\nما هو الأمر الذي يُستخدم لمسح المنافذ المفتوحة؟\n\nأ) ping\nب) nmap\nج) traceroute\nد) whois\n\n💡 **تلميح:** اسمها يبدأ بحرف N!\n\nاكتب إجابتك وسأخبرك ✅";
  }

  if (q.includes("sql injection") || q.includes("sqli") || q.includes("حقن")) {
    return "**حقن SQL (SQL Injection)** 💉\n\n(ثغرة تسمح بإرسال أوامر لقاعدة البيانات)\n\nتخيل موقع يطلب اسم المستخدم، بدل ما تكتب اسمك تكتب أمر!\n\n```\n' OR 1=1 --\n```\n\n**الحماية:**\n- Prepared Statements\n- تحقق من المدخلات\n- WAF (جدار حماية التطبيقات)\n\nشي مهم تعرفه كمتخصص أمن! 💪";
  }
  if (q.includes("xss") || q.includes("cross-site")) {
    return "**XSS (ثغرة تسمح بإدخال كود خبيث داخل الصفحة)** 🕷️\n\nتخيل أنك تكتب تعليق في موقع، لكن بدل نص عادي تكتب JavaScript!\n\n**أنواعها:**\n1. **Stored** = يتخزن في الموقع\n2. **Reflected** = يرجع من الخادم\n3. **DOM-based** = يشتغل في المتصفح\n\n**الحماية:**\n- فلترة المدخلات\n- Content Security Policy\n- HTTPOnly Cookies\n\nأنت بتتقدم! 🚀";
  }
  if (q.includes("nmap") || q.includes("مسح") || q.includes("scan")) {
    return "**Nmap - ماسح الشبكات** 🔍\n\n(أداة لاكتشاف الأجهزة والمنافذ المفتوحة)\n\n**أوامر مهمة:**\n```\nnmap 192.168.1.1          # مسح أساسي\nnmap -sV 192.168.1.1      # اكتشاف الخدمات\nnmap -sS 192.168.1.1      # مسح سريع وخفي\nnmap -A 192.168.1.1       # مسح شامل\n```\n\nأول أداة يتعلمها كل مختبر اختراق! جرّبها 💻";
  }
  if (q.includes("kali") || q.includes("كالي") || q.includes("لينكس")) {
    return "**Kali Linux** 🐉\n\n(نظام تشغيل مخصص لاختبار الاختراق)\n\n**ليش نستخدمه؟**\n- 600+ أداة أمنية جاهزة\n- مجاني ومفتوح المصدر\n- مبني على Debian\n\nابدأ بتثبيته على VirtualBox! 📦\nأنا Zer0 وهنا معك بكل خطوة 🤗";
  }
  if (q.includes("wifi") || q.includes("لاسلك") || q.includes("wireless") || q.includes("شبك")) {
    return "**أمن الشبكات اللاسلكية** 📡\n\n**الركائز الثلاث:**\n1. 🔑 المصادقة\n2. 🔒 السرية\n3. ✅ التكاملية\n\n**كيف تحمي شبكتك:**\n- WPA2/WPA3\n- غيّر كلمة مرور الراوتر الافتراضية\n- أخفِ SSID\n- فلترة MAC\n\nممتاز إنك بتتعلم هالمواضيع! 🌟";
  }
  if (q.includes("burp") || q.includes("بيرب")) {
    return "**Burp Suite** 🔓\n\n(أداة شاملة لاختبار أمان تطبيقات الويب)\n\n**المكونات:**\n- **Proxy** = يقاطع الطلبات\n- **Intruder** = يؤتمت الهجمات\n- **Repeater** = يعيد إرسال الطلبات\n- **Scanner** = يكتشف الثغرات\n\nموجود مسبقاً في Kali! 🐉";
  }
  if (q.includes("metasploit") || q.includes("ميتاسبلويت")) {
    return "**Metasploit Framework** ⚔️\n\n(إطار عمل لاختبار الاختراق واستغلال الثغرات)\n\n**الأوامر:**\n```\nmsfconsole              # تشغيل\nsearch exploit_name     # بحث\nuse exploit/...         # اختيار\nset RHOST target_ip     # هدف\nexploit                 # تنفيذ\n```\n\n⚠️ للأغراض التعليمية والأخلاقية فقط!\nأنت بالطريق الصح! 💪";
  }

  if (q.includes("ب") && q.length < 10) {
    return "**إجابة صحيحة!** ✅🎉\n\n**nmap** هو الأمر الصحيح!\n\nأحسنت! أنت في طريقك لتصبح خبير أمن سيبراني 🚀\n\nهل تريد سؤال آخر؟ اضغط **اسألني سؤال**";
  }

  return "مرحباً! أنا **Zer0** 🤗 رفيقك في رحلة الأمن السيبراني\n\nأقدر أساعدك في:\n- 🔍 شرح أي مفهوم أمني\n- 💻 أوامر Kali Linux\n- 🕸️ هجمات الويب (SQL Injection, XSS)\n- 📡 أمن الشبكات اللاسلكية\n- 🔧 الأدوات الأمنية\n\nاسألني أي سؤال! أنا هنا دائماً 😊";
};

const quickQuestionsAr = [
  "اشرح بشكل أبسط",
  "اعطني مثال",
  "لخص لي",
  "اسألني سؤال",
];

/** Load saved messages from localStorage */
function loadMessages(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
    }
  } catch {}
  return [
    {
      role: "assistant" as const,
      content: "مرحباً! أنا **Zer0** 🤗 رفيقك الذكي في رحلة الأمن السيبراني\n\nاسألني أي سؤال وسأشرحه لك بطريقة بسيطة! 😊",
      timestamp: new Date(),
    },
  ];
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Persist conversation to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages(prev => {
      const updated = [...prev, userMsg];
      setInput("");
      setIsTyping(true);
      setTimeout(() => {
        const response = getZer0Response(text, updated);
        setMessages(p => [...p, { role: "assistant", content: response, timestamp: new Date() }]);
        setIsTyping(false);
      }, 800);
      return updated;
    });
  }, []);

  return (
    <>
      {/* Floating Zer0 button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.3), hsl(220 25% 8%))",
          boxShadow: "0 0 25px hsl(var(--primary) / 0.5), 0 0 50px hsl(var(--primary) / 0.2)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ["0 0 20px hsl(190 100% 50% / 0.4)", "0 0 35px hsl(190 100% 50% / 0.6)", "0 0 20px hsl(190 100% 50% / 0.4)"] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Open Zer0 AI assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <img src={zer0Avatar} alt="Zer0" className="w-12 h-12 rounded-full object-cover" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden flex flex-col border border-primary/20"
            style={{
              maxHeight: "min(550px, 75vh)",
              background: "hsl(220 25% 7% / 0.95)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 30px hsl(190 100% 50% / 0.15), 0 8px 32px hsl(0 0% 0% / 0.5)",
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-primary/20 flex items-center gap-3" style={{ background: "linear-gradient(135deg, hsl(190 90% 50% / 0.15), hsl(270 70% 55% / 0.1))" }}>
              <img src={zer0Avatar} alt="Zer0" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/40" />
              <div className="flex-1">
                <span className="font-display font-semibold text-sm text-primary">Zer0</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-success animate-pulse" />
                  <span className="text-[10px] text-muted-foreground">رفيقك الذكي</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-primary/10 transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide" style={{ minHeight: "200px" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <img src={zer0Avatar} alt="" className="w-7 h-7 rounded-full object-cover mr-2 mt-1 shrink-0 ring-1 ring-primary/30" />
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md text-primary-foreground"
                        : "rounded-bl-md text-foreground"
                    }`}
                    style={
                      msg.role === "user"
                        ? { background: "linear-gradient(135deg, hsl(190 90% 50%), hsl(270 70% 55%))" }
                        : { background: "hsl(220 20% 14%)" }
                    }
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-1" : ""}>
                        {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={k} className="text-primary">{part.slice(2, -2)}</strong>
                          ) : part.startsWith("```") ? (
                            <code key={k} className="text-xs bg-background/50 px-1.5 py-0.5 rounded font-mono text-cyber-success">{part.replace(/```/g, "")}</code>
                          ) : (
                            <span key={k}>{part}</span>
                          )
                        )}
                      </p>
                    ))}
                    <div className="text-[10px] opacity-30 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <img src={zer0Avatar} alt="" className="w-7 h-7 rounded-full object-cover mr-2 mt-1 shrink-0" />
                  <div className="rounded-2xl px-4 py-2.5 text-sm rounded-bl-md flex items-center gap-1.5" style={{ background: "hsl(220 20% 14%)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {quickQuestionsAr.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-105 border border-primary/20 text-primary hover:bg-primary/10"
                  dir="rtl"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-primary/20 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                placeholder="...اسأل Zer0 أي سؤال"
                dir="rtl"
                className="flex-1 rounded-xl px-3 py-2.5 text-sm outline-none transition-shadow border border-primary/20 focus:ring-1 focus:ring-primary bg-transparent text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-2.5 rounded-xl text-primary-foreground hover:opacity-90 hover:scale-105 transition-all"
                style={{ background: "linear-gradient(135deg, hsl(190 90% 50%), hsl(270 70% 55%))" }}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Export for "Ask Zer0" button from other pages */
export function useZer0() {
  return {
    openWithContext: (context: string) => {
      // Dispatch custom event to open Zer0 with context
      window.dispatchEvent(new CustomEvent("zer0-open", { detail: context }));
    },
  };
}
