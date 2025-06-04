import SectionPage from '@/components/SectionPage';
import WorkItem from '../../components/WorkItem';
import { getSimpleWorks } from '@/core/services/work.service';

export default async function Portfolio() {
  const titlePage = 'Portfolio';
  const {data} = await getSimpleWorks();
  return (
    <SectionPage titlePage={titlePage}>
      <div className='Portfolio grid justify-center gap-6 lg:grid-cols-2'>
        {data?.map((work, index) => (
          <WorkItem key={index} work={work} />
        ))}
      </div>
    </SectionPage>
  );
}
