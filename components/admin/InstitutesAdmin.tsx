'use client'
import { HeaderButtons } from '@/components/shared/admin/header-buttons'
import { InstitutesTable } from '@/components/admin/tables/InstitutesTable'
import { TotalItems } from '@/components/shared/admin/totalItems'
import { FooterPagination } from '@/components/shared/admin/FooterPagination'
import { useInstituteStore } from '@/store/useInstituteStore'

export function InstitutesAdmin() {
  const {
    getInstitutes,
    total,
    optionsLimit,
    setCurrentPageSize,
    currentPage,
    totalPages,
    setPage,
  } = useInstituteStore()
  const createUrl = '/admin/institutes/create'
  return (
    <div className="InstitutesAdmin">
      <HeaderButtons
        createUrl={createUrl}
        refresh={getInstitutes}
        optionsLimit={optionsLimit}
        setCurrentPageSize={setCurrentPageSize}
      />
      <InstitutesTable />
      <TotalItems total={total} />
      <FooterPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  )
}
