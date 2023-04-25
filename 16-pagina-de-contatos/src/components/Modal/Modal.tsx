import { ReactNode } from 'react';

import { Button } from '../Button/Button';

import {
  DialogActionsContainer,
  DialogContainer,
  DialogContent,
  DialogOverlay,
  DialogPanel,
  DialogTitle,
} from './Modal.styles';

type ModalProps = {
  children: ReactNode;
  title: string;
  isOpen?: boolean;
  successButtonText?: string;
  disableSuccessButton?: boolean;
  onSuccess?: () => void;
  onClose?: () => void;
};

export function Modal({
  children,
  title,
  onSuccess,
  onClose,
  disableSuccessButton = false,
  isOpen = false,
  successButtonText = 'Ok',
}: ModalProps) {
  function handleSuccessButton() {
    onSuccess && onSuccess();
  }

  function handleModalClose() {
    onClose && onClose();
  }

  return (
    <DialogContainer open={isOpen} onClose={handleModalClose}>
      <DialogOverlay />

      <DialogPanel>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>{children}</DialogContent>

        {disableSuccessButton || (
          <DialogActionsContainer>
            <Button onClick={handleSuccessButton}>{successButtonText}</Button>
          </DialogActionsContainer>
        )}
      </DialogPanel>
    </DialogContainer>
  );
}
