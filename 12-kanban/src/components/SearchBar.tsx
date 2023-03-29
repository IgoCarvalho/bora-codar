import { FilterIcon } from './icons/FilterIcon';
import { Input } from './Input';

export function SearchBar() {
  return (
    <div className="flex gap-4 px-6">
      <button
        type="button"
        className="bg-violet-600 text-white text-sm flex items-center gap-2 py-3 px-8 rounded"
      >
        <FilterIcon />
        Filtrar
      </button>

      <Input />
    </div>
  );
}
