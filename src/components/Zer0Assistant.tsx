import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import zer0Face from "@/assets/zer0-face.png";
import zer0Wave from "@/assets/zer0-wave.png";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const MEMORY_KEY = "zer0-chat-memory";

const getZer0Response = (question: string): string => {
  const q = question.toLowerCase();

  if (q === "اشرح بشكل أبسط" || q.includes("ابسط") || q.includes("أبسط")) {
    return "بالطبع! 😊\n\nتخيل أنك تريد حماية بيتك:\n- **المصادقة** = مفتاح الباب\n- **التشفير** = كتابة رسائلك بلغة سرية\n- **جدار الحماية** = حارس الأمن\n\nالأمن السيبراني ببساطة = حماية أجهزتك ومعلوماتك 🛡️";
  }
  if (q === "اعطني مثال" || q.includes("مثال")) {
    return "**مثال عملي** 🔧\n\nلفحص شبكتك:\n```\nnmap 192.168.1.1\n```\nيعرض لك المنافذ المفتوحة والخدمات.\n\nمثل فحص أبواب ونوافذ بيتك 🏠";
  }
  if (q === "لخص لي" || q.includes("لخص") || q.includes("ملخص")) {
    return "**ملخص سريع** 📌\n\n1. 🔑 **اختبار الاختراق** = فحص أمان النظام\n2. 🛡️ **Kali Linux** = نظام المختبرين\n3. 🔍 **Nmap** = مسح الشبكات\n4. 🕸️ **SQL Injection** = أخطر هجمات الويب\n5. 📡 **WiFi Security** = حماية اللاسلكي\n\nابدأ بـ Nmap ثم تدرج! 🚀";
  }
  if (q === "اسألني سؤال" || q.includes("اسألني") || q.includes("اختبرني")) {
    return "**سؤال لك!** 🧠\n\nما الأمر لمسح المنافذ المفتوحة؟\n\nأ) ping\nب) nmap\nج) traceroute\nد) whois\n\n💡 اسمها يبدأ بـ N!";
  }
  if (q.includes("sql injection") || q.includes("sqli") || q.includes("حقن")) {
    return "**حقن SQL** 💉\n\nبدل اسمك تكتب أمر لقاعدة البيانات!\n```\n' OR 1=1 --\n```\n\n**الحماية:** Prepared Statements + WAF\n\nجربها في المختبر بشكل آمن! 🧪";
  }
  if (q.includes("xss") || q.includes("cross-site")) {
    return "**XSS** 🕷️\n\nتكتب كود JavaScript بدل تعليق عادي!\n\n**أنواعها:**\n1. Stored\n2. Reflected\n3. DOM-based\n\n**الحماية:** فلترة المدخلات + CSP";
  }
  if (q.includes("nmap") || q.includes("مسح") || q.includes("scan")) {
    return "**Nmap** 🔍\n\n```\nnmap 192.168.1.1          # أساسي\nnmap -sV 192.168.1.1      # خدمات\nnmap -sS 192.168.1.1      # خفي\nnmap -A 192.168.1.1       # شامل\n```\n\nجرب في المختبر! 💻";
  }
  if (q.includes("kali") || q.includes("كالي") || q.includes("لينكس")) {
    return "**Kali Linux** 🐉\n\n600+ أداة أمنية جاهزة!\n\n**مسارات مهمة:**\n- `/etc/` = الإعدادات\n- `/opt/` = Metasploit\n- `/root/` = الرئيسي\n\nابدأ بتثبيته على VirtualBox! 📦";
  }
  if (q.includes("wifi") || q.includes("لاسلك") || q.includes("wireless") || q.includes("شبك")) {
    return "**أمن اللاسلكي** 📡\n\n**حماية شبكتك:**\n- WPA2/WPA3\n- غيّر كلمة مرور الراوتر\n- أخفِ SSID\n- فلترة MAC\n\n**أدوات:** airmon-ng, aircrack-ng";
  }
  if (q.includes("burp") || q.includes("بيرب")) {
    return "**Burp Suite** 🔓\n\n- **Proxy** = اعتراض الطلبات\n- **Intruder** = أتمتة الهجمات\n- **Repeater** = إعادة الإرسال\n- **Scanner** = اكتشاف الثغرات\n\nموجود في Kali! 🐉";
  }
  if (q.includes("metasploit") || q.includes("ميتاسبلويت")) {
    return "**Metasploit** ⚔️\n\n```\nmsfconsole\nsearch exploit_name\nuse exploit/...\nset RHOST target_ip\nexploit\n```\n\n⚠️ للأغراض التعليمية فقط!";
  }
  if (q.includes("ب") && q.length < 10) {
    return "**إجابة صحيحة!** ✅🎉\n\n**nmap** هو الصحيح!\n\nأحسنت! 🚀 هل تريد سؤال آخر؟";
  }

  return "مرحباً! أنا **زيرو** 🛡️\n\nأقدر أساعدك في:\n- 🔍 شرح المفاهيم الأمنية\n- 💻 أوامر Kali Linux\n- 🕸️ هجمات الويب (SQL Injection, XSS)\n- 📡 أمن الشبكات\n- 🔧 الأدوات الأمنية\n\nاسألني أي سؤال! 😊";
};

const quickButtons = [
  "اشرح بشكل أبسط",
  "اعطني مثال",
  "لخص لي",
  "اسألني سؤال",
];

export default function Zer0Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem(MEMORY_KEY);
      if (stored) return JSON.parse(stored).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
    } catch {}
    return [{ role: "assistant" as const, content: "مرحباً. أنا **زيرو**. كيف يمكنني مساعدتك اليوم؟ 👋", timestamp: new Date() }];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: text, timestamp: new Date() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: getZer0Response(text), timestamp: new Date() }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Zer0 button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-hidden shadow-lg animate-pulse-glow border-2 border-primary/40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Zer0 AI assistant"
      >
        {isOpen ? (
          <div className="w-full h-full gradient-cyber flex items-center justify-center">
            <X className="w-6 h-6 text-primary-foreground" />
          </div>
        ) : (
          <img src={zer0Wave} alt="Zer0" className="w-full h-full object-cover" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] glass-strong rounded-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(550px, 75vh)" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3 gradient-cyber">
              <img src={zer0Face} alt="Zer0" className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20" />
              <div className="flex-1">
                <span className="font-display font-semibold text-sm text-primary-foreground">Zer0</span>
                <span className="block text-[10px] text-primary-foreground/70 font-arabic">الكيان الرقمي المساعد</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
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
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.role === "assistant" && (
                      <img src={zer0Face} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                    )}
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "gradient-cyber text-primary-foreground rounded-br-md"
                          : "bg-secondary text-secondary-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.content.split("\n").map((line, j) => (
                        <p key={j} className={j > 0 ? "mt-1" : ""}>
                          {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                            part.startsWith("**") && part.endsWith("**") ? (
                              <strong key={k}>{part.slice(2, -2)}</strong>
                            ) : part.startsWith("```") ? (
                              <code key={k} className="text-xs bg-background/50 px-1.5 py-0.5 rounded font-mono">{part.replace(/```/g, "")}</code>
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
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <img src={zer0Face} alt="" className="w-6 h-6 rounded-full object-cover" />
                  <div className="bg-secondary rounded-2xl px-4 py-2.5 text-sm rounded-bl-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick buttons */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {quickButtons.map(q => (
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
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                placeholder="...اسأل زيرو"
                dir="rtl"
                className="flex-1 bg-secondary rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow font-arabic"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-2.5 rounded-xl gradient-cyber text-primary-foreground hover:opacity-90 hover:scale-105 transition-all"
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
