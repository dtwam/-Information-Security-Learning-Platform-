/** Kali Terminal Simulator - uses new terminal commands data */
import { useState, useRef, useEffect, useCallback } from "react";
import { terminalCommands } from "@/data/terminal-commands";

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

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [history]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: "input" as const, text: `student@kali:~$ ${cmd}` }];

    if (trimmed === "clear") { setHistory([]); return; }

    const exactMatch = terminalCommands[trimmed];
    const partialMatch = !exactMatch ? Object.keys(terminalCommands).find(key => trimmed.startsWith(key.split(" ")[0])) : undefined;
    const match = exactMatch || (partialMatch ? terminalCommands[partialMatch] : undefined);

    if (match) {
      newHistory.push({ type: "output", text: match.output });
      if (match.explanation) newHistory.push({ type: "explanation", text: match.explanation });
    } else {
      newHistory.push({ type: "output", text: `bash: ${trimmed.split(" ")[0]}: command not found\nType "help" for available commands.` });
    }

    newHistory.push({ type: "output", text: "" });
    setHistory(newHistory);
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") { executeCommand(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) { setHistoryIndex(historyIndex - 1); setInput(cmdHistory[cmdHistory.length - historyIndex]); }
      else { setHistoryIndex(-1); setInput(""); }
    }
  };

  return (
    <div className="terminal-bg rounded-2xl overflow-hidden border border-border/30 shadow-lg" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/20 border-b border-border/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-accent/80" />
          <div className="w-3 h-3 rounded-full bg-primary/80" />
        </div>
        <span className="text-xs text-muted-foreground font-mono ml-2">student@kali:~</span>
      </div>
      <div ref={termRef} className="p-4 h-80 overflow-y-auto font-mono text-sm leading-relaxed">
        {history.map((entry, i) => (
          <div key={i} className={`whitespace-pre-wrap ${entry.type === "input" ? "text-primary" : entry.type === "explanation" ? "text-accent mt-2 mb-1 text-xs" : "text-foreground/80"}`}>
            {entry.text}
          </div>
        ))}
        <div className="flex items-center text-primary">
          <span>student@kali:~$ </span>
          <input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none flex-1 text-primary font-mono text-sm" autoFocus spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
