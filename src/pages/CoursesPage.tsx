import { motion } from "framer-motion";
import CourseCard from "@/components/CourseCard";
import { courseUnits } from "@/data/courseData";
import { useProgress } from "@/hooks/useProgress";

export default function CoursesPage() {
  const { progress, completeUnit, overallProgress } = useProgress();

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-display font-bold mb-2">Course Units</h1>
          <p className="text-muted-foreground mb-6">Information Security Applications 1272</p>

          {/* Progress bar */}
          <div className="glass rounded-xl p-4 max-w-md">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-semibold">{Math.round(overallProgress * 100)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-cyber rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress * 100}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Units grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {courseUnits.map((unit, i) => (
            <CourseCard
              key={unit.id}
              unit={unit}
              index={i}
              isCompleted={progress.completedUnits.includes(unit.id)}
              onComplete={() => completeUnit(unit.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
