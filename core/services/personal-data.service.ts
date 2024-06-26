import { createClient } from "@/utils/supabase/server";
import getimageUrl from "@/helpers/getImagesUrl";
import { PersonalData } from "../models/PersonalData.interface";

const supabase = createClient();
const tableName = "profile";
const tableBucketName = "personalData";

const getPersonalData = async () => {
  const { data } = await supabase.from(tableName).select("*").single();
  const personalData: PersonalData = data;
  personalData.image = await getimageUrl(tableBucketName, personalData.image);
  return personalData;
};

export default getPersonalData;
