'use client'
import { HeaderButtons } from '@/components/shared/admin/header-buttons'
import { TotalItems } from '@/components/shared/admin/totalItems'
import { FooterPagination } from '@/components/shared/admin/FooterPagination'
import { useWorkStore } from '@/store/usePortfolioStore'

import { PortfolioTable } from '@/components/admin/tables/PortfolioTable'
export function PortfolioAdmin() {
  const {
    getWorks,
    total,
    optionsLimit,
    setCurrentPageSize,
    currentPage,
    totalPages,
    setPage,
  } = useWorkStore()
  const createUrl = '/admin/portfolio/create'
  return (
    <div className="PortfolioAdmin">
      <HeaderButtons
        createUrl={createUrl}
        refresh={getWorks}
        optionsLimit={optionsLimit}
        setCurrentPageSize={setCurrentPageSize}
      />
      <PortfolioTable />
      <TotalItems total={total} />
      <FooterPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  )
}
