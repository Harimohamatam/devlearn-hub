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

export type DifficultyLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced';

/* =========================================================
   LESSON VOLUMES
   ========================================================= */

export type LessonVolume =
  | 'basic'
  | 'in-depth'
  | 'core';

export interface LessonVolumeInfo {
  id: LessonVolume;
  name: string;
  description: string;
  iconName?: string;
}

/* =========================================================
   LESSON CONTENT
   ========================================================= */

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  code?: string;
  output?: string;
  explanation?: string;
}

export interface LessonQuickCheck {
  question: string;
  answer: string;
}

export interface Lesson {
  id: string;
  languageId: string;
  title: string;
  description: string;

  /*
   * Existing field kept so old lesson data
   * continues to work.
   */
  content: string;

  /*
   * Existing field kept for compatibility.
   */
  codeExamples?: string[];

  /*
   * New structured ChatGPT-style teaching content.
   */
  sections?: LessonSection[];

  whyItMatters?: string;

  howItWorks?: string;

  whenToUse?: string;

  whatHappens?: string;

  realWorldExample?: string;

  commonMistakes?: string[];

  keyTakeaways?: string[];

  quickChecks?: LessonQuickCheck[];

  /*
   * Every lesson belongs to one of the
   * three learning volumes.
   */
  volume?: LessonVolume;

  /*
   * Used to order lessons inside a volume.
   */
  order: number;

  difficulty: DifficultyLevel;
}

/* =========================================================
   SYNTAX / FRAMEWORK DATA
   ========================================================= */

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
  role: string;
  description: string;
  website?: string;
}

/* =========================================================
   QUIZZES
   ========================================================= */

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  hint?: string;
}

/*
 * Quiz can belong to an individual lesson.
 * lessonId is optional so existing quizzes
 * in the project remain compatible.
 */
export interface Quiz {
  id: string;
  languageId: string;
  languageName: string;

  /*
   * Individual lesson quiz.
   */
  lessonId?: string;
  lessonTitle?: string;

  /*
   * Volume of the lesson.
   */
  volume?: LessonVolume;

  title: string;

  difficulty:
    | 'beginner'
    | 'intermediate'
    | 'advanced';

  timeLimitMinutes: number;

  questions: QuizQuestion[];

  /*
   * Used when quizzes are generated dynamically.
   */
  generatedAt?: string;
  generationSeed?: string;
}

/* =========================================================
   LANGUAGE
   ========================================================= */

export interface Language {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryName: string;

  iconName: string;

  themeColor: string;
  accentHex: string;

  tagline: string;

  yearCreated: number;
  createdByName: string;

  paradigm: string;

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

/* =========================================================
   QUIZ ATTEMPTS
   ========================================================= */

export interface UserQuizAttempt {
  id: string;

  quizId: string;

  languageId: string;
  languageName: string;

  /*
   * Optional because older attempts may not have
   * lesson information.
   */
  lessonId?: string;
  lessonTitle?: string;
  volume?: LessonVolume;

  difficulty:
    | 'beginner'
    | 'intermediate'
    | 'advanced';

  score: number;
  totalQuestions: number;
  percentage: number;

  timeTakenSeconds: number;

  completedAt: string;

  /*
   * questionIndex -> selectedOptionIndex
   */
  userAnswers: Record<number, number>;
}

/* =========================================================
   BADGES
   ========================================================= */

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

/* =========================================================
   DAILY STUDY
   ========================================================= */

export interface DailyStudyLog {
  date: string;
  seconds: number;
}

/* =========================================================
   USER PROFILE
   ========================================================= */

export interface UserProfile {
  name: string;

  age?: number;

  preferredLanguageId?: string;

  profileImageData?: string;

  learningLevel: DifficultyLevel;

  bio?: string;
}

/* =========================================================
   USER PROGRESS
   ========================================================= */

export interface UserProgress {
  totalStudySeconds: number;

  timeSpentPerLanguage: Record<
    string,
    number
  >;

  dailyStudyGoalMinutes: number;

  streakDays: number;

  lastActiveDate: string;

  dailyLogs: Record<
    string,
    number
  >;

  bookmarkedLanguageIds: string[];

  completedQuizAttempts: UserQuizAttempt[];

  unlockedBadgeIds: string[];

  /*
   * Profile and progress tracking.
   */
  profile?: UserProfile;

  /*
   * Completed lesson IDs.
   */
  completedLessonIds: string[];

  /*
   * languageId -> progress
   */
  languageProgress: Record<
    string,
    {
      lessonsCompleted: number;
      bestQuizScore: number;
      totalQuizzesTaken: number;
      averageQuizScore: number;
    }
  >;
}