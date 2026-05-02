import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "ar";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const dict: Record<string, { en: string; ar: string }> = {
  // Nav
  "nav.hq": { en: "Home", ar: "الرئيسية" },
  "nav.missions": { en: "Courses", ar: "المقررات" },
  "nav.lab": { en: "Cyber Lab", ar: "المختبر" },
  "nav.arsenal": { en: "Arsenal", ar: "الأدوات" },
  "nav.intel": { en: "Dashboard", ar: "لوحتي" },
  "nav.practical": { en: "Practical", ar: "عملي" },
  // Auth
  "auth.login": { en: "Sign In", ar: "تسجيل الدخول" },
  "auth.signup": { en: "Create Account", ar: "إنشاء حساب" },
  "auth.logout": { en: "Sign Out", ar: "تسجيل الخروج" },
  "auth.email": { en: "Email", ar: "البريد الإلكتروني" },
  "auth.password": { en: "Password", ar: "كلمة المرور" },
  "auth.subtitle.login": { en: "Welcome back to CyberMind", ar: "مرحباً بعودتك إلى CyberMind" },
  "auth.subtitle.signup": { en: "Join the CyberMind academy", ar: "انضم إلى أكاديمية CyberMind" },
  "auth.toggleToSignup": { en: "No account? Create one", ar: "ليس لديك حساب؟ أنشئ حساباً" },
  "auth.toggleToLogin": { en: "Have an account? Sign in", ar: "لديك حساب؟ سجل الدخول" },
  "auth.requireFields": { en: "Please fill in all fields", ar: "يرجى ملء جميع الحقول" },
  "auth.weakPassword": { en: "Password must be at least 8 characters with letters & numbers", ar: "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حروف وأرقام" },
  "auth.invalidEmail": { en: "Please enter a valid email", ar: "البريد الإلكتروني غير صحيح" },
  "auth.invalidLogin": { en: "Invalid email or password", ar: "البريد أو كلمة المرور غير صحيحة" },
  "auth.exists": { en: "An account with this email already exists", ar: "هذا البريد مسجل مسبقاً" },
  // Hero
  "hero.title": { en: "CyberMind", ar: "CyberMind" },
  "hero.tagline": { en: "Intelligent Cybersecurity Academy", ar: "أكاديمية الذكاء السيبراني" },
  "hero.subtitle": { en: "An AI-powered learning platform for next-generation security engineers from Al-Quds Open University.", ar: "منصة تعلم مدعومة بالذكاء الاصطناعي لمهندسي الأمن السيبراني من جامعة القدس المفتوحة." },
  "hero.cta.start": { en: "Start Learning", ar: "ابدأ التعلم" },
  "hero.cta.lab": { en: "Open Lab", ar: "افتح المختبر" },
  "hero.stats.courses": { en: "Courses", ar: "مقررات" },
  "hero.stats.units": { en: "Units", ar: "وحدات" },
  "hero.stats.completed": { en: "Completed", ar: "مكتملة" },
  // Sections
  "section.why.title": { en: "Why CyberMind?", ar: "لماذا CyberMind؟" },
  "section.why.subtitle": { en: "A unique learning experience blending academic depth with hands-on practice", ar: "تجربة تعليمية فريدة تجمع بين العمق الأكاديمي والتطبيق العملي" },
  "section.courses.title": { en: "Available Courses", ar: "المقررات المتاحة" },
  "section.courses.subtitle": { en: "Pick your course to begin your journey", ar: "اختر مقررك لبدء رحلة التعلم" },
  "section.learn.title": { en: "What You Will Learn", ar: "ماذا ستتعلم؟" },
  "section.cta.title": { en: "Ready to begin?", ar: "هل أنت مستعد للبدء؟" },
  "section.cta.subtitle": { en: "Join now and step into the world of cybersecurity", ar: "انضم الآن وابدأ رحلتك في عالم الأمن السيبراني" },
  "section.cta.button": { en: "Start Learning Now", ar: "ابدأ التعلم الآن" },
  // Why cards
  "why.academic.title": { en: "Academic Content", ar: "محتوى أكاديمي" },
  "why.academic.desc": { en: "Built on Al-Quds Open University curriculum", ar: "مبني على مقررات جامعة القدس المفتوحة" },
  "why.lab.title": { en: "Interactive Lab", ar: "مختبر تفاعلي" },
  "why.lab.desc": { en: "Practice real cybersecurity tools", ar: "تدرب على أدوات الأمن السيبراني الحقيقية" },
  "why.ai.title": { en: "AI Tutor", ar: "مساعد ذكي" },
  "why.ai.desc": { en: "CyberMind explains anything, in any language", ar: "CyberMind يشرح أي شيء بأي لغة" },
  "why.practical.title": { en: "Practical Learning", ar: "تعلم عملي" },
  "why.practical.desc": { en: "Real-world scenarios and walkthroughs", ar: "تمارين ومحاكاة لسيناريوهات حقيقية" },
  // Course detail
  "course.back": { en: "Back to Courses", ar: "العودة للمقررات" },
  "course.tab.theory": { en: "Theory", ar: "نظري" },
  "course.tab.practical": { en: "Practical / Hands-on", ar: "عملي / تطبيقي" },
  "course.progress": { en: "Progress", ar: "التقدم" },
  // CyberMind chat
  "chat.placeholder": { en: "Ask CyberMind anything...", ar: "اسأل CyberMind أي شيء..." },
  "chat.title": { en: "CyberMind AI Tutor", ar: "مساعد CyberMind الذكي" },
  "chat.greeting": { en: "Hi! I'm **CyberMind**, your AI tutor. Ask me anything — from cybersecurity to general questions, in Arabic or English.", ar: "مرحباً! أنا **CyberMind** مساعدك الذكي. اسألني أي شيء من الأمن السيبراني إلى الأسئلة العامة بالعربية أو الإنجليزية." },
  "chat.quick.simpler": { en: "Explain simpler", ar: "اشرح بشكل أبسط" },
  "chat.quick.example": { en: "Give me an example", ar: "اعطني مثالاً" },
  "chat.quick.summary": { en: "Summarize", ar: "لخّص" },
  "chat.quick.quiz": { en: "Quiz me", ar: "اختبرني" },
  "chat.error.rate": { en: "Slow down a bit — too many requests. Try again shortly.", ar: "تمهّل قليلاً — طلبات كثيرة. حاول مرة أخرى." },
  "chat.error.payment": { en: "AI quota exhausted. Please contact the workspace owner.", ar: "تم استنفاد رصيد الذكاء الاصطناعي." },
  "chat.error.generic": { en: "Something went wrong. Try again.", ar: "حدث خطأ. حاول مرة أخرى." },
  // Footer
  "footer.about": { en: "About", ar: "حول" },
  "footer.contact": { en: "Contact", ar: "تواصل" },
  "footer.security": { en: "Security", ar: "الأمان" },
  "footer.credit": { en: "Content engineering by Duha Twam", ar: "هندسة المحتوى: ضحى توام" },
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("cybermind-lang");
    return (stored === "ar" || stored === "en") ? stored : "ar";
  });

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    localStorage.setItem("cybermind-lang", lang);
  }, [lang, dir]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleLang = () => setLangState((p) => (p === "ar" ? "en" : "ar"));
  const t = (key: string) => dict[key]?.[lang] ?? key;

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
