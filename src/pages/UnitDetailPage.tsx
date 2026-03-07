import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, HelpCircle } from "lucide-react";
import { courseUnits } from "@/data/courseData";
import { useProgress } from "@/hooks/useProgress";

// Simple quiz data per unit
const quizzes: Record<number, Array<{ question: string; options: string[]; correct: number }>> = {
  1: [
    { question: "What does CIA stand for in cybersecurity?", options: ["Central Intelligence Agency", "Confidentiality, Integrity, Availability", "Cyber Intelligence Analysis", "Critical Infrastructure Assessment"], correct: 1 },
    { question: "Which is NOT a type of security threat?", options: ["Malware", "Phishing", "Compilation", "Ransomware"], correct: 2 },
    { question: "What is the primary goal of risk management?", options: ["Eliminate all risks", "Reduce risks to acceptable levels", "Transfer all risks", "Ignore minor risks"], correct: 1 },
  ],
  4: [
    { question: "What is SQL Injection?", options: ["A database backup method", "Code injection via SQL queries", "A type of firewall", "A programming language"], correct: 1 },
    { question: "What does XSS stand for?", options: ["Extra Security System", "Cross-Site Scripting", "XML Security Standard", "Cross-Server Session"], correct: 1 },
    { question: "Which header prevents XSS?", options: ["X-Frame-Options", "Content-Security-Policy", "X-Powered-By", "Accept-Language"], correct: 1 },
  ],
  5: [
    { question: "First phase of penetration testing?", options: ["Exploitation", "Scanning", "Reconnaissance", "Reporting"], correct: 2 },
    { question: "What tool is used for network scanning?", options: ["Photoshop", "Nmap", "Excel", "Chrome"], correct: 1 },
    { question: "What is a zero-day vulnerability?", options: ["A bug fixed on day zero", "An unknown vulnerability with no patch", "A type of antivirus", "A network protocol"], correct: 1 },
  ],
};

export default function UnitDetailPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const unit = courseUnits.find((u) => u.id === parseInt(unitId || "0"));
  const { progress, completeUnit, saveQuizScore } = useProgress();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  if (!unit) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <p className="text-muted-foreground">Unit not found.</p>
      </div>
    );
  }

  const unitQuiz = quizzes[unit.id];
  const isCompleted = progress.completedUnits.includes(unit.id);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (unitQuiz && idx === unitQuiz[currentQ].correct) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      if (unitQuiz && currentQ < unitQuiz.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
      } else {
        setQuizDone(true);
        const finalScore = unitQuiz ? Math.round(((score + (idx === unitQuiz[currentQ].correct ? 1 : 0)) / unitQuiz.length) * 100) : 0;
        saveQuizScore(unit.id, finalScore);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{unit.icon}</span>
            <div>
              <h1 className="text-2xl font-display font-bold">{unit.title}</h1>
              <p className="text-sm text-muted-foreground font-mono" dir="rtl">{unit.titleAr}</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{unit.description}</p>

          {/* Topics */}
          <div className="glass rounded-2xl p-6 mb-6">
            <h2 className="font-display font-semibold mb-4">Topics Covered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {unit.topics.map((topic) => (
                <div key={topic} className="flex items-center gap-2 p-3 bg-secondary rounded-xl text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Complete button */}
          <button
            onClick={() => completeUnit(unit.id)}
            className={`w-full py-3 rounded-xl font-semibold mb-8 transition-colors ${
              isCompleted
                ? "bg-cyber-success/10 text-cyber-success cursor-default"
                : "gradient-cyber text-primary-foreground hover:opacity-90"
            }`}
          >
            {isCompleted ? "✓ Unit Completed" : "Mark as Complete"}
          </button>

          {/* Quiz section */}
          {unitQuiz && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="font-display font-semibold">Unit Quiz</h2>
              </div>

              {!quizStarted ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">{unitQuiz.length} questions to test your knowledge</p>
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="px-6 py-2 rounded-xl gradient-cyber text-primary-foreground font-semibold"
                  >
                    Start Quiz
                  </button>
                </div>
              ) : quizDone ? (
                <div className="text-center py-4">
                  <div className="text-4xl font-display font-bold mb-2">
                    {Math.round((score / unitQuiz.length) * 100)}%
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {score}/{unitQuiz.length} correct answers
                  </p>
                  {progress.quizScores[unit.id] >= 90 && (
                    <p className="text-primary text-sm">⭐ Quiz Ace achievement unlocked!</p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Question {currentQ + 1} of {unitQuiz.length}
                  </p>
                  <p className="font-semibold mb-4">{unitQuiz[currentQ].question}</p>
                  <div className="space-y-2">
                    {unitQuiz[currentQ].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-3 rounded-xl text-sm transition-colors ${
                          selected === null
                            ? "bg-secondary hover:bg-primary/10"
                            : idx === unitQuiz[currentQ].correct
                            ? "bg-cyber-success/20 text-cyber-success"
                            : idx === selected
                            ? "bg-destructive/20 text-destructive"
                            : "bg-secondary opacity-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
