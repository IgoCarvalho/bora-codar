import { Board } from '../components/Board';
import { PencilIcon } from '../components/icons/PencilIcon';
import { SearchBar } from '../components/SearchBar';
import { SideNav } from '../components/SideNav';

export function Home() {
  return (
    <main className="min-h-screen w-full bg-violet-600 flex">
      <div className="flex w-full max-w-screen-2xl mx-auto">
        <SideNav />
        <section className="flex-1 space-y-8 rounded-tl-[32px] bg-[#FBFAFF] text-[#403937] px-8 pt-12">
          <header className="flex justify-between items-center px-6">
            <div className="flex items-center gap-3">
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

          <div className="flex justify-between">
            <Board title="A fazer" />
            <Board title="Fazendo" />
            <Board title="Feito" />
          </div>
        </section>
      </div>
    </main>
  );
}
