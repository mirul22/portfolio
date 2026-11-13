// Renders the live /resume page to an A4 PDF in /public using headless Chrome's built-in
// --print-to-pdf, so the PDF always matches the page. Run against a production server:
//   npm run build && npm start   (in another terminal)
//   npm run resume:pdf
// Env: RESUME_URL (default http://localhost:3000/resume), CHROME_PATH (default: first Chrome found).
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';

const url = process.env.RESUME_URL ?? 'http://localhost:3000/resume';
const out = resolve('public/amirul-ikmal-resume.pdf');

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

const code = await new Promise((resolveCode) => {
  const child = spawn(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--no-pdf-header-footer',
      `--user-data-dir=${userDataDir}`,
      `--print-to-pdf=${out}`,
      url,
    ],
    { stdio: 'inherit', env: { ...process.env, DBUS_SESSION_BUS_ADDRESS: '/dev/null' } }
  );
  const timer = setTimeout(() => {
    child.kill('SIGKILL');
    console.error('Chrome did not finish writing the PDF within 30s.');
  }, 30_000);
  child.on('exit', (status) => {
    clearTimeout(timer);
    resolveCode(status ?? 1);
  });
});

rmSync(userDataDir, { recursive: true, force: true });

if (code !== 0 || !existsSync(out)) {
  process.exit(code || 1);
}

console.log(`Wrote ${out} (${Math.round(statSync(out).size / 1024)} KB)`);
