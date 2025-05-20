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

export default function ButtonLight({
  title,
  type = "button",
  disabled = false,
  onClick = () => {},
  url = "",
}: ButtonSubmitViewProps) {
  if (type === "link") {
    return (
      <a className={styles.btnLight} href={url}>
        {title}
      </a>
    );
  } else {
    return (
      <button
        className={styles.btnLight}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
}