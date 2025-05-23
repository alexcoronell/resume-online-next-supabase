import React from 'react';
import { PortfolioForm } from '@/components/admin/forms/PortfiolioForm';

export default function DetailsPortfolioPage() {
  return (
    <div>
      <PortfolioForm />
    </div>
  );
}


import SectionPage from '@/components/SectionPage';
import { StudiesAdmin } from '@/components/admin/StudiesAdmin';

export default async function AdminPage() {
  const titlePage = 'Studies';

  return (
    <SectionPage titlePage={titlePage}>
      <StudiesAdmin />
    </SectionPage>
  );
}