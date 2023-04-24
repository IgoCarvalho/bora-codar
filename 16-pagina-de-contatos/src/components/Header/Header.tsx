import { Input } from '../Input/Input';
import { AddIcon } from '../icons/AddIcon';
import { PencilIcon } from '../icons/PencilIcon';
import { TrashIcon } from '../icons/TrashIcon';

import {
  ActionButton,
  ActionsContainer,
  Container,
  Content,
  TopContent,
} from './Header.styles';

export function Header() {
  return (
    <Container>
      <Content>
        <TopContent>
          <h1>Meus contatos</h1>

          <ActionsContainer>
            <ActionButton>
              <AddIcon />
            </ActionButton>

            <ActionButton>
              <PencilIcon />
            </ActionButton>

            <ActionButton>
              <TrashIcon />
            </ActionButton>
          </ActionsContainer>
        </TopContent>

        <Input icon placeholder="Busque por nome ou por dados de contato..." />
      </Content>
    </Container>
  );
}
