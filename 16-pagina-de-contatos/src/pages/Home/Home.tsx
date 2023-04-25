import { ContactsList } from '../../components/ContactsList/ContactsList';
import { Header } from '../../components/Header/Header';
import { useContacts } from '../../hooks/useContacts';

import { Container, Content, ListContainer, Shadow } from './Home.styles';

export function Home() {
  const { contacts } = useContacts();

  return (
    <Container>
      <Shadow>
        <Header />
      </Shadow>

      <Content>
        <ListContainer>
          <ContactsList contacts={contacts} />
        </ListContainer>
      </Content>
    </Container>
  );
}
