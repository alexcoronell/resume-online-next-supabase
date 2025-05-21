import React from 'react';
import ButtonPrimary from '@/components/shared/buttons/button-primary';
import ButtonSecondary from '@/components/shared/buttons/button-secondary';
import ButtonLight from '@/components/shared/buttons/button-light';
import { Select } from '@/components/ui/form/Select';

import styles from '@/styles/header-buttons.module.css';
import { OptionLimit } from '@/core/types/OptionLimit.type';

interface HeaderButtonsProps {
  createUrl?: string;
  optionsLimit: { value: string | number; label: string }[];
  setCurrentPageSize: (items: number) => void;
  refresh: () => void;
}

export function HeaderButtons({
  createUrl,
  optionsLimit,
  setCurrentPageSize,
  refresh,
}: HeaderButtonsProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setCurrentPageSize(Number(selectedValue));
  };
  return (
    <div className={styles.HeaderButtons}>
      <div className={styles.HeaderButtons__actions}>
        <ButtonPrimary title='Create' type='link' url={createUrl} />
        <ButtonSecondary title='Refresh' type='button' onClick={refresh} />
        <ButtonLight title='Back' type='link' url='/admin' />
      </div>
      <div className='hidden md:block'></div>
      <div className={styles.HeaderButtons__selectBox}>
        <Select options={optionsLimit} onChange={handleSelectChange} />
      </div>
    </div>
  );
}
