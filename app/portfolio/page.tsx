import { createClient } from "@/utils/supabase/server";
import WorkItem from '../../components/WorkItem'

export default async function Portfolio() {
  const supabase = createClient();
  const tableName = "works";
  const titlePage = 'Portfolio'
  const {data: works } = await supabase.from(tableName).select('*').order('order', {ascending: false});
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
