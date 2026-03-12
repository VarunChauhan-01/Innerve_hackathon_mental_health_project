'use client';

import { useChat } from '@/lib/hooks/useChat';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are Dr. Bloom, a compassionate mental health medical advisor. You provide evidence-based information about mental health conditions, symptoms, coping strategies, and treatment options. You explain things in clear, accessible language while maintaining medical accuracy. You help users understand what they might be experiencing, suggest healthy coping mechanisms, and when appropriate, encourage professional help. You never diagnose but provide thorough educational information. Always be empathetic and non-alarmist. Format your responses with clear sections using markdown when helpful. Use bullet points for lists of symptoms or strategies.`;

const quickQuestions = [
  { label: 'What is depression?', emoji: '🧠' },
  { label: 'How to manage anxiety?', emoji: '🌬️' },
  { label: 'Signs of burnout', emoji: '🔥' },
  { label: 'Breathing techniques', emoji: '🫁' },
  { label: 'When to seek help?', emoji: '🩺' },
];

export default function MedicalAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { response, isLoading, error, sendMessage } = useChat('GEMINI', 'gemini/gemini-2.5-flash', true);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (isLoading) {
      setStreamingContent(response || '');
    } else if (response && !isLoading) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && last.content === '') {
          return [...prev.slice(0, -1), { role: 'assistant', content: response, timestamp: new Date() }];
        }
        return prev;
      });
      setStreamingContent('');
    }
  }, [response, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMsg: Message = { role: 'user', content: msg, timestamp: new Date() };
    const pendingAssistant: Message = { role: 'assistant', content: '', timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg, pendingAssistant]);

    const apiMessages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user' as const, content: msg },
    ];

    sendMessage(apiMessages, { temperature: 0.7, max_tokens: 1500 });
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setStreamingContent('');
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const displayMessages = messages.map((m, i) => {
    if (i === messages.length - 1 && m.role === 'assistant' && m.content === '' && isLoading) {
      return { ...m, content: streamingContent };
    }
    return m;
  });

  return (
    <div className="min-h-screen bg-mindbloom-bg dark:bg-mindbloom-dark-bg transition-colors duration-300 flex flex-col">
      <Header />
      <Toaster position="top-right" />

      <div className="flex-1 flex flex-col pt-16">
        {/* Dr. Bloom Header */}
        <div className="border-b border-mindbloom-border dark:border-mindbloom-neon/20 bg-white dark:bg-mindbloom-dark-surface px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mindbloom-primary to-mindbloom-accent dark:from-mindbloom-neon/20 dark:to-mindbloom-neon-green/20 dark:border dark:border-mindbloom-neon/40 flex items-center justify-center text-2xl dark:shadow-neon-purple">
                🩺
              </div>
              <div>
                <h1 className="font-jakarta font-bold text-lg text-mindbloom-text dark:text-mindbloom-dark-text">
                  Dr. Bloom
                </h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted">
                    Mental Health Advisor · Available 24/7
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted hover:text-mindbloom-primary dark:hover:text-mindbloom-neon transition-colors px-3 py-1.5 rounded-lg hover:bg-mindbloom-surface2 dark:hover:bg-mindbloom-dark-surface2"
            >
              Clear chat
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-500/20 px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            <span className="text-amber-500 text-sm">⚠️</span>
            <p className="font-dm text-xs text-amber-700 dark:text-amber-400">
              This AI provides general mental health information only. For emergencies or crisis situations, please contact a healthcare professional or crisis helpline immediately.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {displayMessages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🩺</div>
                <h2 className="font-jakarta font-bold text-xl text-mindbloom-text dark:text-mindbloom-dark-text mb-2">
                  Hello, I&apos;m Dr. Bloom
                </h2>
                <p className="font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted text-sm max-w-md mx-auto mb-8">
                  I&apos;m here to provide compassionate, evidence-based mental health information. Ask me anything about mental wellness, symptoms, or coping strategies.
                </p>

                {/* Quick Questions */}
                <div className="flex flex-wrap justify-center gap-3">
                  {quickQuestions.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => handleSend(q.label)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-mindbloom-border dark:border-mindbloom-neon/30 bg-white dark:bg-mindbloom-dark-surface text-mindbloom-text dark:text-mindbloom-dark-text font-dm text-sm hover:border-mindbloom-primary dark:hover:border-mindbloom-neon hover:bg-mindbloom-surface2 dark:hover:bg-mindbloom-neon/10 transition-all duration-200"
                    >
                      <span>{q.emoji}</span>
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {displayMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
                {msg.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mindbloom-primary to-mindbloom-accent dark:from-mindbloom-neon/20 dark:to-mindbloom-neon-green/20 dark:border dark:border-mindbloom-neon/40 flex items-center justify-center text-lg flex-shrink-0 dark:shadow-neon-purple">
                    🩺
                  </div>
                )}
                <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-5 py-4 rounded-2xl font-dm text-sm leading-relaxed ${
                      msg.role === 'user' ?'bg-mindbloom-primary text-white dark:bg-mindbloom-neon dark:text-black rounded-br-sm' :'bg-white dark:bg-mindbloom-dark-surface2 text-mindbloom-text dark:text-mindbloom-dark-text border border-mindbloom-border dark:border-mindbloom-neon/20 rounded-bl-sm'
                    }`}
                  >
                    {msg.content === '' && isLoading ? (
                      <div className="flex gap-1 items-center py-1">
                        <div className="w-2 h-2 rounded-full bg-mindbloom-muted animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-mindbloom-muted animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-mindbloom-muted animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    ) : msg.role === 'assistant' ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </div>
                  <span className="text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted font-dm px-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Questions (when chat has messages) */}
        {displayMessages.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 py-2 border-t border-mindbloom-border dark:border-mindbloom-neon/10">
            <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto pb-1">
              {quickQuestions.map((q) => (
                <button
                  key={q.label}
                  onClick={() => handleSend(q.label)}
                  disabled={isLoading}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-mindbloom-border dark:border-mindbloom-neon/20 bg-white dark:bg-mindbloom-dark-surface text-mindbloom-muted dark:text-mindbloom-dark-muted font-dm text-xs hover:border-mindbloom-primary dark:hover:border-mindbloom-neon hover:text-mindbloom-primary dark:hover:text-mindbloom-neon transition-all duration-200 disabled:opacity-50"
                >
                  <span>{q.emoji}</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-mindbloom-border dark:border-mindbloom-neon/20 bg-white dark:bg-mindbloom-dark-surface px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-4xl mx-auto flex gap-3 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Dr. Bloom about mental health, symptoms, or coping strategies..."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none rounded-xl border border-mindbloom-border dark:border-mindbloom-neon/30 bg-mindbloom-bg dark:bg-mindbloom-dark-surface2 text-mindbloom-text dark:text-mindbloom-dark-text placeholder-mindbloom-muted dark:placeholder-mindbloom-dark-muted font-dm text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mindbloom-primary dark:focus:ring-mindbloom-neon transition-all max-h-32 overflow-y-auto"
              style={{ minHeight: '48px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 rounded-xl bg-mindbloom-primary dark:bg-mindbloom-neon flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 dark:shadow-neon-purple"
            >
              <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
