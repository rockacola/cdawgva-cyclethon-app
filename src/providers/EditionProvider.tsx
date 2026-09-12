'use client';

import { createContext, useContext } from 'react';

import { CURRENT_EDITION } from '@/lib/editions';

const EditionContext = createContext<number>(CURRENT_EDITION.year);

interface Props {
  children: React.ReactNode;
  year: number;
}

export function EditionProvider({ children, year }: Props) {
  return <EditionContext.Provider value={year}>{children}</EditionContext.Provider>;
}

// The year a component is rendering under, e.g. to build a link into that
// same year's routes (`/${useEditionContext()}/journey`). Falls back to the
// current live edition outside any EditionProvider.
export function useEditionContext(): number {
  return useContext(EditionContext);
}
