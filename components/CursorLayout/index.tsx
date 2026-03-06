import { ChatPanel, Explorer, Header, TerminalPanel } from 'components';
import { ActionLogProvider } from 'components/ActionLog/context';
import { CursorLayoutProvider } from 'components/CursorLayout/context';
import { DestroySequenceProvider, useDestroySequence } from 'components/CursorLayout/DestroySequenceContext';
import { EditorPanel } from 'components/CursorLayout/EditorPanel';
import { MatrixRain } from 'components/CursorLayout/MatrixRain';
import { PanelResizeProvider, usePanelResize } from 'components/CursorLayout/PanelResizeContext';
import { ResizeHandle } from 'components/CursorLayout/ResizeHandle';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { HiChat, HiMenu } from 'react-icons/hi';

const CursorLayoutInner: FC<{ children?: React.ReactNode }> = () => {
  const { phase } = useDestroySequence();
  const { addExplorerDelta, addChatDelta, addTerminalDelta, explorerWidth, chatWidth, terminalHeight } =
    usePanelResize();
  const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [collapseStep, setCollapseStep] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileExplorerOpen(false);
        setMobileChatOpen(false);
      }
    };
    if (mobileExplorerOpen || mobileChatOpen) {
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }
  }, [mobileExplorerOpen, mobileChatOpen]);

  useEffect(() => {
    if (phase !== 'collapse') {
      setCollapseStep(0);
      return;
    }
    const t1 = setTimeout(() => setCollapseStep(1), 2200);
    const t2 = setTimeout(() => setCollapseStep(2), 4400);
    const t3 = setTimeout(() => setCollapseStep(3), 6600);
    const t4 = setTimeout(() => setCollapseStep(4), 8800);
    const t5 = setTimeout(() => setCollapseStep(5), 10100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [phase]);

  const showExplorer = phase === 'idle' || phase === 'hack' || (phase === 'collapse' && collapseStep < 1);
  const showEditor = phase === 'idle' || phase === 'hack' || (phase === 'collapse' && collapseStep < 2);
  const showChat = phase === 'idle' || phase === 'hack' || (phase === 'collapse' && collapseStep < 3);
  const showHeader = phase === 'idle' || phase === 'hack' || (phase === 'collapse' && collapseStep < 4);
  const showTerminal = phase === 'idle' || phase === 'hack' || (phase === 'collapse' && collapseStep < 5);
  const isRecovered = phase === 'recovered';
  const isLoading = phase === 'loading';
  const isBlackout = phase === 'blackout';
  const isMatrix = phase === 'matrix';

  return (
    <motion.div
      className="flex flex-col h-screen min-h-screen overflow-hidden font-sans bg-gray-50 dark:bg-cursor-editor"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <a
        href="#main-content"
        className="absolute px-4 py-2 text-white bg-blue-600 rounded left-4 -top-20 z-[60] transition-[top] focus:top-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Skip to main content
      </a>
      <AnimatePresence>
        {showHeader && (
          <motion.div
            key="header"
            className="shrink-0 cursor-layout__topbar"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px) saturate(0)' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <Header embedded />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile nav: Sections + Chat (only below lg) */}
      {showHeader && (
        <div className="flex px-3 py-2 bg-gray-100 border-b border-gray-200 shrink-0 gap-2 dark:border-cursor-border dark:bg-cursor-sidebar lg:hidden">
          <button
            type="button"
            onClick={() => setMobileExplorerOpen(true)}
            className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded min-h-[44px] gap-2 hover:bg-gray-50 dark:border-cursor-border dark:bg-white-300/10 dark:text-white-700 dark:hover:bg-white-300/20"
            aria-label="Open sections menu"
          >
            <HiMenu className="w-5 h-5" />
            Sections
          </button>
          <button
            type="button"
            onClick={() => setMobileChatOpen(true)}
            className="flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded min-h-[44px] gap-2 hover:bg-gray-50 dark:border-cursor-border dark:bg-white-300/10 dark:text-white-700 dark:hover:bg-white-300/20"
            aria-label="Open chat"
          >
            <HiChat className="w-5 h-5" />
            Chat
          </button>
        </div>
      )}

      <div className="flex flex-col flex-1 w-full min-h-0">
        <div className="flex flex-row flex-1 w-full min-h-0">
          <AnimatePresence>
            {showExplorer && (
              <motion.div
                key="explorer"
                className="flex-col hidden shrink-0 lg:flex"
                style={{ width: explorerWidth, minWidth: 0 }}
                initial={{ opacity: 1, width: explorerWidth }}
                exit={{ opacity: 0, width: 0, overflow: 'hidden', filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <Explorer style={{ width: '100%', minWidth: 0 }} />
              </motion.div>
            )}
          </AnimatePresence>
          {showExplorer && <ResizeHandle direction="vertical" onDrag={addExplorerDelta} className="hidden lg:flex" />}
          <AnimatePresence>
            {showEditor && (
              <motion.div
                key="editor"
                className="flex flex-col flex-1 min-w-0"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <EditorPanel />
              </motion.div>
            )}
          </AnimatePresence>
          {showChat && <ResizeHandle direction="vertical" onDrag={addChatDelta} className="hidden lg:flex" />}
          <AnimatePresence>
            {showChat && (
              <motion.div
                key="chat"
                className="flex-col hidden shrink-0 lg:flex"
                style={{ width: chatWidth, minWidth: 0 }}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, width: 0, overflow: 'hidden', filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <ChatPanel style={{ width: '100%', minWidth: 0 }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {showTerminal && <ResizeHandle direction="horizontal" onDrag={addTerminalDelta} className="hidden lg:flex" />}
        <AnimatePresence>
          {showTerminal && (
            <motion.div
              key="terminal"
              className="flex w-full min-h-[160px] shrink-0 lg:min-h-0"
              style={{ height: terminalHeight }}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <TerminalPanel style={{ height: terminalHeight, flexShrink: 0, width: '100%' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden bg-gray-900 z-[100] pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glitch scanlines */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-[0.06]"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
            aria-hidden
          />
          <div className="relative z-0 text-center text-white max-w-[90vw]">
            <motion.p
              className="font-mono text-base text-red-400 sm:text-lg"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              SYSTEM COMPROMISED
            </motion.p>
            <p className="mt-2 font-mono text-sm text-white/90">Forcing recovery...</p>
            <motion.div className="relative mx-auto mt-8 h-14 w-14" aria-hidden>
              <motion.div
                className="absolute inset-0 border-2 rounded-full border-red-500/50 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
              />
              <motion.div
                className="absolute border-2 rounded-full inset-1 border-white/80 border-t-transparent"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {isBlackout && (
        <motion.div
          className="fixed inset-0 z-[100]"
          style={{ backgroundColor: '#000000' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden
        />
      )}

      <AnimatePresence>
        {isMatrix && (
          <motion.div
            className="fixed inset-0 bg-black z-[95]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <MatrixRain />
          </motion.div>
        )}
      </AnimatePresence>

      {isRecovered && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center p-4 text-white bg-gray-900 z-[100] pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="font-mono text-base text-center text-green-400 sm:text-lg max-w-[90vw]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            System recovered.
          </motion.p>
          <motion.p
            className="mt-2 text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Restarting...
          </motion.p>
        </motion.div>
      )}

      {/* Mobile drawer: Explorer (sections) */}
      {mobileExplorerOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            role="button"
            tabIndex={0}
            onClick={() => setMobileExplorerOpen(false)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setMobileExplorerOpen(false)}
            aria-label="Close menu"
          />
          <div className="fixed inset-y-0 left-0 z-50 overflow-auto bg-gray-100 border-r border-gray-200 shadow-xl w-[min(100vw,280px)] dark:border-cursor-border dark:bg-cursor-sidebar lg:hidden">
            <Explorer
              onNavigate={() => setMobileExplorerOpen(false)}
              showCloseButton
              onClose={() => setMobileExplorerOpen(false)}
            />
          </div>
        </>
      )}

      {/* Mobile drawer: Chat */}
      {mobileChatOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            role="button"
            tabIndex={0}
            onClick={() => setMobileChatOpen(false)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setMobileChatOpen(false)}
            aria-label="Close chat"
          />
          <div className="fixed inset-y-0 right-0 z-50 overflow-auto bg-gray-100 border-l border-gray-200 shadow-xl w-[min(100vw,320px)] dark:border-cursor-border dark:bg-cursor-sidebar lg:hidden">
            <ChatPanel showCloseButton onClose={() => setMobileChatOpen(false)} />
          </div>
        </>
      )}
    </motion.div>
  );
};

export const CursorLayout: FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <CursorLayoutProvider>
      <DestroySequenceProvider>
        <ActionLogProvider>
          <PanelResizeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-cursor-editor">
              <CursorLayoutInner>{children}</CursorLayoutInner>
            </div>
          </PanelResizeProvider>
        </ActionLogProvider>
      </DestroySequenceProvider>
    </CursorLayoutProvider>
  );
};
