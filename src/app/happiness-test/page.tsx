'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

interface Question {
  id: number;
  text: string;
  emoji: string;
  options: { label: string; emoji: string; value: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: 'How would you describe your energy levels today?',
    emoji: '⚡',
    options: [
      { label: 'Completely drained', emoji: '😴', value: 0 },
      { label: 'Low energy', emoji: '😔', value: 2 },
      { label: 'Moderate energy', emoji: '😐', value: 5 },
      { label: 'Good energy', emoji: '😊', value: 8 },
      { label: 'Vibrant and alive!', emoji: '🌟', value: 10 },
    ],
  },
  {
    id: 2,
    text: 'How connected do you feel to the people around you?',
    emoji: '🤝',
    options: [
      { label: 'Completely isolated', emoji: '😶', value: 0 },
      { label: 'Somewhat disconnected', emoji: '😕', value: 2 },
      { label: 'Neutral', emoji: '😐', value: 5 },
      { label: 'Fairly connected', emoji: '🙂', value: 8 },
      { label: 'Deeply connected', emoji: '🥰', value: 10 },
    ],
  },
  {
    id: 3,
    text: 'How has your sleep been lately?',
    emoji: '🌙',
    options: [
      { label: 'Very poor, barely sleeping', emoji: '😩', value: 0 },
      { label: 'Restless and unrefreshing', emoji: '😪', value: 2 },
      { label: 'Inconsistent', emoji: '😐', value: 5 },
      { label: 'Mostly good', emoji: '😴', value: 8 },
      { label: 'Restful and refreshing', emoji: '✨', value: 10 },
    ],
  },
  {
    id: 4,
    text: 'How much joy do you find in your daily activities?',
    emoji: '🎨',
    options: [
      { label: 'Nothing brings me joy', emoji: '😞', value: 0 },
      { label: 'Very little joy', emoji: '😔', value: 2 },
      { label: 'Some moments of joy', emoji: '🙂', value: 5 },
      { label: 'Frequently joyful', emoji: '😄', value: 8 },
      { label: 'Overflowing with joy', emoji: '🎉', value: 10 },
    ],
  },
  {
    id: 5,
    text: 'How do you feel about your future?',
    emoji: '🌅',
    options: [
      { label: 'Hopeless and dark', emoji: '🌑', value: 0 },
      { label: 'Uncertain and worried', emoji: '😟', value: 2 },
      { label: 'Cautiously hopeful', emoji: '🌤️', value: 5 },
      { label: 'Optimistic', emoji: '☀️', value: 8 },
      { label: 'Excited and hopeful', emoji: '🌈', value: 10 },
    ],
  },
  {
    id: 6,
    text: 'How well are you taking care of yourself?',
    emoji: '💆',
    options: [
      { label: 'Neglecting myself completely', emoji: '😢', value: 0 },
      { label: 'Struggling with self-care', emoji: '😕', value: 2 },
      { label: 'Basic self-care only', emoji: '😐', value: 5 },
      { label: 'Taking good care', emoji: '🛁', value: 8 },
      { label: 'Thriving with self-care', emoji: '🌺', value: 10 },
    ],
  },
  {
    id: 7,
    text: 'How creative or engaged do you feel in your interests?',
    emoji: '🎭',
    options: [
      { label: 'No interest in anything', emoji: '😶', value: 0 },
      { label: 'Barely engaged', emoji: '😔', value: 2 },
      { label: 'Occasionally engaged', emoji: '🙂', value: 5 },
      { label: 'Regularly creative', emoji: '🎨', value: 8 },
      { label: 'Deeply inspired', emoji: '✨', value: 10 },
    ],
  },
  {
    id: 8,
    text: 'How often do you feel grateful for things in your life?',
    emoji: '🙏',
    options: [
      { label: 'Never, nothing feels good', emoji: '😞', value: 0 },
      { label: 'Rarely', emoji: '😕', value: 2 },
      { label: 'Sometimes', emoji: '🙂', value: 5 },
      { label: 'Often', emoji: '😊', value: 8 },
      { label: 'Every single day', emoji: '💛', value: 10 },
    ],
  },
  {
    id: 9,
    text: 'How well do you bounce back from challenges?',
    emoji: '💪',
    options: [
      { label: 'I feel completely broken', emoji: '💔', value: 0 },
      { label: 'Struggles overwhelm me', emoji: '😩', value: 2 },
      { label: 'I manage eventually', emoji: '😐', value: 5 },
      { label: 'I recover fairly well', emoji: '💪', value: 8 },
      { label: 'Challenges make me stronger', emoji: '🦁', value: 10 },
    ],
  },
  {
    id: 10,
    text: 'How much sense of purpose do you feel in your life?',
    emoji: '🧭',
    options: [
      { label: 'No purpose at all', emoji: '🌫️', value: 0 },
      { label: 'Very little direction', emoji: '😔', value: 2 },
      { label: 'Some sense of direction', emoji: '🙂', value: 5 },
      { label: 'Clear purpose', emoji: '🎯', value: 8 },
      { label: 'Deeply purposeful', emoji: '🌟', value: 10 },
    ],
  },
];

