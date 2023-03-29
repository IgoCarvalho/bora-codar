import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';

import { Board } from '../components/Board';
import { Card } from '../components/Card';
import { PencilIcon } from '../components/icons/PencilIcon';
import { SearchBar } from '../components/SearchBar';
import { SideNav } from '../components/SideNav';
import { INITIAL_DATA } from '../data/tasks';
import { getTaskById, getTaskContainer } from '../utils/tasks';

export function Home() {
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const [boardSections, setBoardSections] = useState(INITIAL_DATA);

  function handleDragStart(event: DragStartEvent) {
    setActiveTaskId(String(event.active.id));
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    const activeContainer = getTaskContainer(boardSections, String(active.id));
    const overContainer = getTaskContainer(boardSections, String(over?.id));

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((currentBoardSections) => {
      const activeItems = currentBoardSections[activeContainer];
      const overItems = currentBoardSections[overContainer];

      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...currentBoardSections,
        [activeContainer]: [
          ...currentBoardSections[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...currentBoardSections[overContainer].slice(0, overIndex),
          currentBoardSections[activeContainer][activeIndex],
          ...currentBoardSections[overContainer].slice(overIndex),
        ],
      };
    });
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    const activeContainer = getTaskContainer(boardSections, String(active.id));
    const overContainer = getTaskContainer(boardSections, String(over?.id));

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((currentBoardSections) => ({
        ...currentBoardSections,
        [overContainer]: arrayMove(
          currentBoardSections[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeCardData = activeTaskId
    ? getTaskById(boardSections, activeTaskId)
    : null;

  return (
    <main className="h-screen overflow-hidden w-full bg-violet-600 bg-main flex">
      <div className="flex max-w-screen-2xl w-full overflow-auto mx-auto">
        <SideNav />
        <section className="flex-1 overflow-auto flex flex-col space-y-8 rounded-tl-[32px] bg-[#FBFAFF] text-[#403937] px-8 pt-12">
          <header className="flex justify-between items-center px-6">
            <div className="flex items-center gap-3 cursor-pointer">
              <h1 className="text-[32px] font-bold">Meu Kanban</h1>
              <PencilIcon />
            </div>

            <img
              src="https://github.com/igocarvalho.png"
              alt="Foto de perfil de Igo Carvalho"
              width={64}
              className="rounded-full"
            />
          </header>

          <SearchBar />

          <div className="flex w-full justify-between overflow-x-auto flex-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              {Object.keys(boardSections).map((boardSectionKey) => (
                <Board
                  key={boardSectionKey}
                  id={boardSectionKey}
                  title={boardSectionKey}
                  tasks={boardSections[boardSectionKey]}
                />
              ))}

              <DragOverlay>
                {activeTaskId ? (
                  <Card
                    title={activeCardData?.title || ''}
                    content={activeCardData?.content || ''}
                    tags={activeCardData?.tags || []}
                  />
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </section>
      </div>
    </main>
  );
}
