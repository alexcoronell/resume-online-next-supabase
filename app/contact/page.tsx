/* Components */
import SectionPage from '@/components/SectionPage'
import FormContact from '@/components/FormContact'
import SocialMedia from '@/components/SocialMedia'

/* Services */
import getContacts from '@/core/services/contact.service'

/* Interface */
import { Contact } from '@/core/models/Contact.interface'

export default async function ContactPage() {
  const titlePage = 'Contact'
  const contacts: Contact[] = await getContacts()
  return (
    <SectionPage titlePage={titlePage}>
      <div className="h-full items-center gap-x-10 lg:grid lg:grid-cols-2">
        <FormContact />
        <SocialMedia contacts={contacts} />
      </div>
    </SectionPage>
  )
}
