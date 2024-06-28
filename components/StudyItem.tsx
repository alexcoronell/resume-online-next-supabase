/* Models */
import { Study } from "@/core/models/Study.interface";

interface StudyItemProps {
  study: Study;
}

export default async function StudyItem({ study }: StudyItemProps) {
  const { title, institute, place, since, until, current } = study;

  return (
    <article className="p-3 max-lg:border max-lg:border-primary pb-6 sm:p-6 lg:bg-backgroundsecondary h-full w-full max-md:max-w-[400px] flex flex-col items-center justify-between gap-3">
      <h3 className="mb-3 text-2xl">{title}</h3>
      <div className="px-7 py-4 border border-primary w-full">
      <h5 className="mb-3 text-white/90 text-left text-lg">Institute: {institute}</h5>
      <ul className="list-disc text-white/50">
        <li>
          <p>Place: {place}</p>
        </li>
        <li>
          <p>Since: {since}</p>
        </li>
        {current ? (
          <li>
            <p>Current</p>
          </li>
        ) : (
          <li>
            <p>Until: {until}</p>
          </li>
        )}
      </ul>
      </div>
    </article>
  );
}
