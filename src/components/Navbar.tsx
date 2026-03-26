import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search, Shield } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import universityLogo from "@/assets/university-logo.png";

const navLinks = [
  { to: "/", label: "HQ" },
  { to: "/courses", label: "Missions" },
  { to: "/lab", label: "Cyber Lab" },
  { to: "/tools", label: "Arsenal" },
  { to: "/dashboard", label: "Intel" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo + University Name */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img src={universityLogo} alt="Al-Quds Open University" className="w-8 h-8 rounded-full object-cover" />
              <div className="absolute inset-0 rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-sm gradient-cyber-text">
                CyberSec Academy
              </span>
              <span className="text-[10px] text-muted-foreground hidden sm:flex items-center gap-1">
                <Shield className="w-2.5 h-2.5" /> Al-Quds Open University
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to))
                    ? "bg-primary/10 text-primary cyber-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/search"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            {/* Backdrop blur */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card/95 backdrop-blur-2xl border-l border-border shadow-2xl"
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex flex-col items-center justify-center gap-2 px-8 pt-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="w-full"
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={`block w-full px-6 py-4 rounded-xl text-lg font-medium text-center transition-all ${
                        location.pathname === link.to
                          ? "bg-primary/10 text-primary cyber-glow"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom logo */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <img src={universityLogo} alt="" className="w-10 h-10 rounded-full opacity-30" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
