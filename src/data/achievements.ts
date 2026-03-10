/**
 * Achievement system supporting multiple courses.
 */
import type { Achievement } from './courses';

export const achievements: Achievement[] = [
  { id: "first-unit", title: "First Steps", description: "Complete your first unit", icon: "🏁", condition: "complete_1_unit" },
  { id: "recon-master", title: "Reconnaissance Master", description: "Complete Nmap tools unit", icon: "🔍", condition: "complete_infosec_3" },
  { id: "sql-expert", title: "SQL Injection Expert", description: "Complete Web App Testing", icon: "💉", condition: "complete_infosec_4" },
  { id: "pentester", title: "Penetration Tester", description: "Complete Burp Suite unit", icon: "🎯", condition: "complete_infosec_5" },
  { id: "social-eng", title: "Social Engineer", description: "Complete SET unit", icon: "🎭", condition: "complete_infosec_7" },
  { id: "wireless-pro", title: "Wireless Security Pro", description: "Complete all wireless units", icon: "📡", condition: "complete_all_wireless" },
  { id: "lab-rat", title: "Lab Rat", description: "Complete 3 lab challenges", icon: "🧪", condition: "complete_3_challenges" },
  { id: "hacker", title: "Ethical Hacker", description: "Complete all courses", icon: "🏆", condition: "complete_all" },
  { id: "streak-3", title: "On Fire", description: "3-day learning streak", icon: "🔥", condition: "streak_3" },
  { id: "quiz-ace", title: "Quiz Ace", description: "Score 90%+ on any quiz", icon: "⭐", condition: "quiz_90" },
];
