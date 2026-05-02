import { useLanguage } from "@/hooks/useLanguage";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="py-6 px-4 border-t border-border/50 relative z-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} CyberMind · Al-Quds Open University</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#about" className="hover:text-primary transition-colors">{t("footer.about")}</a>
          <a href="#contact" className="hover:text-primary transition-colors">{t("footer.contact")}</a>
          <a href="#security" className="hover:text-primary transition-colors">{t("footer.security")}</a>
          <span className="opacity-60">{t("footer.credit")}</span>
        </div>
      </div>
    </footer>
  );
}
