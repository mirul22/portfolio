import React, { FC, useCallback, useRef } from 'react';

type Direction = 'vertical' | 'horizontal';

interface ResizeHandleProps {
  direction: Direction;
  onDrag: (delta: number) => void;
  className?: string;
}

export const ResizeHandle: FC<ResizeHandleProps> = ({ direction, onDrag, className = '' }) => {
  const startRef = useRef<number>(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      startRef.current = direction === 'vertical' ? e.clientX : e.clientY;
      const onMouseMove = (move: MouseEvent) => {
        const current = direction === 'vertical' ? move.clientX : move.clientY;
        const delta = current - startRef.current;
        startRef.current = current;
        onDrag(delta);
      };
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
      document.body.style.cursor = direction === 'vertical' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [direction, onDrag]
  );

  const isVertical = direction === 'vertical';
  const baseClass =
    'shrink-0 bg-gray-200 dark:bg-cursor-border hover:bg-blue-400 dark:hover:bg-blue-600 transition-colors flex items-center justify-center';
  const sizeClass = isVertical ? 'w-1 cursor-col-resize' : 'h-1.5 cursor-row-resize';
  const hitClass = isVertical ? 'w-2 -mx-0.5' : 'h-2 -my-0.5';

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events -- resize handle is drag-only
    <div
      role="separator"
      aria-orientation={direction}
      aria-label={isVertical ? 'Resize panel width' : 'Resize terminal height'}
      className={`${baseClass} ${sizeClass} ${hitClass} ${className}`}
      onMouseDown={handleMouseDown}
      title={isVertical ? 'Drag to resize panel width' : 'Drag to resize terminal height'}
      style={{ cursor: isVertical ? 'col-resize' : 'row-resize' }}
    />
  );
};
