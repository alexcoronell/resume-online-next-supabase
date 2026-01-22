'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/form/Input'
import { InputSelect } from '@/components/ui/form/InputSelect'
import { InputFile } from '@/components/ui/form/InputFile'
import { InputCheck } from '@/components/ui/form/InputCheck'
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit'
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary'
import { ButtonLight } from '../../shared/buttons/button-light'

import { CreateWorkDto, UpdateWorkDto } from '@/core/dtos/Work.dto'

import type { RequestStatus } from '@/core/types/RequestStatus.type'
import { StatusForm } from '@/core/types/StatusForm.type'

import { addWork, updateWork, getWorkById } from '@/core/services/work.service'
import { uploadImage, verifyImage } from '@/helpers/uploadImage'
import deleteImage from '@/helpers/deleteImages'

import styles from '@/styles/formContainer.module.css'

interface PortfolioFormProps {
  _id?: string | null
}

export function PortfolioForm({ _id = null }: PortfolioFormProps) {
  const router = useRouter()
  const [work, setWork] = useState<CreateWorkDto | UpdateWorkDto>({
    title: '',
    url: '',
    repoUrl: '',
    originRepo: 'Github',
    publicRepo: false,
    image: '',
    order: 0,
    status: 'Inactive',
    technologies: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    order: '',
    status: '',
  })

  const originRepositoryOptions = [
    { value: 'None', label: 'None' },
    { value: 'Github', label: 'Github' },
    { value: 'Gitlab', label: 'Gitlab' },
    { value: 'Bitbucket', label: 'Bitbucket' },
    { value: 'Other', label: 'Other' },
  ]

  const statusWorkOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Archived', label: 'Archived' },
    { value: 'In development', label: 'In development' },
    { value: 'Developing', label: 'Developing' },
    { value: 'Completed', label: 'Completed' },
  ]

  const technologyOptions: string[] = [
    'AlpineJS',
    'Angular',
    'Astro',
    'Bootstrap',
    'CSS',
    'Firebase',
    'GIT',
    'HTML',
    'JQuery',
    'Javascript',
    'Linux',
    'Material',
    'MongoDB',
    'MySQL',
    'NestJS',
    'NextJS',
    'NodeJS',
    'PHP',
    'PostgreSQL',
    'PreactJS',
    'React',
    'Sass',
    'Svelte',
    'TailwindCSS',
    'Typescript',
  ]

  const [id, setId] = useState<string | null>(null)
  const [titlePage, setTitlePage] = useState('Create Work')
  const [titleButton, setTitleButton] = useState('Add')
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init')
  const [statusForm, setStatusForm] = useState<StatusForm>('create')
  const [titleInputFileButton, setTitleInputFileButton] =
    useState('Current image')
  const [image, setImage] = useState<string>('')
  const [imageFilename, setImageFilename] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [currentSkills, setCurrentSkills] = useState<string[]>([])
  const [currentSkillOptions, setCurrentSkillOptions] = useState<Array<string>>(
    []
  )
  const [filteredTechnologyOptions, setFilteredTechnologyOptions] = useState<
    string[]
  >([])

  const bucketName = 'works'

  useEffect(() => {
    if (_id) {
      setId(_id)
      setStatusForm('details')
      setTitlePage('Details Portfolio')
      getWork(_id)
    } else {
      setFilteredTechnologyOptions(technologyOptions)
    }
  }, [])

  const filterSkillOptions = (skills: string[] | null = null) => {
    const currentSkills = skills || work.technologies
    const filteredOptions = technologyOptions.filter(
      item => !currentSkills.includes(item)
    )
    setFilteredTechnologyOptions(filteredOptions)
  }

  const addNewSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value
    const newSkills = currentSkills
    const newSkillsSet = new Set(newSkills)
    newSkillsSet.add(skill)
    const newSkillsArr = Array.from(newSkillsSet)
    setCurrentSkills(prev => [...prev, skill])
    filterSkillOptions(newSkillsArr)
    setWork(prev => ({
      ...prev,
      technologies: newSkillsArr.toString(),
    }))
  }

  const removeSkill = (skill: string) => {
    const newSkills = currentSkills.filter(item => item !== skill)
    setCurrentSkills(newSkills)
    setWork(prev => ({
      ...prev,
      technologies: newSkills.toString(),
    }))
  }

  useEffect(() => {
    filterSkillOptions()
  }, [work.technologies])

  const getWork = async (id: string) => {
    setRequestStatus('loading')
    try {
      const { work: data, imageUrl } = await getWorkById(id)
      if (!data) throw new Error('Error fetching work')
      setWork({
        title: data.title,
        url: data.url,
        repoUrl: data.repoUrl,
        originRepo: data.originRepo,
        publicRepo: data.publicRepo,
        image: data.image,
        order: data.order,
        status: data.status,
        technologies: data.technologies,
      })
      setRequestStatus('success')
      const originCurrentSkills = await data.technologies.split(',')
      const finalCurrentSkills =
        originCurrentSkills.length > 0 && originCurrentSkills[0] !== ''
          ? originCurrentSkills
          : []
      setCurrentSkills(finalCurrentSkills)
      await filterSkillOptions(await data.technologies.split(','))
      setCurrentImage(data.image)
      const imageName = data.image.toString().split('/')[1]
      setImageFilename(imageName)
      setImage(imageUrl)
    } catch (error) {
      console.error(error)
      alert('Error fetching work')
      setRequestStatus('failed')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (e.target.type === 'checkbox') {
      const checked = e.target.checked
      setWork(prev => ({
        ...prev,
        [name]: checked,
      }))
      return
    }
    setWork(prev => ({
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const { valid, filePath, newName } = verifyImage(file)
      if (valid) {
        setImageFile(file)
        //setImage(newName);
        setImageFilename(filePath)
        setErrors(prev => ({
          ...prev,
          image: '',
        }))
      } else {
        setErrors(prev => ({
          ...prev,
          image: 'Invalid file type',
        }))
      }
    }
  }

  const handleRemoveImage = () => {
    setImage('')
    setImageFilename(null)
    setRemoveImage(true)
    setWork(prev => ({
      ...prev,
      image: '',
    }))
    setErrors(prev => ({
      ...prev,
      image: '',
    }))
  }

  const handleCancelEdit = () => {
    setStatusForm('details')
    setTitlePage('Details Work')
    getWork(id as string)
    setErrors({
      title: '',
      order: '',
      status: '',
    })
    setRequestStatus('init')
  }

  const manageImage = async () => {
    let fullPathImage = null
    if (imageFile) {
      const { data, error } = await uploadImage(
        imageFile,
        bucketName,
        imageFilename as string
      )
      if (error) {
        alert('Error uploading image')
        console.error('Error uploading image:', error)
        throw new Error(error.message)
      }
      const { fullPath } = data
      fullPathImage = fullPath
    }
    if (removeImage && currentImage) {
      const { error } = await deleteImage(bucketName, currentImage)
      if (error) {
        alert('Error deleting image')
        console.error('Error deleting image:', error)
        throw new Error(error.message)
      }
      setRemoveImage(false)
    }
    return fullPathImage
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newErrors = {
      title: work.title.trim() === '' ? 'Title is required' : '',
      order: work.order === 0 || null ? 'Order is required' : '',
      status: !work.status ? 'Status is required' : '',
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(error => error !== '')) {
      return
    }
    setRequestStatus('loading')
    try {
      const filePath = await manageImage()
      const dto: CreateWorkDto | UpdateWorkDto = {
        title: work.title,
        url: work.url,
        repoUrl: work.repoUrl,
        originRepo: work.originRepo,
        publicRepo: work.publicRepo,
        image: filePath || work.image,
        order: work.order,
        status: work.status,
        technologies: work.technologies,
      }
      if (statusForm === 'create') {
        addWork(dto)
          .then(res => {
            if (!res) throw new Error('Error adding work')
            console.log(dto)
            setRequestStatus('success')
            setWork({
              title: '',
              url: '',
              repoUrl: '',
              originRepo: 'Github',
              publicRepo: false,
              image: '',
              order: 0,
              status: 'Inactive',
              technologies: '',
            })
            setErrors({
              title: '',
              order: '',
              status: '',
            })
            alert('Work added successfully')
            router.push('/admin/portfolio')
          })
          .catch(error => {
            setRequestStatus('failed')
            alert(error.message)
            console.log(error)
          })
      } else if (statusForm === 'edit') {
        updateWork(id as string, dto)
          .then(res => {
            if (!res) throw new Error('Error updating Work')
            setRequestStatus('success')
            alert('Word updated successfully')
            setStatusForm('details')
            setTitlePage('Details Work')
            setErrors({
              title: '',
              status: '',
              order: '',
            })
          })
          .catch(error => {
            setRequestStatus('failed')
            alert('Error updating work')
            console.log(error)
          })
      }
    } catch (error) {
      setRequestStatus('failed')
      alert('Error updating profile')
      console.error('Error updating profile:', error)
    }
  }

  return (
    <div className={styles.FormContainer}>
      <h2 className="titleForm">{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form
          className="mx-auto w-full max-w-[600px] gap-x-3 px-2 lg:grid lg:max-w-[900px] lg:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              placeholder="Title"
              name="title"
              id="title"
              type="text"
              value={work.title}
              errorMessage={errors.title}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.title}
              readonly={statusForm === 'details'}
            />

            <Input
              placeholder="Url"
              name="url"
              id="url"
              type="url"
              value={work.url}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              readonly={statusForm === 'details'}
            />

            <Input
              placeholder="Repository Url"
              name="repoUrl"
              id="repoUrl"
              type="url"
              value={work.repoUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              readonly={statusForm === 'details'}
            />
            <InputSelect
              name="originRepo"
              placeholder="Origin Repository"
              value={work.originRepo}
              options={originRepositoryOptions}
              onChange={handleChange}
              disabled={statusForm === 'details' || requestStatus === 'loading'}
            />
            <InputCheck
              name="publicRepo"
              placeholder="Is Public"
              checked={work.publicRepo}
              onChange={handleChange}
              requestStatus={requestStatus}
              readonly={statusForm === 'details' || requestStatus === 'loading'}
            />
          </div>
          <div>
            <InputSelect
              name="status"
              placeholder="Status"
              value={work.status}
              options={statusWorkOptions}
              onChange={handleChange}
              disabled={statusForm === 'details' || requestStatus === 'loading'}
            />

            <div className="lg:mb-[28px] lg:mt-[30px]">
              <InputSelect
                name="technologiesSelect"
                placeholder="Select   Technologies"
                value={''}
                options={filteredTechnologyOptions}
                onChange={addNewSkill}
                disabled={
                  statusForm === 'details' || requestStatus === 'loading'
                }
              />
            </div>

            <div className="m-0 mb-6 flex h-[130px] flex-wrap items-start justify-start gap-x-3 gap-y-1 overflow-y-scroll rounded-xl border border-primary p-3">
              {currentSkills.map(item => (
                <button
                  className="rounded-full border border-primary/70 px-3 text-sm"
                  key={item}
                  onClick={() => removeSkill(item)}
                  disabled={
                    requestStatus === 'loading' || statusForm === 'details'
                  }
                >
                  {item} <span className="ml-1 text-xs text-red">X</span>
                </button>
              ))}
            </div>

            <Input
              placeholder="Order"
              name="order"
              id="order"
              type="number"
              value={work.order}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              readonly={statusForm === 'details'}
            />
          </div>
          <div className="lg:col-span-2">
            <InputFile
              titleInputFileButton={titleInputFileButton}
              imageFilename={imageFilename}
              classes="md:col-span-2"
              disabled={statusForm === 'details'}
              removeImage={!removeImage ? handleRemoveImage : undefined}
              onChange={handleFileChange}
            />
          </div>
          <div className="col-span-2 mx-auto grid w-full max-w-[400px] grid-cols-2 gap-3">
            {statusForm !== 'details' && (
              <ButtonSubmit title={titleButton} requestStatus={requestStatus} />
            )}
            {statusForm === 'details' && (
              <ButtonSecondary
                title="Edit"
                onClick={() => {
                  setStatusForm('edit')
                  setTitlePage('Edit Work')
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
