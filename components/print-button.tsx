'use client';

import { FileText } from './icons';

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-medium hover:border-muted"
    >
      <FileText className="size-4" />
      Print / Save as PDF
    </button>
  );
}
