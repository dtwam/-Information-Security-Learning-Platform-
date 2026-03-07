import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Trophy, Flame, BookOpen, Target } from "lucide-react";
import { courseUnits, achievements } from "@/data/courseData";
import { useProgress } from "@/hooks/useProgress";

export default function DashboardPage() {
  const { progress, overallProgress } = useProgress();

  // Chart data
  const unitData = courseUnits.map((u) => ({
    name: `U${u.id}`,
    completed: progress.completedUnits.includes(u.id) ? 1 : 0,
    quiz: progress.quizScores[u.id] || 0,
  }));

  const pieData = [
    { name: "Completed", value: progress.completedUnits.length },
    { name: "Remaining", value: 8 - progress.completedUnits.length },
  ];
  const COLORS = ["hsl(190, 90%, 50%)", "hsl(220, 20%, 14%)"];

  const stats = [
    { icon: BookOpen, label: "Units Completed", value: `${progress.completedUnits.length}/8` },
    { icon: Target, label: "Challenges Done", value: `${progress.completedChallenges.length}/6` },
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

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <stat.icon className="w-5 h-5 text-primary mb-3" />
              <div className="text-2xl font-display font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Progress chart */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold mb-4">Quiz Scores</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={unitData}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="quiz" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Completion pie */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-semibold mb-4">Course Completion</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="ml-4">
                <div className="text-3xl font-display font-bold">
                  {Math.round(overallProgress * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((ach) => {
              const unlocked = progress.unlockedAchievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-xl text-center transition-all ${
                    unlocked ? "glass cyber-glow" : "bg-secondary/50 opacity-50"
                  }`}
                >
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
