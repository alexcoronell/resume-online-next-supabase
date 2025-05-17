import React from 'react';
import type { ChangeEvent } from 'react';

import type { RequestStatus } from '@/core/types/RequestStatus.type';

import styles from '../../../styles/form-group.module.css';

interface FormViewProps {
  name: string;
  id: string;
  type?: string;
  value: string;
  errorMessage?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  requestStatus: RequestStatus;
  validField: boolean;
}

export default function Input({
  name,
  id,
  type = 'text',
  value,
  errorMessage = '',
  onChange,
  requestStatus,
  validField = true,
}: FormViewProps) {
  return (
    <div className={styles.formgroup}>
      <label htmlFor={name}>
        <input
          type={type}
          name={name}
          value={value}
          id={id}
          placeholder={name}
          onChange={onChange}
          onBlur={onChange}
          disabled={requestStatus === 'loading'}
        />
        <span>{name}</span>
      </label>
      <p className={`text-xs absolute text-red ${!validField ? '' : 'hidden'}`}>
        {errorMessage}
      </p>
    </div>
  );
}
