'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/happiness-test', label: 'Happiness Test' },
    { href: '/companion-talk', label: 'Talk to Companion' },
    { href: '/medical-advisor', label: 'Medical Advisor' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-mindbloom-dark-surface/80 backdrop-blur-md border-b border-mindbloom-border dark:border-mindbloom-neon/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mindbloom-primary to-mindbloom-accent flex items-center justify-center dark:shadow-neon-purple transition-all duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C12 2 7 6 7 11a5 5 0 0010 0c0-5-5-9-5-9z" fill="currentColor" opacity="0.8"/>
                <path d="M12 11C12 11 8 8 6 5" strokeLinecap="round"/>
                <path d="M12 11C12 11 16 8 18 5" strokeLinecap="round"/>
                <path d="M12 11v8" strokeLinecap="round"/>
                <path d="M9 17h6" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-jakarta font-bold text-xl text-mindbloom-text dark:text-mindbloom-dark-text">
              Mind<span className="text-mindbloom-primary dark:text-mindbloom-neon dark:drop-shadow-[0_0_8px_#B026FF]">Bloom</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg font-dm text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-mindbloom-surface2 text-mindbloom-primary dark:bg-mindbloom-neon/10 dark:text-mindbloom-neon dark:shadow-neon-purple'
                    : 'text-mindbloom-muted hover:text-mindbloom-text hover:bg-mindbloom-surface2 dark:text-mindbloom-dark-muted dark:hover:text-mindbloom-dark-text dark:hover:bg-mindbloom-dark-surface2'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-mindbloom-surface2 hover:bg-mindbloom-accent2/30 dark:bg-mindbloom-dark-surface2 dark:hover:bg-mindbloom-neon/10 dark:border dark:border-mindbloom-neon/30 dark:shadow-neon-purple"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-mindbloom-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-mindbloom-surface2 dark:bg-mindbloom-dark-surface2"
            >
              <svg className="w-5 h-5 text-mindbloom-text dark:text-mindbloom-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-mindbloom-border dark:border-mindbloom-neon/20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-dm text-sm font-medium transition-all duration-200 mb-1 ${
                  isActive(link.href)
                    ? 'bg-mindbloom-surface2 text-mindbloom-primary dark:bg-mindbloom-neon/10 dark:text-mindbloom-neon' :'text-mindbloom-muted hover:text-mindbloom-text hover:bg-mindbloom-surface2 dark:text-mindbloom-dark-muted dark:hover:text-mindbloom-dark-text dark:hover:bg-mindbloom-dark-surface2'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
