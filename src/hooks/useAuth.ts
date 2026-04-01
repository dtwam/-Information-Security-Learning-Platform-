import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

const STORAGE_KEY = "cybersec-auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = useCallback((email: string, _password: string) => {
    const name = email.split("@")[0];
    setUser({ id: crypto.randomUUID(), email, name });
    setShowAuthModal(false);
  }, []);

  const signup = useCallback((email: string, _password: string) => {
    const name = email.split("@")[0];
    setUser({ id: crypto.randomUUID(), email, name });
    setShowAuthModal(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const requireAuth = useCallback((action: () => void) => {
    if (user) {
      action();
    } else {
      setShowAuthModal(true);
    }
  }, [user]);

  return { user, login, signup, logout, showAuthModal, setShowAuthModal, requireAuth };
}
