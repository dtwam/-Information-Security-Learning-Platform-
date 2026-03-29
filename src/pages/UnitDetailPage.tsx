/** Unit detail page - immersive learning experience with sections and Ask Zer0 */
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, BookOpen,
  Terminal, Lightbulb, Target, FileText, Play, ChevronRight,
  Star, Trophy, Zap, MessageCircle,
} from "lucide-react";
import { getUnit, getCourseById } from "@/data/index";
import { unitVideos, unitObjectives, unitSummaries } from "@/data/unit-videos";
import { useProgress } from "@/hooks/useProgress";
import zer0Avatar from "@/assets/zer0-avatar.png";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Section({ id, icon, title, children, delay = 0 }: {
  id: string; icon: React.ReactNode; title: string; children: React.ReactNode; delay?: number;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="scroll-mt-24"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">{icon}</div>
        <h2 className="font-display font-bold text-lg">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

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
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    setQuizStarted(false);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setQuizDone(false);
    setShowConcepts(false);
  }, [courseId, unitId]);

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
  const videoId = unit.videoId || unitVideos[unitKey];
  const objective = unit.objectiveAr || unitObjectives[unitKey];
  const summary = unit.summaryAr || unitSummaries[unitKey];

  const currentIdx = course.units.findIndex(u => u.id === unit.id);
  const prevUnit = currentIdx > 0 ? course.units[currentIdx - 1] : null;
  const nextUnit = currentIdx < course.units.length - 1 ? course.units[currentIdx + 1] : null;

  const baseXP = isCompleted ? 100 : 0;
  const quizXP = progress.quizScores[unit.id] ? Math.round(progress.quizScores[unit.id] * 0.5) : 0;
  const totalXP = baseXP + quizXP;

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

  const openZer0 = () => {
    window.dispatchEvent(new CustomEvent("zer0-open", { detail: unit.title }));
    // Also simulate clicking the Zer0 FAB
    const fab = document.querySelector('[aria-label="Open Zer0 AI assistant"]') as HTMLButtonElement;
    if (fab) fab.click();
  };

  const sections = [
    { id: "objective", label: "🎯 الهدف" },
    { id: "content", label: "📘 المحتوى" },
    ...(videoId ? [{ id: "video", label: "🎥 فيديو" }] : []),
    ...(unit.concepts?.length ? [{ id: "concepts", label: "💡 مفاهيم" }] : []),
    ...(summary ? [{ id: "summary", label: "📌 ملخص" }] : []),
    ...(unitQuiz?.length ? [{ id: "quiz", label: "❓ اختبار" }] : []),
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 px-4" ref={topRef}>
      <div className="container mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap">
          <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/courses/${course.id}`} className="hover:text-primary transition-colors">{course.title}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Unit {unit.id}</span>
        </nav>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* HEADER */}
          <div className="glass rounded-2xl p-6 mb-6 neon-border">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{unit.icon}</span>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-display font-bold leading-tight">{unit.title}</h1>
                <p className="text-sm text-primary font-mono mt-1" dir="rtl">{unit.titleAr}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {unit.topics.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs border border-primary/10">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* XP + Ask Zer0 */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold text-primary">{totalXP} XP</span>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>مكتملة</span>
                </div>
              )}
              <button
                onClick={openZer0}
                className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border border-primary/20 text-primary hover:bg-primary/10 transition-colors"
              >
                <img src={zer0Avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                Ask Zer0
              </button>
            </div>
          </div>

          {/* SECTION NAV */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors border border-primary/10"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* SECTIONS */}
          <div className="space-y-8">
            {/* 🎯 Objective */}
            {objective && (
              <Section id="objective" icon={<Target className="w-5 h-5" />} title="🎯 هدف الدرس" delay={0.1}>
                <div className="glass rounded-2xl p-5 neon-border">
                  <p className="text-sm leading-relaxed font-arabic" dir="rtl">{objective}</p>
                </div>
              </Section>
            )}

            {/* 📘 Content */}
            <Section id="content" icon={<BookOpen className="w-5 h-5" />} title="📘 محتوى الدرس" delay={0.15}>
              <div className="space-y-5">
                {unit.content.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="glass rounded-2xl p-6 neon-border"
                  >
                    <h3 className="font-display font-semibold mb-1">{section.heading}</h3>
                    <h4 className="text-sm text-primary font-mono mb-4" dir="rtl">{section.headingAr}</h4>
                    <div className="text-sm leading-relaxed whitespace-pre-line font-arabic" dir="rtl">
                      {section.body}
                    </div>
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
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* 🎥 Video */}
            {videoId && (
              <Section id="video" icon={<Play className="w-5 h-5" />} title="🎥 شرح بالفيديو" delay={0.25}>
                <div className="glass rounded-2xl p-4 overflow-hidden neon-border">
                  <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="Video explanation"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center font-arabic" dir="rtl">
                    فيديو تعليمي باللغة العربية لشرح محتوى الوحدة
                  </p>
                </div>
              </Section>
            )}

            {/* 🧪 Practical Example */}
            <Section id="practical" icon={<Terminal className="w-5 h-5" />} title="🧪 مثال عملي" delay={0.3}>
              <div className="glass rounded-2xl p-5 border-2 border-dashed border-primary/20">
                <div className="text-center py-6">
                  <Terminal className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-muted-foreground font-arabic" dir="rtl">
                    جرّب الأوامر في المختبر العملي
                  </p>
                  <Link
                    to="/lab"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl gradient-cyber text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Terminal className="w-4 h-4" />
                    افتح المختبر
                  </Link>
                </div>
              </div>
            </Section>

            {/* 💡 Concepts */}
            {unit.concepts && unit.concepts.length > 0 && (
              <Section id="concepts" icon={<Lightbulb className="w-5 h-5" />} title="💡 بطاقات المفاهيم" delay={0.35}>
                <button
                  onClick={() => setShowConcepts(!showConcepts)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary mb-3 hover:opacity-80 transition-opacity"
                >
                  {showConcepts ? "إخفاء" : "عرض"} البطاقات ({unit.concepts.length})
                </button>
                {showConcepts && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {unit.concepts.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="glass rounded-xl p-4 neon-border card-hover"
                      >
                        <div className="font-semibold text-sm">{c.name}</div>
                        <div className="text-xs text-primary font-mono" dir="rtl">{c.nameAr}</div>
                        <p className="text-xs text-muted-foreground mt-2 font-arabic" dir="rtl">{c.simple}</p>
                        <details className="mt-2">
                          <summary className="text-xs text-primary cursor-pointer hover:underline">المزيد من التفاصيل</summary>
                          <p className="text-xs text-muted-foreground mt-1 font-arabic" dir="rtl">{c.detailed}</p>
                          {c.example && <p className="text-xs font-mono mt-1 text-primary/80">{c.example}</p>}
                        </details>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {/* 📌 Summary */}
            {summary && (
              <Section id="summary" icon={<FileText className="w-5 h-5" />} title="📌 ملخص سريع" delay={0.4}>
                <div className="glass rounded-2xl p-5 border-l-4 border-primary neon-border">
                  <p className="text-sm leading-relaxed font-arabic" dir="rtl">{summary}</p>
                </div>
              </Section>
            )}

            {/* ✅ Complete + Ask Zer0 */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="space-y-3">
              <button
                onClick={() => completeUnit(unitKey)}
                className={`w-full py-3.5 rounded-2xl font-semibold transition-all ${
                  isCompleted
                    ? "bg-primary/10 text-primary cursor-default border border-primary/20"
                    : "gradient-cyber text-primary-foreground hover:opacity-90 hover:scale-[1.01]"
                }`}
              >
                {isCompleted ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> الوحدة مكتملة ✓
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5" /> تحديد كمكتملة — احصل على 100 XP
                  </span>
                )}
              </button>

              {/* Ask Zer0 button */}
              <button
                onClick={openZer0}
                className="w-full py-3 rounded-2xl font-semibold border border-primary/20 text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <img src={zer0Avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                اسأل Zer0 عن هذا الدرس
              </button>
            </motion.div>

            {/* ❓ Quiz */}
            {unitQuiz && unitQuiz.length > 0 && (
              <Section id="quiz" icon={<HelpCircle className="w-5 h-5" />} title="❓ اختبار الوحدة" delay={0.5}>
                <div className="glass rounded-2xl p-6 neon-border">
                  {!quizStarted ? (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-4 font-arabic">{unitQuiz.length} أسئلة لاختبار فهمك</p>
                      <button
                        onClick={() => setQuizStarted(true)}
                        className="px-6 py-2.5 rounded-xl gradient-cyber text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                      >
                        ابدأ الاختبار
                      </button>
                    </div>
                  ) : quizDone ? (
                    <div className="text-center py-4">
                      <div className="text-4xl font-display font-bold mb-2 text-primary cyber-glow-text">{Math.round((score / unitQuiz.length) * 100)}%</div>
                      <p className="text-muted-foreground mb-2">{score}/{unitQuiz.length} إجابات صحيحة</p>
                      <p className="text-xs text-primary mb-4">+{Math.round((score / unitQuiz.length) * 50)} XP من الاختبار</p>
                      {Math.round((score / unitQuiz.length) * 100) >= 90 && (
                        <p className="text-primary text-sm">⭐ إنجاز: خبير الاختبارات!</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="h-1.5 bg-secondary rounded-full mb-4 overflow-hidden">
                        <div
                          className="h-full gradient-cyber rounded-full transition-all duration-300"
                          style={{ width: `${((currentQ + 1) / unitQuiz.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        السؤال {currentQ + 1} من {unitQuiz.length}
                      </p>
                      <p className="font-semibold mb-4">{unitQuiz[currentQ].question}</p>
                      <div className="space-y-2">
                        {unitQuiz[currentQ].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                              selected === null
                                ? "bg-secondary hover:bg-primary/10 hover:scale-[1.01] border-transparent hover:border-primary/20"
                                : idx === unitQuiz[currentQ].correct
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : idx === selected
                                    ? "bg-destructive/20 text-destructive border-destructive/30"
                                    : "bg-secondary opacity-50 border-transparent"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Section>
            )}
          </div>

          {/* PREV/NEXT NAV */}
          <div className="flex items-center justify-between mt-10 gap-3">
            {prevUnit ? (
              <Link
                to={`/courses/${course.id}/${prevUnit.id}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl glass neon-border hover:border-primary/40 transition-all text-sm group flex-1"
              >
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">الدرس السابق</div>
                  <div className="font-medium truncate text-sm">{prevUnit.title}</div>
                </div>
              </Link>
            ) : <div className="flex-1" />}
            {nextUnit ? (
              <Link
                to={`/courses/${course.id}/${nextUnit.id}`}
                className="flex items-center justify-end gap-2 px-4 py-3 rounded-xl glass neon-border hover:border-primary/40 transition-all text-sm group flex-1 text-right"
              >
                <div className="min-w-0">
                  <div className="text-xs text-muted-foreground">الدرس التالي</div>
                  <div className="font-medium truncate text-sm">{nextUnit.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
