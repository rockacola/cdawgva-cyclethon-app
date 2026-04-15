import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';

import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { AppearanceProvider } from '@/providers/AppearanceProvider';
import { ChakraProvider } from '@/providers/ChakraProvider';
import { LocaleProvider } from '@/providers/LocaleProvider';
import { TimezoneProvider } from '@/providers/TimezoneProvider';

export const metadata: Metadata = {
  description: 'Fan-made donation tracker for CDawgVA Cyclethon 5',
  icons: {
    icon: '/favicon.png',
  },
  title: 'Cyclethon Tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
