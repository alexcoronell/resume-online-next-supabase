import { createClient } from "@/utils/supabase/server";
import getimageUrl from "@/helpers/getImagesUrl";
import { Work } from "../models/Work.interface";

const supabase = createClient();
const tableName = "works";
const bucketName = "works";

const getWorks = async ():Promise<Work[]> => {
  const { data } = await supabase
    .from(tableName)
    .select("*")
    .order("order", { ascending: false });
  const works: Work[] = data as Work[];
  return works;
};

export default getWorks;
