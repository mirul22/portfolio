import { useActionLog } from 'components/ActionLog/context';
import { useDestroySequenceOptional } from 'components/CursorLayout/DestroySequenceContext';
import { portfolioData } from 'lib';
import { useTheme } from 'next-themes';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

const PROMPT = '$ ';

/** Height when collapsed (tab bar only, like a footer) */
const TERMINAL_COLLAPSED_HEIGHT = 40;

const HACK_LINES = [
  '> OVERRIDE REQUEST',
  '> ACCESS DENIED',
  '> BYPASSING...',
  '> INITIATING SEQUENCE',
  '> WARNING: SYSTEM COMPROMISE',
  '> FORCING RECOVERY MODE',
  '> CONNECTION TERMINATED',
];

const FORTUNES = [
  'Code is like humor. When you have to explain it, it’s bad.',
  'First, solve the problem. Then, write the code.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'The best error message is the one that never shows up.',
  'Talk is cheap. Show me the code. — Linus Torvalds',
  'Copy-paste is a design error. — David Parnas',
  'One man’s crappy software is another man’s full-time job.',
  'It works on my machine.',
  'There are only 10 types of people: those who understand binary and those who don’t.',
  'Coffee + Code = Happy Developer.',
  'Debugging is twice as hard as writing the code in the first place.',
  'Make it work, make it right, make it fast. — Kent Beck',
];

function parseInput(input: string): { cmd: string; args: string } {
  const trimmed = input.trim();
  const space = trimmed.indexOf(' ');
  if (space < 0) return { cmd: trimmed.toLowerCase(), args: '' };
  return {
    cmd: trimmed.slice(0, space).toLowerCase(),
    args: trimmed.slice(space + 1),
  };
}

const COMMANDS: Record<string, (_args: string) => string[] | string> = {
  whoami: () => portfolioData.about.name.toLowerCase().replace(/\s+/g, '-'),
  help: () => [
    'Available commands:',
    '  whoami        - display username',
    '  cat <file>   - cat about, experience, projects, skills, education, contact',
    '  ls           - list sections',
    '  date         - current date & time',
    '  echo <text>  - echo back',
    '  fortune',
    '  quote',
    '  neofetch     - system info (Amirul edition)',
    '  social       - social links',
    '  skills       - list tech skills',
    '  ping',
    '  coffee',
    '  theme        - theme light | dark | toggle (or show current)',
    '  destroy',
    '  sudo',
    '  vim',
    '  emacs',
    '  clear        - clear terminal',
    '  help         - this help',
  ],
  clear: () => [],
  ls: () => [
    'about.tsx',
    'experience.tsx',
    'projects.tsx',
    'skills.tsx',
    'education.tsx',
    'certifications.tsx',
    'contact.tsx',
  ],
  date: () => [
    new Date().toLocaleString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  ],
  echo: (args) => (args.trim() ? args : ''),
  fortune: () => [FORTUNES[Math.floor(Math.random() * FORTUNES.length)]],
  quote: (a) => COMMANDS.fortune(a),
  ping: () => ['pong!', '🏓'],
  coffee: () => ['☕ Coffee loaded. Code mode: ON.', 'Fueling the next 10x feature...'],
  sudo: () => ['Nice try. This is a portfolio, not a root shell. 😄'],
  vim: () => ['Vim detected. :wq to exit. (Just kidding — type a real command!)'],
  emacs: () => ['Emacs: the OS that happens to include an editor. C-x C-c to... wait, wrong app.'],
  social: () => [
    'GitHub:  ' + portfolioData.about.socials.find((s) => s.icon === 'github')?.href,
    'LinkedIn: ' + portfolioData.about.socials.find((s) => s.icon === 'linkedin')?.href,
  ],
  skills: () => portfolioData.skills.map((s) => s.name),
  neofetch: () => [
    '                    ' + portfolioData.about.name,
    '    ____________     ' + portfolioData.about.headline.split('|')[0].trim(),
    '   /            \\    Location: ' + portfolioData.about.location,
    '  |  ●      ●   |    Email: ' + portfolioData.about.email,
    '   \\____________/   Current: ' + (portfolioData.experience[0]?.company ?? '—'),
    '        |  |         Skills: Go, React, Node, TypeScript, ...',
    '   -------------    Type "help" for more.',
  ],
  whois: () => [
    portfolioData.about.name,
    portfolioData.about.headline,
    '',
    ...portfolioData.about.descriptions.slice(0, 2),
  ],
  curl: (args) => {
    const u = args.trim().toLowerCase();
    if (u.includes('amirul') || u.includes('portfolio')) {
      return [
        '<!DOCTYPE html>',
        '<title>Amirul Ikmal</title>',
        '<meta name="description" content="' + portfolioData.about.headline + '"/>',
        '<p>Hello from ' + portfolioData.about.name + '. Hire me! 🚀</p>',
      ];
    }
    return ['curl: (try "curl amirul" for a treat)'];
  },
  exit: () => ["You can't exit the matrix. Try 'clear' to start fresh."],
  banner: () => [
    '  ___  __  __ ___ _ ___ _____ _   _',
    ' / _ \\|  \\/  |_ _| |_ _|_   _| | | |',
    '| (_) | |\\/| || |  | |  | | | |_| |',
    ' \\___/|_|  |_|___|_|___| |_|  \\___/',
    '',
    '     (ASCII art: Amirul)',
  ],
  weather: () => [
    'Weather in Code Land:',
    '  Temperature: 42°C (code running hot)',
    '  Conditions: Partly cloudy with a chance of merge conflicts',
    '  Forecast: Ship it tomorrow ☀️',
  ],
  cat: (args) => {
    const file = args.trim().toLowerCase();
    if (!file) return ['Usage: cat <file>'];
    if (file === 'about' || file === 'about.txt') {
      const lines = [
        portfolioData.about.headline,
        '',
        ...portfolioData.about.descriptions,
        '',
        `Email: ${portfolioData.about.email}`,
        `Location: ${portfolioData.about.location}`,
      ];
      if (portfolioData.about.testimonial) {
        const t = portfolioData.about.testimonial;
        lines.push('', `Testimonial: "${t.quote}" — ${t.author}${t.roleOrContext ? ` (${t.roleOrContext})` : ''}`);
      }
      return lines;
    }
    if (file === 'experience' || file === 'experience.txt') {
      return portfolioData.experience.map((e) => `${e.title} at ${e.company} (${e.date})`);
    }
    if (file === 'projects' || file === 'projects.txt') {
      return portfolioData.projects.map(
        (p) => `${p.title} — ${p.description.slice(0, 60)}... (${p.technologies.join(', ')})`
      );
    }
    if (file === 'skills' || file === 'skills.txt') {
      return portfolioData.skills.map((s) => s.name);
    }
    if (file === 'education' || file === 'education.txt') {
      return portfolioData.education.map((e) => `${e.school} - ${e.degree} (${e.date})`);
    }
    if (file === 'contact' || file === 'contact.txt') {
      return [`Email: ${portfolioData.about.email}`, 'Open the Contact section to get in touch.'];
    }
    return [`cat: ${file}: no such file`];
  },
};

