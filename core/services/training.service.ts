import { createClient } from "@/utils/supabase/server";
import { Training } from "../models/Training.interface";
import { orderByYearAndMonth } from "@/helpers/orderByDate";

const supabase = createClient();
const tableName = "trainings";

const getTrainings = async (): Promise<Training[]> => {
  const { data } = await supabase.from(tableName).select('*, institute(*)');
  const trainings: Training[] = orderByYearAndMonth(data);
  return trainings;
};

export default getTrainings;
