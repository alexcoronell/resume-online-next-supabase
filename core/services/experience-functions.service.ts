/* Supabase */
import { createClient } from "@/utils/supabase/server";

/* Models */
import { Experience } from "../models/Experience.interface";
import { ExperienceFunction } from "../models/ExperienceFunction";

const supabase = createClient();
const tableName = "experience_functions";

const getExperienceFunctions = async (
  id: Experience["id"]
): Promise<ExperienceFunction[]> => {
  const { data } = await supabase
    .from(tableName)
    .select("*")
    .eq("experienceId", id);
  const experienceFunctions: ExperienceFunction[] =
    data as ExperienceFunction[];
  return experienceFunctions;
};

export default getExperienceFunctions;
