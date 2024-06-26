import getStudies from '../../core/services/study.service'

import { Study } from '@/core/models/Study.interface'

import StudyItem from '@/components/StudyItem'

export default async function Studies() {
    const studies: Study[] = await getStudies()
    const titlePage = 'Studies'

    return (
        <div>
            <h1>Studies</h1>
            {studies.map(study => (
                <StudyItem key={study.id} study={study} />
            ))}
        </div>
    )
}