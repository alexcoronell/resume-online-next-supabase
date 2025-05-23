/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Helpers */
import getimageUrl from "@/helpers/getImagesUrl";

/* Models */
import { Profile } from "../models/Profile.interface";

import type { UpdateProfileDto } from "../dtos/Profile.dto";

/* Revalidate */
export const revalidate = 60 * 60 * 24;

const profileId = 1;

const supabase = createClient();
const tableName = "profile";
const tableBucketName = "personalData";

const getProfile = async (): Promise<Profile> => {
  const { data } = await supabase.from(tableName).select("*").single();
  const profile: Profile = data;
  profile.image = await getimageUrl(tableBucketName, profile.image);
  return await profile;
};

const updateProfile = async (dto: UpdateProfileDto) => {
  return await supabase.from(tableName).update(dto).eq('id', profileId).select()
}

export { getProfile, updateProfile };