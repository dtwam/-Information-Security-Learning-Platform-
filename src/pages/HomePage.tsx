import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Terminal, ShieldCheck, GraduationCap, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";
import { allCourses } from "@/data/index";
import universityLogo from "@/assets/university-logo.png";
import { useLanguage } from "@/hooks/useLanguage";

export default function HomePage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="min-h-screen relative z-10">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <img
                src={universityLogo}
                alt="Al-Quds Open University"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              {isAr ? "أكاديمية رسمية · جامعة القدس المفتوحة" : "Official Academy · Al-Quds Open University"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-5">
              <span className="gradient-cyber-text">TechSec</span>{" "}
              <span className="text-foreground">QOU</span>
            </h1>

            <p
              className="font-arabic text-base sm:text-lg text-muted-foreground mb-3 max-w-2xl mx-auto leading-relaxed"
              dir="rtl"
            >
              أكاديمية تيك سيك — جامعة القدس المفتوحة
            </p>
            <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? "المنصة الرسمية لطلاب تخصص أنظمة المعلومات وأمن المعلومات لتعلّم الأمن السيبراني عملياً."
                : "The official learning platform for Information Systems & Information Security students at Al-Quds Open University."}
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/courses"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-cyber text-primary-foreground font-semibold"
              >
                <BookOpen className="w-5 h-5" />
                {isAr ? "تصفح المقررات" : "Browse Courses"}
              </Link>
              <Link
                to="/lab"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass font-semibold text-foreground"
              >
                <Terminal className="w-5 h-5" />
                {isAr ? "افتح المختبر" : "Open Lab"}
              </Link>
            </div>

            {/* Compact stats */}
            <div className="grid grid-cols-3 gap-8 mt-14 max-w-sm mx-auto">
              {[
                { value: `${allCourses.length}`, en: "Courses", ar: "مقررات" },
                {
                  value: `${allCourses.reduce((a, c) => a + c.totalUnits, 0)}`,
                  en: "Units",
                  ar: "وحدات",
                },
                { value: "2", en: "Practical Exams", ar: "امتحانات عملية" },
              ].map((s) => (
                <div key={s.en} className="text-center">
                  <div className="text-2xl font-display font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{isAr ? s.ar : s.en}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── COURSES (compact) ─── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
              {isAr ? "المقررات" : "Courses"}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {isAr
                ? "مقررات أكاديمية مع شروحات وحلول الامتحانات العملية."
                : "Academic courses with full lessons and practical-exam solutions."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="glass rounded-2xl p-5 hover:cyber-glow transition-shadow group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{course.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-base group-hover:text-primary transition-colors leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1" dir="rtl">
                      {course.titleAr}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {course.totalUnits} {isAr ? "وحدات" : "units"}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                    {course.code}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HIGHLIGHTS ─── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: GraduationCap,
                title: isAr ? "محتوى أكاديمي" : "Academic Content",
                desc: isAr
                  ? "مبني على مقررات جامعة القدس المفتوحة"
                  : "Built on Al-Quds Open University curriculum",
              },
              {
                icon: FlaskConical,
                title: isAr ? "حلول الامتحانات العملية" : "Practical Exam Solutions",
                desc: isAr
                  ? "خطوات مرتبة وأوامر وشروحات احترافية"
                  : "Structured steps, commands, and clear explanations",
              },
              {
                icon: Terminal,
                title: isAr ? "مختبر تفاعلي" : "Interactive Lab",
                desc: isAr ? "تدرّب على أدوات حقيقية" : "Practice real-world tools",
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-5 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl gradient-cyber flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
            {isAr ? "ابدأ التعلّم اليوم" : "Start learning today"}
          </h2>
          <p className="text-sm text-muted-foreground mb-7">
            {isAr
              ? "اختر مقررك وابدأ رحلتك في الأمن السيبراني."
              : "Pick a course and begin your cybersecurity journey."}
          </p>
          <Link
            to="/courses"
            className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-cyber text-primary-foreground font-semibold"
          >
            {isAr ? "تصفح المقررات" : "Browse Courses"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
