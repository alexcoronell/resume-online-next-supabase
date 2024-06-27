import Image from "next/image";

/* Models */
import { Training } from "@/core/models/Training.interface";

/* Helpers */
import getimageUrl from "@/helpers/getImagesUrl";

import { blurData } from "@/core/data/blurData";

/* Props */
interface TrainingViewPops {
  training: Training;
}

export default async function TrainingItem({ training }: TrainingViewPops) {
  const bucketName = "trainings";
  const { englishTitle, institute, year, month, image } = training;
  const imageUrl = image ? await getimageUrl(bucketName, image) : "";

  return (
    <article className="p-3 max-lg:border max-lg:border-primary lg:bg-backgroundsecondary h-full w-full max-md:max-w-[400px] flex flex-col justify-between">
      <div className="relative w-full max-w-[326px] h-[253px]  md:max-w-[330px] md:h-[256px] lg:max-w-[440px] lg:h-[344px] xl:max-w-[350px] xl:h-[271px] grow-0">
      <Image
          src={imageUrl}
          alt={englishTitle}
          fill={true}
          placeholder="blur"
          blurDataURL={blurData}
        />
      </div>
      <div className="w-full py-2 grow flex flex-col justify-between">
        <div>
        <h3 className="text-xl">{englishTitle}</h3>
        <p className="text-white/80 text-base pb-4">{institute.name}</p>
        </div>
        <p className="text-sm mt-auto text-white/75 font-light">{year} / {month}</p>
      </div>
    </article>
  );
}
