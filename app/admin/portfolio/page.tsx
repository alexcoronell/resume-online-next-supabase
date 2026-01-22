import SectionPage from '@/components/SectionPage'
import { PortfolioAdmin } from '@/components/admin/PortfolioAdmin'

export default async function AdminPage() {
  const titlePage = 'Portfolio'
  return (
    <SectionPage titlePage={titlePage}>
      <PortfolioAdmin />
    </SectionPage>
  )
}
