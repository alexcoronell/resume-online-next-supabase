import SectionPage from '@/components/SectionPage';
import { HeaderButtons } from '@/components/shared/admin/header-buttons';
import { StudiesTable } from '@/components/admin/tables/StudiesTable';
import { FooterPagination } from '@/components/shared/admin/FooterPagination';

export default async function AdminPage() {
  const titlePage = 'Studies';
  return (
    <SectionPage titlePage={titlePage}>
      <HeaderButtons />
      <StudiesTable />
      <FooterPagination />
    </SectionPage>
  );
}
