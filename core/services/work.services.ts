/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Work } from "../models/Work.interface";

const supabase = createClient();
const tableName = "works";

const getWorks = async (): Promise<Work[]> => {
  const { data } = await supabase
    .from(tableName)
    .select("*")
    .order("order", { ascending: false });
  const works: Work[] = (await data) as Work[];
  return await works;
};

export default getWorks;
