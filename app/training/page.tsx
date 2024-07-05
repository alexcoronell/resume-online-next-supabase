/* Components */
import SectionPage from "@/components/SectionPage";
import TrainingItem from "@/components/TrainingItem";

/* Services */
import getTrainings from "@/core/services/training.service";

/* Models */
import { Training } from "@/core/models/Training.interface";

export const revalidate = 30;

export default async function Trainings() {
  const trainings: Training[] = await getTrainings();
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
