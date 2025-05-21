'use client';
import { HeaderButtons } from '@/components/shared/admin/header-buttons';
import { StudiesTable } from '@/components/admin/tables/StudiesTable';
import { TotalItems } from '@/components/shared/admin/totalItems';
import { FooterPagination } from '@/components/shared/admin/FooterPagination';
import { useStudyStore } from '@/store/useStudyStore';

export function StudiesAdmin() {
  const {
    getStudies,
    total,
    optionsLimit,
    setCurrentPageSize,
    currentPage,
    totalPages,
    setPage,
  } = useStudyStore();
  const createUrl = '/admin/studies/create';
  return (
    <div className='StudiesAdmin'>
      <HeaderButtons
        createUrl={createUrl}
        refresh={getStudies}
        optionsLimit={optionsLimit}
        setCurrentPageSize={setCurrentPageSize}
      />
      <StudiesTable />
      <TotalItems total={total} />
      <FooterPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
