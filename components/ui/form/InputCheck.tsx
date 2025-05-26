import React from "react";
import type { ChangeEvent, FocusEvent } from "react";
import type { RequestStatus } from "@/core/types/RequestStatus.type";
import styles from "@/styles/form-group.module.css";

interface InputCheckProps {
  name: string;
  id: string;
  checked: boolean;
  classes?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  requestStatus: RequestStatus;
  readonly: boolean;
}
export function InputCheck({
  name,
  id,
  checked,
  classes = "",
  onChange,
  requestStatus,
  readonly
}: InputCheckProps) {
  const nameLabel = name.charAt(0).toLocaleUpperCase() + name.slice(1);
  return (
    <div className={`${styles.formgroupCheckbox} ${classes}`.trim()}>
      <label htmlFor={id}>
        <span>{nameLabel}</span>
        {checked ? <InputChecked /> : <InputUnchecked />}
      </label>
      <input
        type="checkbox"
        name={name}
        checked={checked === true}
        className={classes}
        onChange={onChange}
        id={id}
        disabled={requestStatus === "loading" || readonly}
      />
    </div>
  );
}

const InputUnchecked = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5z"
      ></path>
    </svg>
  );
};

const InputChecked = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m10 17l-5-5l1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"
      ></path>
    </svg>
  );
};
