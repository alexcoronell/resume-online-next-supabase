'use client';
import { HeaderButtons } from '../shared/admin/header-buttons';
import { ExperiencesTable } from './tables/ExperiencesTable';
import { TotalItems } from '../shared/admin/totalItems';
import { FooterPagination } from '../shared/admin/FooterPagination';

/* Store */
import { useExperienceStore } from '@/store/useExperienceStore';

export function ExperiencesAdmin() {
  const {
    getExperiences,
    total,
    optionsLimit,
    setCurrentPageSize,
    currentPage,
    totalPages,
    setPage,
  } = useExperienceStore();
  const createUrl = '/admin/portfolio/create';
  return (
    <div className='PortfolioAdmin'>
      <HeaderButtons
        createUrl={createUrl}
        refresh={getExperiences}
        optionsLimit={optionsLimit}
        setCurrentPageSize={setCurrentPageSize}
      />
      <ExperiencesTable />
      <TotalItems total={total} />
      <FooterPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
