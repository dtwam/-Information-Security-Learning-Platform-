// Export-ready component — Full-screen cyberpunk hero with Zer0 mascot
import { motion } from "framer-motion";
import { Rocket, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import zer0Img from "@/assets/zer0-mascot.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(hsl(185_100%_50%/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(185_100%_50%/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Zer0 mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.img
              src={zer0Img}
              alt="Zer0 — AI Companion"
              className="w-32 h-32 sm:w-40 sm:h-40 mx-auto object-contain drop-shadow-[0_0_30px_hsl(185_100%_50%/0.4)]"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display font-bold leading-tight mb-4">
              <span className="gradient-cyber-text cyber-glow-text">CyberSec</span>{" "}
              <span className="text-foreground">Academy</span>
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground mb-2 font-body">
              Information Security Learning Platform
            </p>

            <p
              className="font-arabic text-base sm:text-lg text-muted-foreground mb-3 max-w-2xl mx-auto leading-relaxed"
              dir="rtl"
            >
              مرحباً بك في أكاديمية الأمن السيبراني الجامعية
            </p>

            <p
              className="font-arabic text-sm sm:text-base text-muted-foreground/70 mb-10 max-w-xl mx-auto"
              dir="rtl"
            >
              منصة تعليمية متخصصة من جامعة القدس المفتوحة
              لتدريس مقررات الأمن السيبراني بأسلوب تفاعلي حديث
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/courses"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl gradient-cyber text-primary-foreground font-semibold text-base"
              >
                <Rocket className="w-5 h-5" />
                <span className="font-arabic">ابدأ التعلم الآن</span>
              </Link>
              <Link
                to="/lab"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass neon-border font-semibold text-foreground text-base"
              >
                <Terminal className="w-5 h-5" />
                <span className="font-arabic">افتح المختبر</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
