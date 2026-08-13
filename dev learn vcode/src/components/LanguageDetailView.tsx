import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Code2, 
  Clock, 
  Bookmark, 
  Sparkles, 
  Play, 
  Check, 
  Copy, 
  BookOpen, 
  Layers, 
  Map, 
  Trophy, 
  ThumbsUp, 
  ThumbsDown, 
  Terminal, 
  Zap, 
  Bot,
  ExternalLink
} from 'lucide-react';
import { Language, SyntaxSnippet, UserProgress } from '../types';
import { LESSONS } from '../data/lessonsData';
import { formatTimeSpent } from '../utils/studyTracker';

interface LanguageDetailViewProps {
  language: Language;
  onBack: () => void;
  progress: UserProgress;
  onToggleBookmark: (languageId: string) => void;
  isTimerRunning: boolean;
  activeLanguageId?: string;
  onStartTimerForLanguage: (language: Language) => void;
  onStartQuiz: (quizId: string) => void;
  onCompleteLesson: (lessonId: string, languageId: string) => void;
}

export const LanguageDetailView: React.FC<LanguageDetailViewProps> = ({
  language,
  onBack,
  progress,
  onToggleBookmark,
  isTimerRunning,
  activeLanguageId,
  onStartTimerForLanguage,
  onStartQuiz,
  onCompleteLesson
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'syntax' | 'frameworks' | 'roadmap' | 'quizzes'>('overview');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const lessonsForLanguage = LESSONS.filter((lesson) => lesson.languageId === language.id).sort((a, b) => a.order - b.order);
  const activeLesson = lessonsForLanguage.find((lesson) => lesson.id === activeLessonId) || null;

  useEffect(() => {
    setActiveLessonId(null);
    setActiveTab('overview');
  }, [language.id]);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [activeSnippetOutput, setActiveSnippetOutput] = useState<Record<string, boolean>>({});
  
  // AI Explanation State
  const [explainingSnippet, setExplainingSnippet] = useState<SyntaxSnippet | null>(null);
  const [aiExplanationText, setAiExplanationText] = useState<string | null>(null);
  const [isExplainingLoading, setIsExplainingLoading] = useState(false);

  const isBookmarked = progress.bookmarkedLanguageIds.includes(language.id);
  const isCurrentlyStudying = isTimerRunning && activeLanguageId === language.id;
  const timeSpentSec = progress.timeSpentPerLanguage[language.id] || 0;
  const { formattedString: timeStr } = formatTimeSpent(timeSpentSec);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleToggleRunOutput = (id: string) => {
    setActiveSnippetOutput((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExplainWithAI = async (snippet: SyntaxSnippet) => {
    setExplainingSnippet(snippet);
    setIsExplainingLoading(true);
    setAiExplanationText(null);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: snippet.title,
          code: snippet.code,
          language: language.name,
          question: `Explain this ${language.name} syntax snippet step-by-step for a student. Include key terms, real-world analogies, and common pitfalls.`
        })
      });
      const data = await res.json();
      setAiExplanationText(data.explanation || 'Failed to fetch AI explanation.');
    } catch (err: any) {
      console.error(err);
      setAiExplanationText('An error occurred while connecting to AI Tutor.');
    } finally {
      setIsExplainingLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Back Button */}
      <button
        id="detail-back-button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-black text-slate-700 hover:text-indigo-900 transition-colors bg-white px-4 py-2 rounded-2xl border-2 border-slate-200 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 stroke-[3]" />
        <span>Back to Languages</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-indigo-900 border-4 border-indigo-200 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden text-white">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md rotate-3">
                <Code2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {language.name}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-indigo-100">
                  {language.categoryName} • Created in {language.yearCreated} by {language.createdByName}
                </p>
              </div>

              <span className={`text-xs font-black px-3 py-1.5 rounded-full border uppercase tracking-wider ml-auto sm:ml-0 ${
                language.difficultyRating === 'Beginner' 
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-900' 
                  : language.difficultyRating === 'Intermediate' 
                  ? 'bg-amber-100 border-amber-300 text-amber-900' 
                  : 'bg-rose-100 border-rose-300 text-rose-900'
              }`}>
                {language.difficultyRating} Level
              </span>
            </div>

            <p className="text-sm font-medium text-indigo-100 leading-relaxed">
              {language.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs pt-2">
              <span className="bg-indigo-950/80 px-3 py-1 rounded-xl border border-indigo-700/60 font-semibold text-indigo-200">
                Paradigm: <strong className="text-white">{language.paradigm}</strong>
              </span>
              <span className="bg-indigo-950/80 px-3 py-1 rounded-xl border border-indigo-700/60 font-semibold text-indigo-200">
                Engine: <strong className="text-white">{language.compilerOrRuntime}</strong>
              </span>
            </div>
          </div>

          {/* Action Bar: Timer & Bookmark */}
          <div className="w-full lg:w-auto bg-white/10 backdrop-blur border-2 border-indigo-300/30 p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-4 shrink-0 shadow-xl">
            <div className="text-center sm:text-left">
              <p className="text-[10px] text-indigo-200 font-extrabold uppercase tracking-wider">Your Time Spent</p>
              <p className="text-xl font-mono font-black text-amber-300">{timeStr}</p>
            </div>

            <button
              id={`start-timer-btn-${language.id}`}
              onClick={() => onStartTimerForLanguage(language)}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                isCurrentlyStudying
                  ? 'bg-emerald-400 text-slate-950 shadow-emerald-400/20'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isCurrentlyStudying ? 'Timer Active' : 'Start Study Timer'}</span>
            </button>

            <button
              id={`detail-bookmark-btn-${language.id}`}
              onClick={() => onToggleBookmark(language.id)}
              className={`p-3 rounded-2xl border-2 transition-all ${
                isBookmarked
                  ? 'bg-amber-400 border-amber-300 text-slate-950'
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Language'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-indigo-100">
        <button
          id="detail-tab-overview"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'text-slate-700 bg-white border-slate-200 hover:border-indigo-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Overview & Features</span>
        </button>

        <button
          id="detail-tab-lessons"
          onClick={() => setActiveTab('lessons')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
            activeTab === 'lessons'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'text-slate-700 bg-white border-slate-200 hover:border-indigo-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Lessons ({lessonsForLanguage.length})</span>
        </button>

        <button
          id="detail-tab-syntax"
          onClick={() => setActiveTab('syntax')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
            activeTab === 'syntax'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'text-slate-700 bg-white border-slate-200 hover:border-indigo-300'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Syntax Cheat Sheet</span>
        </button>

        <button
          id="detail-tab-frameworks"
          onClick={() => setActiveTab('frameworks')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
            activeTab === 'frameworks'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'text-slate-700 bg-white border-slate-200 hover:border-indigo-300'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Frameworks</span>
        </button>

        <button
          id="detail-tab-roadmap"
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
            activeTab === 'roadmap'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'text-slate-700 bg-white border-slate-200 hover:border-indigo-300'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Learning Roadmap</span>
        </button>

        <button
          id="detail-tab-quizzes"
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
            activeTab === 'quizzes'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
              : 'text-slate-700 bg-white border-slate-200 hover:border-indigo-300'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Practice Quizzes</span>
        </button>
      </div>

      {/* Tab Content 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Detailed Description */}
            <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl space-y-3 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Language Overview</span>
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                {language.overview}
              </p>
            </div>

            {/* Key Features */}
            <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl space-y-3 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Key Characteristics & Language Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {language.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100">
                    <div className="p-1 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs text-slate-800 font-bold leading-normal">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white border-2 border-emerald-200 p-6 rounded-3xl space-y-3 shadow-sm">
                <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-emerald-600" />
                  <span>Strengths & Pros</span>
                </h4>
                <ul className="space-y-2">
                  {language.pros.map((pro, i) => (
                    <li key={i} className="text-xs font-medium text-slate-700 flex items-start gap-2">
                      <span className="text-emerald-600 font-black">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-rose-200 p-6 rounded-3xl space-y-3 shadow-sm">
                <h4 className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-2">
                  <ThumbsDown className="w-4 h-4 text-rose-600" />
                  <span>Trade-offs & Cons</span>
                </h4>
                <ul className="space-y-2">
                  {language.cons.map((con, i) => (
                    <li key={i} className="text-xs font-medium text-slate-700 flex items-start gap-2">
                      <span className="text-rose-600 font-black">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Sidebar: Common Use Cases */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-purple-100 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <span>Industry Use Cases</span>
              </h3>
              <div className="space-y-2.5">
                {language.commonUseCases.map((useCase, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 text-xs font-bold text-slate-800 flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Subject Lessons */}
      {activeTab === 'lessons' && (
        <div className="space-y-5">
          <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl shadow-sm">
            <h3 className="text-xl font-black text-slate-900">{language.name} Subject Lessons</h3>
            <p className="text-xs font-medium text-slate-600 mt-1">Learn the actual subject, not just a short language overview. This course has {lessonsForLanguage.length} structured lessons.</p>
          </div>

          {!activeLesson ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessonsForLanguage.map((lesson, index) => {
                const completed = progress.completedLessonIds.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className="text-left bg-white border-2 border-indigo-100 hover:border-indigo-500 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Lesson {index + 1} • {lesson.difficulty}</span>
                        <h4 className="text-base font-black text-slate-900 mt-1">{lesson.title}</h4>
                      </div>
                      {completed && <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2">{lesson.description}</p>
                    <span className="inline-block mt-4 text-xs font-black text-indigo-600">Open lesson →</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border-2 border-indigo-100 rounded-3xl shadow-md overflow-hidden">
              <div className="bg-indigo-900 text-white p-6">
                <button onClick={() => setActiveLessonId(null)} className="text-xs font-black text-indigo-100 hover:text-white mb-3">← All {language.name} lessons</button>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">{activeLesson.difficulty}</span>
                <h3 className="text-2xl font-black mt-1">{activeLesson.title}</h3>
                <p className="text-sm text-indigo-100 mt-2">{activeLesson.description}</p>
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div className="whitespace-pre-line text-slate-700 leading-relaxed font-medium text-sm">{activeLesson.content}</div>
                {activeLesson.codeExamples?.map((code, i) => (
                  <div key={i} className="bg-slate-950 rounded-2xl p-5 overflow-x-auto">
                    <pre className="text-xs text-indigo-100 font-mono leading-relaxed"><code>{code}</code></pre>
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => onCompleteLesson(activeLesson.id, language.id)}
                    className={`px-5 py-3 rounded-2xl text-xs font-black transition-all ${progress.completedLessonIds.includes(activeLesson.id) ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'}`}
                  >
                    {progress.completedLessonIds.includes(activeLesson.id) ? '✓ Lesson Completed' : 'Mark Lesson Complete'}
                  </button>
                  <button onClick={() => setActiveLessonId(null)} className="px-5 py-3 rounded-2xl bg-indigo-50 text-indigo-800 border-2 border-indigo-100 text-xs font-black">Back to Lessons</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 3: Syntax Cheat Sheet */}
      {activeTab === 'syntax' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">Syntax Snippets & Interactive Code</h3>
            <p className="text-xs font-bold text-slate-500">Review core code patterns, simulate outputs, or ask AI for explanations</p>
          </div>

          <div className="space-y-6">
            {language.syntaxSnippets.map((snippet) => {
              const isOutputVisible = activeSnippetOutput[snippet.id];

              return (
                <div key={snippet.id} className="bg-white border-2 border-indigo-100 rounded-3xl overflow-hidden shadow-md">
                  {/* Snippet Header */}
                  <div className="bg-indigo-50/80 px-6 py-4 border-b-2 border-indigo-100 flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <h4 className="text-base font-black text-slate-900">{snippet.title}</h4>
                      <p className="text-xs font-medium text-slate-500">{snippet.description}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`copy-snippet-${snippet.id}`}
                        onClick={() => handleCopyCode(snippet.id, snippet.code)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-colors border-2 border-slate-200"
                      >
                        {copiedSnippetId === snippet.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`ai-explain-snippet-${snippet.id}`}
                        onClick={() => handleExplainWithAI(snippet)}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Bot className="w-3.5 h-3.5 text-purple-200" />
                        <span>Explain with AI</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Editor Preview */}
                  <div className="p-5 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border-b border-slate-800">
                    <pre><code>{snippet.code}</code></pre>
                  </div>

                  {/* Simulated Output Bar */}
                  {snippet.simulatedOutput && (
                    <div className="p-4 bg-slate-900 space-y-2">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleToggleRunOutput(snippet.id)}
                          className="text-xs font-black text-emerald-400 flex items-center gap-1.5 hover:underline"
                        >
                          <Terminal className="w-4 h-4" />
                          <span>{isOutputVisible ? 'Hide Execution Output' : 'Simulate Output ▶'}</span>
                        </button>
                      </div>

                      {isOutputVisible && (
                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs whitespace-pre-wrap">
                          {snippet.simulatedOutput}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Static Explanation */}
                  {snippet.explanation && (
                    <div className="p-4 bg-indigo-50/50 text-xs font-medium text-slate-700 border-t border-indigo-100">
                      <strong className="text-indigo-900 font-black">Note: </strong>
                      {snippet.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Explanation Modal */}
      {explainingSnippet && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-4 border-indigo-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-600 text-white font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">AI Code Explainer</h3>
              </div>
              <button
                onClick={() => setExplainingSnippet(null)}
                className="text-xs font-black text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200"
              >
                Close
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Concept:</span>
              <p className="text-base font-black text-indigo-900">{explainingSnippet.title}</p>
            </div>

            {isExplainingLoading ? (
              <div className="py-12 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-purple-600 animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-600">Generating student-friendly code breakdown with Gemini AI...</p>
              </div>
            ) : (
              <div className="text-xs font-medium text-slate-800 leading-relaxed space-y-3 whitespace-pre-wrap bg-indigo-50/60 p-5 rounded-2xl border-2 border-indigo-100">
                {aiExplanationText}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab Content 3: Frameworks */}
      {activeTab === 'frameworks' && (
        <div className="space-y-4">
          <h3 className="text-xl font-black text-slate-900">Popular Frameworks & Ecosystem</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {language.popularFrameworks.map((fw, i) => (
              <div key={i} className="bg-white border-2 border-indigo-100 p-6 rounded-3xl space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-indigo-950">{fw.name}</h4>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                    {fw.role}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-600 leading-relaxed">
                  {fw.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Learning Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="bg-white border-2 border-indigo-100 p-6 sm:p-8 rounded-3xl space-y-5 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Map className="w-6 h-6 text-indigo-600" />
            <span>Student Learning Roadmap for {language.name}</span>
          </h3>

          <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-1 before:bg-indigo-200 pl-9">
            {language.learningRoadmap.map((step, i) => (
              <div key={i} className="relative bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 text-xs text-slate-800 font-bold">
                <span className="absolute -left-9 top-4 w-4 h-4 rounded-full bg-indigo-600 ring-4 ring-white" />
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 5: Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-black text-slate-900">Practice Quizzes for {language.name}</h3>
          </div>

          <div className="bg-white border-2 border-indigo-100 p-8 rounded-3xl space-y-4 text-center shadow-sm">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
            <h4 className="text-lg font-black text-slate-900">Test Your Knowledge</h4>
            <p className="text-xs font-medium text-slate-600 max-w-md mx-auto">
              Take interactive multiple-choice tests designed for beginner, intermediate, and advanced levels to test your comprehension.
            </p>

            <button
              onClick={() => onStartQuiz(`${language.id}-beginner-subject`)}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all active:scale-95"
            >
              Launch Language Tests Hub
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
