import SectionPage from '@/components/SectionPage';
import { HeaderButtons } from '@/components/shared/admin/header-buttons';

export default async function AdminPage() {
  const titlePage = 'Studies';
  return (
    <SectionPage titlePage={titlePage}>
      <HeaderButtons />
    </SectionPage>
  );
}
