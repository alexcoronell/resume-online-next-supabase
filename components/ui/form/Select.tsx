import React from 'react'
import styles from '@/styles/form-group.module.css'

interface SelectProps {
  options: { value: string | number; label: string }[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Select({ options, onChange }: SelectProps) {
  return (
    <div className={styles.formgroup}>
      <label htmlFor="items">
        <select name="items" id="items" onChange={onChange}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span>Items per page</span>
      </label>
    </div>
  )
  ;<p className={`absolute text-xs text-red`}>Error Message</p>
}
