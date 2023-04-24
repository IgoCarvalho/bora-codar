import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
