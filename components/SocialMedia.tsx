import getContacts from "@/core/services/contact.service";

import { Contact } from "@/core/models/Contact.interface";

import SocialMediaItem from "./SocialMediaItem";

export default async function SocialMedia() {
  const contacts: Contact[] = await getContacts();
  console.log(contacts);
  return (
    <article>
      {contacts.map((contact) => (
        <SocialMediaItem key={contact.id} contact={contact} />
      ))}
    </article>
  );
}
