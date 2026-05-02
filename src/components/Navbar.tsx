import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search, LogIn, User, LogOut, ChevronDown, Languages } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import cyberMindLogo from "@/assets/cybermind-logo.png";

interface NavbarProps {
  user: { email: string; name: string } | null;
  onLogout: () => void;
  onLoginClick: () => void;
}

export default function Navbar({ user, onLogout, onLoginClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t, lang, toggleLang } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t("nav.hq") },
    { to: "/courses", label: t("nav.missions") },
    { to: "/lab", label: t("nav.lab") },
    { to: "/tools", label: t("nav.arsenal") },
    { to: "/dashboard", label: t("nav.intel") },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 p-1 border border-primary/20">
              <img src={cyberMindLogo} alt="CyberMind" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-base gradient-cyber-text tracking-wide">CyberMind</span>
              <span className="text-[10px] text-muted-foreground hidden sm:block">Intelligent Cyber Academy</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.to || (link.to !== "/" && location.pathname.startsWith(link.to))
                    ? "bg-primary/10 text-primary cyber-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <Link to="/search" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Search">
              <Search className="w-4.5 h-4.5" />
            </Link>
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              aria-label="Switch language"
              title={lang === "ar" ? "Switch to English" : "تبديل إلى العربية"}
            >
              <Languages className="w-4 h-4" />
              <span className="font-mono uppercase">{lang === "ar" ? "EN" : "ع"}</span>
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Toggle theme">
              {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-0 top-full mt-1 w-44 glass-strong rounded-xl overflow-hidden border border-border shadow-lg"
                    >
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { onLogout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> {t("auth.logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg gradient-cyber text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all"
              >
                <LogIn className="w-4 h-4" /> {t("auth.login")}
              </button>
            )}

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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] md:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card/95 backdrop-blur-2xl border-l border-border shadow-2xl flex flex-col"
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"><X className="w-6 h-6" /></button>
              </div>
              <div className="flex flex-col items-center gap-2 px-8 pt-4">
                {navLinks.map((link, i) => (
                  <motion.div key={link.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }} className="w-full">
                    <Link to={link.to} onClick={() => setMobileOpen(false)}
                      className={`block w-full px-6 py-4 rounded-xl text-lg font-medium text-center transition-all ${
                        location.pathname === link.to ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
                      }`}>{link.label}</Link>
                  </motion.div>
                ))}
                <div className="w-full pt-4">
                  {user ? (
                    <button onClick={() => { onLogout(); setMobileOpen(false); }} className="w-full px-6 py-4 rounded-xl text-lg font-medium text-center text-destructive hover:bg-destructive/10">{t("auth.logout")}</button>
                  ) : (
                    <button onClick={() => { onLoginClick(); setMobileOpen(false); }} className="w-full px-6 py-4 rounded-xl text-lg font-semibold text-center gradient-cyber text-primary-foreground">{t("auth.login")}</button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
