import SectionPage from '@/components/SectionPage';
import { ProfileForm } from '@/components/admin/forms/ProfileForm';

export default async function AdminPage() {
  const titlePage = 'Profile';
  return <SectionPage titlePage={titlePage}>
    <ProfileForm />
  </SectionPage>;
}
