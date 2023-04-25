import { ReactNode, createContext, useState } from 'react';

import { Contact } from '../types/contact';
import { storageService } from '../services/storageService';

type ContactsContextData = {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
};

type ContactsProviderProps = {
  children: ReactNode;
};

const INITIAL_DATA = storageService.getContacts();

export const ContactsContext = createContext({} as ContactsContextData);

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_DATA.contacts);

  function addContact(contact: Omit<Contact, 'id'>) {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };

    const updatedContacts = [...contacts, newContact];

    setContacts(updatedContacts);
    storageService.saveContacts(updatedContacts);
  }

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
