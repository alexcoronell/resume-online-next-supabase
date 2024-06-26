import getTrainings from "@/core/services/training.service"

import { Training } from "@/core/models/Training.interface"

import TrainingItem from "@/components/TrainingItem"

export default async function Trainings() {
    const trainings: Training[] = await getTrainings()
    const titlePage = 'Trainings'

    return (
        <div>
            <h1>Training</h1>
            {
                trainings.map(training => (
                    <TrainingItem key={training.id} training={training} />
                )) 
            }
        </div>
    )
}