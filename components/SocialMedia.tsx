/* Components */
import SocialMediaItem from './SocialMediaItem'

/* Models */
import { Contact } from '@/core/models/Contact.interface'

interface ContactViewProps {
  contacts: Contact[]
}

export default function SocialMedia({ contacts }: ContactViewProps) {
  const finalContacts = contacts ? contacts : []
  return (
    <article className="special-shadow mx-auto flex h-[470px] w-full flex-col justify-center overflow-y-auto rounded-3xl bg-backgroundsecondary p-10 max-lg:max-w-[400px] lg:h-[500px]">
      {finalContacts.map(contact => (
        <SocialMediaItem key={contact.id} contact={contact} />
      ))}
    </article>
  )
}
