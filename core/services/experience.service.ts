/* Supabase */
import { createClient } from "@/utils/supabase/server";

/* Models */
import { Experience } from "../models/Experience.interface";

/* Helpers */
import { orderExperiences } from "@/helpers/orderData";

const supabase = createClient();
const tableName = "experiences";

const getExperiences = async (): Promise<Experience[]> => {
  const { data } = await supabase.from(tableName).select("*");
  const experiences: Experience[] = await orderExperiences(
    data as Experience[]
  );
  return await experiences;
};

export default getExperiences;
