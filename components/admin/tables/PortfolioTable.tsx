'use client';
import React, { useEffect } from 'react';
import type { FC } from 'react';

import { ButtonView } from '@/components/shared/buttons/ButtonView';
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete';
import { MdiLinkIcon } from '@/components/ui/mdi--link';
import { MdiLinkOffIcon } from '@/components/ui/mdi--link-off';
import { SvgLogoGithubIcon } from '@/components/ui/svglogos--github-icon';
import { SvgLogoGitlabIcon } from '@/components/ui/svglogos--gitlab';
import { ImageIcon } from '@/components/ui/mdi--image-outline';
import { ImageOffIcon } from '@/components/ui/mdi--image-off-outline';

import { useWorkStore } from '@/store/usePortfolioStore';

import { deleteWork } from '@/core/services/work.service';
import deleteImage from '@/helpers/deleteImages';

import styles from '@/styles/tablets.module.css';

export function PortfolioTable() {
  const { works, total, getWorks, currentPage, currentPageSize } =
    useWorkStore();

  const bucketName = 'works';
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getWorks();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getWorks();
  }, [currentPage, currentPageSize]);

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
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <th key={index} className={column.classes}>
                {column.title}
              </th>
            ))}
            <th className={styles.AdminTable__actionsTh}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <tr key={index}>
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
                {work.originRepo === 'Github' && (
                  <SvgLogoGithubIcon className='size-6 inline' />
                )}
                {work.originRepo === 'Gitlab' && (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
