import React from 'react';
import ButtonPrimary from '@/components/shared/buttons/button-primary';
import ButtonSecondary from '@/components/shared/buttons/button-secondary';
import ButtonLight from '@/components/shared/buttons/button-light';
import { Select } from '@/components/ui/form/Select';

import styles from '@/styles/header-buttons.module.css';

interface HeaderButtonsProps {
  createUrl?: string;
  refresh: () => void;
}

export function HeaderButtons({ createUrl, refresh }: HeaderButtonsProps) {
  return (
    <div className={styles.HeaderButtons}>
      <div className={styles.HeaderButtons__actions}>
        <ButtonPrimary title='Create' type='link' url={createUrl} />
        <ButtonSecondary title='Refresh' type='button' onClick={refresh} />
        <ButtonLight title='Back' type='link' url='/admin' />
      </div>
      <div className='hidden md:block'></div>
      <div className={styles.HeaderButtons__selectBox}>
        <Select />
      </div>
    </div>
  );
}
