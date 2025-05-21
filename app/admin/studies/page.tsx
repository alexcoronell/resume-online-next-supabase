import SectionPage from '@/components/SectionPage';
import { HeaderButtons } from '@/components/shared/admin/header-buttons';
import { StudiesTable } from '@/components/admin/tables/StudiesTable';
import { TotalItems } from '@/components/shared/admin/totalItems';
import { FooterPagination } from '@/components/shared/admin/FooterPagination';

export default async function AdminPage() {
  const titlePage = 'Studies';
  return (
    <SectionPage titlePage={titlePage}>
      <HeaderButtons />
      <StudiesTable />
      <TotalItems />
      <FooterPagination />
    </SectionPage>
  );
}
