import { useActionLog } from 'components/ActionLog/context';
import { getPortfolioKnowledgeText, portfolioData } from 'lib';
import React, { FC, useCallback, useRef, useState } from 'react';

/** Extract first URL from text (trim trailing punctuation). */
function getFirstUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s]+/);
  if (!match) return null;
  return match[0].replace(/[.,;!?)'"]+$/, '');
}

/** Split content into text and link segments for rendering. */
function renderContentWithLinks(content: string): React.ReactNode {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = urlRegex.exec(content)) !== null) {
    if (m.index > lastIndex) {
      parts.push(content.slice(lastIndex, m.index));
    }
    const url = m[1].replace(/[.,;!?)'"]+$/, '');
    parts.push(
      <a
        key={m.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline dark:text-blue-400 hover:underline"
      >
        {url}
      </a>
    );
    lastIndex = m.index + m[1].length;
  }
  if (lastIndex < content.length) parts.push(content.slice(lastIndex));
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
}

const FALLBACK =
  'I can only answer questions about Amirul and this portfolio. Try asking about experience, education, skills, or contact.';

const SUGGESTIONS = [
  "What's his experience?",
  'What projects has he built?',
  'What services does he offer?',
  'What skills does he have?',
  'Is he open to work?',
  'How to contact?',
  'What do people say about him?',
  'Book a call',
];

function answerFromPortfolio(query: string): string {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return FALLBACK;

  const knowledge = getPortfolioKnowledgeText();
  const words = q.split(/\s+/).filter((w) => w.length > 1);

  // Check for clear topic keywords and return tailored answers
  if (/\b(testimonial|recommendation|what people say|say about him|recommend)\b/.test(q)) {
    const t = portfolioData.about.testimonial;
    if (t) return `"${t.quote}" — ${t.author}${t.roleOrContext ? ` (${t.roleOrContext})` : ''}.`;
    return 'No testimonial is listed yet. You can ask about his experience or contact him directly.';
  }
  if (/\b(book a call|schedule|meet|calendly|meeting)\b/.test(q)) {
    const href = portfolioData.about.calendlyHref;
    if (href) return `Opening your booking page: ${href}`;
    return (
      "A booking link isn't set up yet. Reach out via email at " + portfolioData.about.email + ' to schedule a chat.'
    );
  }
  if (/\b(contact|email|reach|get in touch)\b/.test(q)) {
    return `You can reach Amirul at ${portfolioData.about.email}. He's based in ${portfolioData.about.location}.`;
  }
  if (
    /\b(service|offer|fivem|redm|custom website|scripting|freelance|contract|bespoke|custom system|ai agent|agent ai|claude|cursor|rag|automation|langchain)\b/.test(
      q
    )
  ) {
    const svc = portfolioData.about.customServices;
    if (svc && svc.items.length > 0) {
      const list = svc.items.map((s) => `${s.label}: ${s.description}`).join(' ');
      return `${svc.title}. ${list} Book a call to discuss your project: ${portfolioData.about.calendlyHref || portfolioData.about.email}.`;
    }
    return `Amirul offers custom development: websites, scripting, FiveM/RedM resources, and fully custom systems. Reach out at ${portfolioData.about.email} or book a call.`;
  }
  if (/\b(experience|job|work|company|vorto|soskod)\b/.test(q)) {
    const latest = portfolioData.experience[0];
    const list = portfolioData.experience
      .slice(0, 4)
      .map((e) => `${e.title} at ${e.company} (${e.date})`)
      .join('. ');
    return `Amirul's recent experience: ${list}. Currently: ${latest.title} at ${latest.company} (${latest.date}).`;
  }
  if (/\b(skill|tech|stack|technologies)\b/.test(q)) {
    const skills = portfolioData.skills.map((s) => s.name).join(', ');
    return `Amirul works with: ${skills}. His headline: ${portfolioData.about.headline}.`;
  }
  if (/\b(education|study|school|university|degree)\b/.test(q)) {
    const edu = portfolioData.education
      .slice(0, 3)
      .map((e) => `${e.school} - ${e.degree} (${e.date})`)
      .join('. ');
    return `Education: ${edu}.`;
  }
  if (/\b(certification|certificate|course)\b/.test(q)) {
    const certs = portfolioData.certifications
      .slice(0, 4)
      .map((c) => `${c.title} (${c.issuer}, ${c.date})`)
      .join('. ');
    return `Certifications include: ${certs}.`;
  }
  if (/\b(project|portfolio|built|side project)\b/.test(q)) {
    const first = portfolioData.projects[0];
    const link = first?.href || first?.github;
    const list = portfolioData.projects.map((p) => `${p.title}: ${p.description.slice(0, 60)}...`).join(' ');
    if (link) return `Projects: ${list}. Opening ${first?.title ?? 'project'} for you: ${link}`;
    return `Projects: ${list}. Check the Projects section for more.`;
  }
  if (/\b(open to work|hiring|available|looking for)\b/.test(q)) {
    const avail = portfolioData.about.availability || 'Open to full-time & contract • Remote';
    return `Amirul is ${avail}. Reach out at ${portfolioData.about.email}.`;
  }
  if (/\b(who|about|amirul)\b/.test(q)) {
    return `${portfolioData.about.name}: ${portfolioData.about.headline}. ${portfolioData.about.descriptions[0]}`;
  }

  // Simple keyword match: any word from query that appears in knowledge
  const matchCount = words.filter((w) => knowledge.indexOf(w) >= 0).length;
  if (matchCount > 0) {
    if (words.some((w) => ['vorto', 'soskod', 'c-speed', 'akal', 'go', 'react', 'node'].includes(w))) {
      const e = portfolioData.experience.find(
        (x) => x.company.toLowerCase().indexOf(words[0]) >= 0 || x.title.toLowerCase().indexOf(words[0]) >= 0
      );
      if (e) return `${e.title} at ${e.company}, ${e.place} (${e.date}). ${(e.bullets || []).slice(0, 2).join(' ')}`;
    }
    return `${portfolioData.about.name} is ${portfolioData.about.headline}. For more specific info, try asking about "experience", "skills", "education", or "contact".`;
  }

  return FALLBACK;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  style?: React.CSSProperties;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export const ChatPanel: FC<ChatPanelProps> = ({ style, showCloseButton, onClose }) => {
  const { addLog } = useActionLog();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    addLog(`Chat: "${text.slice(0, 40)}${text.length > 40 ? '…' : ''}"`, 'chat');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    const reply = answerFromPortfolio(text);
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    const url = getFirstUrl(reply);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, [input, addLog]);

  const onSuggestion = (s: string) => {
    addLog(`Chat: clicked suggestion "${s}"`, 'click');
    setInput(s);
  };

  return (
    <div
      className="flex flex-col overflow-hidden bg-gray-100 border-l border-gray-200 cursor-layout__chat dark:border-cursor-border dark:bg-cursor-sidebar"
      style={style}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 gap-2 dark:border-cursor-border dark:text-white-700">
        <span className="text-sm text-gray-600 dark:text-white-700">New Chat</span>
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-2 text-sm font-medium text-gray-600 rounded min-h-[44px] min-w-[44px] py-1.5 hover:bg-gray-200 dark:text-white-700 dark:hover:bg-white-300/20"
            aria-label="Close chat"
          >
            Close
          </button>
        )}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 p-3 overflow-auto space-y-3">
          {messages.length === 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-white-500">Ask about Amirul and this portfolio. Try:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onSuggestion(s)}
                    className="px-3 py-2 text-xs text-gray-700 rounded min-h-[44px] bg-gray-200/80 hover:bg-blue-200/60 dark:bg-white-300/20 dark:text-white-700 dark:hover:bg-blue-900/30 dark:hover:text-white-900 touch-manipulation"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.role === 'user'
                  ? 'text-right text-gray-900 break-words dark:text-white-900'
                  : 'rounded bg-gray-200/50 p-2 text-sm text-gray-700 break-words dark:bg-white-300/10 dark:text-white-700'
              }
            >
              {msg.role === 'assistant' ? renderContentWithLinks(msg.content) : msg.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="p-3 border-t border-gray-200 dark:border-cursor-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about Amirul…"
              className="flex-1 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded focus:border-blue-500 focus:outline-none dark:border-cursor-border dark:bg-white-300/20 dark:text-white-900 dark:placeholder-white-500 dark:focus:border-blue-700"
            />
            <button
              type="button"
              onClick={send}
              className="px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-900 dark:text-white-900 dark:hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
