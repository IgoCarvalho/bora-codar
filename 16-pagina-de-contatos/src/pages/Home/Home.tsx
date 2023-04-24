import { Contact } from '../../components/Contact/Contact';
import { Header } from '../../components/Header/Header';

import { Container, Content } from './Home.styles';

export function Home() {
  return (
    <Container>
      <Header />

      <Content>
        <Contact
          imgUrl="https://github.com/igocarvalho.png"
          name="Igo Carvalho"
          phone="(11) 90876-1234"
        />
      </Content>
    </Container>
  );
}
