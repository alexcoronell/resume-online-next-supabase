/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Training } from "../models/Training.interface";

/* Helpers */
import { orderByYearAndMonth } from "@/helpers/orderByDate";

/* Revalidate  */
export const revalidate = 60

const supabase = createClient();
const tableName = "trainings";

const getTrainings = async (): Promise<Training[]> => {
  const { data } = await supabase.from(tableName).select("*, institute(*)").order('created_at', { ascending: false });
  const trainings: Training[] = await orderByYearAndMonth(data);
  return await trainings;
};

export default getTrainings;
