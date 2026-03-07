import { useState, useRef, useEffect, useCallback } from "react";
import { terminalCommands } from "@/data/courseData";

export default function KaliTerminal() {
  const [history, setHistory] = useState<Array<{ type: "input" | "output" | "explanation"; text: string }>>([
    { type: "output", text: "Welcome to Kali Linux Terminal Simulator" },
    { type: "output", text: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Add input line
    const newHistory = [...history, { type: "input" as const, text: `student@kali:~$ ${cmd}` }];

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    // Find matching command (exact or partial)
    const match = Object.keys(terminalCommands).find(
      (key) => trimmed === key || trimmed.startsWith(key.split(" ")[0])
    );

    if (match && terminalCommands[match]) {
      const { output, explanation } = terminalCommands[match] || terminalCommands[trimmed] || { output: "", explanation: "" };
      const actualData = terminalCommands[trimmed] || terminalCommands[match];
      newHistory.push({ type: "output", text: actualData.output });
      if (actualData.explanation) {
        newHistory.push({ type: "explanation", text: actualData.explanation });
      }
    } else {
      newHistory.push({
        type: "output",
        text: `bash: ${trimmed.split(" ")[0]}: command not found\nType "help" for available commands.`,
      });
    }

    newHistory.push({ type: "output", text: "" });
    setHistory(newHistory);
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="terminal-bg rounded-2xl overflow-hidden border border-border/30 shadow-lg"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/20 border-b border-border/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-cyber-warning/80" />
          <div className="w-3 h-3 rounded-full bg-cyber-success/80" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">student@kali:~</span>
      </div>

      {/* Terminal body */}
      <div ref={termRef} className="p-4 h-80 overflow-y-auto font-mono text-sm leading-relaxed">
        {history.map((entry, i) => (
          <div key={i} className={`whitespace-pre-wrap ${
            entry.type === "input"
              ? "text-cyber-success"
              : entry.type === "explanation"
              ? "text-primary mt-2 mb-1 text-xs"
              : "text-foreground/80"
          }`}>
            {entry.text}
          </div>
        ))}

        {/* Input line */}
        <div className="flex items-center text-cyber-success">
          <span>student@kali:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 text-cyber-success font-mono text-sm caret-cyber-success"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
