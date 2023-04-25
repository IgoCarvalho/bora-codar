import { ReactNode, createContext, useState } from 'react';

import { Contact } from '../types/contact';
import { contactsData } from './contactsData';

type ContactsContextData = {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
};

type ContactsProviderProps = {
  children: ReactNode;
};

export const ContactsContext = createContext({} as ContactsContextData);

export function ContactsProvider({ children }: ContactsProviderProps) {
  const [contacts, setContacts] = useState<Contact[]>(contactsData);

  function addContact(contact: Contact) {
    setContacts((oldContacts) => [...oldContacts, contact]);
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
