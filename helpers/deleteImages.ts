import { createClient } from '@/utils/supabase/client'

const deleteImage = async (bucketName: string, filePath: string) => {
  const supabase = createClient()
  const fileName = filePath.replace(`${bucketName}/`, '')
  return await supabase.storage.from(bucketName).remove([fileName])
}

export default deleteImage
