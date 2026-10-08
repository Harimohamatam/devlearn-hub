import React, { useEffect, useRef, useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  HelpCircle,
  Plus,
  MessageSquare,
  Trash2,
  Paperclip,
  Camera,
  Image as ImageIcon,
  X,
  FileCode2,
  FileText,
  Loader2
} from 'lucide-react';
import { Language } from '../types';
import { supabase } from '../lib/supabase';
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || ''
).replace(/\/+$/, '');

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  attachmentName?: string;
  attachmentKind?: 'image' | 'file';
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

interface StoredChatData {
  conversations: Conversation[];
  activeConversationId: string;
}

interface TutorAttachment {
  name: string;
  mimeType: string;
  data?: string;
  textContent?: string;
  kind: 'image' | 'file';
}

interface AITutorModalProps {
  currentLanguage?: Language;
  languages: Language[];
}

const createWelcomeMessage = (
  currentLanguage?: Language
): Message => ({
  id: `welcome-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  sender: 'bot',
  text: `Hello! I'm DevBot, your AI Study Buddy and Code Tutor. 🚀

Ask me anything about programming concepts, bug debugging, syntax, or real-world code analogies! ${
    currentLanguage
      ? `Currently focusing on **${currentLanguage.name}**.`
      : ''
  }`,
  time: new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
});

const createConversation = (
  currentLanguage?: Language
): Conversation => ({
  id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: 'New Chat',
  messages: [createWelcomeMessage(currentLanguage)],
  updatedAt: new Date().toISOString()
});

const getChatStorageKey = (userId: string): string =>
  `devlearn-ai-conversations-${userId}`;

const MAX_ATTACHMENT_BYTES = 12 * 1024 * 1024;
const MAX_TEXT_FILE_CHARS = 1_500_000;

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
]);

const TEXT_FILE_EXTENSIONS = new Set([
  'txt',
  'js',
  'jsx',
  'ts',
  'tsx',
  'py',
  'java',
  'c',
  'h',
  'cpp',
  'cc',
  'cxx',
  'hpp',
  'cs',
  'rs',
  'go',
  'php',
  'rb',
  'swift',
  'kt',
  'kts',
  'dart',
  'sql',
  'html',
  'htm',
  'css',
  'scss',
  'sass',
  'json',
  'xml',
  'yaml',
  'yml',
  'md',
  'sh',
  'bat',
  'ps1',
  'vue',
  'svelte'
]);

const getFileExtension = (
  fileName: string
): string => {
  const parts = fileName.toLowerCase().split('.');
  return parts.length > 1
    ? parts[parts.length - 1]
    : '';
};

const isTextLikeFile = (file: File): boolean => {
  const extension = getFileExtension(file.name);

  return (
    file.type.startsWith('text/') ||
    TEXT_FILE_EXTENSIONS.has(extension) ||
    file.type === 'application/json' ||
    file.type === 'application/javascript' ||
    file.type === 'application/typescript' ||
    file.type === 'application/xml'
  );
};

const readFileAsBase64 = (
  file: File
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || '');
      const commaIndex = result.indexOf(',');

      resolve(
        commaIndex >= 0
          ? result.slice(commaIndex + 1)
          : result
      );
    };

    reader.onerror = () =>
      reject(
        new Error('Could not read the selected file.')
      );

    reader.readAsDataURL(file);
  });

const readFileAsText = (
  file: File
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () =>
      resolve(String(reader.result || ''));

    reader.onerror = () =>
      reject(
        new Error('Could not read the selected text file.')
      );

    reader.readAsText(file);
  });

export const AITutorModal: React.FC<
  AITutorModalProps
> = ({
  currentLanguage,
  languages
}) => {
  const [userId, setUserId] =
    useState<string | null>(null);

  const [chatLoading, setChatLoading] =
    useState(true);

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [
    activeConversationId,
    setActiveConversationId
  ] = useState<string>('');

  const [inputText, setInputText] =
    useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  const [selectedLang, setSelectedLang] =
    useState<string>(
      currentLanguage?.name ||
        'All Languages'
    );

  const [pendingAttachment, setPendingAttachment] =
    useState<TutorAttachment | null>(null);

  const [attachmentPreviewUrl, setAttachmentPreviewUrl] =
    useState<string | null>(null);

  const [attachmentError, setAttachmentError] =
    useState<string | null>(null);

  const [isReadingAttachment, setIsReadingAttachment] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const cameraInputRef =
    useRef<HTMLInputElement | null>(null);

  // ============================================================
  // GET CURRENT SUPABASE USER
  // ============================================================

  useEffect(() => {
    let mounted = true;

    const loadCurrentUser = async () => {
      try {
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();

        if (error) throw error;

        if (!mounted) return;

        setUserId(user?.id ?? null);
      } catch (error) {
        console.error(
          'Could not identify the current DevBot user:',
          error
        );

        if (mounted) {
          setUserId(null);
        }
      }
    };

    loadCurrentUser();

    const {
      data: { subscription }
    } =
      supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!mounted) return;

          setUserId(
            session?.user?.id ?? null
          );
        }
      );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ============================================================
  // LOAD ONLY THIS USER'S CHAT HISTORY
  // ============================================================

  useEffect(() => {
    if (!userId) {
      setConversations([]);
      setActiveConversationId('');
      setChatLoading(false);
      return;
    }

    setChatLoading(true);
    setConversations([]);
    setActiveConversationId('');

    try {
      const storageKey =
        getChatStorageKey(userId);

      const saved =
        localStorage.getItem(storageKey);

      if (saved) {
        const parsed =
          JSON.parse(saved) as StoredChatData;

        if (
          parsed &&
          Array.isArray(
            parsed.conversations
          ) &&
          parsed.conversations.length > 0
        ) {
          const validActiveId =
            parsed.conversations.some(
              (conversation) =>
                conversation.id ===
                parsed.activeConversationId
            )
              ? parsed.activeConversationId
              : parsed.conversations[0].id;

          setConversations(
            parsed.conversations
          );

          setActiveConversationId(
            validActiveId
          );

          setChatLoading(false);
          return;
        }
      }

      // Never migrate the old global key.
      const newConversation =
        createConversation(
          currentLanguage
        );

      setConversations([
        newConversation
      ]);

      setActiveConversationId(
        newConversation.id
      );
    } catch (error) {
      console.error(
        "Could not load this user's DevBot conversations:",
        error
      );

      const newConversation =
        createConversation(
          currentLanguage
        );

      setConversations([
        newConversation
      ]);

      setActiveConversationId(
        newConversation.id
      );
    } finally {
      setChatLoading(false);
    }
  }, [userId]);

  // ============================================================
  // SAVE ONLY THIS USER'S CHAT HISTORY
  // ============================================================

  useEffect(() => {
    if (
      !userId ||
      chatLoading ||
      conversations.length === 0 ||
      !activeConversationId
    ) {
      return;
    }

    try {
      const storageKey =
        getChatStorageKey(userId);

      const data: StoredChatData = {
        conversations,
        activeConversationId
      };

      localStorage.setItem(
        storageKey,
        JSON.stringify(data)
      );
    } catch (error) {
      console.error(
        "Could not save this user's DevBot conversations:",
        error
      );
    }
  }, [
    conversations,
    activeConversationId,
    userId,
    chatLoading
  ]);

  // ============================================================
  // CLEAN ATTACHMENT PREVIEW URL
  // ============================================================

  useEffect(() => {
    return () => {
      if (attachmentPreviewUrl) {
        URL.revokeObjectURL(
          attachmentPreviewUrl
        );
      }
    };
  }, [attachmentPreviewUrl]);

  // ============================================================
  // CURRENT ACTIVE CHAT
  // ============================================================

  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id ===
        activeConversationId
    ) || conversations[0];

  const messages =
    activeConversation?.messages || [];

  // ============================================================
  // QUICK QUESTIONS
  // ============================================================

  const presetQuestions = [
    'Explain recursion with a simple real-world analogy',
    'How does memory borrowing work in Rust?',
    'Difference between let, const, and var in JS',
    'What is an API endpoint and how do HTTP requests work?',
    'Explain SQL JOIN types with a simple diagram'
  ];

  // ============================================================
  // NEW CHAT
  // ============================================================

  const handleNewChat = () => {
    if (
      isLoading ||
      !userId ||
      chatLoading
    ) {
      return;
    }

    const newConversation =
      createConversation(
        currentLanguage
      );

    setConversations((prev) => [
      newConversation,
      ...prev
    ]);

    setActiveConversationId(
      newConversation.id
    );

    setInputText('');
    clearPendingAttachment();
  };

  // ============================================================
  // SWITCH CHAT
  // ============================================================

  const handleSelectConversation = (
    id: string
  ) => {
    if (isLoading) return;

    setActiveConversationId(id);
    setInputText('');
    clearPendingAttachment();
  };

  // ============================================================
  // DELETE ONE CHAT
  // ============================================================

  const handleDeleteConversation = (
    id: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    if (!userId) return;

    const remaining =
      conversations.filter(
        (conversation) =>
          conversation.id !== id
      );

    if (remaining.length === 0) {
      const newConversation =
        createConversation(
          currentLanguage
        );

      setConversations([
        newConversation
      ]);

      setActiveConversationId(
        newConversation.id
      );

      return;
    }

    setConversations(remaining);

    if (
      id === activeConversationId
    ) {
      setActiveConversationId(
        remaining[0].id
      );
    }
  };

  // ============================================================
  // CLEAR ATTACHMENT
  // ============================================================

  function clearPendingAttachment() {
    setPendingAttachment(null);
    setAttachmentError(null);

    if (attachmentPreviewUrl) {
      URL.revokeObjectURL(
        attachmentPreviewUrl
      );
    }

    setAttachmentPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  }

  // ============================================================
  // PROCESS ATTACHMENT
  // ============================================================

  const handleAttachment = async (
    file: File
  ) => {
    setAttachmentError(null);

    if (file.size > MAX_ATTACHMENT_BYTES) {
      setAttachmentError(
        'That file is too large. Please choose a file smaller than 12 MB.'
      );
      return;
    }

    const extension =
      getFileExtension(file.name);

    const isImage =
      file.type.startsWith('image/');

    const isPdf =
      file.type ===
      'application/pdf' ||
      extension === 'pdf';

    const isText =
      isTextLikeFile(file);

    if (
      !isImage &&
      !isPdf &&
      !isText
    ) {
      setAttachmentError(
        'Unsupported file. Please attach an image, screenshot, PDF, or coding/text file.'
      );
      return;
    }

    setIsReadingAttachment(true);

    try {
      let attachment: TutorAttachment;

      if (isText) {
        const textContent =
          await readFileAsText(file);

        if (
          textContent.length >
          MAX_TEXT_FILE_CHARS
        ) {
          setAttachmentError(
            'That text/code file is too large to analyze in one request.'
          );
          return;
        }

        attachment = {
          name: file.name,
          mimeType:
            file.type ||
            'text/plain',
          textContent,
          kind: 'file'
        };
      } else {
        const data =
          await readFileAsBase64(file);

        attachment = {
          name: file.name,
          mimeType:
            file.type ||
            (isPdf
              ? 'application/pdf'
              : 'application/octet-stream'),
          data,
          kind: isImage
            ? 'image'
            : 'file'
        };
      }

      if (attachmentPreviewUrl) {
        URL.revokeObjectURL(
          attachmentPreviewUrl
        );
      }

      if (isImage) {
        setAttachmentPreviewUrl(
          URL.createObjectURL(file)
        );
      } else {
        setAttachmentPreviewUrl(null);
      }

      setPendingAttachment(
        attachment
      );
    } catch (error) {
      console.error(
        'Attachment processing error:',
        error
      );

      setAttachmentError(
        'I could not read that attachment. Please try another file.'
      );
    } finally {
      setIsReadingAttachment(false);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    void handleAttachment(file);
  };

  // ============================================================
  // SEND MESSAGE
  // ============================================================

  const handleSendMessage = async (
    textToSend?: string
  ) => {
    const query =
      textToSend !== undefined
        ? textToSend
        : inputText;

    const hasAttachment =
      !!pendingAttachment;

    if (
      (!query.trim() &&
        !hasAttachment) ||
      isLoading ||
      !activeConversation ||
      !userId
    ) {
      return;
    }

    const conversationId =
      activeConversation.id;

    const attachmentAtSend =
      pendingAttachment;

    const userMsg: Message = {
      id: `user-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      sender: 'user',
      text:
        query.trim() ||
        'Please analyze this attachment.',
      time: new Date().toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit'
        }
      ),
      attachmentName:
        attachmentAtSend?.name,
      attachmentKind:
        attachmentAtSend?.kind
    };

    const previousMessages =
      activeConversation.messages;

    const hasUserMessage =
      previousMessages.some(
        (message) =>
          message.sender === 'user'
      );

    const titleSource =
      query.trim() ||
      attachmentAtSend?.name ||
      'Attachment Analysis';

    const newTitle =
      hasUserMessage
        ? activeConversation.title
        : titleSource.length > 32
          ? `${titleSource.slice(
              0,
              32
            )}...`
          : titleSource;

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id ===
        conversationId
          ? {
              ...conversation,
              title: newTitle,
              messages: [
                ...conversation.messages,
                userMsg
              ],
              updatedAt:
                new Date().toISOString()
            }
          : conversation
      )
    );

    if (textToSend === undefined) {
      setInputText('');
    }

    // Remove attachment from the composer immediately
    // after putting it into the request payload.
    setPendingAttachment(null);
    setAttachmentError(null);

    if (attachmentPreviewUrl) {
      URL.revokeObjectURL(
        attachmentPreviewUrl
      );
    }

    setAttachmentPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }

    setIsLoading(true);

    try {
      const historyPayload =
        previousMessages
          .filter(
            (message) =>
              !message.id.startsWith(
                'welcome-'
              )
          )
          .map((message) => ({
            role:
              message.sender === 'user'
                ? 'user'
                : 'model',
            text: message.text
          }));

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/tutor`, 
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            prompt:
              query.trim() ||
              'Analyze the attached file/image and help me understand or debug it.',
            history:
              historyPayload,
            currentLanguage:
              selectedLang,
            userId,
            attachment:
              attachmentAtSend || null
          })
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `AI request failed: ${response.status}`
        );
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        sender: 'bot',
        text:
          data.reply ||
          "Sorry, I couldn't generate a response. Please try again.",
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        )
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id ===
          conversationId
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  botMsg
                ],
                updatedAt:
                  new Date().toISOString()
              }
            : conversation
        )
      );
    } catch (error) {
      console.error(
        'Tutor request error:',
        error
      );

      const errorMsg: Message = {
        id: `err-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        sender: 'bot',
        text:
          error instanceof Error
            ? error.message
            : 'I ran into an issue connecting to AI services. Please try again.',
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: '2-digit',
            minute: '2-digit'
          }
        )
      };

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id ===
          conversationId
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  errorMsg
                ],
                updatedAt:
                  new Date().toISOString()
              }
            : conversation
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // DELETE ALL CHAT HISTORY FOR THIS USER
  // ============================================================

  const clearAllChatHistory = () => {
    if (!userId) return;

    const confirmed =
      window.confirm(
        'Are you sure you want to delete all DevBot chat history for this account?'
      );

    if (!confirmed) return;

    const storageKey =
      getChatStorageKey(userId);

    localStorage.removeItem(
      storageKey
    );

    const newConversation =
      createConversation(
        currentLanguage
      );

    setConversations([
      newConversation
    ]);

    setActiveConversationId(
      newConversation.id
    );

    setInputText('');
    clearPendingAttachment();
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (chatLoading) {
    return (
      <div className="bg-white border-4 border-indigo-200 rounded-3xl p-8 shadow-2xl max-w-6xl mx-auto text-slate-900">
        <div className="flex items-center justify-center gap-3 py-16">
          <Sparkles className="w-5 h-5 animate-spin text-amber-500 fill-amber-400" />

          <span className="text-sm font-black text-indigo-700">
            Loading your DevBot chats...
          </span>
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="bg-white border-4 border-indigo-200 rounded-3xl p-4 sm:p-6 shadow-2xl max-w-6xl mx-auto text-slate-900">

      <div className="flex flex-col lg:flex-row gap-5">

        {/* CHAT HISTORY */}

        <aside className="lg:w-64 shrink-0 bg-indigo-50/60 border-2 border-indigo-100 rounded-2xl p-3">

          <button
            type="button"
            onClick={handleNewChat}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-black shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            New Chat
          </button>

          <div className="flex items-center justify-between mt-4 mb-2 px-1">

            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
              Chat History
            </span>

            <button
              type="button"
              onClick={clearAllChatHistory}
              disabled={isLoading}
              title="Clear all chats"
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

          </div>

          <div className="max-h-56 lg:max-h-[500px] overflow-y-auto space-y-1">

            {conversations.map(
              (conversation) => (

                <div
                  key={conversation.id}
                  className={`group flex items-center gap-2 rounded-xl transition-colors ${
                    conversation.id ===
                    activeConversationId
                      ? 'bg-white border-2 border-indigo-200 shadow-sm'
                      : 'hover:bg-white/70'
                  }`}
                >

                  <button
                    type="button"
                    onClick={() =>
                      handleSelectConversation(
                        conversation.id
                      )
                    }
                    disabled={isLoading}
                    className="flex-1 min-w-0 flex items-center gap-2 px-3 py-2.5 text-left disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0 text-indigo-500" />

                    <span className="truncate text-xs font-bold text-slate-700">
                      {conversation.title}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(event) =>
                      handleDeleteConversation(
                        conversation.id,
                        event
                      )
                    }
                    disabled={isLoading}
                    title="Delete chat"
                    className="mr-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                </div>
              )
            )}

          </div>

        </aside>

        {/* MAIN CHAT */}

        <main className="flex-1 min-w-0">

          {/* HEADER */}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-indigo-100 pb-4">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md rotate-2">
                <Bot className="w-6 h-6 stroke-[2.5]" />
              </div>

              <div>

                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>
                    DevBot - AI Study Buddy
                  </span>

                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                </h2>

                <p className="text-xs font-medium text-slate-600">
                  Ask programming questions, debug code, or attach a screenshot/file for analysis.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2">

              <span className="text-xs font-extrabold text-slate-700">
                Language:
              </span>

              <select
                value={selectedLang}
                onChange={(event) =>
                  setSelectedLang(
                    event.target.value
                  )
                }
                className="bg-indigo-50/80 border-2 border-indigo-200 text-xs font-bold text-slate-900 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-600"
              >

                <option value="All Languages">
                  All Languages
                </option>

                {languages.map(
                  (language) => (
                    <option
                      key={language.id}
                      value={language.name}
                    >
                      {language.name}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

          {/* QUICK IDEAS */}

          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">

            <span className="text-[11px] text-slate-600 font-extrabold uppercase tracking-wider shrink-0 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-amber-500 stroke-[3]" />
              Quick Ideas:
            </span>

            {presetQuestions.map(
              (question, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleSendMessage(
                      question
                    )
                  }
                  disabled={
                    isLoading ||
                    !userId
                  }
                  className="px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-100 text-[11px] font-extrabold text-indigo-950 whitespace-nowrap transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {question}
                </button>
              )
            )}

          </div>

          {/* MESSAGES */}

          <div className="bg-indigo-50/40 rounded-2xl p-4 border-2 border-indigo-100 h-96 overflow-y-auto space-y-4">

            {messages.map(
              (message) => (

                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user'
                      ? 'flex-row-reverse'
                      : ''
                  }`}
                >

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-purple-600 text-white'
                    }`}
                  >

                    {message.sender ===
                    'user' ? (
                      <User className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Bot className="w-4 h-4 stroke-[2.5]" />
                    )}

                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs font-medium leading-relaxed space-y-2 shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white border-2 border-indigo-100 text-slate-800 rounded-tl-none'
                    }`}
                  >

                    {message.attachmentName && (
                      <div
                        className={`flex items-center gap-2 rounded-xl px-3 py-2 mb-2 ${
                          message.sender ===
                          'user'
                            ? 'bg-indigo-500/60'
                            : 'bg-indigo-50'
                        }`}
                      >
                        {message.attachmentKind ===
                        'image' ? (
                          <ImageIcon className="w-4 h-4 shrink-0" />
                        ) : (
                          <FileCode2 className="w-4 h-4 shrink-0" />
                        )}

                        <span className="truncate font-black">
                          {message.attachmentName}
                        </span>
                      </div>
                    )}

                    <div className="whitespace-pre-wrap">
                      {message.text}
                    </div>

                    <p
                      className={`text-[10px] font-bold text-right ${
                        message.sender === 'user'
                          ? 'text-indigo-200'
                          : 'text-slate-400'
                      }`}
                    >
                      {message.time}
                    </p>

                  </div>

                </div>
              )
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs font-black text-purple-700 p-2">
                <Sparkles className="w-4 h-4 animate-spin text-amber-500 fill-amber-400" />

                <span>
                  DevBot is analyzing and formulating a clear explanation...
                </span>
              </div>
            )}

          </div>

          {/* ATTACHMENT PREVIEW */}

          {pendingAttachment && (
            <div className="mt-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-3">

              <div className="flex items-start gap-3">

                {attachmentPreviewUrl ? (
                  <img
                    src={attachmentPreviewUrl}
                    alt="Attachment preview"
                    className="w-20 h-20 object-cover rounded-xl border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-white border-2 border-indigo-100 flex items-center justify-center shrink-0">
                    {pendingAttachment.kind ===
                    'image' ? (
                      <ImageIcon className="w-7 h-7 text-indigo-500" />
                    ) : (
                      <FileText className="w-7 h-7 text-indigo-500" />
                    )}
                  </div>
                )}

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <p className="text-xs font-black text-slate-900 truncate">
                      {pendingAttachment.name}
                    </p>

                    <button
                      type="button"
                      onClick={
                        clearPendingAttachment
                      }
                      disabled={isLoading}
                      title="Remove attachment"
                      className="ml-auto p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </button>

                  </div>

                  <p className="text-[11px] font-semibold text-slate-600 mt-1">
                    {pendingAttachment.kind ===
                    'image'
                      ? 'Image ready for visual analysis.'
                      : 'File ready for coding/content analysis.'}
                  </p>

                  <p className="text-[10px] font-bold text-indigo-600 mt-2">
                    Ask DevBot what you want it to find, explain, or debug.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* ATTACHMENT ERROR */}

          {attachmentError && (
            <div className="mt-3 flex items-start gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-3 py-2.5 text-xs font-bold text-red-700">
              <X className="w-4 h-4 shrink-0 mt-0.5" />

              <span>
                {attachmentError}
              </span>

            </div>
          )}

          {/* INPUT */}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSendMessage();
            }}
            className="mt-4"
          >

            {/* Hidden inputs */}

            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf,.txt,.js,.jsx,.ts,.tsx,.py,.java,.c,.h,.cpp,.cc,.cxx,.hpp,.cs,.rs,.go,.php,.rb,.swift,.kt,.kts,.dart,.sql,.html,.htm,.css,.scss,.sass,.json,.xml,.yaml,.yml,.md,.sh,.bat,.ps1,.vue,.svelte"
              onChange={
                handleFileInputChange
              }
            />

            <input
              ref={cameraInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={
                handleFileInputChange
              }
            />

            {/* Attachment actions */}

            <div className="flex flex-wrap items-center gap-2 mb-2">

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={
                  isLoading ||
                  isReadingAttachment ||
                  !userId
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-100 text-[11px] font-black text-indigo-900 disabled:opacity-50 transition-all active:scale-95"
              >
                <Paperclip className="w-4 h-4" />
                Add File
              </button>

              <button
                type="button"
                onClick={() =>
                  cameraInputRef.current?.click()
                }
                disabled={
                  isLoading ||
                  isReadingAttachment ||
                  !userId
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-100 text-[11px] font-black text-amber-900 disabled:opacity-50 transition-all active:scale-95"
              >
                <Camera className="w-4 h-4" />
                Camera
              </button>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={
                  isLoading ||
                  isReadingAttachment ||
                  !userId
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border-2 border-purple-100 text-[11px] font-black text-purple-900 disabled:opacity-50 transition-all active:scale-95"
              >
                <ImageIcon className="w-4 h-4" />
                Media
              </button>

              {isReadingAttachment && (
                <span className="inline-flex items-center gap-2 text-[11px] font-black text-indigo-700">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Preparing attachment...
                </span>
              )}

            </div>

            <div className="flex w-full min-w-0 items-center gap-2">

              <input
                type="text"
                value={inputText}
                onChange={(event) =>
                  setInputText(
                    event.target.value
                  )
                }
                placeholder={
                  pendingAttachment
                    ? 'Ask DevBot what to analyze or debug...'
                    : 'Ask a question or paste code snippet to debug...'
                }
                className="min-w-0 flex-1 bg-white border-2 border-indigo-100 text-xs font-bold text-slate-900 rounded-2xl px-3 sm:px-4 py-3.5 focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
                disabled={
                  isLoading ||
                  isReadingAttachment ||
                  !userId
                }
              />

              <button
                type="submit"
                disabled={
                  (!inputText.trim() &&
                    !pendingAttachment) ||
                  isLoading ||
                  isReadingAttachment ||
                  !userId
                }
                className="shrink-0 px-3 sm:px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center gap-2 whitespace-nowrap shadow-md transition-all active:scale-95"
              >
                <span>
                  {isLoading
                    ? 'Analyzing...'
                    : 'Send'}
                </span>

                <Send className="w-3.5 h-3.5 stroke-[3]" />
              </button>

            </div>

          </form>

        </main>

      </div>

    </div>
  );
};

export default AITutorModal;