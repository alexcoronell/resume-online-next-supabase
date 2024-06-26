/* Models */
import { Study } from "@/core/models/Study.interface";

interface StudyItemProps {
  study: Study;
}

export default async function StudyItem({ study }: StudyItemProps) {
  const { title, institute, place, since, until, current } = study;

  return (
    <article>
        <h3>{title}</h3>
        <h5>{institute}</h5>
    </article>
  )
}
