import { Task } from '../types/Task';
import { Card } from './Card';
import { SortableTaskContainer } from './dnd/SortableTaskContainer';
import { SortableTaskItem } from './dnd/SortableTaskItem';

interface BoardProps {
  id: string;
  title: string;
  tasks: Task[];
}

export function Board({ id, title, tasks }: BoardProps) {
  return (
    <section className="max-w-[368px] min-w-[368px] flex flex-col flex-1">
      <div className="p-6">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto pb-6">
        <SortableTaskContainer id={id} tasks={tasks}>
          <div className="px-6 space-y-6 ">
            {tasks.map((task) => (
              <SortableTaskItem key={task.id} id={task.id}>
                <Card
                  title={task.title}
                  content={task.content}
                  tags={task.tags}
                />
              </SortableTaskItem>
            ))}
          </div>
        </SortableTaskContainer>
      </div>
    </section>
  );
}
