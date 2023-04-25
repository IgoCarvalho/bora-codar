import { ChangeEvent, FormEvent, useState } from 'react';

import { useContacts } from '../../hooks/useContacts';
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

  const [newContactForm, setNewContactForm] = useState({
    name: '',
    phone: '',
    imgUrl: '',
  });

  const { createContact } = useContacts();

  function handleOpenNewContactModal() {
    setIsNewContactModalOpen(true);
  }

  function handleCloseNewContactModal() {
    setIsNewContactModalOpen(false);
  }

  function handleNewContactForm(event: FormEvent) {
    event.preventDefault();

    const isFormValid = simpleValidation();

    console.log(newContactForm);

    if (!isFormValid) {
      alert('Por favor preencha os campos em vazios');

      return;
    }

    createContact(newContactForm);
    clearForm();
    handleCloseNewContactModal();
  }

  function simpleValidation() {
    return (
      newContactForm.name.trim().length > 0 &&
      newContactForm.phone.trim().length > 0
    );
  }

  function clearForm() {
    setNewContactForm({
      name: '',
      phone: '',
      imgUrl: '',
    });
  }

  function handleNewContactFormChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setNewContactForm((oldState) => ({ ...oldState, [name]: value }));
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
            <TextField
              label="Nome"
              name="name"
              autoFocus
              value={newContactForm.name}
              onChange={handleNewContactFormChange}
              placeholder="Nome do contato"
              required
            />
            <TextField
              label="Telefone"
              name="phone"
              format="(##) #####-####"
              value={newContactForm.phone}
              onChange={handleNewContactFormChange}
              placeholder="(01) 92345-6789"
              required
            />
            <TextField
              label="Link para foto (opcional)"
              name="imgUrl"
              value={newContactForm.imgUrl}
              onChange={handleNewContactFormChange}
              placeholder="https://link-para-imagem.jpg"
            />
          </NewContactFormFields>

          <Button>Criar</Button>
        </NewContactForm>
      </Modal>
    </>
  );
}
