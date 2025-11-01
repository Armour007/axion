import React from 'react';
import { History } from './interface';

const STORAGE_KEY = 'liveterm_history';

const loadHistoryFromStorage = (): Array<History> => {
  try {
    if (typeof window === 'undefined') return [];
    
    // Don't load history on page load - show fresh banner first
    // Only restore commands after user has seen the welcome message
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Only return entries with actual commands (filter out banners with empty commands)
      return Array.isArray(parsed)
        ? parsed
            .filter((entry: any) => entry.command && entry.command.trim() !== '')
            .map((entry: any) => ({
              ...entry,
              date: new Date(entry.date),
            }))
        : [];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to load history from localStorage:', err);
    // Clear corrupted data
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // Ignore
      }
    }
  }
  return [];
};

const saveHistoryToStorage = (history: Array<History>) => {
  try {
    if (typeof window !== 'undefined') {
      // Filter out entries with empty commands before saving
      const filtered = history.filter(entry => entry.command && entry.command.trim() !== '');
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Failed to save history to localStorage:', err);
  }
};

export const useHistory = (defaultValue: Array<History>) => {
  const [history, setHistoryState] = React.useState<Array<History>>(defaultValue);
  const [command, setCommand] = React.useState<string>('');
  const [lastCommandIndex, setLastCommandIndex] = React.useState<number>(0);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Load history from localStorage AFTER banner has been shown (small delay)
  React.useEffect(() => {
    setIsHydrated(true);
    // Delay loading history so banner displays first on page load
    const timer = setTimeout(() => {
      const stored = loadHistoryFromStorage();
      if (stored.length > 0) {
        setHistoryState(stored);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage whenever history changes
  React.useEffect(() => {
    if (isHydrated) {
      saveHistoryToStorage(history);
    }
  }, [history, isHydrated]);

  const setHistory = (value: string) => {
    setHistoryState((prevHistory) => {
      const newHistory = [
        ...prevHistory,
        {
          id: prevHistory.length,
          date: new Date(),
          command,
          output: value,
        },
      ];
      return newHistory;
    });
  };

  const updateLastHistoryOutput = (value: string) => {
    setHistoryState((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;
      const newHistory = [...prevHistory];
      newHistory[newHistory.length - 1] = {
        ...newHistory[newHistory.length - 1],
        output: value,
      };
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistoryState([]);
  };

  return {
    history,
    command,
    lastCommandIndex,
    setHistory,
    setCommand,
    setLastCommandIndex,
    clearHistory,
    updateLastHistoryOutput,
  };
};
