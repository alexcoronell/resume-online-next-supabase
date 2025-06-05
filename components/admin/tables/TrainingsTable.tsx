'use client';
import React, { useEffect } from 'react';

import { ImageIcon } from '@/components/ui/mdi--image-outline';
import { ImageOffIcon } from '@/components/ui/mdi--image-off-outline';
import { ButtonView } from '@/components/shared/buttons/ButtonView';
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete';

import { useTrainingStore } from '@/store/useTrainingStore';

import { deleteTraining } from '@/core/services/training.service';

import styles from '@/styles/tablets.module.css';

export function TrainingsTable() {
  const { trainings, total, getTrainings, currentPage, currentPageSize } =
    useTrainingStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getTrainings();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getTrainings();
  }, [currentPage, currentPageSize]);

  const columns = [
    { title: 'Title', classes: 'text-left' },
    { title: 'Institute', classes: 'text-left' },
    { title: 'Date', classes: 'text-left' },
    { title: 'Image', classes: 'text-center' },
  ];

  const handleDelete = (id: string) => {
    const res = confirm('Are you sure to delete this training');
    if (res) {
      deleteTraining(id)
        .then(() => {
          alert('Training deleted successfully');
          getTrainings();
        })
        .catch((error) => {
          console.error('Error deleting training:', error);
          alert('Error deleting training: ' + error.message);
        });
    }
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
            <th className={styles.AdminTable__actionsTh}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainings.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td className=''>{item.institute.name}</td>
              <td className=''>
                {item.year}/{item.month}
              </td>
              <td className='text-center'>
                {item.image ? (
                  <ImageIcon className='text-primary inline' />
                ) : (
                  <ImageOffIcon className='text-secondary inline' />
                )}
              </td>
              <td className={styles.AdminTable__actions}>
                <ButtonView
                  url={`/admin/trainings/details/${item.id}`}
                  title={`View ${item.title} details`}
                />
                <ButtonDelete
                  id={item.id}
                  deleteFunction={handleDelete}
                  title={`Delete ${item.title}`}
                />{' '}
              </td>
            </tr>
          ))}
          {total === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className='text-center'>
                No trainings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
