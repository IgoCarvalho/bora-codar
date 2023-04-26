import { ChangeEvent, FormEvent, useState } from 'react';

import { useContacts } from '../../hooks/useContacts';
import { Contact as ContactType } from '../../types/contact';
import { Button } from '../Button/Button';
import { Contact } from '../Contact/Contact';
import { Modal } from '../Modal/Modal';
import { TextField } from '../TextField/TextField';

import {
  ContactItem,
  ContactsGroup,
  ContactsGroupList,
  ContactsGroupTitle,
  Container,
  EditContactForm,
  EditContactFormFields,
} from './ContactsList.styles';

type ContactGroup = Record<string, ContactType[]>;

type ContactsListProps = {
  contacts: ContactType[];
};

const defaultContact = {
  id: '',
  name: '',
  phone: '',
  imgUrl: '',
};

export function ContactsList({ contacts }: ContactsListProps) {
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [editingContact, setEditingContact] =
    useState<ContactType>(defaultContact);

  const { isEditMode, editContact } = useContacts();

  function groupContacts() {
    const sortedContacts = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const groups = sortedContacts.reduce<ContactGroup>((acc, contact) => {
      const firstChar = normalizeChar(contact.name.trim()[0]);

      acc[firstChar] = [...(acc[firstChar] || []), contact];

      return acc;
    }, {});

    return groups;
  }

  function normalizeChar(value: string) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function handleContactClick(contact: ContactType) {
    if (isEditMode) {
      setEditingContact(contact);
      openEditContactModal();

      return;
    }
  }

  function handleEditContactFormChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setEditingContact((oldState) => ({ ...oldState, [name]: value }));
  }

  function handleEditContactForm(event: FormEvent) {
    event.preventDefault();

    editContact(editingContact);
    clearEditContactForm();
    closeEditContactModal();
  }

  function clearEditContactForm() {
    setEditingContact(defaultContact);
  }

  function openEditContactModal() {
    setIsEditContactModalOpen(true);
  }

  function closeEditContactModal() {
    setIsEditContactModalOpen(false);
  }

  const contactsGroupedByName = groupContacts();

  return (
    <>
      <Container>
        {Object.keys(contactsGroupedByName)
          .sort()
          .map((contactsGroup, index) => (
            <ContactsGroup key={contactsGroup}>
              <ContactsGroupTitle titleIndex={index}>
                {contactsGroup}
              </ContactsGroupTitle>

              <ContactsGroupList>
                {contactsGroupedByName[contactsGroup].map((contact) => (
                  <ContactItem key={contact.id}>
                    <Contact data={contact} onClick={handleContactClick} />
                  </ContactItem>
                ))}
              </ContactsGroupList>
            </ContactsGroup>
          ))}
      </Container>

      <Modal
        title="Editar contato"
        isOpen={isEditContactModalOpen}
        onClose={closeEditContactModal}
        disableSuccessButton
      >
        <EditContactForm onSubmit={handleEditContactForm}>
          <EditContactFormFields>
            <TextField
              label="Nome"
              name="name"
              autoFocus
              value={editingContact.name}
              onChange={handleEditContactFormChange}
              placeholder="Nome do contato"
              required
            />
            <TextField
              label="Telefone"
              name="phone"
              format="(##) #####-####"
              value={editingContact.phone}
              onChange={handleEditContactFormChange}
              placeholder="(01) 92345-6789"
              required
            />
            <TextField
              label="Link para foto (opcional)"
              name="imgUrl"
              value={editingContact.imgUrl}
              onChange={handleEditContactFormChange}
              placeholder="https://link-para-imagem.jpg"
            />
          </EditContactFormFields>

          <Button>Salvar</Button>
        </EditContactForm>
      </Modal>
    </>
  );
}
