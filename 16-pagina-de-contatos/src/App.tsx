import { ContactsProvider } from './contexts/contactsContext';
import { Home } from './pages/Home/Home';

import { GlobalStyles } from './styles/global';

export function App() {
  return (
    <>
      <GlobalStyles />

      <ContactsProvider>
        <Home />
      </ContactsProvider>
    </>
  );
}
