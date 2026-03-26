import { motion } from "framer-motion";
import { ArrowRight, Terminal, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80 dark:bg-background/70" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              Information Security Applications 1272
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
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-cyber text-primary-foreground font-semibold transition-transform hover:scale-105 cyber-glow"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/lab"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold text-foreground transition-transform hover:scale-105"
              >
                <Terminal className="w-4 h-4" /> Open Cyber Lab
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-6 mt-16 max-w-md"
          >
            {[
              { value: "8", label: "Units" },
              { value: "6+", label: "Lab Challenges" },
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
  );
}
