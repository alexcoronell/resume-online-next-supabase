"use client";
import React from "react";

import styles from "@/styles/buttons.module.css";

interface ButtonSecondaryViewProps {
  title: string;
  type?: "button" | "submit" | "reset" | "link";
  onClick?: () => void;
  disabled?: boolean;
  url?: string;
}

export function ButtonSecondary({
  title,
  type = "button",
  disabled = false,
  onClick = () => {},
  url = "",
}: ButtonSecondaryViewProps) {
  if (type === "link") {
    return (
      <a className={styles.btnSecondary} href={url}>
        {title}
      </a>
    );
  } else {
    return (
      <button
        className={styles.btnSecondary}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
}
