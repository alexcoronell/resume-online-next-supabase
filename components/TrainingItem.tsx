import getimageUrl from "@/helpers/getImagesUrl";

/* Models */
import { Training } from "@/core/models/Training.interface";

interface TrainingViewPops {
  training: Training;
}

export default async function TrainingItem({ training }: TrainingViewPops) {
  const bucketName = "trainings";
  const { title, englishTitle, institute, year, month, image } = training;
  const imageUrl = image ? await getimageUrl(bucketName, image) : ''

  return (
    <article>
        <img src={imageUrl} alt={title + ' image'} />
        <h3>{englishTitle}</h3>
        <p>{ institute.name }</p>
    </article>
  )
}
