/* Components */
import SectionPage from '@/components/SectionPage';
import ExperienceItem from '@/components/ExperienceItem';

/* Services */
import { getSimpleExperiences } from '@/core/services/experience.service';

/* Models */
import { Experience } from '@/core/models/Experience.interface';

export default async function Experiences() {
  const experiences: Experience[] = await getSimpleExperiences();
  const titlePage = 'Experiences';
  return (
    <SectionPage titlePage={titlePage}>
      <div className='Experiences grid justify-center gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {experiences.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </SectionPage>
  );
}
