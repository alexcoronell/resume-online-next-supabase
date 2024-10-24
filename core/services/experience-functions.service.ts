/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Experience } from "../models/Experience.interface";
import { ExperienceFunction } from "../models/ExperienceFunction";

const supabase = createClient();
const tableName = "experience_functions";

/* Revalidate */
export const revalidate = 60 * 60 * 24 * 7;

const getExperienceFunctions = async (
  id: Experience["id"]
): Promise<ExperienceFunction[]> => {
  const { data } = await supabase
    .from(tableName)
    .select("*")
    .eq("experienceId", id);
  const experienceFunctions: ExperienceFunction[] =
    (await data) as ExperienceFunction[];
  return await experienceFunctions;
};

export default getExperienceFunctions;
