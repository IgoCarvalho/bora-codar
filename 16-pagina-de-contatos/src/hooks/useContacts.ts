import { useContext } from 'react';

import { ContactsContext } from '../contexts/contactsContext';

export function useContacts() {
  const context = useContext(ContactsContext);

  return context;
}
