import { createClient } from "@/utils/supabase/server";
import { Training } from "../models/Training.interface";

const supabase = createClient();
const tableName = "trainings";

const getTrainings = async (): Promise<Training[]> => {
  const { data } = await supabase.from(tableName).select('*, institute(*)');
  const trainings: Training[] = data as Training[];
  return trainings;
};

export default getTrainings;
