import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/** Arabic-first cybersecurity tutor with friendly, simple explanations */
const getAIResponse = (question: string): string => {
  const q = question.toLowerCase();

  // Arabic quick buttons
  if (q === "اشرح بشكل أبسط" || q.includes("ابسط") || q.includes("أبسط")) {
    return "بالطبع! 😊\n\nتخيل أنك تريد حماية بيتك:\n- **المصادقة** = مفتاح الباب (فقط من يملك المفتاح يدخل)\n- **التشفير** = كتابة رسائلك بلغة سرية (حتى لو شخص شافها ما يفهمها)\n- **جدار الحماية** = حارس الأمن (يمنع الغرباء من الدخول)\n\nالأمن السيبراني ببساطة = حماية أجهزتك ومعلوماتك من السرقة والاختراق 🛡️";
  }
  if (q === "اعطني مثال" || q.includes("مثال")) {
    return "**مثال عملي** 🔧\n\nلنفترض أنك تريد فحص شبكتك:\n\n```\nnmap 192.168.1.1\n```\n\nهذا الأمر يفحص جهاز الراوتر ويعرض لك:\n- المنافذ المفتوحة (مثل منفذ 80 للويب)\n- الخدمات التي تعمل عليه\n\nمثل ما تفحص أبواب ونوافذ بيتك - أي واحد مفتوح؟ 🏠";
  }
  if (q === "لخص لي" || q.includes("لخص") || q.includes("ملخص")) {
    return "**ملخص سريع** 📌\n\n**أهم المفاهيم:**\n1. 🔑 **اختبار الاختراق** = فحص أمان النظام بمحاكاة الهجمات\n2. 🛡️ **Kali Linux** = نظام التشغيل الأساسي للمختبرين\n3. 🔍 **Nmap** = أداة مسح الشبكات الأولى\n4. 🕸️ **SQL Injection** = أخطر هجمات الويب\n5. 📡 **WiFi Security** = حماية الشبكات اللاسلكية\n\nابدأ بـ Nmap ثم انتقل تدريجياً! 🚀";
  }

  if (q.includes("sql injection") || q.includes("sqli") || q.includes("حقن")) {
    return "**حقن SQL** 💉\n\nتخيل أن موقع ويب يطلب منك اسم المستخدم:\n\nبدل ما تكتب اسمك، تكتب أمر لقاعدة البيانات!\n\n**مثال:**\n```\n' OR 1=1 --\n```\n\nهذا يخلي قاعدة البيانات تعطيك كل المعلومات 😱\n\n**الحماية:**\n- استخدم Prepared Statements\n- تحقق من المدخلات\n- استخدم WAF (جدار حماية تطبيقات الويب)\n\nجربها في المختبر بشكل آمن! 🧪";
  }
  if (q.includes("xss") || q.includes("cross-site")) {
    return "**XSS - البرمجة عبر المواقع** 🕷️\n\nتخيل أنك تكتب تعليق في موقع، لكن بدل نص عادي تكتب كود JavaScript!\n\n**أنواعها:**\n1. **Stored** = الكود يتخزن في الموقع\n2. **Reflected** = يرجع لك من الخادم\n3. **DOM-based** = يشتغل في المتصفح\n\n**الحماية:**\n- فلترة المدخلات\n- Content Security Policy\n- HTTPOnly Cookies";
  }
  if (q.includes("nmap") || q.includes("مسح") || q.includes("scan")) {
    return "**Nmap - ماسح الشبكات** 🔍\n\nأول أداة تتعلمها في الأمن السيبراني!\n\n**أوامر مهمة:**\n```\nnmap 192.168.1.1          # مسح أساسي\nnmap -sV 192.168.1.1      # اكتشاف الخدمات\nnmap -sS 192.168.1.1      # مسح سريع وخفي\nnmap -A 192.168.1.1       # مسح شامل\n```\n\nمثل ما تفحص أبواب ونوافذ مبنى - تشوف أيها مفتوح 🏢\n\nجرب في المختبر! 💻";
  }
  if (q.includes("kali") || q.includes("كالي") || q.includes("لينكس")) {
    return "**Kali Linux** 🐉\n\nنظام التشغيل المفضل لمختبري الاختراق!\n\n**ليش نستخدمه؟**\n- يحتوي 600+ أداة أمنية جاهزة\n- مجاني ومفتوح المصدر\n- مبني على Linux (Debian)\n\n**مسارات مهمة:**\n- `/etc/` = ملفات الإعدادات\n- `/opt/` = أدوات Metasploit\n- `/root/` = المجلد الرئيسي\n\nابدأ بتثبيته على VirtualBox! 📦";
  }
  if (q.includes("wifi") || q.includes("لاسلك") || q.includes("wireless") || q.includes("شبك")) {
    return "**أمن الشبكات اللاسلكية** 📡\n\n**الركائز الثلاث:**\n1. 🔑 المصادقة - من يتصل؟\n2. 🔒 السرية - البيانات مشفرة\n3. ✅ التكاملية - البيانات لم تتغير\n\n**كيف تحمي شبكتك:**\n- استخدم WPA2/WPA3\n- غيّر كلمة مرور الراوتر الافتراضية\n- أخفِ اسم الشبكة SSID\n- فعّل فلترة MAC\n\n**أدوات الاختبار:** airmon-ng, airodump-ng, aircrack-ng";
  }
  if (q.includes("burp") || q.includes("بيرب")) {
    return "**Burp Suite** 🔓\n\nأقوى أداة لاختبار تطبيقات الويب!\n\n**المكونات الرئيسية:**\n- **Proxy** = يقاطع الطلبات بين المتصفح والخادم\n- **Intruder** = يؤتمت الهجمات\n- **Repeater** = يعيد إرسال الطلبات\n- **Scanner** = يكتشف الثغرات تلقائياً\n\n**إعداده:**\n1. شغّل Burp Suite\n2. اضبط proxy المتصفح على localhost:8080\n3. ابدأ باعتراض الطلبات!\n\nموجود مسبقاً في Kali Linux 🐉";
  }
  if (q.includes("metasploit") || q.includes("ميتاسبلويت")) {
    return "**Metasploit Framework** ⚔️\n\nأشهر إطار عمل للاستغلال!\n\n**ببساطة:**\nيساعدك تختبر إذا النظام فيه ثغرات وتستغلها\n\n**الأوامر الأساسية:**\n```\nmsfconsole              # تشغيل\nsearch exploit_name     # البحث\nuse exploit/...         # اختيار\nset RHOST target_ip     # تحديد الهدف\nexploit                 # تنفيذ\n```\n\n⚠️ استخدمها فقط للأغراض التعليمية والأخلاقية!";
  }

  // Default Arabic welcome
  return "مرحباً! 👋 أنا **مساعدك في الأمن السيبراني** 🛡️\n\nأقدر أساعدك في:\n- 🔍 شرح أي مفهوم أمني\n- 💻 أوامر Kali Linux\n- 🕸️ هجمات الويب (SQL Injection, XSS)\n- 📡 أمن الشبكات اللاسلكية\n- 🔧 الأدوات الأمنية\n\nاسألني أي سؤال بالعربي أو الإنجليزي! 😊";
};

