import React from 'react';
import styles from '@/styles/pagination.module.css';

export function FooterPagination() {
  return (
    <div className={styles.Pagination}>
      <ButtonFirstPage />
      <ButtonBack />
      <p className='px-3'>Page <span className='px-1 text-primary font-bold underline underline-offset-4'>1</span> of <span>10</span></p>
      <ButtonNext />
      <ButtonLastPage />
    </div>
  );
}

function ButtonFirstPage() {
  return (
    <button type='button' className={styles.ButtonDirection}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <title>First page</title>
        <path
          fill='currentColor'
          d='M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z'
        />
      </svg>
    </button>
  );
}

function ButtonBack() {
  return (
    <button type='button' className={styles.ButtonDirection}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <title>Previous page</title>
        <path
          fill='currentColor'
          d='M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z'
        />
      </svg>
    </button>
  );
}

function ButtonNext() {
  return (
    <button type='button' className={styles.ButtonDirection}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <title>Next page</title>
        <path
          fill='currentColor'
          d='M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z'
        />
      </svg>
    </button>
  );
}

function ButtonLastPage() {
  return (
    <button type='button' className={styles.ButtonDirection}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <title>Last page</title>
        <path
          fill='currentColor'
          d='M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z'
        />
      </svg>
    </button>
  );
}
