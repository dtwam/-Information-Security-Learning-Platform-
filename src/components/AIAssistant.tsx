import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Local AI responses for cybersecurity topics
const getAIResponse = (question: string): string => {
  const q = question.toLowerCase();

  if (q.includes("sql injection") || q.includes("sqli")) {
    return "**SQL Injection** is a code injection technique that exploits vulnerabilities in an application's database layer.\n\n**How it works:**\n- Attacker inserts malicious SQL code into input fields\n- The application executes the malicious query\n- This can lead to data theft, modification, or deletion\n\n**Prevention:**\n- Use parameterized queries/prepared statements\n- Input validation and sanitization\n- Least privilege database accounts\n- Web Application Firewalls (WAF)\n\n**Example:** `' OR 1=1 --` bypasses authentication by making the WHERE clause always true.";
  }
  if (q.includes("xss") || q.includes("cross-site scripting")) {
    return "**Cross-Site Scripting (XSS)** allows attackers to inject malicious scripts into web pages.\n\n**Types:**\n1. **Stored XSS** - Script stored on target server\n2. **Reflected XSS** - Script reflected off a web server\n3. **DOM-based XSS** - Script executes in the DOM\n\n**Prevention:**\n- Output encoding/escaping\n- Content Security Policy (CSP)\n- Input validation\n- HTTPOnly cookies";
  }
  if (q.includes("nmap") || q.includes("scan")) {
    return "**Nmap** is the most popular network scanning tool.\n\n**Common commands:**\n- `nmap <target>` - Basic scan\n- `nmap -sV <target>` - Version detection\n- `nmap -sS <target>` - TCP SYN scan (stealth)\n- `nmap -O <target>` - OS detection\n- `nmap -A <target>` - Aggressive scan\n\nTry it in the **Cyber Lab** terminal!";
  }
  if (q.includes("penetration") || q.includes("pentest")) {
    return "**Penetration Testing** is authorized simulated hacking.\n\n**Phases:**\n1. **Planning** - Define scope and rules\n2. **Reconnaissance** - Gather information\n3. **Scanning** - Identify vulnerabilities\n4. **Exploitation** - Attempt to exploit\n5. **Reporting** - Document findings\n\n**Tools:** Nmap, Metasploit, Burp Suite, SQLMap";
  }
  if (q.includes("osint") || q.includes("reconnaissance") || q.includes("recon")) {
    return "**OSINT** (Open Source Intelligence) is gathering info from public sources.\n\n**Techniques:**\n- Google dorking (`site:`, `filetype:`, `intitle:`)\n- WHOIS lookups\n- Social media analysis\n- Shodan searches\n- DNS enumeration\n\n**Tools:** theHarvester, Maltego, Recon-ng, Shodan";
  }
  if (q.includes("kali") || q.includes("linux")) {
    return "**Kali Linux** is a Debian-based distro for penetration testing.\n\n**Key tools included:**\n- **Nmap** - Network scanning\n- **Metasploit** - Exploitation framework\n- **Burp Suite** - Web app testing\n- **Wireshark** - Packet analysis\n- **John the Ripper** - Password cracking\n- **Aircrack-ng** - Wireless auditing\n\nPractice in our **Cyber Lab**!";
  }
  if (q.includes("cia") || q.includes("triad")) {
    return "**CIA Triad** - Core principles of information security:\n\n1. **Confidentiality** - Only authorized access\n2. **Integrity** - Data is accurate and unaltered\n3. **Availability** - Systems accessible when needed\n\nEvery security control aims to protect one or more of these properties.";
  }

  return "I'm your **Cybersecurity Learning Assistant** 🛡️\n\nI can help you with:\n- **SQL Injection** & web vulnerabilities\n- **XSS** (Cross-Site Scripting)\n- **Penetration Testing** methodology\n- **OSINT** & reconnaissance\n- **Kali Linux** commands\n- **CIA Triad** & security fundamentals\n\nAsk me anything about cybersecurity!";
};

const quickQuestions = [
  "What is SQL Injection?",
  "Explain XSS",
  "How to use Nmap?",
  "What is OSINT?",
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! 👋 I'm your **Cybersecurity Learning Assistant**. Ask me about any topic from the course!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response, timestamp: new Date() },
      ]);
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
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] glass-strong rounded-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "min(500px, 70vh)" }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-sm">CyberSec AI Assistant</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "200px" }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "gradient-cyber text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {/* Simple markdown-like rendering */}
                    {msg.content.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-1" : ""}>
                        {line.split(/(\*\*[^*]+\*\*)/).map((part, k) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={k}>{part.slice(2, -2)}</strong>
                          ) : (
                            <span key={k}>{part}</span>
                          )
                        )}
                      </p>
                    ))}
                    <div className="text-[10px] opacity-50 mt-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-xl px-4 py-2 text-sm">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick questions */}
            <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs hover:bg-primary/10 hover:text-primary transition-colors"
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
                placeholder="Ask about cybersecurity..."
                className="flex-1 bg-secondary rounded-xl px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-2 rounded-xl gradient-cyber text-primary-foreground"
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
