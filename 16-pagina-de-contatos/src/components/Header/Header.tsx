import { useState } from 'react';

import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
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
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);

  function handleOpenNewContactModal() {
    setIsNewContactModalOpen(true);
  }
  function handleCloseNewContactModal() {
    setIsNewContactModalOpen(false);
  }

  return (
    <>
      <Container>
        <Content>
          <TopContent>
            <h1>Meus contatos</h1>

            <ActionsContainer>
              <ActionButton onClick={handleOpenNewContactModal}>
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

          <Input
            icon
            placeholder="Busque por nome ou por dados de contato..."
          />
        </Content>
      </Container>

      <Modal
        title="Criar novo contato"
        isOpen={isNewContactModalOpen}
        onClose={handleCloseNewContactModal}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident in
        explicabo accusamus iste, ipsa eum aut? Similique, iste cum. Aspernatur
        perferendis vero corrupti beatae sunt rerum voluptatem corporis illo
        tempore!
      </Modal>
    </>
  );
}
