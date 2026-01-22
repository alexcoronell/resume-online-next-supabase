'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/form/Input'
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit'
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary'
import { ButtonLight } from '../../shared/buttons/button-light'

import {
  CreateInstituteDto,
  UpdateInstituteDto,
} from '@/core/dtos/Institute.dto'
import type { RequestStatus } from '@/core/types/RequestStatus.type'
import { StatusForm } from '@/core/types/StatusForm.type'

import {
  addInstitute,
  updateInstitute,
  getInstituteById,
} from '@/core/services/institute.service'

import styles from '@/styles/formContainer.module.css'

interface InstituteFormProps {
  _id?: string | null
}

export function InstitutesForm({ _id = null }: InstituteFormProps) {
  const router = useRouter()
  const [institute, setInstitute] = useState<
    CreateInstituteDto | UpdateInstituteDto
  >({
    name: '',
    url: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    url: '',
  })
  const [id, setId] = useState<string | null>(null)
  const [titlePage, setTitlePage] = useState('Create Institute')
  const [titleButton, setTitleButton] = useState('Add')
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init')
  const [statusForm, setStatusForm] = useState<StatusForm>('create')

  useEffect(() => {
    if (_id) {
      setId(_id)
      setStatusForm('details')
      setTitlePage('Details Institute')
      getInstitute(_id)
    }
  }, [])

  const getInstitute = async (id: string) => {
    setRequestStatus('loading')
    try {
      const data = await getInstituteById(id)
      if (!data) throw new Error('Error fetching Institute')
      setInstitute({
        name: data.name,
        url: data.url,
      })
      setRequestStatus('success')
    } catch (error) {
      setRequestStatus('failed')
      alert('Error fetching institute')
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInstitute(prev => ({
      ...prev,
      [name]: value,
    }))
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value.trim() === '') {
      setErrors(prev => ({
        ...prev,
        [name]: `${name} is required`,
      }))
    }
  }

  const handleCancelEdit = () => {
    setStatusForm('details')
    setTitlePage('Details Institute')
    getInstituteById(id as string)
    setErrors({
      name: '',
      url: '',
    })
    setRequestStatus('init')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = {
      name: institute.name.trim() === '' ? 'Title is required' : '',
      url: institute.url.trim() === '' ? 'Institute is required' : '',
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(error => error !== '')) {
      return
    }
    // Submit the form
    if (statusForm === 'create') {
      setRequestStatus('loading')
      addInstitute(institute)
        .then(res => {
          if (!res) throw new Error('Error adding institute')
          setRequestStatus('success')
          alert('Institute added successfully')
          router.push('/admin/institutes')
        })
        .catch(error => {
          setRequestStatus('failed')
          alert('Error adding institute')
          console.log(error)
        })
      // Reset the form
      setInstitute({
        name: '',
        url: '',
      })
      setErrors({
        name: '',
        url: '',
      })
    } else if (statusForm === 'edit') {
      setRequestStatus('loading')
      updateInstitute(id as string, institute as UpdateInstituteDto)
        .then(res => {
          if (!res) throw new Error('Error updating institute')
          setRequestStatus('success')
          alert('institute updated successfully')
          setStatusForm('details')
          setTitlePage('Details institute')
          setErrors({
            name: '',
            url: '',
          })
        })
        .catch(error => {
          setRequestStatus('failed')
          alert('Error updating institute')
          console.log(error)
        })
    }
  }

  return (
    <div className={styles.FormContainer}>
      <h2 className="titleForm">{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form
          className="mx-auto w-full max-w-[600px] gap-x-3 px-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Name"
            name="name"
            id="name"
            type="text"
            classes="w-full"
            value={institute.name}
            errorMessage={errors.name}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.name}
            readonly={statusForm === 'details'}
          />
          <Input
            placeholder="Url"
            name="url"
            id="url"
            type="text"
            classes="w-full"
            value={institute.url}
            errorMessage={errors.url}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.url}
            readonly={statusForm === 'details'}
          />
          <div className="col-span-2 mx-auto grid w-full max-w-[400px] grid-cols-2 gap-3">
            {statusForm !== 'details' && (
              <ButtonSubmit title={titleButton} requestStatus={requestStatus} />
            )}
            {statusForm === 'details' && (
              <ButtonSecondary
                title="Edit"
                onClick={() => {
                  setStatusForm('edit')
                  setTitlePage('Edit Study')
                  setTitleButton('Update')
                }}
              />
            )}
            {statusForm !== 'edit' && (
              <ButtonLight
                title="Cancel / Back"
                onClick={() => router.back()}
              />
            )}
            {statusForm === 'edit' && (
              <ButtonLight title="Cancel" onClick={handleCancelEdit} />
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
