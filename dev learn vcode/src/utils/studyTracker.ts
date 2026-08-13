import { UserProgress, UserQuizAttempt } from '../types';
import { BADGES_LIST } from '../data/badgesData';

const STORAGE_KEY = 'devlearn_user_progress_v1';

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const INITIAL_USER_PROGRESS: UserProgress = {
  totalStudySeconds: 0,
  timeSpentPerLanguage: {},
  dailyStudyGoalMinutes: 20,
  streakDays: 1,
  lastActiveDate: getTodayDateString(),
  dailyLogs: {
    [getTodayDateString()]: 0
  },
  bookmarkedLanguageIds: ['javascript', 'python'],
  completedQuizAttempts: [],
  unlockedBadgeIds: [],
  profile: {
    name: 'Student',
    learningLevel: 'Beginner'
  },
  completedLessonIds: [],
  languageProgress: {}
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_USER_PROGRESS;
    const parsed = JSON.parse(raw) as UserProgress;

    // Check streak
    const today = getTodayDateString();
    if (parsed.lastActiveDate !== today) {
      const lastDate = new Date(parsed.lastActiveDate);
      const currDate = new Date(today);
      const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        parsed.streakDays += 1;
      } else if (diffDays > 1) {
        parsed.streakDays = 1; // reset streak if missed a day
      }
      parsed.lastActiveDate = today;
    }

    if (!parsed.dailyLogs) parsed.dailyLogs = {};
    if (!parsed.dailyLogs[today]) parsed.dailyLogs[today] = 0;

    return parsed;
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return INITIAL_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

export function formatTimeSpent(totalSeconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
  formattedString: string;
} {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let formattedString = '';
  if (hours > 0) {
    formattedString += `${hours}h `;
  }
  formattedString += `${minutes}m ${seconds}s`;

  return { hours, minutes, seconds, formattedString };
}

export function evaluateBadges(progress: UserProgress): string[] {
  const newlyUnlocked: string[] = [];
  const currentUnlocked = new Set(progress.unlockedBadgeIds);

  // 1. First Session
  if (progress.totalStudySeconds > 10 && !currentUnlocked.has('first-session')) {
    newlyUnlocked.push('first-session');
  }

  // 2. Polyglot Apprentice (studied >= 3 languages)
  const studiedLanguagesCount = Object.keys(progress.timeSpentPerLanguage).filter(
    (id) => progress.timeSpentPerLanguage[id] > 30
  ).length;
  if (studiedLanguagesCount >= 3 && !currentUnlocked.has('polyglot')) {
    newlyUnlocked.push('polyglot');
  }

  // 3. Quiz Master (>=3 quizzes with score >= 80%)
  const highScores = progress.completedQuizAttempts.filter((att) => att.percentage >= 80).length;
  if (highScores >= 3 && !currentUnlocked.has('quiz-master')) {
    newlyUnlocked.push('quiz-master');
  }

  // 4. Study Marathon (>= 3600 seconds = 1 hour)
  if (progress.totalStudySeconds >= 3600 && !currentUnlocked.has('time-marathon')) {
    newlyUnlocked.push('time-marathon');
  }

  // 5. 3-Day Streak
  if (progress.streakDays >= 3 && !currentUnlocked.has('streak-3')) {
    newlyUnlocked.push('streak-3');
  }

  // 6. Systems Explorer
  const systemsTime = (progress.timeSpentPerLanguage['rust'] || 0) + 
                      (progress.timeSpentPerLanguage['cpp'] || 0);
  if (systemsTime >= 120 && !currentUnlocked.has('systems-architect')) {
    newlyUnlocked.push('systems-architect');
  }

  return newlyUnlocked;
}
