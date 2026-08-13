import React from 'react';
import { Bookmark, X, Code2, ArrowUpRight, Trash2 } from 'lucide-react';
import { Language } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedLanguages: Language[];
  onSelectLanguage: (lang: Language) => void;
  onRemoveBookmark: (langId: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedLanguages,
  onSelectLanguage,
  onRemoveBookmark
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="bg-white border-l-4 border-indigo-200 w-full max-w-md h-full p-6 flex flex-col justify-between space-y-6 shadow-2xl text-slate-900 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-indigo-100 pb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-amber-500 fill-amber-400" />
            <h2 className="text-xl font-black text-slate-900">Bookmarked Languages</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {bookmarkedLanguages.length === 0 ? (
            <div className="text-center py-12 space-y-3 text-slate-500">
              <Bookmark className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
              <p className="text-xs font-black text-slate-700">No languages bookmarked yet.</p>
              <p className="text-[11px] font-medium text-slate-500 max-w-xs mx-auto">Click the bookmark icon on any language card to save it here for quick access!</p>
            </div>
          ) : (
            bookmarkedLanguages.map((lang) => (
              <div
                key={lang.id}
                className="p-4 rounded-2xl bg-indigo-50/60 border-2 border-indigo-100 flex items-center justify-between gap-3 group hover:border-indigo-500 transition-all shadow-sm"
              >
                <div 
                  onClick={() => {
                    onSelectLanguage(lang);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shrink-0 shadow-sm">
                    <Code2 className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {lang.name}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-500">{lang.categoryName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveBookmark(lang.id)}
                    className="p-2.5 rounded-xl bg-white text-slate-400 hover:text-rose-600 border border-slate-200 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onSelectLanguage(lang);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black hover:bg-amber-300 transition-colors shadow-sm"
                  >
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t-2 border-indigo-100 text-center">
          <p className="text-xs font-bold text-slate-500">DevLearn Student Bookmarks</p>
        </div>

      </div>
    </div>
  );
};
