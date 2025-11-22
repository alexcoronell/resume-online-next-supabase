'use client'
import { useState } from 'react'

/* Component */
import { MajesticonsClose } from './ui/MajesticonsClose'

/* Models */
import { ExperienceFunction } from '@/core/models/ExperienceFunction'

/* Props */
interface ExperienceFunctionViewProps {
  functions: ExperienceFunction[]
}

/* Styles */
import styles from '../styles/experience-functions.module.css'

export default function ExperienceFunctions({
  functions,
}: ExperienceFunctionViewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const functionItems = functions
  const handleClick = (open: boolean) => setIsOpen(open)

  return (
    <div className={styles.ExperienceFunctions}>
      <button onClick={() => handleClick(true)} className="btn-primary">
        Functions
      </button>
      {isOpen && (
        <div
          className={`${isOpen ? 'opacity-100' : 'opacity-0'} ${styles.ExperienceFunctions__fixedBox}`}
        >
          <div className={styles.ExperienceFunctions__subBox}>
            <div
              className={
                styles.ExperienceFunctions__contentBox + ' special-shadow'
              }
            >
              <div className={styles.ExperienceFunctions__closeButtonTopBox}>
                <button onClick={() => handleClick(false)}>
                  <MajesticonsClose className="size-8 text-primary" />
                </button>
              </div>
              <h4>Functions</h4>
              <div className={styles.ExperienceFunctions__details}>
                <ul>
                  {functions.map(item => (
                    <li className="mb-3" key={item.id}>
                      {item.functionDetail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.ExperienceFunctions__closeButtonBottomBox}>
                <button
                  onClick={() => handleClick(false)}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
