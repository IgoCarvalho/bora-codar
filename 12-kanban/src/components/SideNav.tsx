import { CogIcon } from './icons/CogIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { PeopleIcon } from './icons/PeopleIcon';
import { TabletIcon } from './icons/TabletIcon';
import logoImg from '../assets/images/logo.svg';

export function SideNav() {
  return (
    <aside className="space-y-[60px] pl-9 pt-8">
      <img src={logoImg} width={50} alt="Kanban app logo" />

      <nav>
        <ul className="space-y-9 font-medium text-[#CAB3FF]">
          <li>
            <a
              href="#"
              className="flex items-center gap-4 font-bold text-white"
            >
              <TabletIcon />
              Boards
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-4">
              <PeopleIcon />
              Equipes
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-4">
              <DocumentTextIcon />
              Relatórios
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-4">
              <CogIcon />
              Ajustes
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
