import type { Contact } from '../types/contact';
import { contactsData } from './contactsData';

interface AppStorage {
  contacts: Contact[];
}

const CONTACTS_KEY = '@MY_CONTACTS_APP';

const INITIAL_STORAGE: AppStorage = {
  contacts: contactsData,
};

function getContacts() {
  const data = localStorage.getItem(CONTACTS_KEY);

  if (!data) {
    return INITIAL_STORAGE;
  }

  return JSON.parse(data) as AppStorage;
}

function saveContacts(contacts: Contact[]) {
  const storageData: AppStorage = {
    contacts,
  };

  localStorage.setItem(CONTACTS_KEY, JSON.stringify(storageData));
}

export const storageService = {
  saveContacts,
  getContacts,
};
