import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { EditionProvider } from '@/providers/EditionProvider';

// This year's own chrome and edition context: nav links point straight at
// /2026/... routes rather than through the unprefixed redirects. See
// .ai/tasks/active/year-scoped-editions.md and docs/adr/0001-year-scoped-editions.md.
const YEAR = 2026;

export default function Layout2026({ children }: { children: React.ReactNode }) {
  return (
    <EditionProvider year={YEAR}>
      <Header />
      {children}
      <Footer />
    </EditionProvider>
  );
}
