import { useState, useEffect, useCallback } from "react";

// Progress data stored in localStorage
export interface ProgressData {
  completedUnits: number[];
  completedChallenges: number[];
  quizScores: Record<number, number>;
  streak: number;
  lastVisit: string;
  totalTimeSpent: number;
  unlockedAchievements: string[];
}

const DEFAULT_PROGRESS: ProgressData = {
  completedUnits: [],
  completedChallenges: [],
  quizScores: {},
  streak: 0,
  lastVisit: "",
  totalTimeSpent: 0,
  unlockedAchievements: [],
};

const STORAGE_KEY = "cybersec-progress";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Update streak based on last visit
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (parsed.lastVisit === yesterday) {
          parsed.streak += 1;
        } else if (parsed.lastVisit !== today) {
          parsed.streak = 1;
        }
        parsed.lastVisit = today;
        return parsed;
      }
    } catch {}
    return { ...DEFAULT_PROGRESS, lastVisit: new Date().toDateString(), streak: 1 };
  });

  // Persist progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeUnit = useCallback((unitId: number) => {
    setProgress((prev) => {
      if (prev.completedUnits.includes(unitId)) return prev;
      const updated = { ...prev, completedUnits: [...prev.completedUnits, unitId] };
      // Check achievements
      if (updated.completedUnits.length === 1 && !updated.unlockedAchievements.includes("first-unit")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "first-unit"];
      }
      if (updated.completedUnits.includes(6) && !updated.unlockedAchievements.includes("recon-master")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "recon-master"];
      }
      if (updated.completedUnits.includes(4) && !updated.unlockedAchievements.includes("sql-expert")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "sql-expert"];
      }
      if (updated.completedUnits.includes(5) && !updated.unlockedAchievements.includes("pentester")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "pentester"];
      }
      if (updated.completedUnits.length === 8 && !updated.unlockedAchievements.includes("hacker")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "hacker"];
      }
      return updated;
    });
  }, []);

  const completeChallenge = useCallback((challengeId: number) => {
    setProgress((prev) => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      const updated = { ...prev, completedChallenges: [...prev.completedChallenges, challengeId] };
      if (updated.completedChallenges.length >= 3 && !updated.unlockedAchievements.includes("lab-rat")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "lab-rat"];
      }
      return updated;
    });
  }, []);

  const saveQuizScore = useCallback((unitId: number, score: number) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        quizScores: { ...prev.quizScores, [unitId]: Math.max(prev.quizScores[unitId] || 0, score) },
      };
      if (score >= 90 && !updated.unlockedAchievements.includes("quiz-ace")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "quiz-ace"];
      }
      return updated;
    });
  }, []);

  const overallProgress = progress.completedUnits.length / 8;

  return { progress, completeUnit, completeChallenge, saveQuizScore, overallProgress };
}
