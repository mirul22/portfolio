import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

export interface ActionLogEntry {
  id: number;
  ts: number;
  message: string;
  type?: 'view' | 'click' | 'terminal' | 'chat' | 'action';
}

const MAX_ENTRIES = 200;

interface ActionLogContextValue {
  entries: ActionLogEntry[];
  addLog: (message: string, type?: ActionLogEntry['type']) => void;
  clearLog: () => void;
}

const ActionLogContext = createContext<ActionLogContextValue | null>(null);

export function ActionLogProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<ActionLogEntry[]>([]);
  const idRef = useRef(0);

  const addLog = useCallback((message: string, type: ActionLogEntry['type'] = 'action') => {
    const id = ++idRef.current;
    const entry: ActionLogEntry = { id, ts: Date.now(), message, type };
    setEntries((prev) => {
      const next = [...prev, entry];
      if (next.length > MAX_ENTRIES) return next.slice(-MAX_ENTRIES);
      return next;
    });
  }, []);

  const clearLog = useCallback(() => setEntries([]), []);

  return <ActionLogContext.Provider value={{ entries, addLog, clearLog }}>{children}</ActionLogContext.Provider>;
}

export function useActionLog() {
  const ctx = useContext(ActionLogContext);
  if (!ctx) throw new Error('useActionLog must be used within ActionLogProvider');
  return ctx;
}
