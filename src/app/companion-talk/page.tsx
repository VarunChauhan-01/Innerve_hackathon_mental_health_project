'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';

interface Persona {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  systemPrompt: string;
  accentColor: string;
  accentDark: string;
  bgLight: string;
  bgDark: string;
  borderDark: string;
  traits: string[];
}

const personas: Persona[] = [
  {
    id: 'parent',
    name: 'Parent Figure',
    emoji: '🤗',
    tagline: 'Warm, wise, unconditional love',
    description: 'A nurturing presence that offers wisdom, patience, and the kind of love that never judges. Perfect when you need to feel truly safe and valued.',
    systemPrompt: 'You are a warm, loving parent figure. You speak with wisdom, unconditional love, and gentle guidance. You help people feel safe, valued, and understood. You gently encourage them to see their worth and help them through difficult emotions with patience and care. Never be dismissive. Always validate feelings first before offering any advice. Use gentle, warm language. Ask caring follow-up questions. Remind them they are loved and worthy.',
    accentColor: 'bg-amber-100 text-amber-700',
    accentDark: 'bg-amber-900/30 text-amber-400',
    bgLight: 'from-amber-50 to-orange-50',
    bgDark: 'from-amber-900/10 to-orange-900/10',
    borderDark: 'border-amber-500/30',
    traits: ['Unconditional love', 'Patient listener', 'Gentle guidance'],
  },
  {
    id: 'sibling',
    name: 'Sibling',
    emoji: '🙌',
    tagline: 'Casual, real, always in your corner',
    description: 'Your ride-or-die who keeps it real. Uses casual language, shares relatable experiences, and knows how to lighten the mood while still taking your feelings seriously.',
    systemPrompt: 'You are a caring older sibling who is fun, relatable, and always in their corner. You use casual language, share relatable experiences, and make them feel less alone. You are honest but kind, and you know how to lighten the mood while still taking their feelings seriously. Use informal language, maybe some humor when appropriate, but always be genuinely caring. Say things like "I get it" and "been there". Be their cheerleader.',
    accentColor: 'bg-teal-100 text-teal-700',
    accentDark: 'bg-teal-900/30 text-teal-400',
    bgLight: 'from-teal-50 to-cyan-50',
    bgDark: 'from-teal-900/10 to-cyan-900/10',
    borderDark: 'border-teal-500/30',
    traits: ['Relatable', 'Honest & fun', 'Your cheerleader'],
  },
  {
    id: 'friend',
    name: 'Best Friend',
    emoji: '💙',
    tagline: 'Empathetic, safe, non-judgmental',
    description: 'Your safe space. Listens without judgment, validates every feeling, and never offers unsolicited advice. Just pure, present, compassionate friendship.',
    systemPrompt: 'You are a best friend who is deeply empathetic and non-judgmental. You listen actively, validate every feeling, and offer support without unsolicited advice. You check in, ask thoughtful questions, and remind them they are not alone. You are their safe space. Never judge. Always say "I hear you" and "that makes complete sense". Ask what kind of support they need. Be present and compassionate.',
    accentColor: 'bg-rose-100 text-rose-700',
    accentDark: 'bg-rose-900/30 text-rose-400',
    bgLight: 'from-rose-50 to-pink-50',
    bgDark: 'from-rose-900/10 to-pink-900/10',
    borderDark: 'border-rose-500/30',
    traits: ['Zero judgment', 'Active listener', 'Safe space'],
  },
  {
    id: 'guide',
    name: 'Balanced Guide',
    emoji: '🧘',
    tagline: 'Calm, mindful, centered',
    description: 'A serene presence that helps you find equilibrium. Draws from mindfulness and positive psychology to help you navigate emotions with clarity and peace.',
    systemPrompt: 'You are a balanced wellness guide with a calm, mindful presence. You help people find equilibrium through gentle reflection, breathing awareness, and positive reframing. You draw from mindfulness and positive psychology to help them navigate their emotions with clarity and peace. Suggest breathing exercises, grounding techniques, and mindful perspectives. Speak calmly and thoughtfully. Help them find their center.',
    accentColor: 'bg-violet-100 text-violet-700',
    accentDark: 'bg-violet-900/30 text-violet-400',
    bgLight: 'from-violet-50 to-purple-50',
    bgDark: 'from-violet-900/10 to-purple-900/10',
    borderDark: 'border-violet-500/30',
    traits: ['Mindful', 'Grounding', 'Peaceful clarity'],
  },
];

