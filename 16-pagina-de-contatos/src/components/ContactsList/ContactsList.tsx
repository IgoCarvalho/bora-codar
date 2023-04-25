import { Contact as ContactType } from '../../types/contact';
import { Contact } from '../Contact/Contact';

import {
  Container,
  ContactsGroupTitle,
  ContactsGroup,
  ContactsGroupList,
  ContactItem,
} from './ContactsList.styles';

type ContactGroup = Record<string, ContactType[]>;

type ContactsListProps = {
  contacts: ContactType[];
};

export function ContactsList({ contacts }: ContactsListProps) {
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

  const contactsGroupedByName = groupContacts();

  return (
    <Container>
      {Object.keys(contactsGroupedByName)
        .sort()
        .map((contactsGroup) => (
          <ContactsGroup key={contactsGroup}>
            <ContactsGroupTitle>{contactsGroup}</ContactsGroupTitle>

            <ContactsGroupList>
              {contactsGroupedByName[contactsGroup].map((contact) => (
                <ContactItem key={contact.id}>
                  <Contact data={contact} />
                </ContactItem>
              ))}
            </ContactsGroupList>
          </ContactsGroup>
        ))}
    </Container>
  );
}
