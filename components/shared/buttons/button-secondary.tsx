"use client";
import React from "react";

import styles from "@/styles/buttons.module.css";

interface ButtonSubmitViewProps {
  title: string;
  type?: "button" | "submit" | "reset" | "link";
  onClick?: () => void;
  disabled?: boolean;
  url?: string;
}

export default function ButtonSubmit({
  title,
  type = "button",
  disabled = false,
  onClick = () => {},
  url = "",
}: ButtonSubmitViewProps) {
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
