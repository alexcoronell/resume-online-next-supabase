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
