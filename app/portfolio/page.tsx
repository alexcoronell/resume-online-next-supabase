import getWorks from '@/core/services/work.services';
import WorkItem from '../../components/WorkItem'

export default async function Portfolio() {
  const titlePage = 'Portfolio'
  const works = await getWorks()
  console.log(works)

  return (
    <div>
        <h1>{ titlePage }</h1>
        {
            works?.map((work, index) => (<WorkItem key={index} work={work} />))
        }
    </div>
  );
}
