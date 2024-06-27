/* Components */
import { BxlGithub } from "./ui/BxlGithub";
import { BxlGmail } from "./ui/BxlGmail";
import { BxlLinkedin } from "./ui/BxlLinkedin";
import { BxlWhatsapp } from "./ui/BxlWhatsapp";
import { FlowbiteEnvelopeOutline } from "./ui/FlowbiteEnvelopeOutline";
import { IconoirWww } from "./ui/IconoirWww";

import { Contact } from "@/core/models/Contact.interface";

interface ContactViewProps {
  contact: Contact;
}

export default function SocialMediaItem({ contact }: ContactViewProps) {
  const { name, url, show, icon } = contact;
  let currentIcon = undefined;

  const FinalIcon = () => {
      switch (name) {
        case "Github": return <BxlGithub className="size-11" />;
        case "Gmail": return <BxlGmail className="size-11" />;
        case "Linkedin": return <BxlLinkedin className="size-11" />;
        case "Whatsapp": return <BxlWhatsapp className="size-11" />;
        case "Email": return <FlowbiteEnvelopeOutline className="size-11" />;
        case "wwww": return <IconoirWww className="size-11" />;
        default: return  <IconoirWww className="size-11" />;
      }
  }
  let plus = "";
  let finalLink = "";
  const numbers = url.replace(/[^0-9]/g, "").length;
  if (url.includes("@")) {
    finalLink = `mailto:${url}`;
  } else if (numbers >= 10) {
    const finalNumber = url.replace("+", "");
    finalLink = `https://wa.me/${finalNumber}?text=I%20need%20more%20information`;
    plus = "+";
  } else {
    finalLink = url
  }

  if (show) {
    return (
      <a className="flex items-center gap-x-5 mb-5 hover:text-primary" target="_blank" href={finalLink}>
       <FinalIcon />
        <p className="text-xs sm:text-sm md:text-base">
          {plus}
          {url.replace('https://', '').replace('www.', '')}
        </p>
      </a>
    );
  } else {
    return null;
  }
}
