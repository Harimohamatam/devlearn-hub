import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  BarChart3, 
  Bot, 
  Play, 
  Pause, 
  Sparkles,
  Flame,
  Clock,
  Bookmark,
  User
} from 'lucide-react';
import { formatTimeSpent } from '../utils/studyTracker';

interface NavbarProps {
  activeTab: 'dashboard' | 'languages' | 'quizzes' | 'analytics' | 'profile' | 'tutor';
  setActiveTab: (tab: 'dashboard' | 'languages' | 'quizzes' | 'analytics' | 'profile' | 'tutor') => void;
  totalStudySeconds: number;
  todayStudySeconds: number;
  dailyGoalMinutes: number;
  streakDays: number;
  isTimerRunning: boolean;
  toggleTimer: () => void;
  activeLanguageName?: string;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  totalStudySeconds,
  todayStudySeconds,
  dailyGoalMinutes,
  streakDays,
  isTimerRunning,
  toggleTimer,
  activeLanguageName,
  onOpenBookmarks,
  bookmarkCount
}) => {
  const { formattedString: totalFormatted } = formatTimeSpent(totalStudySeconds);
  const todayMinutes = Math.floor(todayStudySeconds / 60);
  const goalProgress = Math.min(100, Math.round((todayMinutes / dailyGoalMinutes) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-indigo-200 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3.5 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3 group-hover:rotate-6 transition-all shrink-0">
              <Code2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-indigo-950">
                  DEV<span className="text-indigo-600">LEARN</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200">
                  HUB
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 hidden sm:block">Interactive Language Learning</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
            <button
              id="nav-dashboard-tab"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              id="nav-languages-tab"
              onClick={() => setActiveTab('languages')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'languages'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Languages</span>
            </button>

            <button
              id="nav-quizzes-tab"
              onClick={() => setActiveTab('quizzes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'quizzes'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Quizzes</span>
            </button>

            <button
              id="nav-analytics-tab"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'analytics'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Study Time</span>
            </button>

            <button
              id="nav-profile-tab"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 hover:text-indigo-950 hover:bg-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </nav>

          {/* Right Utilities: Live Timer & Streak */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">

            {/* Active Streak Badge */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 border-2 border-amber-200 text-amber-900 text-xs font-black shadow-sm"
              title={`${streakDays} Day Study Streak!`}
            >
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* Live Study Timer Pill */}
            <div 
              onClick={toggleTimer}
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all border-2 ${
                isTimerRunning
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-950 shadow-sm'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
              }`}
              id="navbar-timer-control"
              title={isTimerRunning ? 'Study Timer Active! Click to Pause' : 'Click to Start Active Study Timer'}
            >
              <div className={`p-1 rounded-full ${isTimerRunning ? 'bg-emerald-500 text-white animate-pulse' : 'bg-indigo-600 text-white'}`}>
                {isTimerRunning ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase leading-tight">
                  {isTimerRunning ? (activeLanguageName ? `Studying ${activeLanguageName}` : 'Studying') : 'Study Timer'}
                </span>
                <span className="font-mono text-xs font-black text-slate-900">
                  {totalFormatted}
                </span>
              </div>
            </div>

            {/* Bookmarks Toggle */}
            <button
              id="navbar-bookmarks-btn"
              onClick={onOpenBookmarks}
              className="relative p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 hover:text-indigo-900 transition-colors border-2 border-slate-200 shadow-sm"
              title="View Bookmarked Languages"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-[10px] font-black text-white flex items-center justify-center border-2 border-white shadow-sm">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* AI Tutor Button */}
            <button
              id="navbar-ai-tutor-btn"
              onClick={() => setActiveTab('tutor')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-black transition-all shadow-md ${
                activeTab === 'tutor'
                  ? 'bg-purple-700 text-white shadow-purple-600/30'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <Bot className="w-4 h-4 text-purple-200" />
              <span className="hidden sm:inline">AI Tutor</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="grid grid-cols-5 md:hidden items-center py-2.5 border-t-2 border-indigo-100 w-full overflow-hidden">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex min-w-0 flex-col items-center gap-0.5 text-[11px] font-bold whitespace-nowrap ${activeTab === 'dashboard' ? 'text-indigo-700 font-black' : 'text-slate-500'}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('languages')}
            className={`flex min-w-0 flex-col items-center gap-0.5 text-[11px] font-bold whitespace-nowrap ${activeTab === 'languages' ? 'text-indigo-700 font-black' : 'text-slate-500'}`}
          >
            <Code2 className="w-4 h-4" />
            <span>Learn</span>
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex min-w-0 flex-col items-center gap-0.5 text-[11px] font-bold whitespace-nowrap ${activeTab === 'quizzes' ? 'text-indigo-700 font-black' : 'text-slate-500'}`}
          >
            <Trophy className="w-4 h-4" />
            <span>Quiz</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex min-w-0 flex-col items-center gap-0.5 text-[11px] font-bold whitespace-nowrap ${activeTab === 'analytics' ? 'text-indigo-700 font-black' : 'text-slate-500'}`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Stats</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex min-w-0 flex-col items-center gap-0.5 text-[11px] font-bold whitespace-nowrap ${activeTab === 'profile' ? 'text-indigo-700 font-black' : 'text-slate-500'}`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>

      </div>
    </header>
  );
};
