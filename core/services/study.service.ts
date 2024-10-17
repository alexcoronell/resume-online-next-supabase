/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Study } from "../models/Study.interface";

/* Helpers */
import { orderStudies } from "@/helpers/orderData";

/* Revalidate  */
export const revalidate = 60

const supabase = createClient();
const tableName = "studies";

const getStudies = async (): Promise<Study[]> => {
  const { data } = await supabase.from(tableName).select("*");
  const studies: Study[] = await orderStudies(data as Study[]);
  return await studies;
};

export default getStudies;