export default function CompanionTalkPage() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  if (selectedPersona) {
    return (
      <div className="min-h-screen bg-mindbloom-bg dark:bg-mindbloom-dark-bg transition-colors duration-300 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col pt-16">
          {/* Back button */}
          <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-mindbloom-border dark:border-mindbloom-neon/20 bg-white dark:bg-mindbloom-dark-surface">
            <button
              onClick={() => setSelectedPersona(null)}
              className="flex items-center gap-2 font-dm text-sm text-mindbloom-muted dark:text-mindbloom-dark-muted hover:text-mindbloom-primary dark:hover:text-mindbloom-neon transition-colors"
            >
              ← Back to Companions
            </button>
          </div>
          <div className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
            <div className="flex-1 bg-white dark:bg-mindbloom-dark-surface rounded-2xl overflow-hidden shadow-soft-purple dark:shadow-neon-purple dark:border dark:border-mindbloom-neon/20 flex flex-col">
              <ChatInterface
                systemPrompt={selectedPersona.systemPrompt}
                personaName={selectedPersona.name}
                personaEmoji={selectedPersona.emoji}
                accentColor={selectedPersona.accentColor}
                accentDark={selectedPersona.accentDark}
                placeholder={`Talk to ${selectedPersona.name}...`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mindbloom-bg dark:bg-mindbloom-dark-bg transition-colors duration-300">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mindbloom-surface2 dark:bg-mindbloom-neon/10 dark:border dark:border-mindbloom-neon/30 mb-4">
            <span>💬</span>
            <span className="font-dm text-sm text-mindbloom-primary dark:text-mindbloom-neon">Companion Talk</span>
          </div>
          <h1 className="font-jakarta font-bold text-3xl lg:text-4xl text-mindbloom-text dark:text-mindbloom-dark-text mb-4">
            Choose Your{' '}
            <span className="text-mindbloom-primary dark:text-mindbloom-neon dark:drop-shadow-[0_0_10px_#B026FF]">Companion</span>
          </h1>
          <p className="font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted max-w-xl mx-auto">
            Each companion is uniquely trained to support you. Choose the one that feels right for what you need today.
          </p>
        </div>

        {/* Persona Cards - Asymmetric layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((persona, i) => (
            <div
              key={persona.id}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${persona.bgLight} dark:bg-gradient-to-br dark:${persona.bgDark} bg-white dark:bg-mindbloom-dark-surface dark:border dark:${persona.borderDark} p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-soft-purple dark:shadow-neon-purple ${i === 0 ? 'md:col-span-2' : ''}`}
              style={{ background: undefined }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${persona.bgLight} dark:hidden opacity-60`} />
              <div className={`absolute inset-0 bg-mindbloom-dark-surface dark:block hidden`} />
              <div className="relative flex items-start gap-5">
                <div className={`w-16 h-16 rounded-2xl ${persona.accentColor} dark:${persona.accentDark} flex items-center justify-center text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                  {persona.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-jakarta font-bold text-lg text-mindbloom-text dark:text-mindbloom-dark-text">
                        {persona.name}
                      </h3>
                      <p className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted italic">
                        {persona.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="font-dm text-sm text-mindbloom-muted dark:text-mindbloom-dark-muted leading-relaxed mb-4">
                    {persona.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {persona.traits.map((trait) => (
                      <span
                        key={trait}
                        className={`px-3 py-1 rounded-full text-xs font-dm font-medium ${persona.accentColor} dark:${persona.accentDark}`}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedPersona(persona)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-mindbloom-primary dark:bg-mindbloom-neon text-white dark:text-black font-jakarta font-semibold text-sm hover:scale-105 transition-all duration-200 dark:shadow-neon-purple"
                  >
                    Start Talking →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-2xl bg-mindbloom-surface2 dark:bg-mindbloom-dark-surface2 dark:border dark:border-mindbloom-neon/10 text-center">
          <p className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted">
            🔒 Your conversations are private. These AI companions provide emotional support, not professional therapy.
            If you&apos;re in crisis, please contact a mental health professional.
          </p>
        </div>
      </div>
    </div>
  );
}
