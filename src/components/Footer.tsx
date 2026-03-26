// Export-ready component — Footer
export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border/30 relative z-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Al-Quds Open University — CyberSec Academy</span>
        <div className="flex items-center gap-4">
          <span className="opacity-60">Content engineering by Duha Twam</span>
          <span className="opacity-40">Built with Lovable – Ready for full code export</span>
        </div>
      </div>
    </footer>
  );
}
