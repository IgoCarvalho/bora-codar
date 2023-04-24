import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {

  --violet-50: #E1E1E6;
  --violet-300: #8C8CBA;
  --violet-500: #51459f;
  --violet-700: #282843;
  --violet-800: #24243D;
  --violet-900: #1A1924;
  --violet-950: #16151E;

  --background: var(--violet-900);
  --text: var(--violet-50);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  min-height: 100vh;
}

body {
  background-color: var(--background);
  color: var(--text);

  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-size: 1rem;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

button, input {
  font-weight: 400;
  font-size: 1rem;
  font-family: inherit;
  font-style: inherit;
}
`;
