import styled from 'styled-components';

export const Container = styled.header`
  background-color: var(--violet-950);
  width: 100%;
  padding: 40px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TopContent = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const ActionButton = styled.button`
  display: flex;
  background-color: transparent;
  padding: 4px;
  border: none;
  border-radius: 4px;
  transition: background-color 300ms;

  &:hover {
    cursor: pointer;
    background-color: var(--violet-800);
  }
`;
