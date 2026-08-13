import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Code2, 
  MessageSquare, 
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { Language } from '../types';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

interface AITutorModalProps {
  currentLanguage?: Language;
  languages: Language[];
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  currentLanguage,
  languages
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: `Hello! I'm DevBot, your AI Study Buddy and Code Tutor. 🚀\n\nAsk me anything about programming concepts, bug debugging, syntax, or real-world code analogies! ${currentLanguage ? `Currently focusing on **${currentLanguage.name}**.` : ''}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>(currentLanguage?.name || 'All Languages');

  const presetQuestions = [
    "Explain recursion with a simple real-world analogy",
    "How does memory borrowing work in Rust?",
    "Difference between let, const, and var in JS",
    "What is an API endpoint and how do HTTP requests work?",
    "Explain SQL JOIN types with a simple diagram"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          history: historyPayload,
          currentLanguage: selectedLang
        })
      });

      const data = await res.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || "Sorry, I couldn't generate a response. Please check back.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'bot',
        text: "I ran into an issue connecting to AI services. Please verify API key configuration in Secrets.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border-4 border-indigo-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-w-4xl mx-auto text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-indigo-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md rotate-2">
            <Bot className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>DevBot - AI Study Buddy</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            </h2>
            <p className="text-xs font-medium text-slate-600">Ask any programming question, request bug assistance, or code analogies</p>
          </div>
        </div>

        {/* Focus Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-slate-700">Language:</span>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-indigo-50/80 border-2 border-indigo-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-600"
          >
            <option value="All Languages">All Languages</option>
            {languages.map((l) => (
              <option key={l.id} value={l.name}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Preset Questions Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] text-slate-600 font-extrabold uppercase tracking-wider shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-amber-500 stroke-[3]" /> Quick Ideas:
        </span>
        {presetQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(q)}
            className="px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-100 text-[11px] font-extrabold text-indigo-950 whitespace-nowrap transition-all shadow-sm active:scale-95"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="bg-indigo-50/40 rounded-2xl p-4 border-2 border-indigo-100 h-96 overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black shadow-sm ${
              m.sender === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-purple-600 text-white'
            }`}>
              {m.sender === 'user' ? <User className="w-4 h-4 stroke-[2.5]" /> : <Bot className="w-4 h-4 stroke-[2.5]" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl p-4 text-xs font-medium leading-relaxed space-y-2 shadow-sm ${
              m.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-white border-2 border-indigo-100 text-slate-800 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
              <p className={`text-[10px] font-bold text-right ${m.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                {m.time}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-black text-purple-700 p-2">
            <Sparkles className="w-4 h-4 animate-spin text-amber-500 fill-amber-400" />
            <span>DevBot is formulating a clear explanation...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question or paste code snippet to debug..."
          className="flex-1 bg-white border-2 border-indigo-100 text-xs font-bold text-slate-900 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      </form>

    </div>
  );
};
