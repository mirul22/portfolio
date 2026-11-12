import { ImageResponse } from 'next/og';

import { siteConfig } from './site';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

export function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background: '#09090b',
        backgroundImage: 'radial-gradient(70% 60% at 50% 0%, rgba(52,211,153,0.22), rgba(9,9,11,0) 70%)',
        color: '#f4f4f5',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: '#34d399',
            color: '#022c22',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          AI
        </div>
        <div style={{ fontSize: 30, fontWeight: 600 }}>{siteConfig.name}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 26, color: '#34d399', letterSpacing: 4, textTransform: 'uppercase' }}>{eyebrow}</div>
        <div
          style={{
            fontSize: title.length > 48 ? 60 : 76,
            fontWeight: 700,
            lineHeight: 1.08,
            marginTop: 18,
            letterSpacing: -2,
          }}
        >
          {title}
        </div>
        {subtitle && <div style={{ fontSize: 30, color: '#a1a1aa', marginTop: 24, lineHeight: 1.35 }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#a1a1aa' }}>
        <div>{siteConfig.url.replace(/^https?:\/\//, '')}</div>
        <div>Malaysia · Remote</div>
      </div>
    </div>,
    ogSize
  );
}
