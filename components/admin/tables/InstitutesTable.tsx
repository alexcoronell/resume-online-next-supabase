'use client'
import React, { useEffect, useState } from 'react'

/* Components */
import { ButtonView } from '@/components/shared/buttons/ButtonView'
import { ButtonDelete } from '@/components/shared/buttons/ButtonDelete'
import { TrDefault } from '@/components/ui/table/TrDefault'

/* Store */
import { useInstituteStore } from '@/store/useInstituteStore'

/* Services */
import { deleteInstitute } from '@/core/services/institute.service'

/* Types */
import { RequestStatus } from '@/core/types/RequestStatus.type'

/* Styles */
import styles from '@/styles/tablets.module.css'

export function InstitutesTable() {
  const { institutes, total, getInstitutes, currentPage, currentPageSize } =
    useInstituteStore()
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
    getInstitutes()
      .then(() => setRequestStatus('success'))
      .catch(() => setRequestStatus('failed'))
  }

  const columns = [
    { title: 'Name', classes: 'text-left' },
    { title: 'Url', classes: 'text-left max-md:hidden' },
  ]

  const handleDelete = (id: string) => {
    const res = confirm('Are you sure to delete this institute')
    if (res) {
      deleteInstitute(id)
        .then(() => {
          alert('institute deleted successfully')
          getInstitutes()
        })
        .catch(error => {
          console.error('Error deleting institute:', error)
          alert('Error deleting institute: ' + error.message)
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
            institutes.map((institute, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <tr key={index}>
                <td className="text-left">{institute.name}</td>
                <td className="text-left max-md:hidden">{institute.url}</td>
                <td className={styles.AdminTable__actions}>
                  <ButtonView
                    url={`/admin/institutes/details/${institute.id}`}
                    title={`View ${institute.name} details`}
                  />
                  <ButtonDelete
                    id={institute.id}
                    deleteFunction={handleDelete}
                    title={`Delete ${institute.name}`}
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
