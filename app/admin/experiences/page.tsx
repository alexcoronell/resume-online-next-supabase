import SectionPage from '@/components/SectionPage'
import { ExperiencesAdmin } from '@/components/admin/ExperiencesAdmin'

export default async function AdminPage() {
  const titlePage = 'Experiences'
  return (
    <SectionPage titlePage={titlePage}>
      <ExperiencesAdmin />
    </SectionPage>
  )
}
