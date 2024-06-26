import { Contact } from "@/core/models/Contact.interface";

interface ContactViewProps {
    contact: Contact
}

export default function SocialMediaItem({contact}: ContactViewProps ) {
    const { name, url, show, icon } = contact
    return (
        <p>{name}</p>
    )
}