"use client";
import { HeaderButtons } from '@/components/shared/admin/header-buttons';
import { StudiesTable } from '@/components/admin/tables/StudiesTable';
import { TotalItems } from '@/components/shared/admin/totalItems';
import { FooterPagination } from '@/components/shared/admin/FooterPagination';
import { useStudyStore } from '@/store/useStudyStore';

export function StudiesAdmin() {
  const { total } = useStudyStore();
  return (
    <div className='StudiesAdmin'>
      <HeaderButtons />
      <StudiesTable />
      <TotalItems total={total} />
      <FooterPagination />
    </div>
  );
}
