// Renders the live /resume page to an A4 PDF in /public.
// Margins come from @page in app/globals.css and from Page.printToPDF, so page 2
// gets the same inset as page 1. Run against a production server:
//   npm run build && npm start   (in another terminal)
//   npm run resume:pdf
// Env: RESUME_URL (default http://localhost:3000/resume), CHROME_PATH (default: first Chrome found).
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const url = process.env.RESUME_URL ?? 'http://localhost:3000/resume';
const out = resolve('public/amirul-ikmal-resume.pdf');
// 18mm in inches. Kept in sync with @page in app/globals.css.
const marginIn = 18 / 25.4;

const candidates = [
  process.env.CHROME_PATH,
  '/opt/google/chrome/chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

function findChrome() {
  for (const c of candidates) {
    try {
      if (c.startsWith('/')) {
        if (existsSync(c)) return c;
      } else {
        return execFileSync('which', [c], { encoding: 'utf8' }).trim();
      }
    } catch {
      // try the next candidate
    }
  }
  throw new Error('Chrome not found. Set CHROME_PATH.');
}

const res = await fetch(url).catch(() => null);
if (!res || !res.ok) {
  console.error(`Could not load ${url}. Start the production server first (npm run build && npm start).`);
  process.exit(1);
}

const chrome = findChrome();
const userDataDir = mkdtempSync(resolve(tmpdir(), 'resume-pdf-'));
const chromeProc = spawn(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--remote-debugging-port=0',
    `--user-data-dir=${userDataDir}`,
    'about:blank',
  ],
  { stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, DBUS_SESSION_BUS_ADDRESS: '/dev/null' } }
);

let debugPort = 0;
const stderr = [];
chromeProc.stderr.on('data', (chunk) => {
  const text = chunk.toString();
  stderr.push(text);
  const match = text.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//);
  if (match) debugPort = Number(match[1]);
});

function waitForPort() {
  return new Promise((resolvePort, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Chrome did not open a DevTools port.\n${stderr.join('')}`));
    }, 15_000);
    const tick = () => {
      if (debugPort) {
        clearTimeout(timer);
        resolvePort(debugPort);
        return;
      }
      setTimeout(tick, 50);
    };
    tick();
  });
}

try {
  const port = await waitForPort();
  const created = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, {
    method: 'PUT',
  });
  if (!created.ok) {
    throw new Error(`Could not open the resume tab (${created.status}).`);
  }
  const page = await created.json();
  const pdf = await printPage(page.webSocketDebuggerUrl);
  writeFileSync(out, Buffer.from(pdf, 'base64'));
  console.log(`Wrote ${out} (${Math.round(statSync(out).size / 1024)} KB)`);
} finally {
  chromeProc.kill('SIGKILL');
  rmSync(userDataDir, { recursive: true, force: true });
}

function printPage(wsUrl) {
  return new Promise((resolvePdf, reject) => {
    const ws = new WebSocket(wsUrl);
    let nextId = 0;
    const pending = new Map();
    const timer = setTimeout(() => {
      ws.close();
      reject(new Error('Chrome did not finish writing the PDF within 30s.'));
    }, 30_000);

    function send(method, params) {
      const id = ++nextId;
      return new Promise((resolveSend, rejectSend) => {
        pending.set(id, { resolve: resolveSend, reject: rejectSend });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (!msg.id || !pending.has(msg.id)) return;
      const { resolve: resolveSend, reject: rejectSend } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) rejectSend(new Error(msg.error.message));
      else resolveSend(msg.result);
    });

    ws.addEventListener('error', () => {
      clearTimeout(timer);
      reject(new Error('DevTools connection failed.'));
    });

    ws.addEventListener('open', async () => {
      try {
        await send('Page.enable');
        await send('Runtime.evaluate', {
          expression: 'document.fonts.ready.then(() => true)',
          awaitPromise: true,
        });
        const printed = await send('Page.printToPDF', {
          printBackground: true,
          preferCSSPageSize: true,
          paperWidth: 8.27,
          paperHeight: 11.69,
          marginTop: marginIn,
          marginBottom: marginIn,
          marginLeft: marginIn,
          marginRight: marginIn,
          displayHeaderFooter: false,
        });
        clearTimeout(timer);
        ws.close();
        resolvePdf(printed.data);
      } catch (error) {
        clearTimeout(timer);
        ws.close();
        reject(error);
      }
    });
  });
}
