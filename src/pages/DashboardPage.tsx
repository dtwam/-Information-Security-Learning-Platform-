/** Dashboard - updated for multi-course support */
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Trophy, Flame, BookOpen, Target } from "lucide-react";
import { allCourses, achievements } from "@/data/index";
import { useProgress } from "@/hooks/useProgress";

export default function DashboardPage() {
  const { progress, overallProgress } = useProgress();
  const totalUnits = allCourses.reduce((a, c) => a + c.totalUnits, 0);
  const totalChallenges = 9; // 6 infosec + 3 wireless

  const pieData = [
    { name: "Completed", value: progress.completedUnits.length },
    { name: "Remaining", value: totalUnits - progress.completedUnits.length },
  ];
  const COLORS = ["hsl(190, 90%, 50%)", "hsl(220, 20%, 14%)"];

  const stats = [
    { icon: BookOpen, label: "Units Completed", value: `${progress.completedUnits.length}/${totalUnits}` },
    { icon: Target, label: "Challenges Done", value: `${progress.completedChallenges.length}/${totalChallenges}` },
    { icon: Flame, label: "Learning Streak", value: `${progress.streak} days` },
    { icon: Trophy, label: "Achievements", value: `${progress.unlockedAchievements.length}/${achievements.length}` },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Track your cybersecurity learning journey</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5">
              <stat.icon className="w-5 h-5 text-primary mb-3" />
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Per-course progress */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold mb-4">Course Progress</h2>
            {allCourses.map(course => {
              const completed = course.units.filter(u => progress.completedUnits.includes(`${course.id}-${u.id}`)).length;
              const pct = Math.round((completed / course.totalUnits) * 100);
              return (
                <div key={course.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2"><span>{course.icon}</span> {course.title}</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full gradient-cyber rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold mb-4">Overall Completion</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" strokeWidth={0}>
                    {pieData.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="ml-4">
                <div className="text-3xl font-display font-bold">{Math.round(overallProgress * 100)}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-display font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {achievements.map((ach) => {
              const unlocked = progress.unlockedAchievements.includes(ach.id);
              return (
                <div key={ach.id} className={`p-4 rounded-xl text-center transition-all ${unlocked ? "glass cyber-glow" : "bg-secondary/50 opacity-50"}`}>
                  <div className="text-3xl mb-2">{ach.icon}</div>
                  <div className="text-sm font-semibold">{ach.title}</div>
                  <div className="text-xs text-muted-foreground">{ach.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
