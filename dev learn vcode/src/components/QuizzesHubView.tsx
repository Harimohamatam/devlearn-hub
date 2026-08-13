import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Bot, 
  Filter, 
  Play,
  Award,
  ChevronRight,
  Code2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quiz, QuizQuestion, Language, UserQuizAttempt } from '../types';
import { DEFAULT_QUIZZES } from '../data/quizzesData';

interface QuizzesHubViewProps {
  languages: Language[];
  onSaveQuizResult: (attempt: UserQuizAttempt) => void;
  completedAttempts: UserQuizAttempt[];
}

export const QuizzesHubView: React.FC<QuizzesHubViewProps> = ({
  languages,
  onSaveQuizResult,
  completedAttempts
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(DEFAULT_QUIZZES);
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  // Active Quiz Execution State
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState<boolean>(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // AI Custom Quiz Generator State
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiLangInput, setAiLangInput] = useState('Python');
  const [aiDiffInput, setAiDiffInput] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [showAiModal, setShowAiModal] = useState(false);

  const filteredQuizzes = quizzes.filter((q) => {
    if (selectedLanguageId !== 'all' && q.languageId !== selectedLanguageId) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowHint(false);
    setIsQuizFinished(false);
    setQuizStartTime(Date.now());
  };

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowHint(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!activeQuiz) return;
    setIsQuizFinished(true);

    let correctCount = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const percentage = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const timeTakenSec = Math.max(1, Math.round((Date.now() - quizStartTime) / 1000));

    // Save attempt
    const attempt: UserQuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId: activeQuiz.id,
      languageId: activeQuiz.languageId,
      languageName: activeQuiz.languageName,
      difficulty: activeQuiz.difficulty,
      score: correctCount,
      totalQuestions: activeQuiz.questions.length,
      percentage,
      timeTakenSeconds: timeTakenSec,
      completedAt: new Date().toISOString(),
      userAnswers
    };

    onSaveQuizResult(attempt);

    // Confetti on high score!
    if (percentage >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleGenerateAiQuiz = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: aiLangInput,
          difficulty: aiDiffInput,
          topic: `Core syntax, problem solving, and best practices in ${aiLangInput}`
        })
      });

      const data = await res.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        const newQuiz: Quiz = {
          id: `ai-quiz-${Date.now()}`,
          languageId: aiLangInput.toLowerCase(),
          languageName: aiLangInput,
          title: `AI Practice: ${aiLangInput} (${aiDiffInput.toUpperCase()})`,
          difficulty: aiDiffInput,
          timeLimitMinutes: 5,
          questions: data.questions
        };

        setQuizzes((prev) => [newQuiz, ...prev]);
        setShowAiModal(false);
        handleStartQuiz(newQuiz);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate AI Quiz. Please check connection or API key.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-indigo-900 border-4 border-indigo-200 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl text-white">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black mb-3 shadow-sm">
            <Trophy className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Difficulty Tests</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Programming Quizzes Hub</h1>
          <p className="text-xs sm:text-sm font-medium text-indigo-100 mt-1">
            Test your syntax knowledge and problem-solving across beginner, intermediate, and advanced levels.
          </p>
        </div>

        <button
          id="generate-ai-quiz-btn"
          onClick={() => setShowAiModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shrink-0 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Generate AI Quiz</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border-2 border-indigo-100 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
            <span className="text-xs text-slate-700 font-extrabold">Language:</span>
            <select
              id="quiz-lang-filter-select"
              value={selectedLanguageId}
              onChange={(e) => setSelectedLanguageId(e.target.value)}
              className="bg-indigo-50 border-2 border-indigo-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-600"
            >
              <option value="all">All Languages</option>
              {languages.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-700 font-extrabold">Difficulty:</span>
            <select
              id="quiz-diff-filter-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="bg-indigo-50 border-2 border-indigo-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-600"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-600">
          Showing <strong className="text-indigo-900 font-black">{filteredQuizzes.length}</strong> Quizzes
        </span>
      </div>

      {/* Quizzes List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuizzes.map((quiz) => {
          const pastAttempt = completedAttempts.find((a) => a.quizId === quiz.id);

          return (
            <div
              key={quiz.id}
              id={`quiz-card-${quiz.id}`}
              className="bg-white border-2 border-indigo-100 p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:border-indigo-500 transition-all shadow-md hover:shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider">
                    {quiz.languageName}
                  </span>

                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                    quiz.difficulty === 'beginner'
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                      : quiz.difficulty === 'intermediate'
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-rose-100 border-rose-300 text-rose-900'
                  }`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug">{quiz.title}</h3>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    {quiz.questions.length} Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    ~{quiz.timeLimitMinutes} Mins
                  </span>
                </div>
              </div>

              {/* Past High Score or Start Button */}
              <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between">
                {pastAttempt ? (
                  <div className="text-xs font-bold">
                    <span className="text-slate-500">Best Score: </span>
                    <strong className={`font-mono font-black text-sm ${pastAttempt.percentage >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {pastAttempt.percentage}%
                    </strong>
                  </div>
                ) : (
                  <span className="text-xs font-medium text-slate-400">Not attempted yet</span>
                )}

                <button
                  id={`start-quiz-btn-${quiz.id}`}
                  onClick={() => handleStartQuiz(quiz)}
                  className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <span>{pastAttempt ? 'Retake Test' : 'Start Test'}</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Quiz Execution Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-4 border-indigo-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-6 shadow-2xl relative text-slate-900">
            
            {!isQuizFinished ? (
              /* ACTIVE QUESTION MODE */
              <div className="space-y-6">
                
                {/* Header Progress */}
                <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
                  <div>
                    <span className="text-xs text-indigo-600 font-black uppercase tracking-wider">{activeQuiz.languageName} • {activeQuiz.difficulty}</span>
                    <h2 className="text-xl font-black text-slate-900">{activeQuiz.title}</h2>
                  </div>

                  <button
                    onClick={() => setActiveQuiz(null)}
                    className="text-xs font-black text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200"
                  >
                    Cancel Test
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600 font-extrabold">
                    <span>Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-indigo-50 h-3 rounded-full overflow-hidden border border-indigo-100">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Current Question */}
                {(() => {
                  const q = activeQuiz.questions[currentQuestionIndex];
                  const selectedOpt = userAnswers[currentQuestionIndex];

                  return (
                    <div className="space-y-4">
                      <h3 className="text-lg font-black text-slate-900 leading-relaxed">
                        {q.question}
                      </h3>

                      {q.codeSnippet && (
                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto">
                          <pre><code>{q.codeSnippet}</code></pre>
                        </div>
                      )}

                      {/* Options Radio List */}
                      <div className="space-y-3 pt-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;

                          return (
                            <button
                              key={optIdx}
                              id={`option-btn-${optIdx}`}
                              onClick={() => handleSelectOption(optIdx)}
                              className={`w-full text-left p-4 rounded-2xl border-2 text-xs font-bold transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-600/30'
                                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              <span>{opt}</span>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                              }`}>
                                {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Hint Trigger */}
                      {q.hint && (
                        <div>
                          {!showHint ? (
                            <button
                              onClick={() => setShowHint(true)}
                              className="text-xs text-amber-600 hover:underline flex items-center gap-1 font-black"
                            >
                              <HelpCircle className="w-4 h-4" />
                              <span>Need a hint?</span>
                            </button>
                          ) : (
                            <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs font-medium text-amber-900">
                              <strong className="font-black">Hint: </strong>{q.hint}
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })()}

                {/* Question Footer Buttons */}
                <div className="pt-4 border-t-2 border-slate-100 flex justify-end">
                  <button
                    id="next-question-btn"
                    disabled={userAnswers[currentQuestionIndex] === undefined}
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs transition-colors shadow-md active:scale-95"
                  >
                    {currentQuestionIndex < activeQuiz.questions.length - 1 ? 'Next Question →' : 'Finish Test & Review'}
                  </button>
                </div>

              </div>
            ) : (
              /* FINISHED QUIZ RESULTS REVIEW */
              <div className="space-y-6">
                {(() => {
                  let correct = 0;
                  activeQuiz.questions.forEach((q, idx) => {
                    if (userAnswers[idx] === q.correctAnswerIndex) correct++;
                  });
                  const pct = Math.round((correct / activeQuiz.questions.length) * 100);

                  return (
                    <>
                      <div className="text-center space-y-3 py-4">
                        <div className="w-16 h-16 rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md rotate-3">
                          <Trophy className="w-8 h-8 fill-current" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">Test Complete!</h2>
                        <div className="text-4xl font-black font-mono text-indigo-600">
                          {pct}%
                        </div>
                        <p className="text-xs font-bold text-slate-600">
                          You answered {correct} out of {activeQuiz.questions.length} questions correctly.
                        </p>
                      </div>

                      {/* Answers Review List */}
                      <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                        <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider">Detailed Answer Breakdown</h3>

                        {activeQuiz.questions.map((q, idx) => {
                          const userAns = userAnswers[idx];
                          const isCorrect = userAns === q.correctAnswerIndex;

                          return (
                            <div key={q.id} className={`p-4 rounded-2xl border-2 space-y-2 text-xs ${
                              isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                            }`}>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-bold text-slate-900">{idx + 1}. {q.question}</h4>
                                {isCorrect ? (
                                  <span className="text-emerald-700 font-black flex items-center gap-1 shrink-0">
                                    <CheckCircle2 className="w-4 h-4 stroke-[3]" /> Correct
                                  </span>
                                ) : (
                                  <span className="text-rose-700 font-black flex items-center gap-1 shrink-0">
                                    <XCircle className="w-4 h-4 stroke-[3]" /> Incorrect
                                  </span>
                                )}
                              </div>

                              <p className="text-slate-700">
                                Your choice: <strong className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>{q.options[userAns]}</strong>
                              </p>
                              {!isCorrect && (
                                <p className="text-slate-700">
                                  Correct answer: <strong className="text-emerald-800 font-black">{q.options[q.correctAnswerIndex]}</strong>
                                </p>
                              )}

                              <p className="text-[11px] text-slate-600 pt-1 italic font-medium">
                                Explanation: {q.explanation}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-4 border-t-2 border-slate-100 flex justify-between">
                        <button
                          onClick={() => handleStartQuiz(activeQuiz)}
                          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-2 border border-slate-200"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Retry Test</span>
                        </button>

                        <button
                          onClick={() => setActiveQuiz(null)}
                          className="px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-md"
                        >
                          Close & Save
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

          </div>
        </div>
      )}

      {/* AI Quiz Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border-4 border-indigo-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl text-slate-900">
            <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-600 text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Generate Custom AI Quiz</h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-xs font-black text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200"
              >
                Cancel
              </button>
            </div>

            <p className="text-xs font-medium text-slate-600 leading-relaxed">
              Select a programming language and difficulty level. Gemini AI will generate 3 brand new practice questions!
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Target Language</label>
                <input
                  type="text"
                  value={aiLangInput}
                  onChange={(e) => setAiLangInput(e.target.value)}
                  placeholder="e.g. Python, Rust, TypeScript, Go..."
                  className="w-full bg-indigo-50/60 border-2 border-indigo-100 text-xs font-bold text-slate-900 rounded-2xl p-3.5 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">Difficulty Level</label>
                <select
                  value={aiDiffInput}
                  onChange={(e) => setAiDiffInput(e.target.value as any)}
                  className="w-full bg-indigo-50/60 border-2 border-indigo-100 text-xs font-bold text-slate-900 rounded-2xl p-3.5 focus:outline-none focus:border-indigo-600"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateAiQuiz}
              disabled={isAiGenerating || !aiLangInput.trim()}
              className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              {isAiGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin fill-current" />
                  <span>Generating AI Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Generate Practice Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
