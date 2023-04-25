import { FormEvent, useState } from 'react';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import { TextField } from '../TextField/TextField';
import { AddIcon } from '../icons/AddIcon';
import { PencilIcon } from '../icons/PencilIcon';
import { TrashIcon } from '../icons/TrashIcon';

import {
  ActionButton,
  ActionsContainer,
  Container,
  Content,
  NewContactForm,
  NewContactFormFields,
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

  function handleNewContactForm(event: FormEvent) {
    event.preventDefault();
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
        disableSuccessButton
      >
        <NewContactForm onSubmit={handleNewContactForm}>
          <NewContactFormFields>
            <TextField label="Nome" name="name" autoFocus />
            <TextField label="Telefone" name="phone" />
            <TextField label="Foto (url)" name="imageUrl" />
          </NewContactFormFields>

          <Button>Criar</Button>
        </NewContactForm>
      </Modal>
    </>
  );
}
