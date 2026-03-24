import { motion } from "framer-motion";
import { ArrowRight, Terminal, Shield, BookOpen, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { allCourses } from "@/data/index";
import universityLogo from "@/assets/university-logo.png";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { progress } = useProgress();
  const totalCompleted = progress.completedUnits.length;
  const totalUnits = allCourses.reduce((a, c) => a + c.totalUnits, 0);

  // Agent rank based on progress
  const getRank = () => {
    if (totalCompleted >= totalUnits) return { label: "Elite Agent", color: "text-accent" };
    if (totalCompleted >= totalUnits * 0.5) return { label: "Advanced Agent", color: "text-primary" };
    if (totalCompleted >= 2) return { label: "Field Agent", color: "text-primary" };
    return { label: "Recruit", color: "text-muted-foreground" };
  };
  const rank = getRank();

  return (
    <main className="min-h-screen relative z-10">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Agent welcome */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 text-sm"
              >
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Welcome back,</span>
                <span className={`font-bold ${rank.color}`}>{rank.label}</span>
              </motion.div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm text-muted-foreground ml-2">
                <img src={universityLogo} alt="" className="w-5 h-5 rounded-full" />
                Al-Quds Open University
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Enter The{" "}
                <span className="gradient-cyber-text cyber-glow-text">Cyber Lab</span>
                <br />
                <span className="text-2xl sm:text-3xl text-muted-foreground font-normal">Train. Hack. Defend.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Your neural cyber training simulation awaits. Master ethical hacking,
                penetration testing, and information security through immersive practice.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/courses" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-cyber text-primary-foreground font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] cyber-glow">
                  <Shield className="w-4 h-4" /> Enter Missions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/lab" className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold text-foreground transition-all hover:scale-105 hover:border-primary/30">
                  <Terminal className="w-4 h-4" /> Open Terminal
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-3 gap-6 mt-16 max-w-md">
              {[
                { value: `${allCourses.length}`, label: "Missions" },
                { value: `${totalUnits}`, label: "Objectives" },
                { value: `${totalCompleted}`, label: "Completed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-primary cyber-glow-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses overview */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-3">Active Missions</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Choose your mission to begin training, Agent
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {allCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/courses/${course.id}`} className="block glass rounded-2xl p-6 hover:cyber-glow transition-all duration-300 group hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-muted-foreground font-mono mb-2" dir="rtl">{course.titleAr}</p>
                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.totalUnits} objectives</span>
                        <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">{course.code}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
