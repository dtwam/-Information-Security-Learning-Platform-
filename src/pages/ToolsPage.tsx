/** Tools reference page */
import { motion } from "framer-motion";
import { cyberTools } from "@/data/index";

export default function ToolsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold mb-2">Cybersecurity Tools</h1>
          <p className="text-muted-foreground mb-8">Reference library for essential security tools</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cyberTools.map((tool, i) => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display font-bold text-lg">{tool.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">{tool.category}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
              <p className="text-xs text-muted-foreground mb-4" dir="rtl">{tool.descriptionAr}</p>
              <div className="space-y-1.5">
                {tool.commands.map((c, j) => (
                  <div key={j} className="terminal-bg rounded-lg px-3 py-2 text-xs font-mono">
                    <code className="text-primary">$ {c.cmd}</code>
                    <span className="text-muted-foreground ml-2">— {c.desc}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
