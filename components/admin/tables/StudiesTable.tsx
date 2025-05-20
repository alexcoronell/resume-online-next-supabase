'use client';
import React, { useEffect } from 'react';
import type { FC } from 'react';

import { ButtonView } from '@/components/shared/buttons/ButtonView';
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete';

import { useStudyStore } from '@/store/useStudyStore';

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
    'Title',
    'Institute',
    'Place',
    'Since',
    'Until',
    'Current',
    'Actions',
  ];

  const handleDelete = (id: string) => {
    return;
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <th key={index} className='text-left'>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {studies.map((study) => (
          <tr key={study.id}>
            <td>{study.title}</td>
            <td>{study.institute}</td>
            <td>{study.place}</td>
            <td>{study.since}</td>
            <td>{study.until}</td>
            <td>{study.current ? 'Yes' : 'No'}</td>
            <td>
              {/* Add action buttons here */}
              <ButtonView
                url={`/admin/studies/${study.id}`}
                title={`View ${study.title} details`}
              />
              <ButtonDelete id={study.id} deleteFunction={handleDelete}  title={`Delete ${study.title}`}/>{' '}
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
  );
};
