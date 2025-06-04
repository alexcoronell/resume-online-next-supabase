'use client';
import { HeaderButtons } from '@/components/shared/admin/header-buttons';
import { TrainingsTable } from './tables/TrainingsTable';
import { TotalItems } from '../shared/admin/totalItems';
import { FooterPagination } from '../shared/admin/FooterPagination';
import { useTrainingStore } from '@/store/useTrainingStore';

export function TrainingAdmin() {
  const {
    getTrainings,
    total,
    optionsLimit,
    setCurrentPageSize,
    currentPage,
    totalPages,
    setPage,
  } = useTrainingStore();
  const createUrl = '/admin/trainings/create';

  return (
      <div className='StudiesAdmin'>
        <HeaderButtons
          createUrl={createUrl}
          refresh={getTrainings}
          optionsLimit={optionsLimit}
          setCurrentPageSize={setCurrentPageSize}
        />
        <TrainingsTable />
        <TotalItems total={total} />
        <FooterPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    );
}
