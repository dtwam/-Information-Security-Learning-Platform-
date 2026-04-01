import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, LogIn, UserPlus } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin, onSignup }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("يرجى ملء جميع الحقول");
      return;
    }
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (mode === "login") onLogin(email, password);
    else onSignup(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm glass-strong rounded-2xl overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="px-6 pt-6 pb-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl gradient-cyber flex items-center justify-center">
                {mode === "login" ? <LogIn className="w-6 h-6 text-primary-foreground" /> : <UserPlus className="w-6 h-6 text-primary-foreground" />}
              </div>
              <h2 className="font-display font-bold text-lg">
                {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
              </h2>
              <p className="text-xs text-muted-foreground font-arabic mt-1">
                {mode === "login" ? "ادخل لمتابعة رحلة التعلم" : "انضم للأكاديمية وابدأ التعلم"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  dir="rtl"
                  className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow font-arabic"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  dir="rtl"
                  className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow font-arabic"
                />
              </div>

              {error && (
                <p className="text-xs text-destructive text-center font-arabic">{error}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-cyber text-primary-foreground font-semibold text-sm btn-glow transition-all hover:opacity-90"
              >
                {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                  className="text-xs text-primary hover:underline font-arabic"
                >
                  {mode === "login" ? "ليس لديك حساب؟ أنشئ حساباً" : "لديك حساب؟ سجل الدخول"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
