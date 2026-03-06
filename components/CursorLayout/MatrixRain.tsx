import React, { FC, useEffect, useRef } from 'react';

const CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()[]{}<>/=+';
const FONT_SIZE = 12;

interface MatrixRainProps {
  className?: string;
}

export const MatrixRain: FC<MatrixRainProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let columns: number[] = [];
    let lastW = 0;
    let lastH = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (lastW !== w || lastH !== h) {
        canvas.width = w;
        canvas.height = h;
        lastW = w;
        lastH = h;
        const colCount = Math.floor(w / FONT_SIZE);
        columns = Array.from({ length: colCount }, () => Math.random() * h);
      }
    };

    const draw = () => {
      resize();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;
      const w = canvas.width;
      const colCount = columns.length;

      for (let i = 0; i < colCount; i++) {
        const x = i * FONT_SIZE;
        const y = (columns[i] ?? 0) % (canvas.height + FONT_SIZE * 20);
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];

        // Trail (dimmer red)
        ctx.fillStyle = 'rgba(220, 38, 38, 0.15)';
        ctx.fillText(char, x, y);

        // Head (bright red)
        ctx.fillStyle = 'rgba(248, 113, 113, 0.95)';
        ctx.fillText(char, x, y);

        columns[i] = (columns[i] ?? 0) + FONT_SIZE * 0.8;
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full block ${className}`}
      style={{ zIndex: 95, pointerEvents: 'none' }}
      aria-hidden
    />
  );
};
