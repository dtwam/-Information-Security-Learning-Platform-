// Export-ready component — Zer0 AI Companion floating chat widget
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import zer0Img from "@/assets/zer0-mascot.png";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ZER0_SYSTEM = `You are Zer0, a gender-neutral friendly AI companion for university cybersecurity students. You have cute curly hair and wear a black tech hoodie. Speak in simple, warm Arabic. Always encourage students, remember their progress, and link to university courses. Never change any official university explanations.`;

const getAIResponse = (question: string): string => {
  const q = question.toLowerCase();

  if (q === "اشرح بشكل أبسط" || q.includes("ابسط") || q.includes("أبسط"))
    return "بالطبع! 😊\n\nتخيل أنك تريد حماية بيتك:\n- **المصادقة** = مفتاح الباب\n- **التشفير** = كتابة رسائلك بلغة سرية\n- **جدار الحماية** = حارس الأمن\n\nالأمن السيبراني ببساطة = حماية أجهزتك ومعلوماتك من السرقة والاختراق 🛡️";

  if (q === "اعطني مثال" || q.includes("مثال"))
    return "**مثال عملي** 🔧\n\nلنفترض أنك تريد فحص شبكتك:\n\n```\nnmap 192.168.1.1\n```\n\nهذا الأمر يفحص جهاز الراوتر ويعرض لك:\n- المنافذ المفتوحة\n- الخدمات التي تعمل عليه\n\nمثل ما تفحص أبواب ونوافذ بيتك 🏠";

  if (q === "لخص لي" || q.includes("لخص") || q.includes("ملخص"))
    return "**ملخص سريع** 📌\n\n1. 🔑 **اختبار الاختراق** = فحص أمان النظام\n2. 🛡️ **Kali Linux** = نظام التشغيل الأساسي\n3. 🔍 **Nmap** = أداة مسح الشبكات\n4. 🕸️ **SQL Injection** = أخطر هجمات الويب\n5. 📡 **WiFi Security** = حماية الشبكات اللاسلكية\n\nابدأ بـ Nmap ثم انتقل تدريجياً! 🚀";

  if (q === "اسألني سؤال" || q.includes("اسألني") || q.includes("اختبرني"))
    return "**سؤال لك يا بطل!** 🧠\n\nما هو الأمر الذي يُستخدم لمسح المنافذ المفتوحة؟\n\nأ) ping\nب) nmap\nج) traceroute\nد) whois\n\n💡 **تلميح:** اسمها يبدأ بحرف N!\n\nاكتب إجابتك ✅";

  if (q.includes("sql injection") || q.includes("sqli") || q.includes("حقن"))
    return "**حقن SQL** 💉\n\nبدل ما تكتب اسمك، تكتب أمر لقاعدة البيانات!\n\n```\n' OR 1=1 --\n```\n\n**الحماية:**\n- استخدم Prepared Statements\n- تحقق من المدخلات\n- استخدم WAF\n\nجربها في المختبر بشكل آمن! 🧪";

  if (q.includes("xss") || q.includes("cross-site"))
    return "**XSS - البرمجة عبر المواقع** 🕷️\n\nتكتب كود JavaScript بدل نص عادي!\n\n**أنواعها:**\n1. **Stored** = يتخزن في الموقع\n2. **Reflected** = يرجع من الخادم\n3. **DOM-based** = يشتغل في المتصفح\n\n**الحماية:**\n- فلترة المدخلات\n- Content Security Policy\n- HTTPOnly Cookies";

  if (q.includes("nmap") || q.includes("مسح") || q.includes("scan"))
    return "**Nmap - ماسح الشبكات** 🔍\n\n```\nnmap 192.168.1.1          # مسح أساسي\nnmap -sV 192.168.1.1      # اكتشاف الخدمات\nnmap -sS 192.168.1.1      # مسح سريع وخفي\nnmap -A 192.168.1.1       # مسح شامل\n```\n\nجرب في المختبر! 💻";

  if (q.includes("kali") || q.includes("كالي") || q.includes("لينكس"))
    return "**Kali Linux** 🐉\n\n- يحتوي 600+ أداة أمنية جاهزة\n- مجاني ومفتوح المصدر\n- مبني على Debian\n\n**مسارات مهمة:**\n- `/etc/` = ملفات الإعدادات\n- `/opt/` = أدوات Metasploit\n\nابدأ بتثبيته على VirtualBox! 📦";

  if (q.includes("wifi") || q.includes("لاسلك") || q.includes("wireless") || q.includes("شبك"))
    return "**أمن الشبكات اللاسلكية** 📡\n\n1. 🔑 المصادقة\n2. 🔒 السرية\n3. ✅ التكاملية\n\n**الحماية:**\n- استخدم WPA2/WPA3\n- غيّر كلمة مرور الراوتر الافتراضية\n- أخفِ SSID\n- فعّل فلترة MAC";

  if (q.includes("burp") || q.includes("بيرب"))
    return "**Burp Suite** 🔓\n\n- **Proxy** = يقاطع الطلبات\n- **Intruder** = يؤتمت الهجمات\n- **Repeater** = يعيد إرسال الطلبات\n- **Scanner** = يكتشف الثغرات\n\nموجود في Kali Linux 🐉";

  if (q.includes("metasploit") || q.includes("ميتاسبلويت"))
    return "**Metasploit Framework** ⚔️\n\n```\nmsfconsole\nsearch exploit_name\nuse exploit/...\nset RHOST target_ip\nexploit\n```\n\n⚠️ للأغراض التعليمية والأخلاقية فقط!";

  if (q.includes("ب") && q.length < 10)
    return "**إجابة صحيحة!** ✅🎉\n\n**nmap** هو الأمر الصحيح!\n\nأحسنت! أنت في طريقك لتصبح خبير أمن سيبراني 🚀";

  return "مرحباً! 👋 أنا **Zer0** — مساعدك في الأمن السيبراني 🛡️\n\nأقدر أساعدك في:\n- 🔍 شرح أي مفهوم أمني\n- 💻 أوامر Kali Linux\n- 🕸️ هجمات الويب (SQL Injection, XSS)\n- 📡 أمن الشبكات اللاسلكية\n- 🔧 الأدوات الأمنية\n\nاسألني أي سؤال! 😊";
};

