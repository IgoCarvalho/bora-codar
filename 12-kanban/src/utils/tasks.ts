import { Boards } from '../types/Task';

export function getTaskById(boards: Boards, taskId: string) {
  for (const board in boards) {
    const taskData = boards[board].find((task) => task.id === taskId);

    if (taskData) {
      return taskData;
    }
  }
}

export function getTaskContainer(boards: Boards, taskId: string) {
  for (const board in boards) {
    const taskData = boards[board].find((task) => task.id === taskId);

    if (taskData) {
      return board;
    }
  }
}
