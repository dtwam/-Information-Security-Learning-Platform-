/** Course detail page - shows all units for a specific course */
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";
import { getCourseById } from "@/data/index";
import { useProgress } from "@/hooks/useProgress";

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = getCourseById(courseId || "");
  const { progress } = useProgress();

  if (!course) {
    return (
      <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <p className="text-muted-foreground">Course not found.</p>
      </div>
    );
  }

  const completedCount = course.units.filter(u => progress.completedUnits.includes(`${course.id}-${u.id}`)).length;

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/courses" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <h1 className="text-2xl font-display font-bold">{course.title}</h1>
              <p className="text-sm text-muted-foreground font-mono" dir="rtl">{course.titleAr}</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4" dir="rtl">{course.descriptionAr}</p>

          {/* Progress */}
          <div className="glass rounded-xl p-4 mb-8 max-w-sm">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground flex items-center gap-1"><BookOpen className="w-4 h-4" /> Progress</span>
              <span className="font-semibold">{completedCount}/{course.totalUnits}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div className="h-full gradient-cyber rounded-full" initial={{ width: 0 }} animate={{ width: `${(completedCount / course.totalUnits) * 100}%` }} transition={{ duration: 0.8 }} />
            </div>
          </div>

          {/* Units list */}
          <div className="space-y-3">
            {course.units.map((unit, i) => {
              const isCompleted = progress.completedUnits.includes(`${course.id}-${unit.id}`);
              return (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={`/courses/${course.id}/${unit.id}`}
                    className="flex items-center gap-4 p-5 glass rounded-2xl hover:cyber-glow transition-shadow group"
                  >
                    <div className="text-3xl">{unit.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold group-hover:text-primary transition-colors">{unit.title}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5" dir="rtl">{unit.titleAr}</div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {unit.topics.slice(0, 4).map(t => (
                          <span key={t} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs">{t}</span>
                        ))}
                      </div>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
