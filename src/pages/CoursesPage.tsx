/** Courses listing page - shows all available courses */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import { allCourses } from "@/data/index";
import { useProgress } from "@/hooks/useProgress";

export default function CoursesPage() {
  const { progress } = useProgress();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-display font-bold mb-2">Courses</h1>
          <p className="text-muted-foreground">Choose a course to start learning</p>
        </motion.div>

        <div className="space-y-8">
          {allCourses.map((course, ci) => {
            const completedUnits = course.units.filter(u =>
              progress.completedUnits.includes(`${course.id}-${u.id}`)
            ).length;
            const progressPct = Math.round((completedUnits / course.totalUnits) * 100);

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                  <div className="text-4xl">{course.icon}</div>
                  <div className="flex-1">
                    <Link to={`/courses/${course.id}`} className="font-display font-bold text-xl hover:text-primary transition-colors">
                      {course.title}
                    </Link>
                    <p className="text-sm text-muted-foreground font-mono mt-1" dir="rtl">{course.titleAr}</p>
                    <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                    {/* Progress bar */}
                    <div className="mt-3 max-w-xs">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{progressPct}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <motion.div className="h-full gradient-cyber rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.8 }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Units grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {course.units.map((unit, i) => {
                    const isCompleted = progress.completedUnits.includes(`${course.id}-${unit.id}`);
                    return (
                      <Link
                        key={unit.id}
                        to={`/courses/${course.id}/${unit.id}`}
                        className={`p-4 rounded-xl border transition-all group hover:border-primary/30 ${
                          isCompleted ? "border-primary/20 bg-primary/5" : "border-border/50 bg-secondary/30 hover:bg-secondary/60"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xl">{unit.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{unit.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5 truncate" dir="rtl">{unit.titleAr}</div>
                            {isCompleted && <div className="text-xs text-primary mt-1">✓ Completed</div>}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
