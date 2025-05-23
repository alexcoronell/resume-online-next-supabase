'use client';
import { PortfolioTable } from '@/components/admin/tables/PortfolioTable';
export function PortfolioAdmin() {
  const createUrl = '/admin/portfolio/create';
  return (
    <div className='PortfolioAdmin'>
      <PortfolioTable />
    </div>
  );
}
