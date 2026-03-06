import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type DestroyPhase = 'idle' | 'hack' | 'matrix' | 'collapse' | 'loading' | 'blackout' | 'recovered';

interface DestroySequenceContextValue {
  phase: DestroyPhase;
  startSequence: () => void;
}

const DestroySequenceContext = createContext<DestroySequenceContextValue | null>(null);

const HACK_DURATION_MS = 5000;
const MATRIX_DURATION_MS = 6500; // full-screen red character rain (movie style)
const COLLAPSE_DURATION_MS = 11000;
const LOADING_DURATION_MS = 5000;  // SYSTEM COMPROMISED screen (5 sec)
const BLACKOUT_DURATION_MS = 10000; // total black (10 sec)
const RECOVERED_DURATION_MS = 5000; // show "System recovered" then reload

export function DestroySequenceProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<DestroyPhase>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const startSequence = useCallback(() => {
    clearTimers();
    setPhase('hack');
    const t1 = setTimeout(() => setPhase('collapse'), HACK_DURATION_MS);
    const t2 = setTimeout(
      () => setPhase('matrix'),
      HACK_DURATION_MS + COLLAPSE_DURATION_MS
    );
    const t3 = setTimeout(
      () => setPhase('loading'),
      HACK_DURATION_MS + COLLAPSE_DURATION_MS + MATRIX_DURATION_MS
    );
    const t4 = setTimeout(
      () => setPhase('blackout'),
      HACK_DURATION_MS + COLLAPSE_DURATION_MS + MATRIX_DURATION_MS + LOADING_DURATION_MS
    );
    const t5 = setTimeout(
      () => setPhase('recovered'),
      HACK_DURATION_MS +
        COLLAPSE_DURATION_MS +
        MATRIX_DURATION_MS +
        LOADING_DURATION_MS +
        BLACKOUT_DURATION_MS
    );
    timers.current = [t1, t2, t3, t4, t5];
  }, [clearTimers]);

  useEffect(() => {
    if (phase === 'recovered') {
      const t = setTimeout(() => window.location.reload(), RECOVERED_DURATION_MS);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return <DestroySequenceContext.Provider value={{ phase, startSequence }}>{children}</DestroySequenceContext.Provider>;
}

export function useDestroySequence() {
  const ctx = useContext(DestroySequenceContext);
  if (!ctx) throw new Error('useDestroySequence must be used within DestroySequenceProvider');
  return ctx;
}

export function useDestroySequenceOptional(): DestroySequenceContextValue | null {
  return useContext(DestroySequenceContext);
}
