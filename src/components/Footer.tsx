/** Footer with subtle credit */
export default function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-border/50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Al-Quds Open University — CyberSec Academy</span>
        <span className="opacity-60">Content engineering by Duha Twam</span>
      </div>
    </footer>
  );
}
