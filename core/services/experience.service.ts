/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Experience } from "../models/Experience.interface";

/* Helpers */
import { orderExperiences } from "@/helpers/orderData";

const supabase = createClient();
const tableName = "experiences";
export const revalidate = 30;

const getExperiences = async (): Promise<Experience[]> => {
  const { data } = await supabase.from(tableName).select("*");
  const experiences: Experience[] = await orderExperiences(
    data as Experience[]
  );
  return await experiences;
};

export default getExperiences;
