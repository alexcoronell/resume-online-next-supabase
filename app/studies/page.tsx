/* Components */
import SectionPage from '@/components/SectionPage';
import StudyItem from '@/components/StudyItem';

/* Api */
import { getSimpleStudies } from '../../core/services/study.service';

/* Models */
import type { Study } from '@/core/models/Study.interface';

export default async function Studies() {
  const studies: Study[] = await getSimpleStudies();
  const titlePage = 'Studies';

  return (
    <SectionPage titlePage={titlePage}>
      <div className='Studies grid justify-center gap-6 md:grid-cols-2 xl:grid-cols-3'>
        {studies.map((study) => (
          <StudyItem key={study.id} study={study} />
        ))}
      </div>
    </SectionPage>
  );
}