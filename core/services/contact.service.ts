/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Contact } from "../models/Contact.interface";

/* Revalidate  */
export const revalidate = 60

const supabase = createClient();
const tableName = "social_media";

const getContacts = async (): Promise<Contact[]> => {
  const { data } = await supabase.from(tableName).select("*").order("name");
  const contact: Contact[] = (await data) as Contact[];
  return await contact;
};

export default getContacts;
