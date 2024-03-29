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
  DeleteActionButton,
  NewContactForm,
  NewContactFormFields,
  TopContent,
} from './Header.styles';

export function Header() {
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [newContactForm, setNewContactForm] = useState({
    name: '',
    phone: '',
    imgUrl: '',
  });

  const {
    createContact,
    switchEditMode,
    isEditMode,
    switchDeleteMode,
    isDeleteMode,
    searchContacts,
  } = useContacts();

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

  function handleEditButton() {
    switchEditMode();
  }

  function handleDeleteButton() {
    switchDeleteMode();
  }

  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;

    setSearchText(text);

    searchContacts(text);
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

              <ActionButton highlighted={isEditMode} onClick={handleEditButton}>
                <PencilIcon />
              </ActionButton>

              <DeleteActionButton
                highlighted={isDeleteMode}
                onClick={handleDeleteButton}
              >
                <TrashIcon />
              </DeleteActionButton>
            </ActionsContainer>
          </TopContent>

          <Input
            icon
            placeholder="Busque por nome ou por dados de contato..."
            onChange={handleSearchInput}
            value={searchText}
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
