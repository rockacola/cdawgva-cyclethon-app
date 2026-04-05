'use client';

import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import { STORAGE_KEYS, TIMEZONE_MODE_DEFAULT } from '@/lib/constants';
import type { TimezoneMode } from '@/lib/constants';

interface TimezoneContextValue {
  setTimezoneMode: Dispatch<SetStateAction<TimezoneMode>>;
  timezoneMode: TimezoneMode;
}

const TimezoneContext = createContext<TimezoneContextValue>({
  setTimezoneMode: () => {},
  timezoneMode: TIMEZONE_MODE_DEFAULT,
} as TimezoneContextValue);

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [timezoneMode, setTimezoneMode] = useLocalStorageState<TimezoneMode>(
    STORAGE_KEYS.TIMEZONE,
    {
      defaultValue: TIMEZONE_MODE_DEFAULT,
    }
  );

  return (
    <TimezoneContext.Provider value={{ setTimezoneMode, timezoneMode }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezoneContext(): TimezoneContextValue {
  return useContext(TimezoneContext);
}
