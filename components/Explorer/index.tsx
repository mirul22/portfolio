import { useActionLog } from 'components/ActionLog/context';
import { useCursorLayout } from 'components/CursorLayout/context';
import { SECTION_IDS, SECTION_LABELS } from 'lib/sections';
import React, { FC, useState } from 'react';
import { HiChevronDown, HiChevronRight, HiDocumentText } from 'react-icons/hi';

interface ExplorerProps {
  style?: React.CSSProperties;
  /** Callback after section select (e.g. close mobile drawer) */
  onNavigate?: () => void;
  /** Show close button (for mobile drawer) */
  showCloseButton?: boolean;
  onClose?: () => void;
}

export const Explorer: FC<ExplorerProps> = ({ style, onNavigate, showCloseButton, onClose }) => {
  const { activeSection, setActiveSection } = useCursorLayout();
  const { addLog } = useActionLog();
  const [expanded, setExpanded] = useState(true);

  const handleSectionClick = (id: typeof SECTION_IDS[number]) => {
    addLog(`Viewed section: ${SECTION_LABELS[id]}`, 'view');
    setActiveSection(id);
    onNavigate?.();
  };

  const handleToggleExpand = () => {
    addLog(expanded ? 'Clicked: Collapse explorer' : 'Clicked: Expand explorer', 'click');
    setExpanded((e) => !e);
  };

  return (
    <div
      className="flex flex-col overflow-hidden bg-gray-100 border-r border-gray-200 cursor-layout__explorer dark:border-cursor-border dark:bg-cursor-sidebar"
      style={{ minWidth: 0, ...style }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 gap-2 dark:border-cursor-border">
        <button
          type="button"
          onClick={handleToggleExpand}
          className="flex items-center text-xs font-medium tracking-wider text-gray-600 uppercase gap-1 hover:text-gray-900 dark:text-white-700 dark:hover:text-white-900"
        >
          {expanded ? <HiChevronDown className="w-4 h-4" /> : <HiChevronRight className="w-4 h-4" />}
          Portfolio
        </button>
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-2 text-sm font-medium text-gray-600 rounded min-h-[44px] min-w-[44px] py-1.5 hover:bg-gray-200 dark:text-white-700 dark:hover:bg-white-300/20"
            aria-label="Close menu"
          >
            Close
          </button>
        )}
      </div>
      <div className="flex-1 py-2 overflow-y-auto">
        {expanded && (
          <nav className="px-2">
            {SECTION_IDS.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSectionClick(id)}
                className={`flex min-h-[44px] w-full items-center gap-2 rounded px-2 py-2 text-left text-sm transition-colors ${
                  activeSection === id
                    ? 'bg-blue-200/60 text-gray-900 dark:bg-blue-900/30 dark:text-white-900'
                    : 'text-gray-600 hover:bg-gray-200 dark:text-white-700 dark:hover:bg-white-300/20 dark:hover:text-white-900'
                }`}
              >
                <HiDocumentText className="flex-shrink-0 w-4 h-4 text-gray-500 dark:text-gray-700" />
                <span className="truncate">{SECTION_LABELS[id]}.tsx</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};
