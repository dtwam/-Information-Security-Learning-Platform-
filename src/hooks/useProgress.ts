import { useState, useEffect, useCallback } from "react";

/**
 * Progress tracking hook - supports multi-course architecture.
 * Unit keys are strings like "infosec-1272-1" for course-specific tracking.
 */
export interface ProgressData {
  completedUnits: string[];
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
        // Migrate old number[] completedUnits to string[] if needed
        if (parsed.completedUnits?.length > 0 && typeof parsed.completedUnits[0] === 'number') {
          parsed.completedUnits = parsed.completedUnits.map((id: number) => `infosec-1272-${id}`);
        }
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (parsed.lastVisit === yesterday) parsed.streak += 1;
        else if (parsed.lastVisit !== today) parsed.streak = 1;
        parsed.lastVisit = today;
        return parsed;
      }
    } catch {}
    return { ...DEFAULT_PROGRESS, lastVisit: new Date().toDateString(), streak: 1 };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeUnit = useCallback((unitKey: string | number) => {
    const key = typeof unitKey === 'number' ? `infosec-1272-${unitKey}` : unitKey;
    setProgress((prev) => {
      if (prev.completedUnits.includes(key)) return prev;
      const updated = { ...prev, completedUnits: [...prev.completedUnits, key] };
      // Check achievements
      if (updated.completedUnits.length === 1 && !updated.unlockedAchievements.includes("first-unit")) {
        updated.unlockedAchievements = [...updated.unlockedAchievements, "first-unit"];
      }
      if (updated.completedUnits.length >= 13 && !updated.unlockedAchievements.includes("hacker")) {
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

  const overallProgress = progress.completedUnits.length / 13; // 7 + 6 total units

  return { progress, completeUnit, completeChallenge, saveQuizScore, overallProgress };
}
