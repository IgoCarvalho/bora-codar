import { ReactNode, createContext, useMemo, useState } from 'react';

import { Contact } from '../types/contact';
import { storageService } from '../services/storageService';

type ContactsContextData = {
  contacts: Contact[];
  isEditMode: boolean;
  isDeleteMode: boolean;
  switchEditMode: () => void;
  switchDeleteMode: () => void;
  createContact: (contact: Omit<Contact, 'id'>) => void;
  editContact: (updatedContact: Contact) => void;
  deleteContact: (contactId: string) => void;
  searchContacts: (text: string) => void;
};

type ContactsProviderProps = {
  children: ReactNode;
};

const INITIAL_DATA = storageService.getContacts();

export const ContactsContext = createContext({} as ContactsContextData);

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_DATA.contacts);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [contactsFilter, setContactsFilter] = useState('');

  function createContact(contact: Omit<Contact, 'id'>) {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };

    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);
    storageService.saveContacts(updatedContacts);
  }

  function switchEditMode() {
    setIsDeleteMode(false);
    setIsEditMode((oldEditState) => !oldEditState);
  }

  function editContact(updatedContact: Contact) {
    const updatedContactsList = contacts.map((contact) => {
      if (contact.id === updatedContact.id) {
        return updatedContact;
      }

      return contact;
    });

    setContacts(updatedContactsList);
    storageService.saveContacts(updatedContactsList);
  }

  function switchDeleteMode() {
    setIsEditMode(false);
    setIsDeleteMode((oldDeleteState) => !oldDeleteState);
  }

  function deleteContact(contactId: string) {
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    setContacts(filteredContacts);
    storageService.saveContacts(filteredContacts);
  }

  function filterContacts() {
    const filteredContacts = contacts.filter(
      (contact) =>
        contact.name
          .toLowerCase()
          .includes(contactsFilter.toLowerCase().trim()) ||
        contact.phone
          .toLowerCase()
          .includes(contactsFilter.toLowerCase().trim())
    );

    return filteredContacts;
  }

  function searchContacts(text: string) {
    setContactsFilter(text);
  }

  const filteredContacts = useMemo(
    () => (contactsFilter ? filterContacts() : contacts),
    [contactsFilter, contacts]
  );

  return (
    <ContactsContext.Provider
      value={{
        contacts: filteredContacts,
        createContact,
        isEditMode,
        switchEditMode,
        editContact,
        isDeleteMode,
        switchDeleteMode,
        deleteContact,
        searchContacts,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
