export const runtime = 'edge';

/* Components */
import SectionPage from "@/components/SectionPage";
import TrainingItem from "@/components/TrainingItem";

/* Supabase */
// Importa el cliente de Supabase para realizar consultas a la base de datos desde el navegador
import { createClient } from "@/utils/supabase/client";

/* Models */
import type { Training } from "@/core/models/Training.interface";

/* Helpers */
import { orderByYearAndMonth } from "@/helpers/orderByDate";

// This line forces server-side rendering (SSR) on every request, disabling the cache
export const dynamic = 'force-dynamic';

export default async function Trainings() {
  const supabase = createClient();
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
