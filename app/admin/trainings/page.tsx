import SectionPage from '@/components/SectionPage'
import { TrainingAdmin } from '@/components/admin/TrainingAdmin'

export default async function AdminPage() {
  const titlePage = 'Training'
  return (
    <SectionPage titlePage={titlePage}>
      <TrainingAdmin />
    </SectionPage>
  )
}
