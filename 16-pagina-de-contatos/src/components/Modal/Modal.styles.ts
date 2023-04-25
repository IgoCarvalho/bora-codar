import { Dialog } from '@headlessui/react';
import styled, { keyframes } from 'styled-components';

const fadeInBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const TriggerContainer = styled.div``;

export const DialogContainer = styled(Dialog)`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

export const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.45);
`;

export const DialogPanel = styled(Dialog.Panel)`
  background-color: var(--violet-950);
  z-index: 10;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  border: 1px solid var(--violet-700);
  padding: 16px;

  animation: ${fadeInBottom} 200ms;
`;

export const DialogContent = styled.div`
  padding: 16px 0;
`;

export const DialogTitle = styled(Dialog.Title)`
  font-size: 20px;
  font-weight: 700;
`;

export const DialogActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
