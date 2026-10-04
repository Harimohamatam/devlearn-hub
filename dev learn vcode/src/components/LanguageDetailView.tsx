import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, BookOpen, Bot, Check, ChevronLeft, ChevronRight, Clock,
  Code2, Copy, ExternalLink, Layers, Lightbulb, Map, Play, Sparkles,
  Terminal, ThumbsDown, ThumbsUp, Trophy, X, Zap, Bookmark
} from 'lucide-react';
import { Language, Lesson, SyntaxSnippet, UserProgress } from '../types';
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

type DetailTab = 'overview' | 'lessons' | 'syntax' | 'frameworks' | 'roadmap' | 'quizzes';
type Volume = 'basic' | 'in-depth' | 'core';

const volumeMeta: Record<Volume, { label: string; short: string; description: string; icon: React.ReactNode }> = {
  basic: {
    label: 'Basic', short: 'Start here',
    description: 'Build the foundation slowly. Learn the vocabulary and first principles before moving deeper.',
    icon: <BookOpen className="w-4 h-4" />
  },
  'in-depth': {
    label: 'In-Depth', short: 'Understand deeply',
    description: 'Go beyond syntax. Learn how the concept behaves, why it works, and how developers apply it.',
    icon: <Lightbulb className="w-4 h-4" />
  },
  core: {
    label: 'Core', short: 'Master it',
    description: 'Connect the concept to real programs, edge cases, design decisions, and practical problem solving.',
    icon: <Zap className="w-4 h-4" />
  }
};

const volumeOrder: Volume[] = ['basic', 'in-depth', 'core'];

