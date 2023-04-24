import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Shadow = styled.div`
  width: 100%;
  position: relative;

  &::after {
    content: '';
    width: 100%;
    height: 40px;
    position: absolute;
    z-index: 10;
    top: calc(100% - 1px);
    left: 0;
    background: linear-gradient(to bottom, var(--violet-900), transparent);
  }
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 40px;
  position: relative;
  overflow: auto;
`;

export const ListContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;
