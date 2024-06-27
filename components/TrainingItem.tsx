import getimageUrl from "@/helpers/getImagesUrl";

/* Models */
import { Training } from "@/core/models/Training.interface";

interface TrainingViewPops {
  training: Training;
}

export default async function TrainingItem({ training }: TrainingViewPops) {
  const bucketName = "trainings";
  const { title, englishTitle, institute, year, month, image } = training;
  const imageUrl = image ? await getimageUrl(bucketName, image) : "";

  return (
    <article className="p-3 max-lg:border max-lg:border-primary lg:bg-backgroundsecondary h-full w-full max-md:max-w-[400px] flex flex-col items-center justify-between relative">
      <div className="grow-0">
        <img src={imageUrl} alt={title + " image"} />
      </div>
      <div className="grow flex flex-col items-start w-full h-full">
        <h3 className="text-xl">{englishTitle}</h3>
        <p className="text-white/80 text-base pb-4">{institute.name}</p>
        <p className="mt-auto text-sm text-white/75 font-light">{year} / {month}</p>
      </div>
    </article>
  );
}
