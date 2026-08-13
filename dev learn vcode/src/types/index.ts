export type CategoryId = 
  | 'web'
  | 'backend'
  | 'systems'
  | 'data-ai'
  | 'mobile'
  | 'scripting';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SyntaxSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  simulatedOutput?: string;
  explanation?: string;
}

export interface Framework {
  name: string;
  role: string; // e.g. "Full-Stack Web", "Machine Learning"
  description: string;
  website?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
}

export interface Quiz {
  id: string;
  languageId: string;
  languageName: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface Language {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;
  iconName: string;
  themeColor: string; // TailWind color name like "indigo", "emerald", "amber"
  accentHex: string;
  tagline: string;
  yearCreated: number;
  createdByName: string;
  paradigm: string; // e.g. "Multi-paradigm: Object-oriented, Functional"
  difficultyRating: DifficultyLevel;
  overview: string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  popularFrameworks: Framework[];
  syntaxSnippets: SyntaxSnippet[];
  commonUseCases: string[];
  learningRoadmap: string[];
  compilerOrRuntime: string;
}

export interface UserQuizAttempt {
  id: string;
  quizId: string;
  languageId: string;
  languageName: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTakenSeconds: number;
  completedAt: string; // ISO date string
  userAnswers: Record<number, number>; // questionIndex -> selectedOptionIndex
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface DailyStudyLog {
  date: string; // YYYY-MM-DD
  seconds: number;
}

export interface Lesson {
  id: string;
  languageId: string;
  title: string;
  description: string;
  content: string;
  codeExamples?: string[];
  order: number; // For ordering lessons
  difficulty: DifficultyLevel;
}

export interface UserProfile {
  name: string;
  age?: number;
  preferredLanguageId?: string;
  profileImageData?: string; // Base64 encoded image
  learningLevel: DifficultyLevel;
  bio?: string;
}

export interface UserProgress {
  totalStudySeconds: number;
  timeSpentPerLanguage: Record<string, number>; // languageId -> seconds
  dailyStudyGoalMinutes: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyLogs: Record<string, number>; // YYYY-MM-DD -> seconds
  bookmarkedLanguageIds: string[];
  completedQuizAttempts: UserQuizAttempt[];
  unlockedBadgeIds: string[];
  // Profile and progress tracking
  profile?: UserProfile;
  completedLessonIds: string[]; // lesson IDs
  languageProgress: Record<string, {
    lessonsCompleted: number;
    bestQuizScore: number;
    totalQuizzesTaken: number;
    averageQuizScore: number;
  }>; // languageId -> progress
}
