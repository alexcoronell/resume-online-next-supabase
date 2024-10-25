/* Components */
import SectionPage from "@/components/SectionPage";
import TrainingItem from "@/components/TrainingItem";

/* Supabase */
import { createClient } from "@/utils/supabase/client";

/* Models */
import { Training } from "@/core/models/Training.interface";

/* Helpers */
import { orderByYearAndMonth } from "@/helpers/orderByDate";

const supabase = createClient();
export const revalidate = 60;

export default async function Trainings() {
  const { data } = await supabase.from("trainings").select("*, institute(*)").order('created_at', { ascending: false });
  const trainings: Training[] = await orderByYearAndMonth(data);
  const titlePage = "Trainings";

  return (
    <SectionPage titlePage={titlePage}>
      <div className="Studies grid justify-center gap-6 md:grid-cols-2 xl:grid-cols-3">
        {trainings.map((training) => (
          <TrainingItem key={training.id} training={training} />
        ))}
      </div>
    </SectionPage>
  );
}