export const LanguageDetailView: React.FC<LanguageDetailViewProps> = ({
  language, onBack, progress, onToggleBookmark, isTimerRunning,
  activeLanguageId, onStartTimerForLanguage, onStartQuiz, onCompleteLesson
}) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<Volume>('basic');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [activeSnippetOutput, setActiveSnippetOutput] = useState<Record<string, boolean>>({});
  const [explainingSnippet, setExplainingSnippet] = useState<SyntaxSnippet | null>(null);
  const [aiExplanationText, setAiExplanationText] = useState<string | null>(null);
  const [isExplainingLoading, setIsExplainingLoading] = useState(false);

  const lessonsForLanguage = useMemo(
    () => LESSONS.filter(l => l.languageId === language.id).sort((a, b) => a.order - b.order),
    [language.id]
  );
  const lessonsByVolume = useMemo(() => ({
    basic: lessonsForLanguage.filter(l => (l.volume ?? (l.order <= 4 ? 'basic' : l.order <= 7 ? 'in-depth' : 'core')) === 'basic'),
    'in-depth': lessonsForLanguage.filter(l => (l.volume ?? (l.order <= 4 ? 'basic' : l.order <= 7 ? 'in-depth' : 'core')) === 'in-depth'),
    core: lessonsForLanguage.filter(l => (l.volume ?? (l.order <= 4 ? 'basic' : l.order <= 7 ? 'in-depth' : 'core')) === 'core')
  }), [lessonsForLanguage]);

  const activeLesson = lessonsForLanguage.find(l => l.id === activeLessonId) ?? null;
  const visibleLessons = lessonsByVolume[selectedVolume];
  const currentIndex = activeLesson ? lessonsForLanguage.findIndex(l => l.id === activeLesson.id) : -1;
  const completedCount = lessonsForLanguage.filter(l => progress.completedLessonIds.includes(l.id)).length;
  const isBookmarked = progress.bookmarkedLanguageIds.includes(language.id);
  const isCurrentlyStudying = isTimerRunning && activeLanguageId === language.id;
  const timeSpentSec = progress.timeSpentPerLanguage[language.id] || 0;
  const { formattedString: timeStr } = formatTimeSpent(timeSpentSec);

  useEffect(() => {
    setActiveLessonId(null);
    setActiveTab('overview');
    setSelectedVolume('basic');
  }, [language.id]);

  const openLesson = (lesson: Lesson) => {
    setActiveLessonId(lesson.id);
    const volume = lesson.volume ?? (lesson.order <= 4 ? 'basic' : lesson.order <= 7 ? 'in-depth' : 'core');
    setSelectedVolume(volume);
    setActiveTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateLesson = (direction: -1 | 1) => {
    if (currentIndex < 0) return;
    const next = lessonsForLanguage[currentIndex + direction];
    if (next) openLesson(next);
  };

  const handleCopyCode = async (id: string, code: string) => {
    try { await navigator.clipboard.writeText(code); } catch { /* clipboard may be unavailable */ }
    setCopiedSnippetId(id);
    window.setTimeout(() => setCopiedSnippetId(null), 1800);
  };

  const handleExplainWithAI = async (snippet: SyntaxSnippet) => {
    setExplainingSnippet(snippet);
    setIsExplainingLoading(true);
    setAiExplanationText(null);
    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: snippet.title, code: snippet.code, language: language.name,
          question: `Explain this ${language.name} syntax snippet step-by-step for a student. Include key terms, a simple analogy, what each important line does, and common pitfalls.`
        })
      });
      const data = await res.json();
      setAiExplanationText(data.explanation || 'The AI Tutor did not return an explanation.');
    } catch {
      setAiExplanationText('AI Tutor is unavailable right now. You can still study the explanation shown below the code.');
    } finally {
      setIsExplainingLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-14">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-black text-slate-700 hover:text-indigo-900 bg-white px-4 py-2.5 rounded-2xl border-2 border-slate-200 shadow-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Languages
      </button>

      <section className="relative overflow-hidden rounded-[2rem] bg-indigo-950 border-4 border-indigo-200 shadow-xl text-white p-6 sm:p-8">
        <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-7">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg rotate-2">
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">{language.name}</h1>
                <p className="text-xs sm:text-sm text-indigo-200">{language.categoryName} • {language.difficultyRating} level</p>
              </div>
            </div>
            <p className="text-sm text-indigo-100 leading-relaxed">{language.tagline}</p>
            <div className="flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">Paradigm: {language.paradigm}</span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">Runtime: {language.compilerOrRuntime}</span>
            </div>
          </div>
          <div className="w-full lg:w-auto bg-white/10 border border-white/15 rounded-3xl p-4 sm:p-5 backdrop-blur">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-black">Study time</p>
                <p className="text-xl font-mono font-black text-amber-300">{timeStr}</p>
              </div>
              <button onClick={() => onStartTimerForLanguage(language)} className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 ${isCurrentlyStudying ? 'bg-emerald-400 text-slate-950' : 'bg-amber-400 text-slate-950 hover:bg-amber-300'}`}>
                <Play className="w-4 h-4 fill-current" /> {isCurrentlyStudying ? 'Timer Active' : 'Start Timer'}
              </button>
              <button onClick={() => onToggleBookmark(language.id)} className={`p-2.5 rounded-xl border ${isBookmarked ? 'bg-amber-400 text-slate-950 border-amber-300' : 'bg-white/10 text-white border-white/20'}`} title="Bookmark language">
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-2 border-indigo-100 rounded-3xl p-2 shadow-sm overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {([
            ['overview', 'Overview'], ['lessons', `Learn (${lessonsForLanguage.length})`], ['syntax', 'Code Lab'],
            ['frameworks', 'Ecosystem'], ['roadmap', 'Roadmap'], ['quizzes', 'Practice']
          ] as [DetailTab, string][]).map(([id, label]) => (
            <button key={id} onClick={() => { setActiveTab(id); if (id !== 'lessons') setActiveLessonId(null); }} className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${activeTab === id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-indigo-50'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <InfoCard icon={<BookOpen className="w-5 h-5 text-indigo-600" />} title="What is it?">
              <p className="text-sm text-slate-700 leading-7">{language.overview}</p>
            </InfoCard>
            <InfoCard icon={<Zap className="w-5 h-5 text-amber-500" />} title="Key ideas">
              <div className="grid sm:grid-cols-2 gap-3">{language.keyFeatures.map((x, i) => <div key={i} className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs font-bold text-slate-700">✓ {x}</div>)}</div>
            </InfoCard>
            <div className="grid sm:grid-cols-2 gap-5">
              <InfoCard icon={<ThumbsUp className="w-5 h-5 text-emerald-600" />} title="Strengths"><ul className="space-y-2">{language.pros.map((x, i) => <li key={i} className="text-xs text-slate-700">• {x}</li>)}</ul></InfoCard>
              <InfoCard icon={<ThumbsDown className="w-5 h-5 text-rose-600" />} title="Trade-offs"><ul className="space-y-2">{language.cons.map((x, i) => <li key={i} className="text-xs text-slate-700">• {x}</li>)}</ul></InfoCard>
            </div>
          </div>
          <InfoCard icon={<Layers className="w-5 h-5 text-purple-600" />} title="Where it is used">
            <div className="space-y-2.5">{language.commonUseCases.map((x, i) => <div key={i} className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-xs font-bold text-slate-700">{x}</div>)}</div>
          </InfoCard>
        </div>
      )}

      {activeTab === 'lessons' && (
        <div className="space-y-5">
          {!activeLesson ? (
            <>
              <section className="rounded-3xl bg-white border-2 border-indigo-100 p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[.18em] text-indigo-600">Structured course</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Learn {language.name}, properly.</h2>
                    <p className="text-sm text-slate-600 mt-2 max-w-2xl">Each topic is taught in three volumes: first the foundation, then the deeper reasoning, then the core practical understanding.</p>
                  </div>
                  <div className="text-right"><p className="text-2xl font-black text-indigo-700">{completedCount}/{lessonsForLanguage.length}</p><p className="text-[10px] font-black uppercase tracking-wider text-slate-500">lessons completed</p></div>
                </div>
              </section>

              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-2 rounded-3xl">
                {volumeOrder.map(v => {
                  const meta = volumeMeta[v]; const count = lessonsByVolume[v].length; const done = lessonsByVolume[v].filter(l => progress.completedLessonIds.includes(l.id)).length;
                  return <button key={v} onClick={() => setSelectedVolume(v)} className={`text-left p-4 rounded-2xl transition-all ${selectedVolume === v ? 'bg-white shadow-md ring-2 ring-indigo-500' : 'hover:bg-white/70'}`}>
                    <div className="flex items-center gap-2 text-xs font-black text-slate-900">{meta.icon}{meta.label}</div>
                    <p className="hidden sm:block text-[11px] text-slate-500 mt-1">{meta.short}</p>
                    <p className="text-[10px] font-black text-indigo-600 mt-2">{done}/{count} done</p>
                  </button>;
                })}
              </div>

              <div className="bg-indigo-950 text-white rounded-3xl p-5 sm:p-6">
                <div className="flex items-start gap-3"><div className="p-2 rounded-xl bg-white/10">{volumeMeta[selectedVolume].icon}</div><div><h3 className="font-black">{volumeMeta[selectedVolume].label} Volume — {volumeMeta[selectedVolume].short}</h3><p className="text-xs text-indigo-200 mt-1 leading-relaxed">{volumeMeta[selectedVolume].description}</p></div></div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {visibleLessons.map((lesson, i) => {
                  const completed = progress.completedLessonIds.includes(lesson.id);
                  return <button key={lesson.id} onClick={() => openLesson(lesson)} className="text-left bg-white border-2 border-indigo-100 hover:border-indigo-500 hover:-translate-y-0.5 p-5 rounded-3xl shadow-sm hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-3"><div><span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">Lesson {lesson.order} • {lesson.difficulty}</span><h4 className="text-lg font-black text-slate-900 mt-1">{lesson.title.replace(/^\d+\.\s*/, '')}</h4></div>{completed && <Check className="w-5 h-5 text-emerald-600" />}</div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">{lesson.description}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-xs font-black text-indigo-600">Start lesson <ChevronRight className="w-4 h-4" /></span>
                  </button>;
                })}
                {visibleLessons.length === 0 && <div className="md:col-span-2 bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center text-sm text-slate-500">This volume does not have lessons for this language yet.</div>}
              </div>
            </>
          ) : (
            <LessonReader lesson={activeLesson} language={language} completed={progress.completedLessonIds.includes(activeLesson.id)} onComplete={() => onCompleteLesson(activeLesson.id, language.id)} onBack={() => setActiveLessonId(null)} onPrevious={() => navigateLesson(-1)} onNext={() => navigateLesson(1)} hasPrevious={currentIndex > 0} hasNext={currentIndex < lessonsForLanguage.length - 1} />
          )}
        </div>
      )}

      {activeTab === 'syntax' && <SyntaxLab language={language} copiedSnippetId={copiedSnippetId} activeSnippetOutput={activeSnippetOutput} onCopy={handleCopyCode} onToggleOutput={(id) => setActiveSnippetOutput(p => ({ ...p, [id]: !p[id] }))} onExplain={handleExplainWithAI} />}

      {activeTab === 'frameworks' && <div className="grid md:grid-cols-3 gap-5">{language.popularFrameworks.map((fw, i) => <div key={i} className="bg-white border-2 border-indigo-100 p-6 rounded-3xl shadow-sm"><span className="text-[10px] font-black uppercase text-purple-700">{fw.role}</span><h3 className="text-lg font-black text-slate-900 mt-1">{fw.name}</h3><p className="text-xs text-slate-600 leading-relaxed mt-2">{fw.description}</p></div>)}</div>}

      {activeTab === 'roadmap' && <div className="bg-white border-2 border-indigo-100 p-6 sm:p-8 rounded-3xl shadow-sm"><h2 className="text-xl font-black text-slate-900 mb-6 flex gap-2 items-center"><Map className="w-5 h-5 text-indigo-600" /> Learning Roadmap</h2><div className="space-y-4">{language.learningRoadmap.map((step, i) => <div key={i} className="flex gap-4 items-start"><div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">{i + 1}</div><div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-sm font-bold text-slate-700 flex-1">{step}</div></div>)}</div></div>}

      {activeTab === 'quizzes' && <div className="bg-white border-2 border-indigo-100 p-8 rounded-3xl text-center shadow-sm"><Trophy className="w-12 h-12 text-amber-500 mx-auto" /><h2 className="text-xl font-black mt-3">Practice {language.name}</h2><p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">Finish a lesson, then test your understanding with the language quiz hub.</p><button onClick={() => onStartQuiz(`${language.id}-beginner-subject`)} className="mt-5 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black">Launch Practice Hub</button></div>}

      {explainingSnippet && <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"><div className="bg-white rounded-3xl border-4 border-indigo-200 shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6"><div className="flex items-center justify-between"><div className="flex gap-2 items-center"><Bot className="w-5 h-5 text-purple-600" /><h3 className="font-black">AI Code Explainer</h3></div><button onClick={() => setExplainingSnippet(null)}><X className="w-5 h-5" /></button></div><p className="text-xs text-slate-500 mt-4">{explainingSnippet.title}</p>{isExplainingLoading ? <div className="py-12 text-center"><Sparkles className="w-8 h-8 text-purple-600 animate-spin mx-auto" /><p className="text-xs font-bold text-slate-600 mt-3">Explaining this code for you...</p></div> : <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700 bg-indigo-50 p-5 rounded-2xl">{aiExplanationText}</div>}</div></div>}
    </div>
  );
};

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <section className="bg-white border-2 border-indigo-100 p-6 rounded-3xl shadow-sm"><h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-4">{icon}{title}</h3>{children}</section>
);

const LessonReader: React.FC<{
  lesson: Lesson; language: Language; completed: boolean; onComplete: () => void; onBack: () => void;
  onPrevious: () => void; onNext: () => void; hasPrevious: boolean; hasNext: boolean;
}> = ({ lesson, language, completed, onComplete, onBack, onPrevious, onNext, hasPrevious, hasNext }) => {
  const volume = lesson.volume ?? 'basic';
  const sections = lesson.sections?.length ? lesson.sections : [{ id: `${lesson.id}-main`, title: 'Lesson', content: lesson.content, code: lesson.codeExamples?.[0] }];
  return <article className="bg-white border-2 border-indigo-100 rounded-[2rem] shadow-lg overflow-hidden">
    <header className="bg-indigo-950 text-white p-6 sm:p-9">
      <button onClick={onBack} className="text-xs font-black text-indigo-200 hover:text-white mb-5">← All {language.name} lessons</button>
      <div className="flex flex-wrap gap-2 items-center"><span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">{volume}</span><span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase">{lesson.difficulty}</span></div>
      <h2 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight">{lesson.title.replace(/^\d+\.\s*/, '')}</h2><p className="text-indigo-200 text-sm mt-2 max-w-3xl leading-relaxed">{lesson.description}</p>
    </header>

    <div className="grid lg:grid-cols-[220px_1fr]">
      <aside className="border-b lg:border-b-0 lg:border-r border-indigo-100 p-4 bg-slate-50"><p className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-3">In this lesson</p><div className="space-y-1">{sections.map((s, i) => <a key={s.id} href={`#${s.id}`} className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-white hover:text-indigo-700">{i + 1}. {s.title}</a>)}</div></aside>
      <div className="p-5 sm:p-8 lg:p-10 space-y-8">
        <TeachingCard title="Why this matters" icon={<Lightbulb className="w-5 h-5 text-amber-500" />}>{lesson.whyItMatters}</TeachingCard>
        <TeachingCard title="How it works" icon={<Zap className="w-5 h-5 text-indigo-600" />}>{lesson.howItWorks}</TeachingCard>

        {sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-6"><h3 className="text-xl font-black text-slate-900 mb-3">{section.title}</h3><div className="whitespace-pre-line text-sm text-slate-700 leading-7">{section.content}</div>{section.code && <CodeBlock code={section.code} />}</section>)}

        <div className="grid md:grid-cols-2 gap-4">
          <TeachingCard title="When to use it" icon={<Play className="w-5 h-5 text-emerald-600" />}>{lesson.whenToUse}</TeachingCard>
          <TeachingCard title="What happens" icon={<Terminal className="w-5 h-5 text-purple-600" />}>{lesson.whatHappens}</TeachingCard>
        </div>
        <TeachingCard title="Real-world example" icon={<Layers className="w-5 h-5 text-indigo-600" />}>{lesson.realWorldExample}</TeachingCard>

        <div className="grid md:grid-cols-2 gap-5"><div className="p-5 rounded-3xl bg-rose-50 border border-rose-100"><h4 className="font-black text-rose-900 text-sm">Common mistakes</h4><ul className="mt-3 space-y-2">{(lesson.commonMistakes ?? []).map((x, i) => <li key={i} className="text-xs text-slate-700">• {x}</li>)}</ul></div><div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-100"><h4 className="font-black text-emerald-900 text-sm">Key takeaways</h4><ul className="mt-3 space-y-2">{(lesson.keyTakeaways ?? []).map((x, i) => <li key={i} className="text-xs text-slate-700">✓ {x}</li>)}</ul></div></div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-100">
          <button onClick={onPrevious} disabled={!hasPrevious} className="flex-1 px-5 py-3 rounded-2xl border-2 border-slate-200 text-xs font-black disabled:opacity-40"><ChevronLeft className="inline w-4 h-4" /> Previous</button>
          <button onClick={onComplete} className={`flex-1 px-5 py-3 rounded-2xl text-xs font-black ${completed ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}>{completed ? '✓ Lesson Completed' : 'Mark Lesson Complete'}</button>
          <button onClick={onNext} disabled={!hasNext} className="flex-1 px-5 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-black disabled:opacity-40">Next Lesson <ChevronRight className="inline w-4 h-4" /></button>
        </div>
      </div>
    </div>
  </article>;
};

const TeachingCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => <div className="p-5 rounded-3xl bg-indigo-50/70 border border-indigo-100"><h4 className="text-sm font-black text-slate-900 flex items-center gap-2">{icon}{title}</h4><p className="text-sm text-slate-700 leading-7 mt-2">{children}</p></div>;

const CodeBlock: React.FC<{ code: string }> = ({ code }) => <div className="mt-4 rounded-2xl bg-slate-950 overflow-x-auto p-5"><pre className="text-xs sm:text-sm text-indigo-100 font-mono leading-6"><code>{code}</code></pre></div>;

const SyntaxLab: React.FC<{
  language: Language; copiedSnippetId: string | null; activeSnippetOutput: Record<string, boolean>;
  onCopy: (id: string, code: string) => void; onToggleOutput: (id: string) => void; onExplain: (snippet: SyntaxSnippet) => void;
}> = ({ language, copiedSnippetId, activeSnippetOutput, onCopy, onToggleOutput, onExplain }) => <div className="space-y-5"><div><h2 className="text-2xl font-black">Code Lab</h2><p className="text-xs text-slate-500 mt-1">Copy, inspect, simulate, and ask the AI Tutor about {language.name} syntax.</p></div>{language.syntaxSnippets.map(snippet => <section key={snippet.id} className="bg-white border-2 border-indigo-100 rounded-3xl overflow-hidden shadow-sm"><div className="p-5 border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-black">{snippet.title}</h3><p className="text-xs text-slate-500 mt-1">{snippet.description}</p></div><div className="flex gap-2"><button onClick={() => onCopy(snippet.id, snippet.code)} className="px-3 py-2 rounded-xl border-2 border-slate-200 text-xs font-black">{copiedSnippetId === snippet.id ? '✓ Copied' : 'Copy'}</button><button onClick={() => onExplain(snippet)} className="px-3 py-2 rounded-xl bg-purple-600 text-white text-xs font-black"><Bot className="inline w-3.5 h-3.5" /> Explain</button></div></div><CodeBlock code={snippet.code} />{snippet.simulatedOutput && <div className="bg-slate-900 p-4"><button onClick={() => onToggleOutput(snippet.id)} className="text-xs font-black text-emerald-400">{activeSnippetOutput[snippet.id] ? 'Hide output' : 'Simulate output ▶'}</button>{activeSnippetOutput[snippet.id] && <pre className="mt-3 p-3 rounded-xl bg-slate-950 text-emerald-300 text-xs whitespace-pre-wrap">{snippet.simulatedOutput}</pre>}</div>}{snippet.explanation && <p className="p-4 text-xs text-slate-600 bg-indigo-50"><b>Note:</b> {snippet.explanation}</p>}</section>)}</div>;