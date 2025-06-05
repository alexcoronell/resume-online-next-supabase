import React from 'react';
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';

import type { RequestStatus } from '@/core/types/RequestStatus.type';

import styles from '@/styles/form-group.module.css';

interface TextAreaProps {
  placeholder: string;
  name: string;
  id: string;
  value: string;
  classes?: string;
  errorMessage?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLTextAreaElement>) => void | undefined;
  requestStatus: RequestStatus;
  validField?: boolean;
  readonly?: boolean;
  rows?: number;
}

export function TextArea({
  name,
  placeholder,
  id,
  value,
  classes = '',
  errorMessage = '',
  onChange,
  onBlur,
  onKeyUp,
  requestStatus,
  validField = true,
  readonly = false,
  rows = 4,
}: TextAreaProps) {
  return (
    <div className={`${styles.formgroup} ${classes}`.trim()}>
      <label htmlFor={name}>
        <textarea
          name={name}
          value={value}
          className={classes}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur || onChange}
          onKeyUp={onKeyUp || undefined}
          disabled={requestStatus === 'loading'}
          readOnly={readonly}
          rows={rows}
        />
        <span>{placeholder}</span>
      </label>
      <p className={`text-xs absolute text-red ${!validField ? '' : 'hidden'}`}>
        {errorMessage}
      </p>
    </div>
  );
}
