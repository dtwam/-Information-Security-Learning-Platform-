/**
 * Multi-course architecture for the CyberSec Academy platform.
 * Supports adding new courses easily by following the Course interface.
 */

export interface Course {
  id: string;
  code: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  color: string; // CSS class for accent color
  totalUnits: number;
  units: CourseUnit[];
}

export interface CourseUnit {
  id: number;
  courseId: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  topics: string[];
  /** Arabic lesson content - structured sections */
  content: UnitContent[];
  /** Quiz questions for this unit */
  quiz?: QuizQuestion[];
  /** Concept cards for quick review */
  concepts?: ConceptCard[];
}

export interface UnitContent {
  heading: string;
  headingAr: string;
  body: string; // Arabic content - preserved as-is
  type: 'text' | 'command' | 'diagram' | 'warning' | 'tip';
  commands?: { cmd: string; explanation: string }[];
}

export interface QuizQuestion {
  question: string;
  questionAr?: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface ConceptCard {
  name: string;
  nameAr: string;
  simple: string; // simple explanation in Arabic
  detailed: string; // deeper explanation in Arabic
  example?: string;
}

export interface CyberTool {
  id: string;
  name: string;
  category: string;
  description: string;
  descriptionAr: string;
  usage: string;
  commands: { cmd: string; desc: string }[];
  relatedCourses: string[];
}

export interface LabChallenge {
  id: number;
  courseId: string;
  title: string;
  titleAr?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  instructions: string[];
  hints: string[];
  expectedCommand: string;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: string;
}
