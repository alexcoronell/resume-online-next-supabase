import { createClient } from "@/utils/supabase/server";

const getimageUrl = async (bucketName: string, filePath: string) => {
  const supabase = createClient();
  const fileName = filePath.replace(`${bucketName}/`, "");
  const { data } = await supabase.storage.from(bucketName).getPublicUrl(fileName);
  const { publicUrl } = await data
  return await publicUrl
};

export default getimageUrl;
