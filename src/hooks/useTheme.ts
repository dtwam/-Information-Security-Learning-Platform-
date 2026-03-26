// Export-ready component — always dark cyberpunk theme
import { useState, useEffect } from "react";

export function useTheme() {
  // Always dark — toggle kept for UI compatibility
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("cybersec-theme", "dark");
  }, []);

  const toggleTheme = () => {
    // No-op: always dark cyberpunk
  };

  return { isDark: true, toggleTheme };
}
