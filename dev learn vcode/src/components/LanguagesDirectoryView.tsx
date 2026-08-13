import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Code2, 
  Clock, 
  Bookmark, 
  Sparkles, 
  ChevronRight,
  ArrowUpRight,
  Globe,
  Server,
  Cpu,
  Database,
  Smartphone,
  Terminal,
  CheckCircle2
} from 'lucide-react';
import { Language, CategoryId, UserProgress } from '../types';
import { CATEGORIES } from '../data/categoriesData';
import { formatTimeSpent } from '../utils/studyTracker';

interface LanguagesDirectoryViewProps {
  languages: Language[];
  selectedCategoryId: CategoryId | 'all';
  onSelectCategory: (catId: CategoryId | 'all') => void;
  onSelectLanguage: (language: Language) => void;
  progress: UserProgress;
  onToggleBookmark: (languageId: string) => void;
}

export const LanguagesDirectoryView: React.FC<LanguagesDirectoryViewProps> = ({
  languages,
  selectedCategoryId,
  onSelectCategory,
  onSelectLanguage,
  progress,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) => {
      // Category filter
      if (selectedCategoryId !== 'all' && lang.categoryId !== selectedCategoryId) {
        return false;
      }
      // Difficulty filter
      if (difficultyFilter !== 'all' && lang.difficultyRating !== difficultyFilter) {
        return false;
      }
      // Bookmarks filter
      if (onlyBookmarks && !progress.bookmarkedLanguageIds.includes(lang.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = lang.name.toLowerCase().includes(q);
        const matchCategory = lang.categoryName.toLowerCase().includes(q);
        const matchTagline = lang.tagline.toLowerCase().includes(q);
        const matchParadigm = lang.paradigm.toLowerCase().includes(q);
        return matchName || matchCategory || matchTagline || matchParadigm;
      }
      return true;
    });
  }, [languages, selectedCategoryId, difficultyFilter, onlyBookmarks, searchQuery, progress.bookmarkedLanguageIds]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-indigo-900 border-4 border-indigo-200 p-8 rounded-3xl shadow-xl text-white">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Programming Languages Hub</h1>
          <p className="text-xs sm:text-sm font-medium text-indigo-100 mt-1">
            Browse major programming languages categorized by domain with complete documentation, cheat sheets, and quizzes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.5]" />
          <input
            id="languages-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search language, paradigm..."
            className="w-full bg-white border-2 border-indigo-200 text-slate-900 placeholder-slate-400 text-xs font-bold rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:border-indigo-500 shadow-sm transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          id="cat-tab-all"
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2 ${
            selectedCategoryId === 'all'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:text-indigo-900 hover:border-indigo-300'
          }`}
        >
          All Languages ({languages.length})
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            id={`cat-tab-${cat.id}`}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all border-2 ${
              selectedCategoryId === cat.id
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:text-indigo-900 hover:border-indigo-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Additional Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-indigo-100 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Filter className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
          <span className="text-xs text-slate-700 font-extrabold">Filter Level:</span>
          
          <select
            id="difficulty-filter-select"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="bg-indigo-50 border-2 border-indigo-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-600"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner Friendly</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button
          id="bookmarks-toggle-filter"
          onClick={() => setOnlyBookmarks(!onlyBookmarks)}
          className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border-2 transition-colors ${
            onlyBookmarks
              ? 'bg-amber-100 border-amber-300 text-amber-900'
              : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${onlyBookmarks ? 'fill-amber-500 text-amber-500' : ''}`} />
          <span>Only Bookmarks ({progress.bookmarkedLanguageIds.length})</span>
        </button>
      </div>

      {/* Languages Grid */}
      {filteredLanguages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border-2 border-indigo-100 p-8 space-y-4 shadow-sm">
          <Code2 className="w-12 h-12 text-slate-400 mx-auto stroke-[2]" />
          <h3 className="text-lg font-black text-slate-900">No languages match your criteria</h3>
          <p className="text-xs font-medium text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, difficulty level, or category filter to find more programming languages.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setDifficultyFilter('all');
              setOnlyBookmarks(false);
              onSelectCategory('all');
            }}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 shadow-md transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLanguages.map((lang) => {
            const isBookmarked = progress.bookmarkedLanguageIds.includes(lang.id);
            const timeSpentSec = progress.timeSpentPerLanguage[lang.id] || 0;
            const { formattedString: timeStr } = formatTimeSpent(timeSpentSec);

            return (
              <div
                key={lang.id}
                id={`lang-directory-card-${lang.id}`}
                className="bg-white border-2 border-indigo-100 hover:border-indigo-500 p-6 rounded-3xl transition-all flex flex-col justify-between group shadow-md hover:shadow-xl relative"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Code2 className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 
                          onClick={() => onSelectLanguage(lang)}
                          className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
                        >
                          {lang.name}
                        </h3>
                        <span className="text-[11px] font-bold text-slate-400">{lang.categoryName} • Est. {lang.yearCreated}</span>
                      </div>
                    </div>

                    {/* Bookmark Toggle Button */}
                    <button
                      id={`bookmark-btn-${lang.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(lang.id);
                      }}
                      className={`p-2 rounded-2xl border-2 transition-all ${
                        isBookmarked 
                          ? 'bg-amber-100 border-amber-300 text-amber-800' 
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-300'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Language'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* Difficulty Tag & Paradigm */}
                  <div className="flex flex-wrap items-center gap-2 mt-3.5">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                      lang.difficultyRating === 'Beginner' 
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                        : lang.difficultyRating === 'Intermediate' 
                        ? 'bg-amber-100 border-amber-300 text-amber-800' 
                        : 'bg-rose-100 border-rose-300 text-rose-800'
                    }`}>
                      {lang.difficultyRating}
                    </span>

                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full truncate max-w-[200px]">
                      {lang.paradigm.split(':')[0]}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-medium text-slate-600 mt-3.5 line-clamp-2 leading-relaxed">
                    {lang.tagline}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-3.5 border-t-2 border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Spent: <strong className="text-indigo-950 font-mono font-black">{timeStr}</strong></span>
                  </div>

                  <button
                    onClick={() => onSelectLanguage(lang)}
                    className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                  >
                    <span>Learn</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