interface ScoreCategory {
  label: string;
  range: string;
  emoji: string;
  color: string;
  darkColor: string;
  message: string;
  recommendations: string[];
}

const categories: ScoreCategory[] = [
  {
    label: 'Blooming',
    range: '80-100',
    emoji: '🌺',
    color: 'text-emerald-600',
    darkColor: 'text-mindbloom-neon-green',
    message: "You're flourishing! Your happiness levels are high and you're thriving in most areas of life. Keep nurturing these positive habits.",
    recommendations: ['Maintain your wellness routines', 'Share your positivity with others', 'Set new growth goals', 'Practice gratitude journaling'],
  },
  {
    label: 'Growing',
    range: '60-79',
    emoji: '🌿',
    color: 'text-teal-600',
    darkColor: 'text-teal-400',
    message: "You're on a positive path! There are strong foundations in your life, with some areas that could use a little more attention.",
    recommendations: ['Identify one area to focus on', 'Build consistent daily routines', 'Connect more with loved ones', 'Try a new wellness activity'],
  },
  {
    label: 'Nurturing',
    range: '40-59',
    emoji: '🌱',
    color: 'text-yellow-600',
    darkColor: 'text-yellow-400',
    message: "You're in a nurturing phase — tending to yourself takes courage. Small, consistent steps will help you grow stronger.",
    recommendations: ['Talk to a trusted companion', 'Focus on sleep and basic self-care', 'Try gentle movement or walks', 'Consider speaking with a counselor'],
  },
  {
    label: 'Seedling',
    range: '20-39',
    emoji: '🌰',
    color: 'text-orange-600',
    darkColor: 'text-mindbloom-neon-orange',
    message: "Like a seedling, you have everything you need to grow — you just need the right conditions and support right now.",
    recommendations: ['Reach out to someone you trust', 'Talk to our AI companions', 'Consult Dr. Bloom for guidance', 'Consider professional mental health support'],
  },
  {
    label: 'Dormant',
    range: '0-19',
    emoji: '🫂',
    color: 'text-red-600',
    darkColor: 'text-red-400',
    message: "You're going through a very difficult time. Please know you are not alone, and reaching out is the bravest thing you can do.",
    recommendations: ['Please talk to someone today', 'Contact a mental health helpline', 'Use our companion chat for immediate support', 'Seek professional help — you deserve it'],
  },
];

function getCategory(score: number): ScoreCategory {
  if (score >= 80) return categories[0];
  if (score >= 60) return categories[1];
  if (score >= 40) return categories[2];
  if (score >= 20) return categories[3];
  return categories[4];
}

