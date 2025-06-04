"use client"
import React from 'react';

import type { RequestStatus } from '@/core/types/RequestStatus.type';

import styles from "../../../styles/button-submit.module.css"

interface ButtonSubmitViewProps {
  title: string;
  requestStatus: RequestStatus;
}

export function ButtonSubmit({
  title,
  requestStatus,
}: ButtonSubmitViewProps) {
  return (
    <button className={styles.buttonSubmit} type='submit' disabled={requestStatus === 'loading'}>
      {title}
    </button>
  );
}
