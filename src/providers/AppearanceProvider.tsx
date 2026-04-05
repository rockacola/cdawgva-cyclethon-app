'use client';

import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useTheme } from 'next-themes';

import { APPEARANCE_MODE_DEFAULT } from '@/lib/constants';
import type { AppearanceMode } from '@/lib/constants';

interface AppearanceContextValue {
  appearanceMode: AppearanceMode;
  setAppearanceMode: Dispatch<SetStateAction<AppearanceMode>>;
}

const AppearanceContext = createContext<AppearanceContextValue>({
  appearanceMode: APPEARANCE_MODE_DEFAULT,
  setAppearanceMode: () => {},
} as AppearanceContextValue);

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  const appearanceMode = (
    theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : APPEARANCE_MODE_DEFAULT
  ) as AppearanceMode;

  function setAppearanceMode(mode: AppearanceMode | ((prev: AppearanceMode) => AppearanceMode)) {
    const resolved = typeof mode === 'function' ? mode(appearanceMode) : mode;
    setTheme(resolved.toLowerCase());
  }

  return (
    <AppearanceContext.Provider value={{ appearanceMode, setAppearanceMode }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearanceContext(): AppearanceContextValue {
  return useContext(AppearanceContext);
}
