import React from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import '@/styles/index.css';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: 'MindBloom - Your Mental Wellness Companion',
  description: 'A safe space to understand your mental wellness, talk to supportive AI companions, and get medical guidance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
</head>
      <body className="font-dm bg-mindbloom-bg dark:bg-mindbloom-dark-bg transition-colors duration-300">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: 'DM Sans, sans-serif',
                borderRadius: '12px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
