import { createClient } from "@/utils/supabase/client";
import { Contact } from "../models/Contact.interface";

const supabase = createClient();
const tableName = "social_media";

const getContacts = async (): Promise<Contact[]> => {
  const { data } = await supabase.from(tableName).select("*").order("name");
  const contact: Contact[] = data as Contact[];
  return contact;
};

export default getContacts;
