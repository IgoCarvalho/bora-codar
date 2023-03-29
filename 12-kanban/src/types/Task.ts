export interface Task {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export type Boards = Record<string, Task[]>;
