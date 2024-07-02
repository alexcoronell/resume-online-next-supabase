/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Study } from "../models/Study.interface";

/* Helpers */
import { orderStudies } from "@/helpers/orderData";

const supabase = createClient();
const tableName = "studies";
export const revalidate = 30;

const getStudies = async (): Promise<Study[]> => {
  const { data } = await supabase.from(tableName).select("*");
  const studies: Study[] = await orderStudies(data as Study[]);
  return await studies;
};

export default getStudies;