interface LineProps {
  type: 'prompt' | 'output' | 'error';
  content: string | string[];
}

const Line: FC<LineProps> = ({ type, content }) => {
  const lines = Array.isArray(content) ? content : [content];
  if (type === 'prompt') {
    return (
      <div className="flex items-start gap-2 text-emerald-600 dark:text-cursor-terminalGreen">
        <span>{PROMPT}</span>
        <span className="break-all">{content as string}</span>
      </div>
    );
  }
  const className =
    type === 'error' ? 'text-red-600 dark:text-red-400' : 'text-amber-800 dark:text-cursor-terminalAmber';
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <div key={i} className="font-mono text-xs break-words sm:text-sm">
          {line}
        </div>
      ))}
    </div>
  );
};

type TabId = 'terminal' | 'log';

interface TerminalPanelProps {
  style?: React.CSSProperties;
}

export const TerminalPanel: FC<TerminalPanelProps> = ({ style }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const destroySeq = useDestroySequenceOptional();
  const [activeTab, setActiveTab] = useState<TabId>('terminal');
  const [collapsed, setCollapsed] = useState(false);
  const { addLog, entries, clearLog } = useActionLog();
  const [history, setHistory] = useState<LineProps[]>([
    { type: 'output', content: 'Portfolio terminal. Type "help" for commands. Try: fortune, neofetch, coffee 🫖' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const hackStartedRef = useRef(false);
  useEffect(() => {
    if (destroySeq?.phase !== 'hack' || hackStartedRef.current) return;
    hackStartedRef.current = true;
    setHistory((h) => [...h, { type: 'output', content: ['Initiating sequence...'] }]);
    let i = 0;
    const id = setInterval(() => {
      if (i >= HACK_LINES.length) {
        clearInterval(id);
        return;
      }
      setHistory((h) => [...h, { type: 'output', content: [HACK_LINES[i]] }]);
      i += 1;
    }, 220);
    return () => clearInterval(id);
  }, [destroySeq?.phase]);

  const runCommand = useCallback(
    (raw: string) => {
      const { cmd, args } = parseInput(raw);
      if (!cmd) {
        setHistory((h) => [...h, { type: 'prompt', content: raw }]);
        return;
      }
      if (cmd === 'clear') {
        setHistory([]);
        return;
      }
      addLog(`Terminal: $ ${raw}`, 'terminal');
      setHistory((h) => [...h, { type: 'prompt', content: raw }]);

      if (cmd === 'theme') {
        const arg = args.trim().toLowerCase();
        const current = resolvedTheme ?? theme ?? 'dark';
        if (!arg) {
          setHistory((h) => [...h, { type: 'output', content: [`Current theme: ${current}`] }]);
          return;
        }
        if (arg === 'toggle') {
          const next = current === 'dark' ? 'light' : 'dark';
          setTheme(next);
          setHistory((h) => [...h, { type: 'output', content: [`Theme set to ${next}`] }]);
          return;
        }
        if (arg === 'light' || arg === 'dark') {
          setTheme(arg);
          setHistory((h) => [...h, { type: 'output', content: [`Theme set to ${arg}`] }]);
          return;
        }
        setHistory((h) => [...h, { type: 'error', content: 'Usage: theme [ light | dark | toggle ]' }]);
        return;
      }

      if (cmd === 'destroy' || cmd === 'hack' || (cmd === 'terminal' && args.trim().toLowerCase() === 'destroy')) {
        if (destroySeq?.startSequence) {
          destroySeq.startSequence();
          setHistory((h) => [...h, { type: 'output', content: ['Running...'] }]);
        } else {
          setHistory((h) => [...h, { type: 'error', content: 'Sequence not available in this context.' }]);
        }
        return;
      }

      const fn = COMMANDS[cmd];
      if (!fn) {
        setHistory((h) => [...h, { type: 'error', content: `command not found: ${cmd}. Try "help".` }]);
        return;
      }
      const result = fn(args);
      const output = Array.isArray(result) ? result : [result];
      if (output.length === 1 && output[0] === '') return;
      setHistory((h) => [...h, { type: 'output', content: output }]);
    },
    [addLog, theme, resolvedTheme, setTheme, destroySeq]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
      setInput('');
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const resolvedStyle = {
    ...style,
    width: '100%',
    height: collapsed ? TERMINAL_COLLAPSED_HEIGHT : style?.height,
    flexShrink: 0,
  };

  return (
    <div
      className="flex flex-col w-full overflow-hidden font-mono text-sm bg-gray-100 border-t border-gray-200 shrink-0 cursor-layout__terminal dark:border-cursor-border dark:bg-cursor-terminalBg"
      style={resolvedStyle}
    >
      <div className="flex items-center justify-between px-2 text-gray-500 border-b border-gray-200 gap-2 py-1.5 dark:border-cursor-border dark:text-white-500 sm:px-3">
        <div className="flex items-center min-h-[44px] gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`min-h-[44px] min-w-[60px] rounded px-2 py-1.5 text-xs touch-manipulation sm:min-w-0 ${
              activeTab === 'terminal'
                ? 'bg-gray-300 dark:bg-white-300/30'
                : 'hover:bg-gray-200 dark:hover:bg-white-300/20'
            }`}
          >
            Terminal
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('log')}
            className={`min-h-[44px] min-w-[52px] rounded px-2 py-1.5 text-xs touch-manipulation sm:min-w-0 ${
              activeTab === 'log' ? 'bg-gray-300 dark:bg-white-300/30' : 'hover:bg-gray-200 dark:hover:bg-white-300/20'
            }`}
          >
            Log {entries.length > 0 && `(${entries.length})`}
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            addLog(collapsed ? 'Clicked: Expand terminal' : 'Clicked: Collapse terminal', 'click');
            setCollapsed((c) => !c);
          }}
          className="px-2 text-xs rounded min-h-[44px] min-w-[64px] py-1.5 touch-manipulation hover:bg-gray-200 dark:hover:bg-white-300/20 sm:min-w-0"
          aria-label={collapsed ? 'Expand terminal' : 'Collapse terminal'}
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      {!collapsed &&
        (activeTab === 'log' ? (
          <div className="flex flex-col flex-1 p-3 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-amber-800 dark:text-cursor-terminalAmber">
                Action log — clicks &amp; actions
              </span>
              <button
                type="button"
                onClick={clearLog}
                className="px-2 text-xs rounded py-0.5 hover:bg-gray-200 dark:hover:bg-white-300/20"
              >
                Clear
              </button>
            </div>
            <div className="font-mono text-xs space-y-1">
              {entries.length === 0 ? (
                <p className="text-gray-500 dark:text-white-500">No actions yet. Click around the portfolio!</p>
              ) : (
                entries.map((e) => (
                  <div key={e.id} className="flex gap-2 text-amber-800 dark:text-cursor-terminalAmber">
                    <span className="text-gray-500 shrink-0 dark:text-white-500">[{formatTime(e.ts)}]</span>
                    <span className="break-all">{e.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 p-3 overflow-auto">
            {history.map((line, i) => (
              <Line key={i} type={line.type} content={line.content} />
            ))}
            <div className="flex items-center gap-2 min-h-[44px] text-emerald-600 dark:text-cursor-terminalGreen">
              <span className="shrink-0">{PROMPT}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-0 py-2 font-mono text-sm placeholder-gray-400 bg-transparent border-none outline-none min-h-[44px] dark:placeholder-white-500"
                placeholder="Type a command..."
                spellCheck={false}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => {
                  runCommand(input);
                  setInput('');
                }}
                className="shrink-0 lg:hidden min-h-[44px] min-w-[44px] px-3 py-2 rounded text-xs font-medium bg-emerald-600/20 text-emerald-600 dark:bg-cursor-terminalGreen/20 dark:text-cursor-terminalGreen touch-manipulation"
                aria-label="Run command"
              >
                Run
              </button>
            </div>
            <div ref={bottomRef} />
          </div>
        ))}
    </div>
  );
};
