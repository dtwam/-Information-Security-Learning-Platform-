/** Dashboard — clean academic layout */
import { motion } from "framer-motion";
import { Trophy, Flame, BookOpen, Target, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { allCourses, achievements } from "@/data/index";
import { useProgress } from "@/hooks/useProgress";
import { useLanguage } from "@/hooks/useLanguage";

export default function DashboardPage() {
  const { progress, overallProgress } = useProgress();
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const totalUnits = allCourses.reduce((a, c) => a + c.totalUnits, 0);
  const totalChallenges = 9;

  const stats = [
    { icon: BookOpen, label: isAr ? "وحدات مكتملة" : "Units Completed", value: `${progress.completedUnits.length}/${totalUnits}` },
    { icon: Target, label: isAr ? "تحديات مكتملة" : "Challenges Done", value: `${progress.completedChallenges.length}/${totalChallenges}` },
    { icon: Flame, label: isAr ? "أيام التعلّم" : "Learning Streak", value: `${progress.streak}` },
    { icon: Trophy, label: isAr ? "إنجازات" : "Achievements", value: `${progress.unlockedAchievements.length}/${achievements.length}` },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold leading-tight">
                {isAr ? "لوحة الطالب" : "Student Dashboard"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isAr ? "تابع تقدمك في أكاديمية تيك سيك" : "Track your progress at TechSec QOU"}
              </p>
            </div>
          </div>
        </motion.header>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <stat.icon className="w-5 h-5 text-primary mb-3" />
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Overall + per-course */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl p-6 lg:col-span-1">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
              {isAr ? "الإنجاز الإجمالي" : "Overall Completion"}
            </div>
            <div className="text-5xl font-display font-bold text-primary leading-none mb-2">
              {Math.round(overallProgress * 100)}%
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mt-4">
              <div
                className="h-full gradient-cyber rounded-full transition-all"
                style={{ width: `${Math.round(overallProgress * 100)}%` }}
              />
            </div>
          </div>

          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <h2 className="font-display font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
              {isAr ? "تقدّم المقررات" : "Course Progress"}
            </h2>
            <div className="space-y-4">
              {allCourses.map(course => {
                const completed = course.units.filter(u => progress.completedUnits.includes(`${course.id}-${u.id}`)).length;
                const pct = Math.round((completed / course.totalUnits) * 100);
                return (
                  <Link key={course.id} to={`/courses/${course.id}`} className="block group">
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                        <span>{course.icon}</span>
                        <span className="font-medium">{course.title}</span>
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {completed}/{course.totalUnits} · {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full gradient-cyber rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
            {isAr ? "الإنجازات" : "Achievements"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {achievements.map((ach) => {
              const unlocked = progress.unlockedAchievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl text-center border transition-all ${
                    unlocked
                      ? "bg-primary/5 border-primary/20"
                      : "bg-secondary/40 border-border opacity-60"
                  }`}
                >
                  <div className="text-2xl mb-1.5">{ach.icon}</div>
                  <div className="text-xs font-semibold leading-tight">{ach.title}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{ach.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
