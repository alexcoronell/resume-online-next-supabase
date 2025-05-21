'use client';
import React from 'react';
import styles from '@/styles/pagination.module.css';

interface FooterPaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

export function FooterPagination({
  currentPage,
  totalPages,
  setPage,
}: FooterPaginationProps) {
  return (
    <div className={styles.Pagination}>
      <ButtonFirstPage
        currentPage={currentPage}
        setPage={setPage}
        totalPages={totalPages}
      />
      <ButtonBack
        currentPage={currentPage}
        setPage={setPage}
        totalPages={totalPages}
      />
      <p className='px-3'>
        Page{' '}
        <span className='px-2 text-primary font-bold underline underline-offset-4'>
          {currentPage}
        </span>{' '}
        of <span className='pl-2 font-bold'>{totalPages}</span>
      </p>
      <ButtonNext
        currentPage={currentPage}
        setPage={setPage}
        totalPages={totalPages}
      />
      <ButtonLastPage
        currentPage={currentPage}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

function ButtonFirstPage({ currentPage, setPage }: FooterPaginationProps) {
  const handlePageChange = () => {
    if (currentPage === 1) return;
    setPage(1);
  };
  return (
    <button
      type='button'
      className={styles.ButtonDirection}
      disabled={currentPage === 1}
      onClick={handlePageChange}
    >
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

function ButtonBack({ currentPage, setPage }: FooterPaginationProps) {
  const handlePageChange = () => {
    if (currentPage === 1) return;
    setPage(currentPage - 1);
  };
  return (
    <button
      type='button'
      className={styles.ButtonDirection}
      disabled={currentPage === 1}
      onClick={handlePageChange}
    >
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

function ButtonNext({
  currentPage,
  setPage,
  totalPages,
}: FooterPaginationProps) {
  const handlePageChange = () => {
    if (currentPage === totalPages) return;
    setPage(currentPage + 1);
  };
  return (
    <button
      type='button'
      className={styles.ButtonDirection}
      disabled={currentPage === totalPages}
      onClick={handlePageChange}
    >
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

function ButtonLastPage({
  currentPage,
  setPage,
  totalPages,
}: FooterPaginationProps) {
  const handlePageChange = () => {
    if (currentPage === totalPages) return;
    setPage(totalPages);
  };
  return (
    <button
      type='button'
      className={styles.ButtonDirection}
      disabled={currentPage === totalPages}
      onClick={handlePageChange}
    >
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
