// Export-ready component — Landing page
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Shield, BookOpen, Brain, Target, Cpu, Lock, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { allCourses } from "@/data/index";
import { useProgress } from "@/hooks/useProgress";
import HeroSection from "@/components/HeroSection";
import zer0Img from "@/assets/zer0-mascot.png";

export default function HomePage() {
  const { progress } = useProgress();
  const totalCompleted = progress.completedUnits.length;
  const totalUnits = allCourses.reduce((a, c) => a + c.totalUnits, 0);

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } },
  };
  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <main className="min-h-screen relative z-10">
      <HeroSection />

      {/* Stats bar */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-8"
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
      </section>

      {/* Why this platform */}
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
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: BookOpen, title: "محتوى أكاديمي", desc: "مبني على مقررات جامعة القدس المفتوحة" },
              { icon: Terminal, title: "مختبر تفاعلي", desc: "تدرب على أدوات الأمن السيبراني الحقيقية" },
              { icon: Brain, title: "مساعد ذكي", desc: "Zer0 يشرح لك المفاهيم بالعربية" },
              { icon: Target, title: "تعلم عملي", desc: "تمارين ومحاكاة لسيناريوهات حقيقية" },
            ].map((item) => (
              <motion.div key={item.title} variants={cardVariants} className="glass rounded-2xl p-6 text-center card-hover neon-border">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-arabic font-bold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-arabic" dir="rtl">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              <span className="gradient-cyber-text">المقررات</span> المتاحة
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto font-arabic" dir="rtl">اختر مقررك لبدء رحلة التعلم</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {allCourses.map((course) => (
              <motion.div key={course.id} variants={cardVariants}>
                <Link to={`/courses/${course.id}`} className="block glass rounded-2xl p-6 card-hover group neon-border">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{course.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-muted-foreground font-arabic mb-2" dir="rtl">{course.titleAr}</p>
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
          </motion.div>
        </div>
      </section>

      {/* What you will learn */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">ماذا <span className="gradient-cyber-text">ستتعلم</span>؟</h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

      {/* Zer0 section */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="glass rounded-3xl p-8 sm:p-12 text-center neon-border">
            <img src={zer0Img} alt="Zer0" className="w-20 h-20 mx-auto mb-6 object-contain drop-shadow-[0_0_20px_hsl(185_100%_50%/0.4)]" />
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              <span className="gradient-cyber-text">Zer0</span>
            </h2>
            <p className="font-arabic text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed" dir="rtl">
              مساعدك الذكي في رحلة تعلم الأمن السيبراني. اسأله أي سؤال وسيشرح لك بالعربية بأسلوب بسيط ومفهوم.
            </p>
            <div className="flex flex-wrap gap-3 justify-center font-arabic text-sm">
              <span className="px-4 py-2 rounded-xl bg-primary/10 text-primary">اشرح بشكل أبسط</span>
              <span className="px-4 py-2 rounded-xl bg-accent/10 text-accent">اعطني مثال</span>
              <span className="px-4 py-2 rounded-xl bg-cyber-success/10 text-cyber-success">لخص لي</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">
              هل أنت مستعد <span className="gradient-cyber-text">للبدء</span>؟
            </h2>
            <p className="font-arabic text-muted-foreground mb-8" dir="rtl">انضم الآن وابدأ رحلتك في عالم الأمن السيبراني</p>
            <Link to="/courses" className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-cyber text-primary-foreground font-semibold text-lg">
              🚀 ابدأ التعلم الآن <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
