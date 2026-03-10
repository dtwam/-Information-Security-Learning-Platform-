/** Unit detail page - shows Arabic content, quiz, concept cards */
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, HelpCircle, BookOpen, Terminal, Lightbulb } from "lucide-react";
import { getUnit, getCourseById } from "@/data/index";
import { useProgress } from "@/hooks/useProgress";

export default function UnitDetailPage() {
  const { courseId, unitId } = useParams<{ courseId: string; unitId: string }>();
  const course = getCourseById(courseId || "");
  const unit = getUnit(courseId || "", parseInt(unitId || "0"));
  const { progress, completeUnit, saveQuizScore } = useProgress();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [showConcepts, setShowConcepts] = useState(false);

  if (!course || !unit) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <p className="text-muted-foreground">Unit not found.</p>
      </div>
    );
  }

  const unitKey = `${course.id}-${unit.id}`;
  const isCompleted = progress.completedUnits.includes(unitKey);
  const unitQuiz = unit.quiz;

  const handleAnswer = (idx: number) => {
    if (selected !== null || !unitQuiz) return;
    setSelected(idx);
    if (idx === unitQuiz[currentQ].correct) setScore(s => s + 1);
    setTimeout(() => {
      if (currentQ < unitQuiz.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setQuizDone(true);
        const finalScore = Math.round(((score + (idx === unitQuiz[currentQ].correct ? 1 : 0)) / unitQuiz.length) * 100);
        saveQuizScore(parseInt(unitId || "0"), finalScore);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to={`/courses/${course.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to {course.title}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{unit.icon}</span>
            <div>
              <h1 className="text-2xl font-display font-bold">{unit.title}</h1>
              <p className="text-sm text-muted-foreground font-mono" dir="rtl">{unit.titleAr}</p>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {unit.topics.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs">{t}</span>
            ))}
          </div>

          {/* Arabic Content Sections */}
          <div className="space-y-6 mb-8">
            {unit.content.map((section, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <h2 className="font-display font-semibold mb-1">{section.heading}</h2>
                <h3 className="text-sm text-primary font-mono mb-4" dir="rtl">{section.headingAr}</h3>
                <div className="text-sm leading-relaxed whitespace-pre-line" dir="rtl" style={{ fontFamily: "'Noto Sans Arabic', sans-serif" }}>
                  {section.body}
                </div>
                {/* Commands */}
                {section.commands && section.commands.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <Terminal className="w-4 h-4" /> Commands
                    </div>
                    {section.commands.map((c, j) => (
                      <div key={j} className="terminal-bg rounded-lg p-3 text-sm font-mono">
                        <code className="text-primary">$ {c.cmd}</code>
                        <p className="text-muted-foreground text-xs mt-1" dir="rtl">{c.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Concept Cards */}
          {unit.concepts && unit.concepts.length > 0 && (
            <div className="mb-8">
              <button onClick={() => setShowConcepts(!showConcepts)} className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <Lightbulb className="w-4 h-4" /> {showConcepts ? "Hide" : "Show"} Concept Cards ({unit.concepts.length})
              </button>
              {showConcepts && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unit.concepts.map((c, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-4">
                      <div className="font-semibold text-sm">{c.name}</div>
                      <div className="text-xs text-primary font-mono" dir="rtl">{c.nameAr}</div>
                      <p className="text-xs text-muted-foreground mt-2" dir="rtl">{c.simple}</p>
                      <details className="mt-2">
                        <summary className="text-xs text-primary cursor-pointer">More details</summary>
                        <p className="text-xs text-muted-foreground mt-1" dir="rtl">{c.detailed}</p>
                        {c.example && <p className="text-xs font-mono mt-1 text-primary/80">{c.example}</p>}
                      </details>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Complete button */}
          <button
            onClick={() => completeUnit(unitKey)}
            className={`w-full py-3 rounded-xl font-semibold mb-8 transition-colors ${
              isCompleted ? "bg-primary/10 text-primary cursor-default" : "gradient-cyber text-primary-foreground hover:opacity-90"
            }`}
          >
            {isCompleted ? "✓ Unit Completed" : "Mark as Complete"}
          </button>

          {/* Quiz */}
          {unitQuiz && unitQuiz.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="font-display font-semibold">Unit Quiz</h2>
              </div>

              {!quizStarted ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">{unitQuiz.length} questions to test your knowledge</p>
                  <button onClick={() => setQuizStarted(true)} className="px-6 py-2 rounded-xl gradient-cyber text-primary-foreground font-semibold">
                    Start Quiz
                  </button>
                </div>
              ) : quizDone ? (
                <div className="text-center py-4">
                  <div className="text-4xl font-display font-bold mb-2">{Math.round((score / unitQuiz.length) * 100)}%</div>
                  <p className="text-muted-foreground mb-4">{score}/{unitQuiz.length} correct answers</p>
                  {Math.round((score / unitQuiz.length) * 100) >= 90 && <p className="text-primary text-sm">⭐ Quiz Ace achievement unlocked!</p>}
                </div>
              ) : (
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Question {currentQ + 1} of {unitQuiz.length}</p>
                  <p className="font-semibold mb-4">{unitQuiz[currentQ].question}</p>
                  <div className="space-y-2">
                    {unitQuiz[currentQ].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-3 rounded-xl text-sm transition-colors ${
                          selected === null ? "bg-secondary hover:bg-primary/10"
                            : idx === unitQuiz[currentQ].correct ? "bg-primary/20 text-primary"
                            : idx === selected ? "bg-destructive/20 text-destructive"
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
