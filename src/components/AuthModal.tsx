import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, LogIn, UserPlus, Loader2, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "@/hooks/useLanguage";
import cyberMindLogo from "@/assets/cybermind-logo.png";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string) => Promise<void>;
}

// Strong password: min 8 chars, at least one letter and one number
const passwordSchema = z.string()
  .min(8)
  .max(128)
  .refine((v) => /[A-Za-z]/.test(v) && /\d/.test(v), "weak");
const emailSchema = z.string().trim().email().max(255);

export default function AuthModal({ isOpen, onClose, onLogin, onSignup }: AuthModalProps) {
  const { t, dir } = useLanguage();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) { setError(t("auth.requireFields")); return; }
    if (!emailSchema.safeParse(email).success) { setError(t("auth.invalidEmail")); return; }
    // Only enforce strong password on signup; allow legacy logins
    if (mode === "signup" && !passwordSchema.safeParse(password).success) {
      setError(t("auth.weakPassword"));
      return;
    }
    setIsLoading(true);
    try {
      if (mode === "login") await onLogin(email.trim(), password);
      else await onSignup(email.trim(), password);
      setEmail(""); setPassword("");
    } catch (err: any) {
      const msg = err?.message || "";
      if (/invalid login|invalid credentials/i.test(msg)) setError(t("auth.invalidLogin"));
      else if (/already registered|already exists/i.test(msg)) setError(t("auth.exists"));
      else setError(msg || t("auth.invalidLogin"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir={dir}>
          <div className="absolute inset-0 bg-background/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="relative w-full max-w-sm glass-strong rounded-3xl overflow-hidden border border-primary/20"
          >
            <button onClick={onClose} className="absolute top-3 end-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10">
              <X className="w-4 h-4" />
            </button>

            <div className="px-6 pt-7 pb-4 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-2 border border-primary/30">
                <img src={cyberMindLogo} alt="CyberMind" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-display font-bold text-lg">
                {mode === "login" ? t("auth.login") : t("auth.signup")}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                {mode === "login" ? t("auth.subtitle.login") : t("auth.subtitle.signup")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3" autoComplete="on">
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email" autoComplete="email" required maxLength={255}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.email")} disabled={isLoading}
                  className="w-full bg-secondary rounded-xl ps-10 pe-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
              </div>
              <div className="relative">
                <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  required minLength={8} maxLength={128}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.password")} disabled={isLoading}
                  className="w-full bg-secondary rounded-xl ps-10 pe-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
              </div>

              {mode === "signup" && (
                <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-primary" /> {t("auth.weakPassword")}
                </p>
              )}

              {error && <p className="text-xs text-destructive text-center">{error}</p>}

              <button type="submit" disabled={isLoading}
                className="w-full py-3 rounded-xl gradient-cyber text-primary-foreground font-semibold text-sm btn-glow hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {mode === "login" ? t("auth.login") : t("auth.signup")}
              </button>

              <div className="text-center">
                <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="text-xs text-primary hover:underline">
                  {mode === "login" ? t("auth.toggleToSignup") : t("auth.toggleToLogin")}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
