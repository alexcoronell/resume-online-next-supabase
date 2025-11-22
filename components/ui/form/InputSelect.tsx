import React from 'react'
import styles from '@/styles/form-group.module.css'

interface SelectProps {
  name: string
  placeholder?: string
  value: string | number | null
  options: { value: string | number; label: string }[] | string[]
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  classes?: string
  required?: boolean
  errorMessage?: string
}

export function InputSelect({
  name,
  placeholder,
  value,
  options,
  disabled = false,
  required = false,
  onChange,
  classes,
  errorMessage = '',
}: SelectProps) {
  let finalOptions: { value: string | number; label: string }[] = []

  if (
    Array.isArray(options) &&
    typeof options[0] === 'object' &&
    options[0] !== null &&
    'value' in options[0] &&
    'label' in options[0]
  ) {
    finalOptions = options as { value: string | number; label: string }[]
  } else if (Array.isArray(options)) {
    finalOptions = (options as string[]).map(item => ({
      value: item,
      label: item,
    }))
  }
  return (
    <div className={`${styles.formgroup} ${classes}`.trim()}>
      <label htmlFor={name}>
        <select
          name={name}
          id={name}
          value={value as string | number}
          disabled={disabled}
          required={required}
          onChange={onChange}
          className={classes}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {finalOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span>{placeholder}</span>
      </label>
      <p className={`absolute text-xs text-red`}>{errorMessage}</p>
    </div>
  )
}
