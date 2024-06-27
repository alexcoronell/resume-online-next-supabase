/* Components */
import ExperienceFunctions from "./ExperienceFunctions";

/* Services */
import getExperienceFunctions from "@/core/services/experience-functions.service";

/* Models */
import { Experience } from "@/core/models/Experience.interface";


interface ExpetienceItemViewProps {
  experience: Experience;
}

export default async function ExperienceItem({
  experience,
}: ExpetienceItemViewProps) {
  const { id, nameBusiness, position, place, since, until, current } =
    experience;
const functions = await getExperienceFunctions(id)
  return (
    <article className="p-3 max-lg:border max-lg:border-primary pb-6 sm:p-6 lg:bg-backgroundsecondary h-full w-full max-md:max-w-[400px] flex flex-col items-center justify-between gap-3">
      <h3 className="text-2xl">{nameBusiness}</h3>
      <div className="px-7 py-4 border border-primary w-full">
        <h5 className="mb-3 text-white/90 text-left text-lg">
          Position: {position}
        </h5>
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
      <ExperienceFunctions functions={functions} />
    </article>
  );
}
