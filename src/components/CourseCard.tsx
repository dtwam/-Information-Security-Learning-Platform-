import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Unit } from "@/data/courseData";

interface CourseCardProps {
  unit: Unit;
  index: number;
  isCompleted: boolean;
  onComplete: () => void;
}

export default function CourseCard({ unit, index, isCompleted, onComplete }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group glass rounded-2xl p-6 hover:cyber-glow transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{unit.icon}</div>
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-cyber-success" />}
      </div>

      <h3 className="font-display font-semibold text-lg mb-1">{unit.title}</h3>
      <p className="text-xs text-muted-foreground mb-3 font-mono" dir="rtl">{unit.titleAr}</p>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{unit.description}</p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {unit.topics.map((topic) => (
          <span key={topic} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs">
            {topic}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onComplete}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            isCompleted
              ? "bg-cyber-success/10 text-cyber-success cursor-default"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          {isCompleted ? "Completed ✓" : "Mark Complete"}
        </button>
        <Link
          to={`/courses/${unit.id}`}
          className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Details <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
