import Image from "next/image";

/* Components */
import SkillItem from "./SkillItem";

/* Helpers */
import getimageUrl from "@/helpers/getImagesUrl";

/* Models */
import { Work } from "@/core/models/Work.interface";

import { blurData } from "@/core/data/blurData";

interface WorkViewProps {
  work: Work;
}

export default async function WorkItem({ work }: WorkViewProps) {
  const bucketName = "works";
  const {
    title,
    url,
    repoUrl,
    originRepo,
    publicRepo,
    image,
    order,
    status,
    technologies,
  } = await work;
  const skills = technologies.split(",");
  const imageUrl = await getimageUrl(bucketName, image);
  return (
    <article className="p-1 max-lg:border max-lg:border-primary pb-6 sm:p-6 lg:bg-backgroundsecondary h-full">
      <div className="relative mx-auto flex item justify-center w-[340px] h-[238px] sm:w-[518px] sm:h-[352px] lg:w-[420px] lg:h-[295px] xl:w-[524px] xl:h-[352px]">
        <Image
          src={imageUrl}
          alt={title}
          fill={true}
          placeholder="blur"
          blurDataURL={blurData}
        />
        {/* <img
          src={imageUrl}
          alt={title}
        /> */}
      </div>
      <div className="grid grid-rows-3 gap-y-3">
      <h3 className="my-4 grow-0">{title}</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {skills.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </div>
      <div className="pt-3 py-1 mt-auto flex items-center justify-center grow-0 gap-6">
        {
          url && (<a className="py-4 px-8 border border-primary rounded-3xl text-lg text-primary hover:text-background hover:bg-primary" href={url} target="_blank">Visit</a>)
        }
        {
          publicRepo && (<a className="py-4 px-8 border border-primary rounded-3xl text-lg text-primary hover:text-background hover:bg-primary" href={repoUrl} target="_blank">Visit the code</a>)
        }
      </div>
      </div>
    </article>
  );
}
