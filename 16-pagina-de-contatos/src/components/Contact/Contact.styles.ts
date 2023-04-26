import styled, { css } from 'styled-components';

type ContainerProps = {
  isEditing?: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  width: 100%;

  --highlight-bg: transparent;
  --highlight-border: transparent;

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: -10px;
    top: -10px;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: var(--highlight-bg);
    border-radius: 6px;
  }

  &:hover {
    &::after {
      border: 1px solid var(--highlight-border);
    }
  }

  ${({ isEditing }) =>
    isEditing &&
    css`
      --highlight-bg: var(--violet-700);
      --highlight-border: var(--violet-500);

      cursor: pointer;
    `}
`;

export const ImageContainer = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  overflow: hidden;
  font-size: 18px;
  color: var(--violet-900);
  background-color: var(--violet-300);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 16px;
    font-weight: 700;
  }

  span {
    font-size: 12px;
    color: var(--violet-300);
  }
`;
