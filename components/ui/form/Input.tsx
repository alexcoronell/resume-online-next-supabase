import React from 'react'
import type { ChangeEvent, FocusEvent } from 'react'

import type { RequestStatus } from '@/core/types/RequestStatus.type'

import styles from '@/styles/form-group.module.css'

interface InputProps {
  placeholder: string
  name: string
  id: string
  type?: string
  value: string | number
  classes?: string
  errorMessage?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  requestStatus: RequestStatus
  validField?: boolean
  readonly?: boolean
}

export function Input({
  name,
  placeholder,
  id,
  type = 'text',
  value,
  classes = '',
  errorMessage = '',
  onChange,
  onBlur,
  requestStatus,
  validField = true,
  readonly = false,
}: InputProps) {
  return (
    <div className={`${styles.formgroup} ${classes}`.trim()}>
      <label htmlFor={name}>
        <input
          type={type}
          name={name}
          value={value}
          className={classes}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur || onChange}
          disabled={requestStatus === 'loading'}
          readOnly={readonly}
        />
        <span>{placeholder}</span>
      </label>
      <p className={`absolute text-xs text-red ${!validField ? '' : 'hidden'}`}>
        {errorMessage}
      </p>
    </div>
  )
}
