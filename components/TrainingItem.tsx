import Image from "next/image";

/* Models */
import { Training } from "@/core/models/Training.interface";

/* Helpers */
import getimageUrl from "@/helpers/getImagesUrl";

/* Data */
import { blurDataTraining } from "@/core/data/blurData";

/* Helpers */
import { monthToText } from "@/helpers/monthToText";

/* Props */
interface TrainingViewPops {
  training: Training;
}

/* Styles */
import styles from "../styles/training-item.module.css";

export default async function TrainingItem({ training }: TrainingViewPops) {
  const bucketName = "trainings";
  const { englishTitle, institute, year, month, image } = training;
  let imageUrl = "";

  if (image) {
    imageUrl = await getimageUrl(bucketName, image);
  }

  return (
    <article className={styles.TrainingItem + " special-shadow"}>
      <div className={styles.TrainingItem__imageArea}>
        <Image
          src={imageUrl}
          alt={englishTitle}
          fill={true}
          placeholder="blur"
          blurDataURL={blurDataTraining}
        />
      </div>
      <div className={styles.TrainingItem__details}>
        <div>
          <h3>{englishTitle}</h3>
          <p>{institute.name}</p>
        </div>
        <time>
          <p>
            {monthToText(month as number)} {year}
          </p>
        </time>
      </div>
    </article>
  );
}
