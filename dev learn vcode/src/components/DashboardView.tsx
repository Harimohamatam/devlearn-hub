import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Trophy, 
  Clock, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  Play, 
  Pause, 
  Award,
  Globe,
  Server,
  Cpu,
  Database,
  Smartphone,
  Terminal,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { Language, CategoryId, UserProgress } from '../types';
import { CATEGORIES } from '../data/categoriesData';
import { formatTimeSpent } from '../utils/studyTracker';

interface DashboardViewProps {
  progress: UserProgress;
  languages: Language[];
  onSelectCategory: (categoryId: CategoryId) => void;
  onSelectLanguage: (language: Language) => void;
  onNavigateToQuizzes: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToTutor: () => void;
  isTimerRunning: boolean;
  toggleTimer: () => void;
  activeLanguage?: Language;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  languages,
  onSelectCategory,
  onSelectLanguage,
  onNavigateToQuizzes,
  onNavigateToAnalytics,
  onNavigateToTutor,
  isTimerRunning,
  toggleTimer,
  activeLanguage
}) => {
  const { hours, minutes, formattedString } = formatTimeSpent(progress.totalStudySeconds);
  const todaySeconds = progress.dailyLogs[progress.lastActiveDate] || 0;
  const todayMinutes = Math.floor(todaySeconds / 60);
  const goalMinutes = progress.dailyStudyGoalMinutes || 20;
  const goalPercent = Math.min(100, Math.round((todayMinutes / goalMinutes) * 100));

  // Category Icon Renderer
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      default: return <Code2 className="w-5 h-5" />;
    }
  };

  // Category Card Vibrant Palette Borders
  const getCategoryCardStyle = (catId: CategoryId) => {
    switch (catId) {
      case 'web': return 'border-amber-400 bg-white hover:bg-amber-50/50';
      case 'backend': return 'border-sky-400 bg-white hover:bg-sky-50/50';
      case 'systems': return 'border-emerald-400 bg-white hover:bg-emerald-50/50';
      case 'data-ai': return 'border-purple-400 bg-white hover:bg-purple-50/50';
      case 'mobile': return 'border-pink-400 bg-white hover:bg-pink-50/50';
      case 'scripting': return 'border-orange-400 bg-white hover:bg-orange-50/50';
      default: return 'border-indigo-400 bg-white hover:bg-indigo-50/50';
    }
  };

  const popularLanguages = languages.slice(0, 6);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-indigo-950 border-4 border-indigo-200 p-6 sm:p-10 shadow-xl text-white">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-800/80 border border-indigo-400/40 text-indigo-200 text-xs font-black">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Interactive Student Coding Companion</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
              Master Major Languages <span className="text-amber-300">Category-Wise</span>
            </h1>
            <p className="text-indigo-100 text-sm sm:text-base leading-relaxed font-medium">
              Explore in-depth documentation, syntax cheat sheets, runnable code snippets, difficulty-based quizzes, and track your active study time automatically!
            </p>
          </div>

          {/* Live Timer Card Action */}
          <div className="w-full lg:w-auto bg-white/10 backdrop-blur border-2 border-indigo-300/30 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-5 shadow-2xl">
            <div className="flex items-center gap-3.5">
              <div className={`p-3.5 rounded-2xl ${isTimerRunning ? 'bg-emerald-400 text-slate-950 animate-pulse' : 'bg-amber-400 text-slate-950'}`}>
                <Clock className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-200 uppercase tracking-wider">Active Study Session</p>
                <p className="text-2xl font-mono font-black text-white">{formattedString}</p>
                {activeLanguage && (
                  <p className="text-xs text-amber-300 font-bold mt-0.5">Focus: {activeLanguage.name}</p>
                )}
              </div>
            </div>

            <button
              id="dashboard-timer-toggle-btn"
              onClick={toggleTimer}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 ${
                isTimerRunning
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white'
              }`}
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Timer</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Studying</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Total Time Card */}
        <div 
          onClick={onNavigateToAnalytics}
          className="bg-white border-2 border-indigo-100 hover:border-indigo-400 p-5 rounded-3xl cursor-pointer transition-all shadow-md hover:shadow-xl group"
          id="stats-total-time-card"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Time</span>
            <div className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-700 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-indigo-950 font-mono mt-3">{formattedString}</p>
          <p className="text-[11px] font-semibold text-slate-500 mt-1">Calculated study logs</p>
        </div>

        {/* Daily Goal Card */}
        <div 
          onClick={onNavigateToAnalytics}
          className="bg-white border-2 border-emerald-100 hover:border-emerald-400 p-5 rounded-3xl cursor-pointer transition-all shadow-md hover:shadow-xl group"
          id="stats-daily-goal-card"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Today's Target</span>
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-3">
            <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono">{todayMinutes}m</p>
            <span className="text-xs font-extrabold text-slate-400">/ {goalMinutes}m</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden border border-slate-200">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${goalPercent}%` }} 
            />
          </div>
        </div>

        {/* Active Streak Card */}
        <div 
          onClick={onNavigateToAnalytics}
          className="bg-white border-2 border-amber-100 hover:border-amber-400 p-5 rounded-3xl cursor-pointer transition-all shadow-md hover:shadow-xl group"
          id="stats-streak-card"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Study Streak</span>
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-600 font-mono mt-3">{progress.streakDays} Days</p>
          <p className="text-[11px] font-semibold text-slate-500 mt-1">Keep learning daily!</p>
        </div>

        {/* Quizzes Completed Card */}
        <div 
          onClick={onNavigateToQuizzes}
          className="bg-white border-2 border-purple-100 hover:border-purple-400 p-5 rounded-3xl cursor-pointer transition-all shadow-md hover:shadow-xl group"
          id="stats-quizzes-card"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Tests Passed</span>
            <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-purple-950 font-mono mt-3">
            {progress.completedQuizAttempts.length}
          </p>
          <p className="text-[11px] font-semibold text-slate-500 mt-1">Difficulty tests taken</p>
        </div>

      </div>

      {/* Category Wise Languages Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Categories</h2>
          <p className="text-xs font-bold text-slate-500">Explore major languages organized by domain</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`border-b-8 border-r-4 shadow-xl p-6 rounded-3xl cursor-pointer transition-all group relative ${getCategoryCardStyle(cat.id)}`}
            >
              <div className="flex items-start justify-between">
                <div className={`p-3.5 rounded-2xl ${cat.badgeBg} ${cat.badgeText} group-hover:scale-110 transition-transform font-bold`}>
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span className="text-xs font-black text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore <ChevronRight className="w-4 h-4 stroke-[3]" />
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 mt-5 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs font-medium text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              {/* Language count inside this category */}
              <div className="mt-5 pt-3 border-t-2 border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>{languages.filter(l => l.categoryId === cat.id).length} Languages Included</span>
                <span className="font-mono text-indigo-600 font-black">View All →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Languages Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Popular Programming Languages</h2>
            <p className="text-xs font-bold text-slate-500">In-depth guides, syntax sheets, and difficulty tests</p>
          </div>
          <button
            onClick={() => onSelectCategory('web')}
            className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-white px-3.5 py-2 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 shadow-sm"
          >
            Browse All ({languages.length}) <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularLanguages.map((lang) => {
            const timeSpentLang = progress.timeSpentPerLanguage[lang.id] || 0;
            const { formattedString: langTimeStr } = formatTimeSpent(timeSpentLang);

            return (
              <div
                key={lang.id}
                id={`language-card-${lang.id}`}
                onClick={() => onSelectLanguage(lang)}
                className="bg-white border-2 border-indigo-100 hover:border-indigo-500 p-6 rounded-3xl cursor-pointer transition-all flex flex-col justify-between group shadow-md hover:shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Code2 className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {lang.name}
                        </h3>
                        <span className="text-[11px] font-bold text-slate-400">{lang.categoryName}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                      lang.difficultyRating === 'Beginner' 
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                        : lang.difficultyRating === 'Intermediate' 
                        ? 'bg-amber-100 border-amber-300 text-amber-800' 
                        : 'bg-rose-100 border-rose-300 text-rose-800'
                    }`}>
                      {lang.difficultyRating}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-600 mt-3.5 line-clamp-2 leading-relaxed">
                    {lang.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t-2 border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Spent: <strong className="text-indigo-950 font-mono font-black">{langTimeStr}</strong></span>
                  </div>

                  <span className="font-black text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Study <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tutor Assistant CTA Banner */}
      <div className="rounded-3xl bg-indigo-900 border-4 border-indigo-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-lg rotate-3">
            <Sparkles className="w-7 h-7 fill-current" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Have Questions While Learning Code?</h3>
            <p className="text-xs font-medium text-indigo-100 mt-1 leading-relaxed">Ask our AI Code Tutor for real-world analogies, line-by-line code breakdowns, or bug debugging!</p>
          </div>
        </div>

        <button
          id="dashboard-open-ai-tutor-cta"
          onClick={onNavigateToTutor}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-amber-300 text-indigo-950 font-black text-xs shadow-lg transition-all shrink-0 flex items-center justify-center gap-2 active:scale-95"
        >
          <span>Chat with AI Tutor</span>
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

    </div>
  );
};
