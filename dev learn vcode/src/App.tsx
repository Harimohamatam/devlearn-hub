import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { LanguagesDirectoryView } from './components/LanguagesDirectoryView';
import { LanguageDetailView } from './components/LanguageDetailView';
import { QuizzesHubView } from './components/QuizzesHubView';
import { AnalyticsTimeView } from './components/AnalyticsTimeView';
import { AITutorModal } from './components/AITutorModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { ProfileView } from './components/ProfileView';

import {
  Language,
  CategoryId,
  UserProgress,
  UserQuizAttempt
} from './types';

import { LANGUAGES } from './data/languagesData';
import { BADGES_LIST } from './data/badgesData';

import {
  loadUserProgress,
  saveUserProgress,
  getTodayDateString,
  evaluateBadges
} from './utils/studyTracker';

import { Sparkles, Trophy, X } from 'lucide-react';
import { supabase } from './lib/supabase';
import AuthView from './components/AuthView';
import UpdatePasswordView from './components/UpdatePasswordView';

export default function App() {
  // ---------------------------------------------------------
  // AUTH
  // ---------------------------------------------------------
  const [authLoading, setAuthLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const {
        data: { session: currentSession }
      } = await supabase.auth.getSession();

      if (!mounted) return;

      setSession(currentSession);
      setAuthLoading(false);
    };

    loadSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!mounted) return;

      setSession(newSession);
      setAuthLoading(false);

      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true);
      }

      if (event === 'SIGNED_OUT') {
        setIsPasswordRecovery(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ---------------------------------------------------------
  // NAVIGATION
  // ---------------------------------------------------------
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'languages' | 'quizzes' | 'analytics' | 'profile' | 'tutor'
  >('dashboard');

  const [selectedCategoryId, setSelectedCategoryId] =
    useState<CategoryId | 'all'>('all');

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language | null>(null);

  // ---------------------------------------------------------
  // USER PROGRESS
  // IMPORTANT: progress is stored separately for every
  // Supabase user through the updated studyTracker.
  // ---------------------------------------------------------
  const [progress, setProgress] = useState<UserProgress>(() =>
    loadUserProgress()
  );

  const userId = session?.user?.id as string | undefined;

  // Load the correct user's progress after authentication.
  useEffect(() => {
    if (!userId) return;

    const userProgress = loadUserProgress(userId);
    setProgress(userProgress);

    // Reset UI when switching accounts.
    setSelectedLanguage(null);
    setSelectedCategoryId('all');
    setActiveTab('dashboard');
    setIsTimerRunning(false);
    setActiveLanguageId(undefined);
  }, [userId]);

  // ---------------------------------------------------------
  // ACTIVE STUDY TIMER
  // ---------------------------------------------------------
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeLanguageId, setActiveLanguageId] =
    useState<string | undefined>(undefined);

  // ---------------------------------------------------------
  // BOOKMARKS
  // ---------------------------------------------------------
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // ---------------------------------------------------------
  // BADGE TOAST
  // ---------------------------------------------------------
  const [unlockedBadgeToast, setUnlockedBadgeToast] =
    useState<string | null>(null);

  // ---------------------------------------------------------
  // TIMER LOOP
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isTimerRunning || !userId) return;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const today = getTodayDateString();

        const newTotalSec = prev.totalStudySeconds + 1;
        const newTodaySec = (prev.dailyLogs[today] || 0) + 1;

        const newLangMap = {
          ...prev.timeSpentPerLanguage
        };

        if (activeLanguageId) {
          newLangMap[activeLanguageId] =
            (newLangMap[activeLanguageId] || 0) + 1;
        }

        const updated: UserProgress = {
          ...prev,
          totalStudySeconds: newTotalSec,
          timeSpentPerLanguage: newLangMap,
          dailyLogs: {
            ...prev.dailyLogs,
            [today]: newTodaySec
          }
        };

        // Check badges every timer tick.
        const newBadges = evaluateBadges(updated);

        if (newBadges.length > 0) {
          const unlockedSet = new Set([
            ...updated.unlockedBadgeIds,
            ...newBadges
          ]);

          updated.unlockedBadgeIds = Array.from(unlockedSet);

          const badgeObj = BADGES_LIST.find(
            (badge) => badge.id === newBadges[0]
          );

          if (badgeObj) {
            setUnlockedBadgeToast(badgeObj.title);
          }
        }

        saveUserProgress(updated, userId);

        return updated;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [isTimerRunning, activeLanguageId, userId]);

  // ---------------------------------------------------------
  // ACTIONS
  // ---------------------------------------------------------
  const toggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleStartTimerForLanguage = (lang: Language) => {
    setActiveLanguageId(lang.id);
    setIsTimerRunning(true);
  };

  const handleToggleBookmark = (langId: string) => {
    setProgress((prev) => {
      const isBookmarked =
        prev.bookmarkedLanguageIds.includes(langId);

      const newBookmarks = isBookmarked
        ? prev.bookmarkedLanguageIds.filter((id) => id !== langId)
        : [...prev.bookmarkedLanguageIds, langId];

      const updated: UserProgress = {
        ...prev,
        bookmarkedLanguageIds: newBookmarks
      };

      saveUserProgress(updated, userId);

      return updated;
    });
  };

  // ---------------------------------------------------------
  // QUIZ RESULT
  // Works with normal quizzes and lesson-specific quizzes.
  // The quiz component remains responsible for generating/
  // selecting the actual quiz; App only records the result.
  // ---------------------------------------------------------
  const handleSaveQuizResult = (attempt: UserQuizAttempt) => {
    setProgress((prev) => {
      const previousLangProgress =
        prev.languageProgress[attempt.languageId] || {
          lessonsCompleted: 0,
          bestQuizScore: 0,
          totalQuizzesTaken: 0,
          averageQuizScore: 0
        };

      const newQuizCount =
        previousLangProgress.totalQuizzesTaken + 1;

      const updated: UserProgress = {
        ...prev,
        completedQuizAttempts: [
          attempt,
          ...prev.completedQuizAttempts
        ],
        languageProgress: {
          ...prev.languageProgress,
          [attempt.languageId]: {
            ...previousLangProgress,
            bestQuizScore: Math.max(
              previousLangProgress.bestQuizScore,
              attempt.percentage
            ),
            totalQuizzesTaken: newQuizCount,
            averageQuizScore:
              (
                previousLangProgress.averageQuizScore *
                previousLangProgress.totalQuizzesTaken +
                attempt.percentage
              ) / newQuizCount
          }
        }
      };

      const newBadges = evaluateBadges(updated);

      if (newBadges.length > 0) {
        const unlockedSet = new Set([
          ...updated.unlockedBadgeIds,
          ...newBadges
        ]);

        updated.unlockedBadgeIds = Array.from(unlockedSet);

        const badgeObj = BADGES_LIST.find(
          (badge) => badge.id === newBadges[0]
        );

        if (badgeObj) {
          setUnlockedBadgeToast(badgeObj.title);
        }
      }

      saveUserProgress(updated, userId);

      return updated;
    });
  };

  const handleUpdateDailyGoal = (newGoalMins: number) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        dailyStudyGoalMinutes: Math.max(1, newGoalMins)
      };

      saveUserProgress(updated, userId);

      return updated;
    });
  };

  const handleManualLogMinutes = (minutes: number) => {
    setProgress((prev) => {
      const today = getTodayDateString();
      const addedSec = Math.max(1, minutes) * 60;

      const updated: UserProgress = {
        ...prev,
        totalStudySeconds:
          prev.totalStudySeconds + addedSec,
        dailyLogs: {
          ...prev.dailyLogs,
          [today]:
            (prev.dailyLogs[today] || 0) + addedSec
        }
      };

      saveUserProgress(updated, userId);

      return updated;
    });
  };

  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveUserProgress(newProgress, userId);
  };

  // ---------------------------------------------------------
  // LESSON COMPLETION
  // Supports the new Basic / In-Depth / Core lesson system.
  // ---------------------------------------------------------
  const handleCompleteLesson = (
    lessonId: string,
    languageId: string
  ) => {
    setProgress((prev) => {
      if (prev.completedLessonIds.includes(lessonId)) {
        return prev;
      }

      const current =
        prev.languageProgress[languageId] || {
          lessonsCompleted: 0,
          bestQuizScore: 0,
          totalQuizzesTaken: 0,
          averageQuizScore: 0
        };

      const updated: UserProgress = {
        ...prev,

        completedLessonIds: [
          ...prev.completedLessonIds,
          lessonId
        ],

        languageProgress: {
          ...prev.languageProgress,

          [languageId]: {
            ...current,
            lessonsCompleted:
              current.lessonsCompleted + 1
          }
        }
      };

      saveUserProgress(updated, userId);

      return updated;
    });
  };

  // ---------------------------------------------------------
  // DERIVED DATA
  // ---------------------------------------------------------
  const activeLangObj = LANGUAGES.find(
    (language) => language.id === activeLanguageId
  );

  const bookmarkedLanguages = LANGUAGES.filter(
    (language) =>
      progress.bookmarkedLanguageIds.includes(language.id)
  );

  // ---------------------------------------------------------
  // AUTH LOADING
  // ---------------------------------------------------------
  if (authLoading) {
    return (
      <div className="min-h-screen bg-indigo-950 flex items-center justify-center">
        <div className="text-center text-white">
          <Sparkles className="w-8 h-8 mx-auto mb-3 animate-spin text-amber-400" />
          <p className="font-bold">
            Loading DevLearn...
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // PASSWORD RECOVERY
  // ---------------------------------------------------------
  if (isPasswordRecovery) {
    return (
      <UpdatePasswordView
        onComplete={() => {
          setIsPasswordRecovery(false);
        }}
      />
    );
  }

  // ---------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------
  if (!session) {
    return (
      <AuthView
        onLoginSuccess={() => {
          // Supabase auth listener updates the session.
        }}
      />
    );
  }

  // ---------------------------------------------------------
  // MAIN APPLICATION
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-indigo-50/70 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white pb-12">

      {/* TOP NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedLanguage(null);
        }}
        totalStudySeconds={progress.totalStudySeconds}
        todayStudySeconds={
          progress.dailyLogs[getTodayDateString()] || 0
        }
        dailyGoalMinutes={
          progress.dailyStudyGoalMinutes
        }
        streakDays={progress.streakDays}
        isTimerRunning={isTimerRunning}
        toggleTimer={toggleTimer}
        activeLanguageName={activeLangObj?.name}
        onOpenBookmarks={() =>
          setIsBookmarksOpen(true)
        }
        bookmarkCount={
          progress.bookmarkedLanguageIds.length
        }
      />

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* LANGUAGE DETAIL */}
        {selectedLanguage ? (
          <LanguageDetailView
            language={selectedLanguage}
            onBack={() =>
              setSelectedLanguage(null)
            }
            progress={progress}
            onToggleBookmark={
              handleToggleBookmark
            }
            isTimerRunning={
              isTimerRunning
            }
            activeLanguageId={
              activeLanguageId
            }
            onStartTimerForLanguage={
              handleStartTimerForLanguage
            }

            /*
             * Lesson-specific quiz ID is forwarded from
             * LanguageDetailView. QuizzesHubView can then
             * use this ID to open the correct lesson quiz.
             */
            onStartQuiz={(quizId) => {
              setSelectedLanguage(null);
              setActiveTab('quizzes');

              // Keep the selected quiz ID available for the
              // quiz hub through the URL/event system if the
              // hub supports it. The current hub remains
              // backwards compatible.
              window.dispatchEvent(
                new CustomEvent(
                  'devlearn:start-quiz',
                  {
                    detail: { quizId }
                  }
                )
              );
            }}

            onCompleteLesson={
              handleCompleteLesson
            }
          />
        ) : (
          <>
            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <DashboardView
                progress={progress}
                languages={LANGUAGES}
                onSelectCategory={(catId) => {
                  setSelectedCategoryId(
                    catId
                  );
                  setActiveTab('languages');
                }}
                onSelectLanguage={(lang) =>
                  setSelectedLanguage(lang)
                }
                onNavigateToQuizzes={() =>
                  setActiveTab('quizzes')
                }
                onNavigateToAnalytics={() =>
                  setActiveTab('analytics')
                }
                onNavigateToTutor={() =>
                  setActiveTab('tutor')
                }
                isTimerRunning={
                  isTimerRunning
                }
                toggleTimer={
                  toggleTimer
                }
                activeLanguage={
                  activeLangObj
                }
              />
            )}

            {/* LANGUAGES DIRECTORY */}
            {activeTab === 'languages' && (
              <LanguagesDirectoryView
                languages={LANGUAGES}
                selectedCategoryId={
                  selectedCategoryId
                }
                onSelectCategory={(catId) =>
                  setSelectedCategoryId(catId)
                }
                onSelectLanguage={(lang) =>
                  setSelectedLanguage(lang)
                }
                progress={progress}
                onToggleBookmark={
                  handleToggleBookmark
                }
              />
            )}

            {/* QUIZZES */}
            {activeTab === 'quizzes' && (
              <QuizzesHubView
                languages={LANGUAGES}
                onSaveQuizResult={
                  handleSaveQuizResult
                }
                completedAttempts={
                  progress.completedQuizAttempts
                }
              />
            )}

            {/* ANALYTICS */}
            {activeTab === 'analytics' && (
              <AnalyticsTimeView
                progress={progress}
                languages={LANGUAGES}
                isTimerRunning={
                  isTimerRunning
                }
                toggleTimer={toggleTimer}
                activeLanguageId={
                  activeLanguageId
                }
                onSelectActiveLanguage={(
                  langId
                ) =>
                  setActiveLanguageId(
                    langId || undefined
                  )
                }
                onUpdateDailyGoal={
                  handleUpdateDailyGoal
                }
                onManualLogMinutes={
                  handleManualLogMinutes
                }
              />
            )}

            {/* AI TUTOR */}
            {activeTab === 'tutor' && (
              <AITutorModal
                currentLanguage={
                  activeLangObj
                }
                languages={LANGUAGES}
              />
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <ProfileView
                progress={progress}
                onUpdateProgress={
                  handleUpdateProgress
                }
              />
            )}
          </>
        )}
      </main>

      {/* BOOKMARK DRAWER */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() =>
          setIsBookmarksOpen(false)
        }
        bookmarkedLanguages={
          bookmarkedLanguages
        }
        onSelectLanguage={(lang) =>
          setSelectedLanguage(lang)
        }
        onRemoveBookmark={
          handleToggleBookmark
        }
      />

      {/* BADGE TOAST */}
      {unlockedBadgeToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white border border-indigo-400 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 max-w-sm">

          <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold shrink-0">
            <Trophy className="w-5 h-5 fill-current" />
          </div>

          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-200">
              New Badge Unlocked!
            </span>

            <h4 className="text-sm font-bold">
              {unlockedBadgeToast}
            </h4>
          </div>

          <button
            onClick={() =>
              setUnlockedBadgeToast(null)
            }
            className="p-1 text-indigo-200 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

        </div>
      )}
    </div>
  );
}