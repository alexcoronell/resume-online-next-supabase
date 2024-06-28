import Image from "next/image";

/* Components */
import SkillItem from "./SkillItem";

/* Helpers */
import getimageUrl from "@/helpers/getImagesUrl";

/* Models */
import { Work } from "@/core/models/Work.interface";

/* Blur Data */
import { blurData } from "@/core/data/blurData";

/* Styles */
import styles from "../styles/work-item.module.css";

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

  let imageUrl = "";
  if (image) {
    imageUrl = await getimageUrl(bucketName, image);
  }
  
  return (
    <article className={styles.WorkItem + ' special-shadow'}>
      <div className={styles.WorkItem__imageArea}>
        <Image
          src={imageUrl}
          alt={title}
          fill={true}
          placeholder="blur"
          blurDataURL={blurData}
        />
      </div>
      <div className={styles.WorkItem__details}>
        <div className="py-1 grow-0">
          <h3>{title}</h3>
          <p>Status: {status}</p>
        </div>
        <div className={styles.WorkItem__technologies}>
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
        <div className={styles.WorkItem__buttonArea}>
          {url && (
            <a className="btn-primary" href={url} target="_blank">
              Visit
            </a>
          )}
          {publicRepo && (
            <a className="btn-primary" href={repoUrl} target="_blank">
              Visit the code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
