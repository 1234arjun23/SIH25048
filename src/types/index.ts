export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  language: string;
}

export interface Student extends User {
  role: 'student';
  grade: string;
  totalPoints: number;
  level: number;
  badges: Badge[];
  completedLessons: string[];
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  students: string[];
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  content: LessonContent[];
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  isDownloaded: boolean;
  language: string;
}

export interface LessonContent {
  id: string;
  type: 'video' | 'text' | 'animation' | 'quiz' | 'game';
  title: string;
  content: any;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  subject: string;
  grade: string;
  timeLimit: number;
  points: number;
  language: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export interface Game {
  id: string;
  title: string;
  type: 'puzzle' | 'memory' | 'math' | 'science';
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  isDownloaded: boolean;
  language: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  requirements: string;
  earnedAt?: Date;
}

export interface Progress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  lastAccessed: Date;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  level: number;
  rank: number;
}