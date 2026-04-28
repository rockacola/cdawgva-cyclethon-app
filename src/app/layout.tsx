import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { JetBrains_Mono, Playfair_Display } from 'next/font/google';

import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { AppearanceProvider } from '@/providers/AppearanceProvider';
import { ChakraProvider } from '@/providers/ChakraProvider';
import { LocaleProvider } from '@/providers/LocaleProvider';
import { TimezoneProvider } from '@/providers/TimezoneProvider';

const playfair = Playfair_Display({
  style: ['italic', 'normal'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  description: 'Fan-made donation tracker for CDawgVA Cyclethon 5',
  icons: {
    icon: '/favicon.png',
  },
  themeColor: [
    { color: '#f6f1e7', media: '(prefers-color-scheme: light)' },
    { color: '#1a1614', media: '(prefers-color-scheme: dark)' },
  ],
  title: 'Cyclethon Tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${playfair.variable} ${jetbrainsMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ChakraProvider>
          <AppearanceProvider>
            <LocaleProvider>
              <TimezoneProvider>
                <Header />
                {children}
                <Footer />
                <BackToTop />
                <Analytics />
              </TimezoneProvider>
            </LocaleProvider>
          </AppearanceProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
