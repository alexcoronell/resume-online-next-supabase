'use client';
import React, { useEffect, useState } from 'react';
import type { FC } from 'react';

/* Components */
import { ButtonView } from '@/components/shared/buttons/ButtonView';
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete';
import { MdiLinkIcon } from '@/components/ui/mdi--link';
import { MdiLinkOffIcon } from '@/components/ui/mdi--link-off';
import { SvgLogoGithubIcon } from '@/components/ui/svglogos--github-icon';
import { SvgLogoGitlabIcon } from '@/components/ui/svglogos--gitlab';
import { ImageIcon } from '@/components/ui/mdi--image-outline';
import { ImageOffIcon } from '@/components/ui/mdi--image-off-outline';
import { SvgSpinnnersBarsScale } from '@/components/ui/spinners/svg-spinners--bars-scale';

/* Store */
import { useWorkStore } from '@/store/usePortfolioStore';

/* Services */
import { deleteWork } from '@/core/services/work.service';
import deleteImage from '@/helpers/deleteImages';

/* Types */
import { RequestStatus } from '@/core/types/RequestStatus.type';

/* Styles */
import styles from '@/styles/tablets.module.css';

export function PortfolioTable() {
  const { works, total, getWorks, currentPage, currentPageSize } =
    useWorkStore();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');

  const bucketName = 'works';
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
    getWorks()
      .then(() => setRequestStatus('success'))
      .catch(() => setRequestStatus('failed'));
  };

  const columns = [
    { title: 'Order', classes: 'text-left' },
    { title: 'Name', classes: 'text-left' },
    { title: 'Url', classes: 'text-left max-sm:hidden' },
    { title: 'UrlRepo', classes: 'text-left max-sm:hidden' },
    { title: 'ServiceRepo', classes: 'text-left max-md:hidden' },
    { title: 'Public', classes: 'text-left max-lg:hidden' },
    { title: 'Image', classes: 'text-left max-lg:hidden' },
    { title: 'Status', classes: 'text-left max-xl:hidden' },
    { title: 'Technologies', classes: 'text-left max-2xl:hidden' },
  ];

  const handleDelete = (id: string, image: string | null = null) => {
    const res = confirm('Are you sure to delete this work');
    if (res) {
      deleteWork(id)
        .then(() => {
          alert('work deleted successfully');
          getWorks();
        })
        .then(async () => {
          const res = await deleteImage(bucketName, image as string);
          if (!res) alert('Error deleting image');
        })
        .catch((error) => {
          console.error('Error deleting work:', error);
          alert('Error deleting work: ' + error.message);
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
              <th key={index} className={column.classes}>
                {column.title}
              </th>
            ))}
            <th className={styles.AdminTable__actionsTh}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requestStatus === 'success' && (
            works.map((work) => (
              <tr key={work.id}>
                <td className='text-left'>{work.order}</td>
                <td className='text-left'>{work.title}</td>
                <td className='text-center max-sm:hidden'>
                  {work.url ? (
                    <MdiLinkIcon className='text-primary inline' />
                  ) : (
                    <MdiLinkOffIcon className='text-secondary inline' />
                  )}
                </td>
                <td className='text-center max-sm:hidden'>
                  {work.repoUrl ? (
                    <MdiLinkIcon className='text-primary inline' />
                  ) : (
                    <MdiLinkOffIcon className='text-secondary inline' />
                  )}
                </td>
                <td className='text-center max-md:hidden'>
                  {work.originRepo === 'Github' ? (
                    <SvgLogoGithubIcon className='size-6 inline' />
                  ) : (
                    <SvgLogoGitlabIcon className='size-6 inline' />
                  )}
                </td>
                <td className='text-center max-lg:hidden'>
                  {work.publicRepo ? <span>Yes</span> : <span>No</span>}
                </td>
                <td className='text-center max-lg:hidden'>
                  {work.image ? (
                    <ImageIcon className='text-primary inline' />
                  ) : (
                    <ImageOffIcon className='text-secondary inline' />
                  )}
                </td>
                <td className='text-left max-xl:hidden'>{work.status}</td>
                <td className='text-left max-2xl:hidden'>{work.technologies}</td>
                <td className={styles.AdminTable__actions}>
                  <ButtonView
                    url={`/admin/portfolio/details/${work.id}`}
                    title={`View ${work.title} details`}
                  />
                  <ButtonDelete
                    id={work.id}
                    deleteFunction={() => handleDelete(work.id, work.image)}
                    title={`Delete ${work.title}`}
                  />{' '}
                </td>
              </tr>
            ))
          )}
          {requestStatus === 'loading' && (
            <tr>
              <td colSpan={columns.length + 1} className='text-center'>
                <SvgSpinnnersBarsScale className='text-primary mx-auto size-12' />
              </td>
            </tr>
          )}
          {total === 0 && requestStatus === 'success' && (
            <tr>
              <td colSpan={columns.length + 1} className='text-center'>
                No trainings found
              </td>
            </tr>
          )}
          {requestStatus === 'failed' && (
            <tr>
              <td colSpan={columns.length + 1} className='text-center text-red'>
                Error fetching Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