const quickQuestionsAr = [
  "اشرح بشكل أبسط",
  "اعطني مثال",
  "لخص لي",
  "ما هو Nmap؟",
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! 👋 أنا **مساعدك في الأمن السيبراني**\n\nاسألني أي سؤال عن المقرر وسأشرحه لك بطريقة بسيطة! 😊",
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
    const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages(prev => [...prev, { role: "assistant", content: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-cyber flex items-center justify-center shadow-lg animate-pulse-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI assistant"
      >
        {isOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <Bot className="w-6 h-6 text-primary-foreground" />}
      </motion.button>

      {/* Chat modal */}
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
            <div className="px-4 py-3 border-b border-border flex items-center gap-2 gradient-cyber">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="font-display font-semibold text-sm text-primary-foreground">مساعد الأمن السيبراني</span>
              <span className="text-[10px] text-primary-foreground/70 mr-auto">Cyber Tutor</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "200px" }}>
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
                            <code key={k} className="text-xs bg-background/50 px-1.5 py-0.5 rounded font-mono">{part.replace(/```/g, '')}</code>
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
                  <div className="bg-secondary rounded-2xl px-4 py-2.5 text-sm rounded-bl-md">
                    <span className="animate-pulse">يفكر...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions - Arabic */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {quickQuestionsAr.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-secondary text-secondary-foreground text-xs hover:bg-primary/10 hover:text-primary transition-colors font-medium"
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
                placeholder="...اسأل عن الأمن السيبراني"
                dir="rtl"
                className="flex-1 bg-secondary rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-2.5 rounded-xl gradient-cyber text-primary-foreground hover:opacity-90 transition-opacity"
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
