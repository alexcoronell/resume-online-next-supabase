'use client';
import React, { useEffect } from 'react';
import type { FC } from 'react';

import { useStudyStore } from '@/store/useStudyStore';

export const StudiesTable: FC = () => {
  const { studies, total, getStudies, currentPage, currentPageSize } =
    useStudyStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getStudies();
    console.log(studies);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getStudies();
  }, [currentPage, currentPageSize]);

  return (
    <>
      <h1>TABLE</h1>
      <p>{total}</p>
      {studies.map((study) => (
        <div key={study.id}>
          <h2>{study.title}</h2>
        </div>
      ))}
    </>
  );
};
