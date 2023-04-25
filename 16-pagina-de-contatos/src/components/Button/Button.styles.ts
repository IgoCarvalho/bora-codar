import styled from 'styled-components';

export const Container = styled.button`
  background-color: var(--violet-500);
  color: var(--violet-50);
  font-size: 14px;
  font-weight: 700;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;

  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;
