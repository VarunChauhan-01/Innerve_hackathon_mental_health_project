'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { useTheme } from '@/context/ThemeContext';

export default function HomePage() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-mindbloom-bg dark:bg-mindbloom-dark-bg transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Light mode: animated gradient background */}
        <div className="absolute inset-0 dark:hidden">
          <div
            className="absolute inset-0 animate-gradient-shift"
            style={{
              background: 'linear-gradient(135deg, #F8F5FF 0%, #EDE9FE 25%, #DBEAFE 50%, #F0EBFF 75%, #F8F5FF 100%)',
              backgroundSize: '400% 400%',
            }}
          />
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mindbloom-primary/10 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-mindbloom-accent/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-mindbloom-accent2/20 blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Dark mode: cyberpunk neon grid */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-mindbloom-dark-bg" />
          {/* Neon grid lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(#B026FF 1px, transparent 1px),
                linear-gradient(90deg, #B026FF 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Neon glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mindbloom-neon/5 blur-3xl animate-pulse-neon" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-mindbloom-neon-green/5 blur-3xl animate-glow-pulse" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-mindbloom-neon-orange/5 blur-2xl animate-float" />
          {/* Scanline */}
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-mindbloom-neon/30 to-transparent animate-scanline pointer-events-none"
            style={{ top: 0 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mindbloom-surface2 dark:bg-mindbloom-neon/10 dark:border dark:border-mindbloom-neon/30 mb-6">
                <span className="text-lg">🌸</span>
                <span className="font-dm text-sm font-medium text-mindbloom-primary dark:text-mindbloom-neon">Mental Wellness Platform</span>
              </div>

              <h1 className="font-jakarta font-extrabold text-5xl lg:text-6xl text-mindbloom-text dark:text-mindbloom-dark-text leading-tight mb-6">
                Your Mind{' '}
                <span className="text-mindbloom-primary dark:text-mindbloom-neon dark:drop-shadow-[0_0_15px_#B026FF]">
                  Deserves
                </span>{' '}
                to{' '}
                <span className="relative">
                  Bloom
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 Q50 2 100 8 Q150 14 198 8" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" className="dark:stroke-mindbloom-neon-green" />
                  </svg>
                </span>
              </h1>

              <p className="font-dm text-lg text-mindbloom-muted dark:text-mindbloom-dark-muted leading-relaxed mb-8 max-w-lg">
                A safe space to understand your mental wellness, talk to supportive AI companions, and get evidence-based medical guidance — all in one place.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/happiness-test"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-mindbloom-primary dark:bg-mindbloom-neon text-white dark:text-black font-jakarta font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-soft-purple dark:hover:shadow-neon-purple"
                >
                  <span>🌟</span>
                  Check My Happiness Level
                </Link>
                <Link
                  href="/companion-talk"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-mindbloom-primary dark:border-mindbloom-neon text-mindbloom-primary dark:text-mindbloom-neon font-jakarta font-semibold text-sm transition-all duration-200 hover:bg-mindbloom-surface2 dark:hover:bg-mindbloom-neon/10 hover:scale-105"
                >
                  <span>💬</span>
                  Start Talking
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10">
                {[
                  { value: '10K+', label: 'People Helped' },
                  { value: '4', label: 'AI Companions' },
                  { value: '24/7', label: 'Available' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-jakarta font-bold text-2xl text-mindbloom-primary dark:text-mindbloom-neon dark:drop-shadow-[0_0_8px_#B026FF]">{stat.value}</p>
                    <p className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:flex items-center justify-center animate-float">
              <div className="relative w-80 h-80">
                {/* Central bloom */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-mindbloom-primary/20 to-mindbloom-accent/20 dark:from-mindbloom-neon/10 dark:to-mindbloom-neon-green/10 dark:border dark:border-mindbloom-neon/30 dark:shadow-neon-purple flex items-center justify-center">
                  <div className="text-8xl">🌸</div>
                </div>
                {/* Orbiting elements */}
                {[
                  { emoji: '😊', top: '-10%', left: '50%', delay: '0s' },
                  { emoji: '💙', top: '50%', right: '-10%', delay: '1s' },
                  { emoji: '🌿', bottom: '-10%', left: '50%', delay: '2s' },
                  { emoji: '✨', top: '50%', left: '-10%', delay: '3s' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="absolute w-14 h-14 rounded-2xl bg-white dark:bg-mindbloom-dark-surface2 dark:border dark:border-mindbloom-neon/30 shadow-soft-purple dark:shadow-neon-purple flex items-center justify-center text-2xl animate-float"
                    style={{
                      top: item.top,
                      left: item.left,
                      right: (item as any).right,
                      bottom: (item as any).bottom,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: item.delay,
                    }}
                  >
                    {item.emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-jakarta font-bold text-3xl lg:text-4xl text-mindbloom-text dark:text-mindbloom-dark-text mb-4">
            Three Paths to{' '}
            <span className="text-mindbloom-primary dark:text-mindbloom-neon dark:drop-shadow-[0_0_10px_#B026FF]">Wellness</span>
          </h2>
          <p className="font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted max-w-xl mx-auto">
            Science-backed tools and compassionate AI to guide your mental health journey
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Large card - Happiness Test */}
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-mindbloom-primary to-mindbloom-accent dark:from-mindbloom-dark-surface dark:to-mindbloom-dark-surface2 dark:border dark:border-mindbloom-neon/30 p-8 min-h-[280px] flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-all duration-300 shadow-soft-purple dark:shadow-neon-purple">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 dark:bg-mindbloom-neon/10 flex items-center justify-center text-3xl mb-4">
                🌟
              </div>
              <h3 className="font-jakarta font-bold text-2xl text-white dark:text-mindbloom-neon dark:drop-shadow-[0_0_8px_#B026FF] mb-3">
                Happiness Level Assessment
              </h3>
              <p className="font-dm text-white/80 dark:text-mindbloom-dark-muted text-sm leading-relaxed max-w-sm">
                A positive-framed 10-question assessment that measures your happiness level and provides personalized insights. Discover where you are on your wellness journey.
              </p>
            </div>
            <Link
              href="/happiness-test"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-white/20 dark:bg-mindbloom-neon/20 dark:border dark:border-mindbloom-neon/50 text-white dark:text-mindbloom-neon font-jakarta font-semibold text-sm hover:bg-white/30 dark:hover:bg-mindbloom-neon/30 transition-all w-fit"
            >
              Take the Test →
            </Link>
            {/* Decorative */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/5 dark:bg-mindbloom-neon/5" />
            <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 dark:bg-mindbloom-neon-green/5" />
          </div>

          {/* Companion Talk */}
          <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-mindbloom-dark-surface dark:border dark:border-mindbloom-neon-green/30 p-6 min-h-[160px] flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-soft-blue dark:shadow-neon-green">
            <div>
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-jakarta font-bold text-lg text-mindbloom-text dark:text-mindbloom-neon-green dark:drop-shadow-[0_0_8px_#00FF9F] mb-2">
                Companion Talk
              </h3>
              <p className="font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted text-xs leading-relaxed">
                4 AI personas — parent, sibling, friend, guide — trained to support you through difficult emotions.
              </p>
            </div>
            <Link href="/companion-talk" className="text-mindbloom-primary dark:text-mindbloom-neon-green font-jakarta font-semibold text-xs mt-3 hover:underline">
              Start Talking →
            </Link>
          </div>

          {/* Medical Advisor */}
          <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-mindbloom-dark-surface dark:border dark:border-mindbloom-neon-orange/30 p-6 min-h-[160px] flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-soft-purple dark:shadow-neon-orange">
            <div>
              <div className="text-3xl mb-3">🩺</div>
              <h3 className="font-jakarta font-bold text-lg text-mindbloom-text dark:text-mindbloom-neon-orange dark:drop-shadow-[0_0_8px_#FF6B00] mb-2">
                Medical Advisor
              </h3>
              <p className="font-dm text-mindbloom-muted dark:text-mindbloom-dark-muted text-xs leading-relaxed">
                Dr. Bloom answers your mental health questions with evidence-based, compassionate medical guidance.
              </p>
            </div>
            <Link href="/medical-advisor" className="text-mindbloom-primary dark:text-mindbloom-neon-orange font-jakarta font-semibold text-xs mt-3 hover:underline">
              Ask Dr. Bloom →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-mindbloom-surface2 dark:bg-mindbloom-dark-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-jakarta font-bold text-3xl text-mindbloom-text dark:text-mindbloom-dark-text mb-12 text-center">
            Stories of{' '}
            <span className="text-mindbloom-primary dark:text-mindbloom-neon dark:drop-shadow-[0_0_10px_#B026FF]">Growth</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "The Happiness Assessment helped me realize I was in a 'Seedling' phase. Having a name for it made it easier to seek help. Now I'm 'Growing' every day.",
                name: 'Arjun M.',
                role: 'Software Engineer',
                emoji: '🌱',
                score: 'Growing',
              },
              {
                quote: "Talking to the Parent Figure AI at 2am when I couldn't sleep felt like having someone who truly cared. It helped me through my darkest night.",
                name: 'Priya S.',
                role: 'Graduate Student',
                emoji: '🌸',
                score: 'Blooming',
              },
              {
                quote: "Dr. Bloom explained my anxiety symptoms so clearly. I finally understood what was happening to me and how to cope. Life-changing information.",
                name: 'Rahul K.',
                role: 'Teacher',
                emoji: '🌿',
                score: 'Nurturing',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-mindbloom-dark-surface2 dark:border dark:border-mindbloom-neon/20 rounded-2xl p-6 shadow-soft-purple dark:shadow-neon-purple hover:scale-[1.02] transition-all duration-300"
              >
                <div className="text-3xl mb-4">{t.emoji}</div>
                <p className="font-dm text-mindbloom-text dark:text-mindbloom-dark-text text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-jakarta font-semibold text-sm text-mindbloom-text dark:text-mindbloom-dark-text">{t.name}</p>
                    <p className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted">{t.role}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-mindbloom-surface2 dark:bg-mindbloom-neon/10 text-mindbloom-primary dark:text-mindbloom-neon text-xs font-jakarta font-semibold">
                    {t.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl bg-gradient-to-br from-mindbloom-primary to-mindbloom-accent dark:from-mindbloom-dark-surface dark:to-mindbloom-dark-surface2 dark:border dark:border-mindbloom-neon/40 p-12 overflow-hidden dark:shadow-neon-purple">
            <div className="absolute inset-0 dark:hidden opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white blur-2xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-white blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">🌺</div>
              <h2 className="font-jakarta font-bold text-3xl text-white dark:text-mindbloom-neon dark:drop-shadow-[0_0_15px_#B026FF] mb-4">
                Begin Your Wellness Journey Today
              </h2>
              <p className="font-dm text-white/80 dark:text-mindbloom-dark-muted mb-8">
                Take the first step. Your mind deserves care, compassion, and the right support.
              </p>
              <Link
                href="/happiness-test"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-mindbloom-neon text-mindbloom-primary dark:text-black font-jakarta font-bold text-sm hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🌟 Start with Happiness Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-mindbloom-border dark:border-mindbloom-neon/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="font-jakarta font-bold text-mindbloom-text dark:text-mindbloom-dark-text">
              Mind<span className="text-mindbloom-primary dark:text-mindbloom-neon">Bloom</span>
            </span>
          </div>
          <p className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted text-center">
            Not a substitute for professional mental health care. If you&apos;re in crisis, please contact a healthcare professional.
          </p>
          <div className="flex gap-4">
            {['Home', 'Happiness Test', 'Companion', 'Medical Advisor'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="font-dm text-xs text-mindbloom-muted dark:text-mindbloom-dark-muted hover:text-mindbloom-primary dark:hover:text-mindbloom-neon transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
