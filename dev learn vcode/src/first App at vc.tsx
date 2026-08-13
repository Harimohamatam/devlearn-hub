import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { LanguagesDirectoryView } from './components/LanguagesDirectoryView';
import { LanguageDetailView } from './components/LanguageDetailView';
import { QuizzesHubView } from './components/QuizzesHubView';
import { AnalyticsTimeView } from './components/AnalyticsTimeView';
import { AITutorModal } from './components/AITutorModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';

import { Language, CategoryId, UserProgress, UserQuizAttempt } from './types';
import { LANGUAGES } from './data/languagesData';
import { BADGES_LIST } from './data/badgesData';
import { 
  loadUserProgress, 
  saveUserProgress, 
  getTodayDateString, 
  evaluateBadges 
} from './utils/studyTracker';
import { Sparkles, Trophy, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'languages' | 'quizzes' | 'analytics' | 'tutor'>('dashboard');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | 'all'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  // User Progress State
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());

  // Active Timer State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeLanguageId, setActiveLanguageId] = useState<string | undefined>(undefined);

  // Bookmarks Drawer State
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);

  // Notification Toast for Unlocked Badges
  const [unlockedBadgeToast, setUnlockedBadgeToast] = useState<string | null>(null);

  // Timer Tick Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const today = getTodayDateString();
          const newTotalSec = prev.totalStudySeconds + 1;
          const newTodaySec = (prev.dailyLogs[today] || 0) + 1;

          const newLangMap = { ...prev.timeSpentPerLanguage };
          if (activeLanguageId) {
            newLangMap[activeLanguageId] = (newLangMap[activeLanguageId] || 0) + 1;
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

          // Evaluate Badges
          const newBadges = evaluateBadges(updated);
          if (newBadges.length > 0) {
            const unlockedSet = new Set([...updated.unlockedBadgeIds, ...newBadges]);
            updated.unlockedBadgeIds = Array.from(unlockedSet);

            // Toast for first new badge
            const badgeObj = BADGES_LIST.find((b) => b.id === newBadges[0]);
            if (badgeObj) {
              setUnlockedBadgeToast(badgeObj.title);
            }
          }

          saveUserProgress(updated);
          return updated;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, activeLanguageId]);

  // Actions
  const toggleTimer = () => {
    setIsTimerRunning((prev) => !prev);
  };

  const handleStartTimerForLanguage = (lang: Language) => {
    setActiveLanguageId(lang.id);
    setIsTimerRunning(true);
  };

  const handleToggleBookmark = (langId: string) => {
    setProgress((prev) => {
      const isBookmarked = prev.bookmarkedLanguageIds.includes(langId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedLanguageIds.filter((id) => id !== langId)
        : [...prev.bookmarkedLanguageIds, langId];

      const updated = {
        ...prev,
        bookmarkedLanguageIds: newBookmarks
      };

      saveUserProgress(updated);
      return updated;
    });
  };

  const handleSaveQuizResult = (attempt: UserQuizAttempt) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        completedQuizAttempts: [attempt, ...prev.completedQuizAttempts]
      };

      const newBadges = evaluateBadges(updated);
      if (newBadges.length > 0) {
        const unlockedSet = new Set([...updated.unlockedBadgeIds, ...newBadges]);
        updated.unlockedBadgeIds = Array.from(unlockedSet);
      }

      saveUserProgress(updated);
      return updated;
    });
  };

  const handleUpdateDailyGoal = (newGoalMins: number) => {
    setProgress((prev) => {
      const updated = { ...prev, dailyStudyGoalMinutes: Math.max(1, newGoalMins) };
      saveUserProgress(updated);
      return updated;
    });
  };

  const handleManualLogMinutes = (minutes: number) => {
    setProgress((prev) => {
      const today = getTodayDateString();
      const addedSec = Math.max(1, minutes) * 60;
      const updated: UserProgress = {
        ...prev,
        totalStudySeconds: prev.totalStudySeconds + addedSec,
        dailyLogs: {
          ...prev.dailyLogs,
          [today]: (prev.dailyLogs[today] || 0) + addedSec
        }
      };

      saveUserProgress(updated);
      return updated;
    });
  };

  const activeLangObj = LANGUAGES.find((l) => l.id === activeLanguageId);
  const bookmarkedLanguages = LANGUAGES.filter((l) => progress.bookmarkedLanguageIds.includes(l.id));

  return (
    <div className="min-h-screen bg-indigo-50/70 text-slate-900 font-sans selection:bg-indigo-600 selection:text-white pb-12">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedLanguage(null);
        }}
        totalStudySeconds={progress.totalStudySeconds}
        todayStudySeconds={progress.dailyLogs[getTodayDateString()] || 0}
        dailyGoalMinutes={progress.dailyStudyGoalMinutes}
        streakDays={progress.streakDays}
        isTimerRunning={isTimerRunning}
        toggleTimer={toggleTimer}
        activeLanguageName={activeLangObj?.name}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={progress.bookmarkedLanguageIds.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* If a language is currently opened in Detail View */}
        {selectedLanguage ? (
          <LanguageDetailView
            language={selectedLanguage}
            onBack={() => setSelectedLanguage(null)}
            progress={progress}
            onToggleBookmark={handleToggleBookmark}
            isTimerRunning={isTimerRunning}
            activeLanguageId={activeLanguageId}
            onStartTimerForLanguage={handleStartTimerForLanguage}
            onStartQuiz={(quizId) => {
              setSelectedLanguage(null);
              setActiveTab('quizzes');
            }}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                progress={progress}
                languages={LANGUAGES}
                onSelectCategory={(catId) => {
                  setSelectedCategoryId(catId);
                  setActiveTab('languages');
                }}
                onSelectLanguage={(lang) => setSelectedLanguage(lang)}
                onNavigateToQuizzes={() => setActiveTab('quizzes')}
                onNavigateToAnalytics={() => setActiveTab('analytics')}
                onNavigateToTutor={() => setActiveTab('tutor')}
                isTimerRunning={isTimerRunning}
                toggleTimer={toggleTimer}
                activeLanguage={activeLangObj}
              />
            )}

            {activeTab === 'languages' && (
              <LanguagesDirectoryView
                languages={LANGUAGES}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(catId) => setSelectedCategoryId(catId)}
                onSelectLanguage={(lang) => setSelectedLanguage(lang)}
                progress={progress}
                onToggleBookmark={handleToggleBookmark}
              />
            )}

            {activeTab === 'quizzes' && (
              <QuizzesHubView
                languages={LANGUAGES}
                onSaveQuizResult={handleSaveQuizResult}
                completedAttempts={progress.completedQuizAttempts}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsTimeView
                progress={progress}
                languages={LANGUAGES}
                isTimerRunning={isTimerRunning}
                toggleTimer={toggleTimer}
                activeLanguageId={activeLanguageId}
                onSelectActiveLanguage={(langId) => setActiveLanguageId(langId || undefined)}
                onUpdateDailyGoal={handleUpdateDailyGoal}
                onManualLogMinutes={handleManualLogMinutes}
              />
            )}

            {activeTab === 'tutor' && (
              <AITutorModal
                currentLanguage={activeLangObj}
                languages={LANGUAGES}
              />
            )}
          </>
        )}

      </main>

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedLanguages={bookmarkedLanguages}
        onSelectLanguage={(lang) => setSelectedLanguage(lang)}
        onRemoveBookmark={handleToggleBookmark}
      />

      {/* Unlocked Badge Toast */}
      {unlockedBadgeToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white border border-indigo-400 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 max-w-sm">
          <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold shrink-0">
            <Trophy className="w-5 h-5 fill-current" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-200">New Badge Unlocked!</span>
            <h4 className="text-sm font-bold">{unlockedBadgeToast}</h4>
          </div>
          <button 
            onClick={() => setUnlockedBadgeToast(null)}
            className="p-1 text-indigo-200 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
