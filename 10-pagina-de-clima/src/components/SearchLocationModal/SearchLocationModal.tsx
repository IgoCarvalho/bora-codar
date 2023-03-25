import * as Dialog from '@radix-ui/react-dialog';

import { CloseIcon } from '../icons/CloseIcon';

import styles from './SearchLocationModal.module.scss';

type SearchLocationModalProps = {
  isOpen?: boolean;
  handleClose?: (open: boolean) => void;
};

export function SearchLocationModal({ isOpen = false, handleClose }: SearchLocationModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={`${styles.dialogOverlay}`} />
        <Dialog.Content className={`${styles.dialogContent}`}>
          <div className={styles.dialogHeader}>
            <Dialog.Title className={`${styles.dialogTitle}`}>Alterar a localização</Dialog.Title>
            <Dialog.Close asChild>
              <button aria-label="Close">
                <CloseIcon />
              </button>
            </Dialog.Close>
          </div>
          <div className={styles.dialogMainContent}>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="city-name">
                Nome da cidade
              </label>
              <input className={styles.input} id="city-name" placeholder="Busque pelo nome..." />
            </fieldset>
          </div>
          <div className={styles.dialogActinoButtons}>
            <Dialog.Close asChild>
              <button className={styles.button}>Save changes</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
