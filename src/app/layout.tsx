import type { Metadata } from 'next';

import { BackToTop } from '@/components/BackToTop';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ChakraProvider } from '@/providers/ChakraProvider';
import { TimezoneProvider } from '@/providers/TimezoneProvider';

export const metadata: Metadata = {
  title: 'Cyclethon Tracker',
  description: 'Fan-made donation tracker for CDawgVA Cyclethon 5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ChakraProvider>
          <TimezoneProvider>
            <Header />
            {children}
            <Footer />
            <BackToTop />
          </TimezoneProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
