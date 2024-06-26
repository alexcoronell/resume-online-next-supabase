import { createClient } from "@/utils/supabase/server";
import getimageUrl from "@/helpers/getImagesUrl";

export default async function Index() {
  const supabase = createClient();
  const tableName = 'profile'
  const tableBucketName = 'personalData'
  const { data: personalData } = await supabase.from(tableName).select('*').single()
  const { image } = await personalData
  const imageUrl = await getimageUrl(tableBucketName, await image)

  return (
    <article>
      <h1>{ personalData.firstname} { personalData.lastname }</h1>
      <h2>{ personalData.title }</h2>
      <p>{ personalData.description }</p>
      <img src={imageUrl} alt={personalData.firstname + ' ' + personalData.lastname + ' profile image'} />
    </article>
  );
}
