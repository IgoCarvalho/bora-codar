interface CardProps {
  title: string;
  content: string;
  tags: string[];
}

export function Card({ title, content, tags }: CardProps) {
  return (
    <div className="bg-white p-6 shadow-card rounded-lg space-y-[10px]">
      <strong className="text-sm font-bold">{title}</strong>

      <p className="text-sm font-medium text-[#756966] line-clamp-2">
        {content}
      </p>

      <ul className="flex gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="bg-[#E2D6FF] text-violet-600 rounded-lg py-1 px-2 text-[11px] font-medium"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
