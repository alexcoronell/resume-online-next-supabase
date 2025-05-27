import React from "react";
import styles from "@/styles/form-group.module.css";

interface SelectProps {
  name: string;
  placeholder?: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  classes?: string;
  required?: boolean;
  errorMessage?: string;
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
  errorMessage = "",
}: SelectProps) {
  return (
    <div className={styles.formgroup}>
      <label htmlFor={name}>
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span>{placeholder}</span>
      </label>
      <p className={`text-xs absolute text-red`}>{errorMessage}</p>
    </div>
  );
}
