'use client';

import { FileText } from './icons';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium transition-colors hover:border-muted motion-reduce:transition-none"
    >
      <FileText className="size-4" />
      Print
    </button>
  );
}