export default function HappinessTestPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (value: number) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];

    if (currentQ < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelected(null);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      const finalScore = Math.round((total / (questions.length * 10)) * 100);
      setScore(finalScore);
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setShowResults(false);
    setScore(0);
  };

  const progress = ((currentQ + (selected !== null ? 1 : 0)) / questions.length) * 100;
  const category = getCategory(score);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  if (showResults) {
    return (
      <div className="min-h-screen bg-mindbloom-bg dark:bg-mindbloom-dark-bg transition-colors duration-300">
        <Header />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="font-jakarta font-bold text-3xl text-mindbloom-text dark:text-mindbloom-dark-text mb-2">
              Your Happiness Score
            </h1>
            <p className="font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted">
              Based on your responses across 10 wellness dimensions
            </p>
          </div>

          {/* Score Gauge */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#E5E7EB" strokeWidth="12" className="dark:stroke-mindbloom-dark-surface2" />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke={score >= 60 ? '#7C3AED' : score >= 40 ? '#F59E0B' : '#EF4444'}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-all duration-1500 ease-out dark:stroke-mindbloom-neon"
                  style={{
                    filter: 'drop-shadow(0 0 8px currentColor)',
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-jakarta font-extrabold text-4xl text-mindbloom-primary dark:text-mindbloom-neon dark:drop-shadow-[0_0_10px_#B026FF]">
                  {score}
                </span>
                <span className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted">out of 100</span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-mindbloom-dark-surface dark:border dark:border-mindbloom-neon/30 shadow-soft-purple dark:shadow-neon-purple">
              <span className="text-3xl">{category.emoji}</span>
              <div className="text-left">
                <p className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted">Your level</p>
                <p className={`font-jakarta font-bold text-xl ${category.color} dark:${category.darkColor}`}>
                  {category.label}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="bg-white dark:bg-mindbloom-dark-surface dark:border dark:border-mindbloom-neon/20 rounded-2xl p-6 mb-6 shadow-soft-purple dark:shadow-neon-purple animate-fade-in-up">
            <p className="font-dm text-mindbloom-text dark:text-mindbloom-dark-text leading-relaxed text-center">
              {category.message}
            </p>
          </div>

          {/* Recommendations */}
          <div className="bg-mindbloom-surface2 dark:bg-mindbloom-dark-surface2 dark:border dark:border-mindbloom-neon/20 rounded-2xl p-6 mb-8 animate-fade-in-up">
            <h3 className="font-jakarta font-semibold text-mindbloom-text dark:text-mindbloom-dark-text mb-4">
              💡 Recommended Next Steps
            </h3>
            <ul className="space-y-2">
              {category.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 font-dm text-sm text-mindbloom-muted dark:text-mindbloom-dark-muted">
                  <span className="text-mindbloom-primary dark:text-mindbloom-neon mt-0.5">→</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Link
              href="/companion-talk"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-mindbloom-primary dark:bg-mindbloom-neon text-white dark:text-black font-jakarta font-semibold text-sm hover:scale-105 transition-all duration-200 dark:shadow-neon-purple"
            >
              💬 Talk to a Companion
            </Link>
            <Link
              href="/medical-advisor"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-mindbloom-primary dark:border-mindbloom-neon text-mindbloom-primary dark:text-mindbloom-neon font-jakarta font-semibold text-sm hover:bg-mindbloom-surface2 dark:hover:bg-mindbloom-neon/10 hover:scale-105 transition-all duration-200"
            >
              🩺 Ask Dr. Bloom
            </Link>
          </div>

          <button
            onClick={handleRestart}
            className="w-full mt-4 py-3 font-dm text-sm text-mindbloom-muted dark:text-mindbloom-dark-muted hover:text-mindbloom-primary dark:hover:text-mindbloom-neon transition-colors"
          >
            ↺ Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="min-h-screen bg-mindbloom-bg dark:bg-mindbloom-dark-bg transition-colors duration-300">
      <Header />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mindbloom-surface2 dark:bg-mindbloom-neon/10 dark:border dark:border-mindbloom-neon/30 mb-4">
            <span>🌟</span>
            <span className="font-dm text-sm text-mindbloom-primary dark:text-mindbloom-neon">Happiness Level Assessment</span>
          </div>
          <h1 className="font-jakarta font-bold text-2xl text-mindbloom-text dark:text-mindbloom-dark-text">
            Question {currentQ + 1} of {questions.length}
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-mindbloom-border dark:bg-mindbloom-dark-surface2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-mindbloom-primary to-mindbloom-accent dark:from-mindbloom-neon dark:to-mindbloom-neon-green transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-mindbloom-dark-surface dark:border dark:border-mindbloom-neon/20 rounded-3xl p-8 shadow-soft-purple dark:shadow-neon-purple mb-6 animate-fade-in-up">
          <div className="text-4xl mb-4 text-center">{question.emoji}</div>
          <h2 className="font-jakarta font-semibold text-xl text-mindbloom-text dark:text-mindbloom-dark-text text-center mb-8">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selected === option.value
                    ? 'border-mindbloom-primary bg-mindbloom-surface2 dark:border-mindbloom-neon dark:bg-mindbloom-neon/10 dark:shadow-neon-purple scale-[1.02]'
                    : 'border-mindbloom-border dark:border-mindbloom-dark-surface2 hover:border-mindbloom-primary/50 dark:hover:border-mindbloom-neon/50 hover:bg-mindbloom-surface2 dark:hover:bg-mindbloom-dark-surface2'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="font-dm text-sm text-mindbloom-text dark:text-mindbloom-dark-text">{option.label}</span>
                {selected === option.value && (
                  <span className="ml-auto text-mindbloom-primary dark:text-mindbloom-neon">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className="w-full py-4 rounded-xl bg-mindbloom-primary dark:bg-mindbloom-neon text-white dark:text-black font-jakarta font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition-all duration-200 dark:shadow-neon-purple"
        >
          {currentQ < questions.length - 1 ? 'Next Question →' : 'See My Results 🌟'}
        </button>
      </div>
    </div>
  );
}
