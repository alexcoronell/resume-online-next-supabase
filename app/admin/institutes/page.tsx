import SectionPage from '@/components/SectionPage'
import { InstitutesAdmin } from '@/components/admin/InstitutesAdmin'

export default async function AdminPage() {
  const titlePage = 'Institutes'
  return (
    <SectionPage titlePage={titlePage}>
      <InstitutesAdmin />
    </SectionPage>
  )
}
