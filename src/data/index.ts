/**
 * Central data index - re-exports all course data for backward compatibility
 * and provides helper functions for cross-course operations.
 */
import { infoSecCourse, infoSecLabChallenges } from './course-infosec';
import { wirelessCourse, wirelessLabChallenges } from './course-wireless';
import { cyberTools } from './tools';
import { achievements } from './achievements';
import { terminalCommands } from './terminal-commands';
import type { Course, CourseUnit, LabChallenge, CyberTool, Achievement } from './courses';

// All courses array - add new courses here
export const allCourses: Course[] = [infoSecCourse, wirelessCourse];

// All lab challenges combined
export const allLabChallenges: LabChallenge[] = [...infoSecLabChallenges, ...wirelessLabChallenges];

// Helper: get course by ID
export function getCourseById(id: string): Course | undefined {
  return allCourses.find(c => c.id === id);
}

// Helper: get unit by course and unit ID
export function getUnit(courseId: string, unitId: number): CourseUnit | undefined {
  const course = getCourseById(courseId);
  return course?.units.find(u => u.id === unitId);
}

// Helper: get all units across all courses (flat)
export function getAllUnits(): CourseUnit[] {
  return allCourses.flatMap(c => c.units);
}

// Helper: get lab challenges for a specific course
export function getLabChallenges(courseId: string): LabChallenge[] {
  return allLabChallenges.filter(ch => ch.courseId === courseId);
}

// Helper: search across all content
export function searchContent(query: string): Array<{ type: string; title: string; titleAr: string; link: string; snippet: string }> {
  const q = query.toLowerCase();
  const results: Array<{ type: string; title: string; titleAr: string; link: string; snippet: string }> = [];

  // Search courses
  allCourses.forEach(course => {
    if (course.title.toLowerCase().includes(q) || course.titleAr.includes(query) || course.description.toLowerCase().includes(q)) {
      results.push({ type: 'course', title: course.title, titleAr: course.titleAr, link: `/courses/${course.id}`, snippet: course.description });
    }
    // Search units
    course.units.forEach(unit => {
      if (unit.title.toLowerCase().includes(q) || unit.titleAr.includes(query) || unit.description.toLowerCase().includes(q) || unit.topics.some(t => t.toLowerCase().includes(q))) {
        results.push({ type: 'unit', title: unit.title, titleAr: unit.titleAr, link: `/courses/${course.id}/${unit.id}`, snippet: unit.description });
      }
      // Search concepts
      unit.concepts?.forEach(concept => {
        if (concept.name.toLowerCase().includes(q) || concept.nameAr.includes(query) || concept.simple.includes(query)) {
          results.push({ type: 'concept', title: concept.name, titleAr: concept.nameAr, link: `/courses/${course.id}/${unit.id}`, snippet: concept.simple });
        }
      });
    });
  });

  // Search tools
  cyberTools.forEach(tool => {
    if (tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q) || tool.descriptionAr.includes(query)) {
      results.push({ type: 'tool', title: tool.name, titleAr: tool.descriptionAr.slice(0, 50), link: `/tools`, snippet: tool.description });
    }
  });

  // Search terminal commands
  Object.keys(terminalCommands).forEach(cmd => {
    if (cmd.includes(q)) {
      results.push({ type: 'command', title: cmd, titleAr: '', link: '/lab', snippet: terminalCommands[cmd].explanation });
    }
  });

  return results;
}

// Re-export everything
export { infoSecCourse, wirelessCourse, infoSecLabChallenges, wirelessLabChallenges, cyberTools, achievements, terminalCommands };
export type { Course, CourseUnit, LabChallenge, CyberTool, Achievement };
