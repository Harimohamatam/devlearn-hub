import React, { useState } from 'react';
import { 
  Clock, 
  Flame, 
  Target, 
  Play, 
  Pause, 
  Plus, 
  Trophy, 
  Sparkles, 
  BarChart3, 
  PieChart as PieIcon,
  Award,
  Calendar,
  CheckCircle2,
  Lock,
  Languages,
  Hourglass,
  Cpu
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { UserProgress, Language } from '../types';
import { formatTimeSpent, getTodayDateString } from '../utils/studyTracker';
import { BADGES_LIST } from '../data/badgesData';

interface AnalyticsTimeViewProps {
  progress: UserProgress;
  languages: Language[];
  isTimerRunning: boolean;
  toggleTimer: () => void;
  activeLanguageId?: string;
  onSelectActiveLanguage: (langId: string) => void;
  onUpdateDailyGoal: (newGoalMins: number) => void;
  onManualLogMinutes: (minutes: number) => void;
}

export const AnalyticsTimeView: React.FC<AnalyticsTimeViewProps> = ({
  progress,
  languages,
  isTimerRunning,
  toggleTimer,
  activeLanguageId,
  onSelectActiveLanguage,
  onUpdateDailyGoal,
  onManualLogMinutes
}) => {
  const [editingGoal, setEditingGoal] = useState(false);
  const [tempGoalInput, setTempGoalInput] = useState(progress.dailyStudyGoalMinutes || 20);

  const { hours, minutes, seconds, formattedString } = formatTimeSpent(progress.totalStudySeconds);
  const todayStr = getTodayDateString();
  const todaySec = progress.dailyLogs[todayStr] || 0;
  const todayMins = Math.floor(todaySec / 60);
  const goalMins = progress.dailyStudyGoalMinutes || 20;
  const goalPercent = Math.min(100, Math.round((todayMins / goalMins) * 100));

  // Prepare 7-day Bar Chart Data
  const last7DaysData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const key = `${year}-${month}-${day}`;
    const dateLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
    const sec = progress.dailyLogs[key] || 0;
    const mins = Math.round(sec / 60);

    return {
      date: dateLabel,
      minutes: mins,
      isToday: key === todayStr
    };
  });

  // Prepare Language Distribution Data
  const languageTimeData = languages
    .map((lang) => {
      const sec = progress.timeSpentPerLanguage[lang.id] || 0;
      return {
        name: lang.name,
        minutes: Math.round(sec / 60)
      };
    })
    .filter((d) => d.minutes > 0)
    .sort((a, b) => b.minutes - a.minutes);

  const CHART_COLORS = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Languages': return <Languages className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'Hourglass': return <Hourglass className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-indigo-900 border-4 border-indigo-200 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400 text-slate-950 text-xs font-black mb-3 shadow-sm">
            <Clock className="w-3.5 h-3.5 stroke-[3]" />
            <span>Real-Time Study Time Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Study Time & Analytics Center</h1>
          <p className="text-xs sm:text-sm font-medium text-indigo-100 mt-1">
            Track your total active learning hours, daily goals, learning streaks, and unlocked badges.
          </p>
        </div>

        {/* Total Time Badge */}
        <div className="bg-white/10 backdrop-blur border-2 border-indigo-300/30 p-4 sm:p-5 rounded-2xl text-right shrink-0 shadow-lg">
          <span className="text-[10px] text-indigo-200 uppercase font-black tracking-wider">Total Accumulated</span>
          <p className="text-2xl sm:text-3xl font-black font-mono text-amber-300">{formattedString}</p>
        </div>
      </div>

      {/* Timer Control Center & Goal Setting Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Session Controller */}
        <div className="lg:col-span-2 bg-white border-2 border-indigo-100 p-6 rounded-3xl space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600 stroke-[2.5]" />
              <span>Active Study Session Controller</span>
            </h2>

            <span className={`text-xs font-black px-3 py-1.5 rounded-full border-2 ${
              isTimerRunning 
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900 animate-pulse' 
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              {isTimerRunning ? 'Timer Active ▶' : 'Timer Paused'}
            </span>
          </div>

          <div className="bg-indigo-50/60 p-6 rounded-2xl border-2 border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-extrabold text-slate-700">Select Language Focus:</p>
              <select
                id="active-language-focus-select"
                value={activeLanguageId || ''}
                onChange={(e) => onSelectActiveLanguage(e.target.value)}
                className="mt-1.5 bg-white border-2 border-indigo-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-600 shadow-sm"
              >
                <option value="">General Study / All Languages</option>
                {languages.map((l) => (
                  <option key={l.id} value={l.id}>{l.name} ({l.categoryName})</option>
                ))}
              </select>
            </div>

            <button
              id="analytics-timer-toggle-btn"
              onClick={toggleTimer}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                isTimerRunning
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
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
                  <span>Start Live Timer</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Manual Session Add */}
          <div className="pt-2">
            <span className="text-xs text-slate-600 font-extrabold">Manual Log Quick Add:</span>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <button
                id="log-15m-btn"
                onClick={() => onManualLogMinutes(15)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black flex items-center gap-1 border-2 border-slate-200 shadow-sm active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> +15 Mins
              </button>

              <button
                id="log-30m-btn"
                onClick={() => onManualLogMinutes(30)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black flex items-center gap-1 border-2 border-slate-200 shadow-sm active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> +30 Mins
              </button>

              <button
                id="log-60m-btn"
                onClick={() => onManualLogMinutes(60)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black flex items-center gap-1 border-2 border-slate-200 shadow-sm active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" /> +1 Hour
              </button>
            </div>
          </div>

        </div>

        {/* Daily Goal Card */}
        <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl space-y-4 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                <span>Daily Target Goal</span>
              </h2>

              <button
                onClick={() => setEditingGoal(!editingGoal)}
                className="text-xs text-indigo-600 hover:underline font-black"
              >
                {editingGoal ? 'Cancel' : 'Edit Target'}
              </button>
            </div>

            {editingGoal ? (
              <div className="mt-4 space-y-3">
                <input
                  type="number"
                  value={tempGoalInput}
                  onChange={(e) => setTempGoalInput(Number(e.target.value))}
                  className="w-full bg-indigo-50/60 border-2 border-indigo-100 text-xs font-black text-slate-900 rounded-2xl p-3 focus:outline-none focus:border-emerald-600"
                />
                <button
                  onClick={() => {
                    onUpdateDailyGoal(tempGoalInput);
                    setEditingGoal(false);
                  }}
                  className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md"
                >
                  Save Target
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <div className="flex items-baseline justify-between text-slate-900 font-mono">
                  <span className="text-3xl font-black">{todayMins} mins</span>
                  <span className="text-xs font-bold text-slate-500">/ {goalMins} mins target</span>
                </div>

                <div className="w-full bg-indigo-50 h-3.5 rounded-full overflow-hidden border border-indigo-100">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${goalPercent}%` }}
                  />
                </div>
                <p className="text-[11px] font-bold text-slate-500 text-right">{goalPercent}% completed today</p>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/80 border-2 border-amber-300 text-amber-900 text-xs flex items-center gap-3">
            <Flame className="w-6 h-6 text-amber-600 shrink-0 fill-amber-500" />
            <div>
              <p className="font-black text-amber-950">{progress.streakDays} Day Streak Active!</p>
              <p className="text-[11px] font-medium text-amber-800">Study every day to keep your learning momentum going.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Analytics Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 7-Day Study Minutes Chart */}
        <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600 stroke-[2.5]" />
            <span>7-Day Study Minutes Trend</span>
          </h3>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7DaysData}>
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} fontWeight={700} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} fontWeight={700} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#c7d2fe', borderRadius: '16px', fontSize: '12px', color: '#0f172a', fontWeight: 'bold' }}
                  labelStyle={{ color: '#4338ca', fontWeight: '900' }}
                />
                <Bar dataKey="minutes" radius={[8, 8, 0, 0]}>
                  {last7DaysData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.isToday ? '#10b981' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Time Allocation per Language */}
        <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-purple-600 stroke-[2.5]" />
            <span>Study Time Distribution by Language</span>
          </h3>

          {languageTimeData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs font-bold space-y-2">
              <Clock className="w-8 h-8 text-slate-300 stroke-[2]" />
              <p>No language time recorded yet. Start a study session!</p>
            </div>
          ) : (
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={languageTimeData} layout="vertical">
                  <XAxis type="number" stroke="#64748b" fontSize={11} fontWeight={700} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} width={80} fontWeight={700} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#c7d2fe', borderRadius: '16px', fontSize: '12px', color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="minutes" radius={[0, 8, 8, 0]}>
                    {languageTimeData.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

      </div>

      {/* Learning Badges & Achievements Grid */}
      <div className="bg-white border-2 border-indigo-100 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 fill-amber-500" />
            <h2 className="text-2xl font-black text-slate-900">Learning Badges & Milestones</h2>
          </div>
          <p className="text-xs font-medium text-slate-600 mt-1">
            Earn badges by logging active study hours, taking quizzes, and building daily streaks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES_LIST.map((badge) => {
            const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                id={`badge-card-${badge.id}`}
                className={`p-4 rounded-3xl border-2 transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-indigo-50/80 border-indigo-200 text-slate-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <div className={`p-3 rounded-2xl shrink-0 ${
                  isUnlocked ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-500'
                }`}>
                  {getBadgeIcon(badge.icon)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-slate-900">{badge.title}</h3>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[3] shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] font-medium text-slate-600 leading-normal">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
