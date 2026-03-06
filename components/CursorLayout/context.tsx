import type { SectionId } from 'lib/sections';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface CursorLayoutContextValue {
  activeSection: SectionId;
  setActiveSection: (sectionId: SectionId) => void;
}

const CursorLayoutContext = createContext<CursorLayoutContextValue | null>(null);

export function CursorLayoutProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionId>('about');
  const setActiveSection = useCallback((id: SectionId) => setActiveSectionState(id), []);
  return (
    <CursorLayoutContext.Provider value={{ activeSection, setActiveSection }}>{children}</CursorLayoutContext.Provider>
  );
}

export function useCursorLayout() {
  const ctx = useContext(CursorLayoutContext);
  if (!ctx) throw new Error('useCursorLayout must be used within CursorLayoutProvider');
  return ctx;
}
