import { motion } from "framer-motion";
import { ArrowRight, Terminal, Shield, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { allCourses } from "@/data/index";
import universityLogo from "@/assets/university-logo.png";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm text-muted-foreground">
                <img src={universityLogo} alt="" className="w-5 h-5 rounded-full" />
                Al-Quds Open University
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Master{" "}
                <span className="gradient-cyber-text">Cybersecurity</span>
                <br />
                Through Practice
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Interactive learning platform for ethical hacking, penetration testing,
                and information security. Practice with real tools in a safe environment.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/courses" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-cyber text-primary-foreground font-semibold transition-transform hover:scale-105 cyber-glow">
                  Start Learning <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/lab" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold text-foreground transition-transform hover:scale-105">
                  <Terminal className="w-4 h-4" /> Open Cyber Lab
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="grid grid-cols-3 gap-6 mt-16 max-w-md">
              {[
                { value: `${allCourses.length}`, label: "Courses" },
                { value: `${allCourses.reduce((a, c) => a + c.totalUnits, 0)}`, label: "Units" },
                { value: "∞", label: "Practice" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses overview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-3">Available Courses</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              University-level cybersecurity courses with Arabic content
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
                <Link to={`/courses/${course.id}`} className="block glass rounded-2xl p-6 hover:cyber-glow transition-shadow duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-muted-foreground font-mono mb-2" dir="rtl">{course.titleAr}</p>
                      <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.totalUnits} units</span>
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
