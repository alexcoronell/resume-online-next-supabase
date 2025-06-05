'use client';
import React, { useEffect, useState } from 'react';

/* Components */
import { ButtonView } from '@/components/shared/buttons/ButtonView';
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete';
import { TrDefault } from '@/components/ui/table/TrDefault';

/* Store */
import { useExperienceStore } from '@/store/useExperienceStore';

/* Services */
import { deleteExperience } from '@/core/services/experience.service';
import { deleteExperienceFunctionByExperienceId } from '@/core/services/experience-functions.service';

/* Types */
import { RequestStatus } from '@/core/types/RequestStatus.type';

/* Styles */
import styles from '@/styles/tablets.module.css';

export function ExperiencesTable() {
  const { experiences, total, getExperiences, currentPage, currentPageSize } =
    useExperienceStore();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData();
  }, [currentPage, currentPageSize]);

  const fetchData = () => {
    setRequestStatus('loading');
    getExperiences()
      .then(() => setRequestStatus('success'))
      .catch(() => setRequestStatus('failed'));
  };

  const columns = [
    { title: 'Business', classes: 'text-left' },
    { title: 'Position', classes: 'text-left' },
    { title: 'Place', classes: 'text-left' },
    { title: 'Since', classes: 'text-left' },
    { title: 'Until', classes: 'text-left' },
  ];

  const handleDelete = (id: string) => {
    const res = confirm('Are you sure to delete this training');
    if (res) {
      deleteExperience(id)
        .then(() => deleteExperienceFunctionByExperienceId(id))
        .then(() => getExperiences())
        .catch((e) => {
          console.error(e);
          alert('Error deleting experience');
        });
    }
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
          {requestStatus === 'success' &&
            experiences.map((item) => (
              <tr key={item.id}>
                <td>{item.nameBusiness}</td>
                <td className=''>{item.position}</td>
                <td className=''>{item.place}</td>
                <td className=''>{item.since}</td>
                <td className=''>{item.current ? 'Current' : item.until}</td>
                <td className={styles.AdminTable__actions}>
                  <ButtonView
                    url={`/admin/experiences/details/${item.id}`}
                    title={`View ${item.nameBusiness} details`}
                  />
                  <ButtonDelete
                    id={item.id}
                    deleteFunction={handleDelete}
                    title={`Delete ${item.nameBusiness}`}
                  />{' '}
                </td>
              </tr>
            ))}
          <TrDefault
            total={total}
            columns={columns.length}
            requestStatus={requestStatus}
          />
        </tbody>
      </table>
    </div>
  );
}
