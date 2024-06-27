/* Components */
import SectionPage from "@/components/SectionPage";
import WorkItem from "../../components/WorkItem";

import getWorks from "@/core/services/work.services";

export default async function Portfolio() {
  const titlePage = "Portfolio";
  const works = await getWorks();
  return (
    <SectionPage titlePage={titlePage}>
      <div className="Portfolio grid justify-center gap-6 lg:grid-cols-2">
        {works?.map((work, index) => (
          <WorkItem key={index} work={work} />
        ))}
      </div>
    </SectionPage>
  );
}
