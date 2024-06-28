/* Components */
import SocialMediaItem from "./SocialMediaItem";

/* Models */
import { Contact } from "@/core/models/Contact.interface";

interface ContactViewProps {
  contacts: Contact[]
}

export default function SocialMedia({contacts}: ContactViewProps) {
  return (
    <article className="bg-backgroundsecondary p-10 rounded-3xl h-[470px] overflow-y-auto flex flex-col justify-center w-full max-lg:max-w-[400px] mx-auto lg:h-[500px] special-shadow">
      {contacts.map((contact) => (
        <SocialMediaItem key={contact.id} contact={contact} />
      ))}
    </article>
  );
}