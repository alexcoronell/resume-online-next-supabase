'use client';
import React, { useEffect } from 'react';
import type { FC } from 'react';

import { ButtonView } from '@/components/shared/buttons/ButtonView';
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete';

import { useStudyStore } from '@/store/useStudyStore';

import styles from '@/styles/tablets.module.css';

export const StudiesTable: FC = () => {
  const { studies, total, getStudies, currentPage, currentPageSize } =
    useStudyStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getStudies();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getStudies();
  }, [currentPage, currentPageSize]);

  const columns = [
    { title: 'Title', classes: 'text-left' },
    { title: 'Institute', classes: 'text-left max-mdhidden' },
    { title: 'Place', classes: 'text-left max-lg:hidden' },
    { title: 'Since', classes: 'text-center max-xl:hidden' },
    { title: 'Until', classes: 'text-center max-xl:hidden' },
    { title: 'Current', classes: 'text-center max-xl:hidden' },
  ];

  const handleDelete = (id: string) => {
    return;
  };

  return (
    <div className={styles.AdminTableContainer}>
      <table className={styles.AdminTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <th key={index} className={column.classes}>
                {column.title}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => (
            <tr key={study.id}>
              <td>{study.title}</td>
              <td className='max-md:hidden'>{study.institute}</td>
              <td className='max-lg:hidden'>{study.place}</td>
              <td className='max-xl:hidden text-center'>{study.since}</td>
              <td className='max-xl:hidden text-center'>{study.until}</td>
              <td className='max-xl:hidden text-center'>{study.current ? 'Yes' : 'No'}</td>
              <td className={styles.AdminTable__actions}>
                <ButtonView
                  url={`/admin/studies/${study.id}`}
                  title={`View ${study.title} details`}
                />
                <ButtonDelete
                  id={study.id}
                  deleteFunction={handleDelete}
                  title={`Delete ${study.title}`}
                />{' '}
              </td>
            </tr>
          ))}
          {total === 0 && (
            <tr>
              <td colSpan={columns.length} className='text-center'>
                No studies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
