/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Helpers */
import getimageUrl from "@/helpers/getImagesUrl";
import { Profile } from "../models/Profile.interface";

/* Revalidate */
export const revalidate = 60 * 60 * 24;

const supabase = createClient();
const tableName = "profile";
const tableBucketName = "personalData";

const getProfile = async () => {
  const { data } = await supabase.from(tableName).select("*").single();
  const profile: Profile = data;
  profile.image = await getimageUrl(tableBucketName, profile.image);
  return await profile;
};

export default getProfile;