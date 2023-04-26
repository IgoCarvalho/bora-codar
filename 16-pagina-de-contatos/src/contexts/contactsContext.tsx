import { ReactNode, createContext, useState } from 'react';

import { Contact } from '../types/contact';
import { storageService } from '../services/storageService';

type ContactsContextData = {
  contacts: Contact[];
  isEditMode: boolean;
  createContact: (contact: Omit<Contact, 'id'>) => void;
  switchEditMode: () => void;
  editContact: (updatedContact: Contact) => void;
};

type ContactsProviderProps = {
  children: ReactNode;
};

const INITIAL_DATA = storageService.getContacts();

export const ContactsContext = createContext({} as ContactsContextData);

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_DATA.contacts);
  const [isEditMode, setIsEditMode] = useState(false);

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

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        createContact,
        isEditMode,
        switchEditMode,
        editContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
