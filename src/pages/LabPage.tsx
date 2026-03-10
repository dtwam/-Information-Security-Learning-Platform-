/** Lab page - updated to use new multi-course data */
import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import KaliTerminal from "@/components/KaliTerminal";
import { allLabChallenges } from "@/data/index";
import { useProgress } from "@/hooks/useProgress";

export default function LabPage() {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const { progress, completeChallenge } = useProgress();

  const challenge = allLabChallenges[activeChallenge];
  const difficultyColors = {
    beginner: "text-primary bg-primary/10",
    intermediate: "text-accent bg-accent/10",
    advanced: "text-destructive bg-destructive/10",
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-display font-bold">Cyber Security Lab</h1>
          </div>
          <p className="text-muted-foreground mb-8">Practice ethical hacking in a safe simulated environment</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <h2 className="font-display font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">Challenges</h2>
            {allLabChallenges.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => { setActiveChallenge(i); setShowHints(false); }}
                className={`w-full text-left p-4 rounded-xl transition-colors ${i === activeChallenge ? "glass cyber-glow" : "glass hover:bg-secondary/80"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {progress.completedChallenges.includes(ch.id) && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                    <span className="text-sm font-medium">{ch.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-md mt-1 inline-block ${difficultyColors[ch.difficulty]}`}>{ch.difficulty}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 space-y-5">
            <motion.div key={activeChallenge} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-lg">{challenge.title}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-md ${difficultyColors[challenge.difficulty]}`}>{challenge.difficulty}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
              <div className="space-y-2 mb-4">
                <h3 className="text-sm font-semibold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-primary" /> Instructions</h3>
                {challenge.instructions.map((inst, i) => (<p key={i} className="text-sm text-muted-foreground pl-5">{i + 1}. {inst}</p>))}
              </div>
              <button onClick={() => setShowHints(!showHints)} className="text-sm text-primary flex items-center gap-1 mb-3">
                <Lightbulb className="w-3.5 h-3.5" /> {showHints ? "Hide Hints" : "Show Hints"}
              </button>
              {showHints && (
                <div className="bg-primary/5 rounded-xl p-3 mb-4 space-y-1">
                  {challenge.hints.map((hint, i) => (<p key={i} className="text-sm text-primary">💡 {hint}</p>))}
                </div>
              )}
              <button
                onClick={() => completeChallenge(challenge.id)}
                className={`text-xs px-4 py-2 rounded-lg transition-colors ${progress.completedChallenges.includes(challenge.id) ? "bg-primary/10 text-primary" : "gradient-cyber text-primary-foreground"}`}
              >
                {progress.completedChallenges.includes(challenge.id) ? "✓ Completed" : "Mark Complete"}
              </button>
            </motion.div>
            <KaliTerminal />
            <div className="glass rounded-2xl p-5">
              <h3 className="font-display font-semibold text-sm mb-2">📖 Explanation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{challenge.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
