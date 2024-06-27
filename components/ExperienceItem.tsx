/* Models */
import { Experience } from "@/core/models/Experience.interface";

interface ExpetienceItemViewProps {
  experience: Experience;
}

export default function ExperienceItem({
  experience,
}: ExpetienceItemViewProps) {
  const { nameBusiness, position, place, since, until, current, functions } =
    experience;
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
        <button className="py-4 px-5 border border-primary text-primary rounded-3xl hover:bg-primary hover:text-background">Functions</button>
    </article>
  );
}
