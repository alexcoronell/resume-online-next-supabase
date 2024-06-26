import { createClient } from "@/utils/supabase/server";
import { Study } from "../models/Study.interface";

const supabase = createClient();
const tableName = "studies";

const getStudies = async (): Promise<Study[]> => {
  const { data } = await supabase.from(tableName).select("*");
  const studies: Study[] = data as Study[];
  return studies;
};

export default getStudies;
