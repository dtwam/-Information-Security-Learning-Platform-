import { motion } from "framer-motion";
import { ArrowRight, Terminal, Shield, BookOpen, Zap, Brain, Target, Cpu, Lock, Rocket, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { allCourses } from "@/data/index";
import universityLogo from "@/assets/university-logo.png";
import zer0Avatar from "@/assets/zer0-avatar.png";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { progress } = useProgress();
  const totalCompleted = progress.completedUnits.length;
  const totalUnits = allCourses.reduce((a, c) => a + c.totalUnits, 0);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, filter: "blur(4px)" },
    visible: {
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="min-h-screen relative z-10">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        {/* Radial glow behind Zer0 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(185 100% 50% / 0.4), transparent 70%)" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {/* Zer0 mascot floating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center mb-8"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <img
                    src={zer0Avatar}
                    alt="Zer0 - AI Companion"
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
                    style={{
                      boxShadow: "0 0 40px hsl(185 100% 50% / 0.4), 0 0 80px hsl(185 100% 50% / 0.15)",
                      border: "2px solid hsl(185 100% 50% / 0.3)",
                    }}
                  />
                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>

              {/* University logo small */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mb-4"
              >
                <img src={universityLogo} alt="Al-Quds Open University" className="w-10 h-10 rounded-full object-cover ring-1 ring-primary/20 opacity-70" />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight mb-8">
                <span className="gradient-cyber-text cyber-glow-text">CyberSec</span>{" "}
                <span className="text-foreground">Academy</span>
              </h1>

              <p className="font-arabic text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed" dir="rtl">
                منصة تعليمية متخصصة من جامعة القدس المفتوحة
                <br />
                لتدريس مقررات الأمن السيبراني بأسلوب تفاعلي حديث
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/courses"
                  className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-cyber text-primary-foreground font-semibold text-base"
                >
                  <Rocket className="w-5 h-5" /> ابدأ المهمة 🚀
                </Link>
                <Link
                  to="/lab"
                  className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass font-semibold text-foreground text-base neon-border"
                >
                  <Terminal className="w-5 h-5" /> افتح المختبر 💻
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-sm mx-auto"
            >
              {[
                { value: `${allCourses.length}`, label: "مقررات" },
                { value: `${totalUnits}`, label: "وحدات" },
                { value: `${totalCompleted}`, label: "مكتملة" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-display font-bold text-primary cyber-glow-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-arabic">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY THIS PLATFORM ─── */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              لماذا <span className="gradient-cyber-text">هذه المنصة</span>؟
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto font-arabic" dir="rtl">
              تجربة تعليمية فريدة تجمع بين المحتوى الأكاديمي والتطبيق العملي
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: BookOpen, title: "محتوى أكاديمي", desc: "مبني على مقررات جامعة القدس المفتوحة" },
              { icon: Terminal, title: "مختبر تفاعلي", desc: "تدرب على أدوات الأمن السيبراني الحقيقية" },
              { icon: Brain, title: "مساعد ذكي", desc: "Zer0 يشرح لك المفاهيم بالعربية" },
              { icon: Target, title: "تعلم عملي", desc: "تمارين ومحاكاة لسيناريوهات حقيقية" },
            ].map((item) => (
              <motion.div key={item.title} variants={cardVariants} className="glass rounded-2xl p-6 text-center card-hover neon-border">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-cyber flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-arabic font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-arabic" dir="rtl">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ACTIVE MISSIONS (COURSES) ─── */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              <span className="gradient-cyber-text">المقررات</span> المتاحة
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto font-arabic" dir="rtl">
              اختر مقررك لبدء رحلة التعلم
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {allCourses.map((course) => {
              const completed = course.units.filter(u => progress.completedUnits.includes(`${course.id}-${u.id}`)).length;
              const pct = Math.round((completed / course.totalUnits) * 100);
              return (
                <motion.div key={course.id} variants={cardVariants}>
                  <Link to={`/courses/${course.id}`} className="block glass rounded-2xl p-6 card-hover group neon-border">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{course.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                        <p className="text-sm text-muted-foreground font-arabic mb-2" dir="rtl">{course.titleAr}</p>
                        <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                        {/* Progress bar */}
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{completed}/{course.totalUnits}</span>
                            <span className="text-primary font-semibold">{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <motion.div className="h-full gradient-cyber rounded-full" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT YOU WILL LEARN ─── */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              ماذا <span className="gradient-cyber-text">ستتعلم</span>؟
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Shield, label: "أساسيات أمن المعلومات" },
              { icon: Lock, label: "التشفير وحماية البيانات" },
              { icon: Cpu, label: "أمن الشبكات اللاسلكية" },
              { icon: Target, label: "اختبار الاختراق الأخلاقي" },
              { icon: Terminal, label: "أدوات الأمن السيبراني" },
              { icon: Brain, label: "تحليل الثغرات الأمنية" },
            ].map((item) => (
              <motion.div key={item.label} variants={cardVariants} className="glass rounded-2xl p-5 flex items-center gap-4 card-hover neon-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-arabic font-semibold text-sm">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ZER0 AI SECTION ─── */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="glass rounded-3xl p-8 sm:p-12 text-center neon-border"
          >
            <motion.img
              src={zer0Avatar}
              alt="Zer0"
              className="w-20 h-20 mx-auto mb-6 rounded-full object-cover"
              style={{ boxShadow: "0 0 30px hsl(185 100% 50% / 0.4)" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              <span className="gradient-cyber-text">Zer0</span>
            </h2>
            <p className="font-arabic text-muted-foreground max-w-lg mx-auto mb-2 text-sm" dir="rtl">
              رفيقك الذكي في رحلة تعلم الأمن السيبراني
            </p>
            <p className="font-arabic text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed" dir="rtl">
              اسأله أي سؤال وسيشرح لك بالعربية بأسلوب بسيط ومفهوم
            </p>
            <div className="flex flex-wrap gap-3 justify-center font-arabic text-sm">
              <span className="px-4 py-2 rounded-xl border border-primary/20 text-primary bg-primary/5">اشرح بشكل أبسط</span>
              <span className="px-4 py-2 rounded-xl border border-accent/20 text-accent bg-accent/5">اعطني مثال</span>
              <span className="px-4 py-2 rounded-xl border border-cyber-success/20 text-cyber-success bg-cyber-success/5">لخص لي</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
              هل أنت مستعد <span className="gradient-cyber-text">للبدء</span>؟
            </h2>
            <p className="font-arabic text-muted-foreground mb-8" dir="rtl">
              انضم الآن وابدأ رحلتك في عالم الأمن السيبراني
            </p>
            <Link
              to="/courses"
              className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-cyber text-primary-foreground font-semibold text-lg"
            >
              🚀 ابدأ التعلم الآن <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
