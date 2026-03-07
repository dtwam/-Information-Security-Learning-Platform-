import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import { courseUnits } from "@/data/courseData";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { progress, completeUnit } = useProgress();

  return (
    <main className="min-h-screen">
      <HeroSection />

      {/* Course overview section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-3">Course Units</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Information Security Applications 1272 — Al-Quds Open University
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      </section>
    </main>
  );
}
