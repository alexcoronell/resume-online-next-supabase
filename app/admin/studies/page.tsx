import SectionPage from '@/components/SectionPage';
import { HeaderButtons } from '@/components/shared/admin/header-buttons';
import { StudiesTable } from '@/components/admin/tables/StudiesTable';

export default async function AdminPage() {
  const titlePage = 'Studies';
  return (
    <SectionPage titlePage={titlePage}>
      <HeaderButtons />
      <StudiesTable />
    </SectionPage>
  );
}
