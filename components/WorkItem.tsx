import getimageUrl from "@/helpers/getImagesUrl";

/* Models */
import { Work } from "@/core/models/Work.interface";

interface WorkViewProps {
  work: Work;
}

export default async function WorkItem({ work }: WorkViewProps) {
  const bucketName = "works";
  const { title, url, repoUrl, originRepo, publicRepo, image, order, status, technologies } = await work
  const imageUrl = await getimageUrl(bucketName, image)
  return (
    <article>
      <h3>{title}</h3>
      <img src={imageUrl} alt={title} />
    </article>
  )
}
