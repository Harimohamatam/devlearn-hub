import React, { useState, useRef } from 'react';
import {
  User,
  Mail,
  Cake,
  Code2,
  BarChart3,
  Award,
  BookOpen,
  Trophy,
  Zap,
  Save,
  Camera,
  Clock,
  CheckCircle2,
  Star
} from 'lucide-react';
import { UserProgress, Language, DifficultyLevel } from '../types';
import { LANGUAGES } from '../data/languagesData';
import { formatTimeSpent } from '../utils/studyTracker';

interface ProfileViewProps {
  progress: UserProgress;
  onUpdateProgress: (progress: UserProgress) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(progress.profile || {
    name: 'Student',
    learningLevel: 'Beginner' as DifficultyLevel,
  });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        const updatedProfile = { ...editedProfile, profileImageData: imageData };
        setEditedProfile(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const updated = { ...progress, profile: editedProfile };
    onUpdateProgress(updated);
    setIsEditing(false);
  };

  const { formattedString: totalTimeStr } = formatTimeSpent(progress.totalStudySeconds);
  const highScores = progress.completedQuizAttempts.filter(att => att.percentage >= 80).length;
  const preferredLang = editedProfile.preferredLanguageId
    ? LANGUAGES.find(l => l.id === editedProfile.preferredLanguageId)?.name
    : 'Not Selected';

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 border-4 border-indigo-200 p-6 sm:p-8 rounded-3xl shadow-xl text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-5xl font-black shadow-lg overflow-hidden">
              {editedProfile.profileImageData ? (
                <img src={editedProfile.profileImageData} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
            {isEditing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 shadow-lg transition-colors"
                title="Change profile picture"
              >
                <Camera className="w-5 h-5" />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-3">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="bg-white/20 border-2 border-white/40 text-white placeholder-white/60 px-4 py-2 rounded-xl text-xl font-black w-full focus:outline-none focus:border-white/80"
                  placeholder="Your Name"
                />
              </>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-black text-white">{editedProfile.name}</h1>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20">
                <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Learning Level</p>
                {isEditing ? (
                  <select
                    value={editedProfile.learningLevel}
                    onChange={(e) => setEditedProfile({ ...editedProfile, learningLevel: e.target.value as DifficultyLevel })}
                    className="bg-white/20 border border-white/40 text-white px-2 py-1 rounded-lg text-sm font-black focus:outline-none"
                  >
                    <option className="bg-white text-slate-900" value="Beginner">Beginner</option>
                    <option className="bg-white text-slate-900" value="Intermediate">Intermediate</option>
                    <option className="bg-white text-slate-900" value="Advanced">Advanced</option>
                  </select>
                ) : (
                  <p className="text-lg font-black text-amber-300">{editedProfile.learningLevel}</p>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl border border-white/20">
                <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Preferred Language</p>
                {isEditing ? (
                  <select
                    value={editedProfile.preferredLanguageId || ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, preferredLanguageId: e.target.value })}
                    className="bg-white/20 border border-white/40 text-white px-2 py-1 rounded-lg text-sm font-black focus:outline-none"
                  >
                    <option className="bg-white text-slate-900" value="">Select Language</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang.id} value={lang.id}>{lang.name}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-lg font-black text-emerald-300">{preferredLang}</p>
                )}
              </div>

              {isEditing && (
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Age (Optional)</label>
                  <input
                    type="number"
                    value={editedProfile.age || ''}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="bg-white/20 border border-white/40 text-white placeholder-white/60 px-2 py-1 rounded-lg text-sm font-black w-full focus:outline-none focus:border-white/80"
                    placeholder="Your age"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex gap-2 w-full md:w-auto">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 md:flex-initial px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 md:flex-initial px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-black text-xs rounded-2xl transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <User className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Time */}
        <div className="bg-white border-2 border-indigo-100 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase">Total Time</span>
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-indigo-950 font-mono mt-2">{totalTimeStr}</p>
        </div>

        {/* Lessons Completed */}
        <div className="bg-white border-2 border-emerald-100 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase">Lessons Done</span>
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-950 font-mono mt-2">{progress.completedLessonIds.length}</p>
        </div>

        {/* Tests Passed */}
        <div className="bg-white border-2 border-purple-100 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase">Tests Taken</span>
            <Trophy className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-950 font-mono mt-2">{progress.completedQuizAttempts.length}</p>
        </div>

        {/* High Scores */}
        <div className="bg-white border-2 border-amber-100 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase">High Scores</span>
            <Star className="w-5 h-5 text-amber-600 fill-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-950 font-mono mt-2">{highScores}</p>
        </div>
      </div>

      {/* Language-wise Progress */}
      <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          Language-wise Progress
        </h2>

        {Object.keys(progress.languageProgress).length === 0 ? (
          <p className="text-center text-slate-500 py-8">Start learning to see your progress here!</p>
        ) : (
          <div className="space-y-4">
            {(Object.entries(progress.languageProgress) as [string, UserProgress['languageProgress'][string]][]).map(([langId, langProgress]) => {
              const language = LANGUAGES.find(l => l.id === langId);
              return (
                <div key={langId} className="border-l-4 border-indigo-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-slate-900">{language?.name || langId}</h3>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                      {langProgress.lessonsCompleted} lessons
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <p className="text-slate-600 font-bold">Best Score</p>
                      <p className="text-lg font-black text-indigo-950">{langProgress.bestQuizScore}%</p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-bold">Avg Score</p>
                      <p className="text-lg font-black text-indigo-950">{langProgress.averageQuizScore.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-bold">Tests</p>
                      <p className="text-lg font-black text-indigo-950">{langProgress.totalQuizzesTaken}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 font-bold">Time</p>
                      <p className="text-lg font-black text-indigo-950">{Math.round((progress.timeSpentPerLanguage[langId] || 0) / 60)}m</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Quiz Scores */}
      <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl shadow-sm">
        <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-600" />
          Recent Quiz Attempts
        </h2>

        {progress.completedQuizAttempts.length === 0 ? (
          <p className="text-center text-slate-500 py-8">No quiz attempts yet. Take a quiz to see your scores!</p>
        ) : (
          <div className="overflow-x-auto">
            <div className="space-y-3">
              {progress.completedQuizAttempts.slice(0, 10).map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100">
                  <div className="flex-1">
                    <p className="font-black text-slate-900">{attempt.languageName}</p>
                    <p className="text-xs text-slate-600 font-medium">
                      {attempt.difficulty} • {attempt.score}/{attempt.totalQuestions} correct
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-black font-mono ${
                      attempt.percentage >= 80 ? 'text-emerald-600' : 
                      attempt.percentage >= 60 ? 'text-amber-600' : 
                      'text-rose-600'
                    }`}>
                      {attempt.percentage}%
                    </p>
                    <p className="text-xs text-slate-500 font-bold">{new Date(attempt.completedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Creator Credit */}
      <div className="text-center py-6 border-t-2 border-indigo-100">
        <p className="text-xs text-slate-400 opacity-60 font-medium tracking-wide">
          Designed & Developed by Hari Charan Mohamatam
        </p>
      </div>

    </div>
  );
};
