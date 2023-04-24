import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--violet-800);
  padding: 0 24px;
  border-radius: 5px;

  input {
    height: 40px;
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
    font-size: 12px;
    color: var(--text);

    &::placeholder {
      color: var(--violet-300);
    }
  }
`;
