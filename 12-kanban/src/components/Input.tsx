import { SearchIcon } from './icons/SearchIcon';

export function Input() {
  return (
    <label className="flex gap-3 items-center bg-white w-full px-6 shadow-smooth rounded-lg border border-neutral-200">
      <SearchIcon />
      <input
        type="search"
        className="w-full bg-white h-12 outline-none placeholder:text-[#7C7C8A]"
        placeholder="Busque por cards, assuntos ou responsáveis..."
      />
    </label>
  );
}
