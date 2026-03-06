import React, { createContext, useCallback, useContext, useState } from 'react';

const EXPLORER_MIN = 160;
const EXPLORER_MAX = 500;
const CHAT_MIN = 260;
const CHAT_MAX = 600;
const TERMINAL_MIN = 80;
const TERMINAL_MAX = 500;

interface PanelResizeState {
  explorerWidth: number;
  chatWidth: number;
  terminalHeight: number;
}

const defaultState: PanelResizeState = {
  explorerWidth: 240,
  chatWidth: 320,
  terminalHeight: 120,
};

interface PanelResizeContextValue extends PanelResizeState {
  setExplorerWidth: (v: number | ((prev: number) => number)) => void;
  setChatWidth: (v: number | ((prev: number) => number)) => void;
  setTerminalHeight: (v: number | ((prev: number) => number)) => void;
  addExplorerDelta: (delta: number) => void;
  addChatDelta: (delta: number) => void;
  addTerminalDelta: (delta: number) => void;
}

const PanelResizeContext = createContext<PanelResizeContextValue | null>(null);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function PanelResizeProvider({ children }: { children: React.ReactNode }) {
  const [explorerWidth, setExplorerWidthState] = useState(defaultState.explorerWidth);
  const [chatWidth, setChatWidthState] = useState(defaultState.chatWidth);
  const [terminalHeight, setTerminalHeightState] = useState(defaultState.terminalHeight);

  const setExplorerWidth = useCallback((v: number | ((prev: number) => number)) => {
    setExplorerWidthState((prev) => {
      const next = typeof v === 'function' ? v(prev) : v;
      return clamp(next, EXPLORER_MIN, EXPLORER_MAX);
    });
  }, []);

  const setChatWidth = useCallback((v: number | ((prev: number) => number)) => {
    setChatWidthState((prev) => {
      const next = typeof v === 'function' ? v(prev) : v;
      return clamp(next, CHAT_MIN, CHAT_MAX);
    });
  }, []);

  const setTerminalHeight = useCallback((v: number | ((prev: number) => number)) => {
    setTerminalHeightState((prev) => {
      const next = typeof v === 'function' ? v(prev) : v;
      return clamp(next, TERMINAL_MIN, TERMINAL_MAX);
    });
  }, []);

  const addExplorerDelta = useCallback((delta: number) => {
    setExplorerWidthState((prev) => clamp(prev + delta, EXPLORER_MIN, EXPLORER_MAX));
  }, []);

  const addChatDelta = useCallback((delta: number) => {
    setChatWidthState((prev) => clamp(prev - delta, CHAT_MIN, CHAT_MAX));
  }, []);

  const addTerminalDelta = useCallback((delta: number) => {
    setTerminalHeightState((prev) => clamp(prev - delta, TERMINAL_MIN, TERMINAL_MAX));
  }, []);

  const value: PanelResizeContextValue = {
    explorerWidth,
    chatWidth,
    terminalHeight,
    setExplorerWidth,
    setChatWidth,
    setTerminalHeight,
    addExplorerDelta,
    addChatDelta,
    addTerminalDelta,
  };

  return <PanelResizeContext.Provider value={value}>{children}</PanelResizeContext.Provider>;
}

export function usePanelResize() {
  const ctx = useContext(PanelResizeContext);
  if (!ctx) throw new Error('usePanelResize must be used within PanelResizeProvider');
  return ctx;
}
