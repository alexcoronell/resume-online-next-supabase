import { createClient } from "@/utils/supabase/server";
import { Experience } from "../models/Experience.interface";

const supabase = createClient();
const tableName = "experiences";

const getExperiences = async (): Promise<Experience[]> => {
  const { data } = await supabase.from(tableName).select('*');
  const experiences: Experience[] = data as Experience[];
  return experiences;
};

export default getExperiences;
