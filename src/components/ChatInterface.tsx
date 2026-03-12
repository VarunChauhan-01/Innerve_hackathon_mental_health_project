'use client';

import { useChat } from '@/lib/hooks/useChat';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  systemPrompt: string;
  personaName: string;
  personaEmoji: string;
  accentColor: string;
  accentDark: string;
  placeholder?: string;
  renderMarkdown?: boolean;
}

export default function ChatInterface({
  systemPrompt,
  personaName,
  personaEmoji,
  accentColor,
  accentDark,
  placeholder = 'Type your message...',
  renderMarkdown = false,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { response, isLoading, error, sendMessage } = useChat('GEMINI', 'gemini/gemini-2.5-flash', true);

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (isLoading) {
      setStreamingContent(response || '');
    } else if (response && !isLoading) {
      if (streamingContent || response) {
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant' && last.content === '') {
            return [...prev.slice(0, -1), { role: 'assistant', content: response, timestamp: new Date() }];
          }
          return prev;
        });
        setStreamingContent('');
      }
    }
  }, [response, isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: 'user', content: input.trim(), timestamp: new Date() };
    const pendingAssistant: Message = { role: 'assistant', content: '', timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg, pendingAssistant]);

    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user' as const, content: input.trim() },
    ];

    sendMessage(apiMessages, { temperature: 0.8, max_tokens: 1024 });
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
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b border-mindbloom-border dark:border-mindbloom-neon/20 bg-white dark:bg-mindbloom-dark-surface`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${accentColor} dark:${accentDark}`}>
            {personaEmoji}
          </div>
          <div>
            <p className="font-jakarta font-semibold text-mindbloom-text dark:text-mindbloom-dark-text text-sm">{personaName}</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted font-dm">Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-xs font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted hover:text-mindbloom-primary dark:hover:text-mindbloom-neon transition-colors px-3 py-1.5 rounded-lg hover:bg-mindbloom-surface2 dark:hover:bg-mindbloom-dark-surface2"
        >
          Clear chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-mindbloom-bg dark:bg-mindbloom-dark-bg">
        {displayMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="text-5xl mb-4">{personaEmoji}</div>
            <p className="font-jakarta font-semibold text-mindbloom-text dark:text-mindbloom-dark-text text-lg mb-2">
              Hi, I&apos;m {personaName}
            </p>
            <p className="font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted text-sm max-w-xs">
              I&apos;m here to listen and support you. Feel free to share anything on your mind.
            </p>
          </div>
        )}

        {displayMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {msg.role === 'assistant' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0 ${accentColor} dark:${accentDark}`}>
                {personaEmoji}
              </div>
            )}
            <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div
                className={`px-4 py-3 rounded-2xl font-dm text-sm leading-relaxed ${
                  msg.role === 'user' ?'bg-mindbloom-primary text-white dark:bg-mindbloom-neon dark:text-black rounded-br-sm' :'bg-white dark:bg-mindbloom-dark-surface2 text-mindbloom-text dark:text-mindbloom-dark-text border border-mindbloom-border dark:border-mindbloom-neon/20 rounded-bl-sm'
                }`}
              >
                {msg.content === '' && isLoading ? (
                  <div className="flex gap-1 items-center py-1">
                    <div className="w-2 h-2 rounded-full bg-mindbloom-muted dark:bg-mindbloom-dark-muted animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-mindbloom-muted dark:bg-mindbloom-dark-muted animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-mindbloom-muted dark:bg-mindbloom-dark-muted animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  <span className="whitespace-pre-wrap">{msg.content}</span>
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

      {/* Input */}
      <div className="p-4 border-t border-mindbloom-border dark:border-mindbloom-neon/20 bg-white dark:bg-mindbloom-dark-surface">
        <div className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={isLoading}
            className="flex-1 resize-none rounded-xl border border-mindbloom-border dark:border-mindbloom-neon/30 bg-mindbloom-bg dark:bg-mindbloom-dark-surface2 text-mindbloom-text dark:text-mindbloom-dark-text placeholder-mindbloom-muted dark:placeholder-mindbloom-dark-muted font-dm text-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-mindbloom-primary dark:focus:ring-mindbloom-neon transition-all max-h-32 overflow-y-auto"
            style={{ minHeight: '48px' }}
          />
          <button
            onClick={handleSend}
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
  );
}
