import { Card } from './Card';

interface BoardProps {
  title: string;
}

export function Board({ title }: BoardProps) {
  return (
    <section className="max-w-[368px]">
      <div className="p-6">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div className="px-6 space-y-6">
        <Card
          title="#boraCodar um Kanban 🧑‍💻"
          content="Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um
        quadro de Kanban."
          tags={['rocketseat', 'desafio']}
        />
        <Card
          title="Manter a ofensiva 🔥"
          content="Manter minha atividade na plataforma da Rocketseat para não perder a ofensiva"
          tags={['rocketseat']}
        />
        <Card
          title="Almoçar 🥗"
          content="Me alimentar, aproveitando um momento de descanso para recarregar minhas energias durante o almoço"
          tags={['autocuidado']}
        />
      </div>
    </section>
  );
}
