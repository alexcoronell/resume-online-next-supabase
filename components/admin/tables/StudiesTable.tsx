'use client'
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'

import { ButtonView } from '@/components/shared/buttons/ButtonView'
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete'
import { TrDefault } from '@/components/ui/table/TrDefault'

/* Store */
import { useStudyStore } from '@/store/useStudyStore'

/* Services */
import { deleteStudy } from '@/core/services/study.service'

/* Types */
import { RequestStatus } from '@/core/types/RequestStatus.type'

/* Styles */
import styles from '@/styles/tablets.module.css'

export const StudiesTable: FC = () => {
  const { studies, total, getStudies, currentPage, currentPageSize } =
    useStudyStore()
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchData()
  }, [currentPage, currentPageSize])

  const fetchData = () => {
    setRequestStatus('loading')
    getStudies()
      .then(() => setRequestStatus('success'))
      .catch(() => setRequestStatus('failed'))
  }

  const columns = [
    { title: 'Title', classes: 'text-left' },
    { title: 'Institute', classes: 'text-left max-md:hidden' },
    { title: 'Place', classes: 'text-left max-lg:hidden' },
    { title: 'Since', classes: 'text-center max-xl:hidden' },
    { title: 'Until', classes: 'text-center max-xl:hidden' },
    { title: 'Current', classes: 'text-center max-xl:hidden' },
  ]

  const handleDelete = (id: string) => {
    const res = confirm('Are you sure to delete this study')
    if (res) {
      deleteStudy(id)
        .then(() => {
          alert('Study deleted successfully')
          getStudies()
        })
        .catch(error => {
          console.error('Error deleting study:', error)
          alert('Error deleting study: ' + error.message)
        })
    }
    return
  }

  return (
    <div className={styles.AdminTableContainer}>
      <table className={styles.AdminTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <th key={index} className={column.classes}>
                {column.title}
              </th>
            ))}
            <th className={styles.AdminTable__actionsTh}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requestStatus === 'success' &&
            studies.map(study => (
              <tr key={study.id}>
                <td>{study.title}</td>
                <td className="max-md:hidden">{study.institute}</td>
                <td className="max-lg:hidden">{study.place}</td>
                <td className="text-center max-xl:hidden">{study.since}</td>
                <td className="text-center max-xl:hidden">{study.until}</td>
                <td className="text-center max-xl:hidden">
                  {study.current ? 'Yes' : 'No'}
                </td>
                <td className={styles.AdminTable__actions}>
                  <ButtonView
                    url={`/admin/studies/details/${study.id}`}
                    title={`View ${study.title} details`}
                  />
                  <ButtonDelete
                    id={study.id}
                    deleteFunction={handleDelete}
                    title={`Delete ${study.title}`}
                  />{' '}
                </td>
              </tr>
            ))}
          <TrDefault
            total={total}
            columns={columns.length}
            requestStatus={requestStatus}
          />
        </tbody>
      </table>
    </div>
  )
}
