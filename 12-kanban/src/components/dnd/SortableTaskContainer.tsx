import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ReactNode } from 'react';

import { Task } from '../../types/Task';

interface SortableTaskContainerProps {
  id: string;
  tasks: Task[];
  children: ReactNode;
}

export function SortableTaskContainer({
  id,
  tasks,
  children,
}: SortableTaskContainerProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext
      id={id}
      items={tasks}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={{ border: isOver ? '1px solid red' : 'none' }}
      >
        {children}
      </div>
    </SortableContext>
  );
}
