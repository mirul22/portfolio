import type { ArchNode } from '@/lib/work';

import { ArrowDown } from './icons';
import { cn } from './ui';

export function ArchDiagram({ nodes, title }: { nodes: ArchNode[]; title: string }) {
  return (
    <figure className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <ol className="flex flex-col items-center">
        {nodes.map((node, i) => (
          <li key={node.label} className="flex w-full flex-col items-center">
            <div
              className={cn(
                'flex w-full max-w-lg flex-col gap-0.5 rounded-xl border px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4',
                node.todo ? 'border-dashed border-border' : 'border-border bg-surface-2'
              )}
            >
              <span className="text-sm font-semibold text-fg">{node.label}</span>
              {node.detail && <span className="text-xs leading-5 text-muted sm:text-right">{node.detail}</span>}
            </div>
            {i < nodes.length - 1 && <ArrowDown className="my-1.5 size-4 text-accent" />}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-center text-xs text-muted">
        {title}. Dashed boxes are details still to be documented.
      </figcaption>
    </figure>
  );
}
