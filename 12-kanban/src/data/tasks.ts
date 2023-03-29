import { v4 as uuidv4 } from 'uuid';

import { Boards, Task } from '../types/Task';

const todoTasks: Task[] = [
  {
    id: uuidv4(),
    title: '#boraCodar um Kanban 🧑‍💻',
    content:
      'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.',
    tags: ['rocketseat', 'desafio'],
  },
  {
    id: uuidv4(),
    title: 'Manter a ofensiva 🔥',
    content:
      'Manter minha atividade na plataforma da Rocketseat para não perder a ofensiva',
    tags: ['rocketseat'],
  },
  {
    id: uuidv4(),
    title: 'Almoçar 🥗',
    content:
      'Me alimentar, aproveitando um momento de descanso para recarregar minhas energias durante o almoço',
    tags: ['autocuidado'],
  },
];

const doingTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Conferir o novo desafio 🚀 ',
    content:
      'Conferir o novo projeto do #boraCodar para fazê-lo da melhor maneira possível',
    tags: ['rocketseat', 'desafio'],
  },
  {
    id: uuidv4(),
    title: 'Ser incrível 😎',
    content: 'Sempre me lembrar de manter minha autenticidade e espalhar amor',
    tags: ['autocuidado'],
  },
];

const doneTasks: Task[] = [
  {
    id: uuidv4(),
    title: '#boraCodar uma página de login 🧑‍💻',
    content:
      'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.',
    tags: ['rocketseat', 'desafio'],
  },
  {
    id: uuidv4(),
    title: '#boraCodar uma página de clima 🧑‍💻',
    content:
      'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.',
    tags: ['rocketseat', 'desafio'],
  },
  {
    id: uuidv4(),
    title: '#boraCodar um conversor 🧑‍💻',
    content:
      'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.',
    tags: ['rocketseat', 'desafio'],
  },
];

export const INITIAL_DATA: Boards = {
  'A fazer': todoTasks,
  Fazendo: doingTasks,
  Feito: doneTasks,
};
