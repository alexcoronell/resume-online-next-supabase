/* Components */
import ExperienceFunctions from './ExperienceFunctions'

/* Services */
import { getExperienceFunctions } from '@/core/services/experience-functions.service'

/* Models */
import { Experience } from '@/core/models/Experience.interface'
import { ExperienceFunction } from '@/core/models/ExperienceFunction'

/* Props */
interface ExpetienceItemViewProps {
  experience: Experience
}

/* Styles */
import styles from '@/styles/experience-item.module.css'

export default async function ExperienceItem({
  experience,
}: ExpetienceItemViewProps) {
  const { id, nameBusiness, position, place, since, until, current } =
    experience
  const { data: functions } = await getExperienceFunctions(id)
  return (
    <article className={styles.ExperienceItem + ' special-shadow'}>
      <h3>{nameBusiness}</h3>
      <div className={styles.ExperienceItem__details}>
        <h5>Position: {position}</h5>
        <ul>
          <li>
            <p>Place: {place}</p>
          </li>
          <li>
            <p>Since: {since}</p>
          </li>
          {current ? (
            <li>
              <p>Current</p>
            </li>
          ) : (
            <li>
              <p>Until: {until}</p>
            </li>
          )}
        </ul>
      </div>
      <ExperienceFunctions functions={functions as ExperienceFunction[]} />
    </article>
  )
}
