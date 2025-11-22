/* Models */
import { Study } from '@/core/models/Study.interface'

/* Props */
interface StudyItemProps {
  study: Study
}

/* Styles */
import styles from '../styles/study-item.module.css'

export default async function StudyItem({ study }: StudyItemProps) {
  const { title, institute, place, since, until, current } = study

  return (
    <article className={styles.StudyItem + ' special-shadow'}>
      <h3>{title}</h3>
      <div className={styles.StudyItem__details}>
        <h5>Institute: {institute}</h5>
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
    </article>
  )
}
