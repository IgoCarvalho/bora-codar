import { ReactNode } from 'react';

import styles from './Tooltip.module.scss';

type TooltipProps = {
  title: string;
  children: ReactNode;
};

export function Tooltip({ title, children }: TooltipProps) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      {children}
    </div>
  );
}