const quickQuestionsAr = ["اشرح بشكل أبسط", "اعطني مثال", "لخص لي", "اسألني سؤال"];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! 👋 أنا **Zer0** — مساعدك الذكي في الأمن السيبراني\n\nاسألني أي سؤال عن المقرر وسأشرحه لك بطريقة بسيطة! 😊",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: text, timestamp: new Date() }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages((prev) => [...prev, { role: "assistant", content: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Zer0 button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center animate-pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Zer0 assistant"
        style={{ background: "hsl(220 15% 6%)", border: "2px solid hsl(185 100% 50% / 0.4)" }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <img src={zer0Img} alt="Zer0" className="w-12 h-12 rounded-full object-contain" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] glass-strong rounded-2xl overflow-hidden flex flex-col neon-border"
            style={{ maxHeight: "min(550px, 75vh)" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-card/90">
              <img src={zer0Img} alt="Zer0" className="w-8 h-8 rounded-full object-contain" />
              <div className="flex-1">
                <span className="font-display font-semibold text-sm text-primary">Zer0</span>
                <span className="text-[10px] text-muted-foreground block font-arabic">مساعدك الذكي</span>
              </div>
              <div className="relative">
                <Sparkles className="w-4 h-4 text-primary" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyber-success animate-pulse" />
              </div>
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
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-1" : ""}>
                        {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={k}>{part.slice(2, -2)}</strong>
                          ) : part.startsWith("```") ? (
                            <code key={k} className="text-xs bg-background/50 px-1.5 py-0.5 rounded font-mono">
                              {part.replace(/```/g, "")}
                            </code>
                          ) : (
                            <span key={k}>{part}</span>
                          )
                        )}
                      </p>
                    ))}
                    <div className="text-[10px] opacity-40 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-2xl px-4 py-2.5 text-sm rounded-bl-md flex items-center gap-1.5">
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
              {quickQuestionsAr.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-secondary text-secondary-foreground text-xs hover:bg-primary/10 hover:text-primary transition-all hover:scale-105 font-arabic font-medium"
                  dir="rtl"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="...اسأل Zer0"
                dir="rtl"
                className="flex-1 bg-secondary rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow font-arabic"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 transition-all"
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
