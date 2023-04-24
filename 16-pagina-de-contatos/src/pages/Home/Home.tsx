import { ContactsList } from '../../components/ContactsList/ContactsList';
import { Header } from '../../components/Header/Header';

import { items } from './data';
import { Container, Content, ListContainer, Shadow } from './Home.styles';

export function Home() {
  return (
    <Container>
      <Shadow>
        <Header />
      </Shadow>

      <Content>
        <ListContainer>
          <ContactsList contacts={items} />
        </ListContainer>
      </Content>
    </Container>
  );
}
