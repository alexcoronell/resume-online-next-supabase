'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/form/Input';
import { InputSelect } from '@/components/ui/form/InputSelect';
import { InputFile } from '@/components/ui/form/InputFile';
import { InputCheck } from '@/components/ui/form/InputCheck';
import { TextArea } from '@/components/ui/form/TextArea';
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit';
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary';
import { ButtonLight } from '../../shared/buttons/button-light';

import { CreateWorkDto, UpdateWorkDto } from '@/core/dtos/Work,dto';

import type { RequestStatus } from '@/core/types/RequestStatus.type';
import { StatusForm } from '@/core/types/StatusForm.type';

import { addWork, updateWork, getWorkById } from '@/core/services/work.service';
import { uploadImage, verifyImage } from '@/helpers/uploadImage';

import styles from '@/styles/formContainer.module.css';

interface PortfolioFormProps {
  _id?: string | null;
}

export function PortfolioForm({ _id = null }: PortfolioFormProps) {
  const router = useRouter();
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
  });

  const [errors, setErrors] = useState({
    title: '',
    url: '',
    repoUrl: '',
    originRepo: '',
    publicRepo: '',
    image: '',
    order: '',
    status: '',
    technologies: '',
  });

  const originRepositoryOptions = [
    { value: 'None', label: 'None' },
    { value: 'Github', label: 'Github' },
    { value: 'Gitlab', label: 'Gitlab' },
    { value: 'Bitbucket', label: 'Bitbucket' },
    { value: 'Other', label: 'Other' },
  ];

  const statusWorkOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Archived', label: 'Archived' },
    { value: 'In development', label: 'In development' },
    { value: 'Developing', label: 'Developing' },
    { value: 'Completed', label: 'Completed' },
  ];

  const technologyOptions: { value: string; label: string }[] = [
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'GIT', label: 'GIT' },
    { value: 'Typescript', label: 'Typescript' },
    { value: 'Angular', label: 'Angular' },
    { value: 'React', label: 'React' },
    { value: 'Astro', label: 'Astro' },
    { value: 'Linux', label: 'Linux' },
    { value: 'NestJS', label: 'NestJS' },
    { value: 'NodeJS', label: 'NodeJS' },
    { value: 'Bootstrap', label: 'Bootstrap' },
    { value: 'Sass', label: 'Sass' },
    { value: 'TailwindCSS', label: 'TailwindCSS' },
    { value: 'NextJS', label: 'NextJS' },
    { value: 'Angular', label: 'Angular Material' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'AlpineJS', label: 'AlpineJS' },
    { value: 'PreactJS', label: 'PreactJS' },
    { value: 'Svelte', label: 'Svelte' },
    { value: 'Material', label: 'Material UI' },
    { value: 'Firebase', label: 'Firebase' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'PHP', label: 'PHP' },
    { value: 'JQuery', label: 'JQuery' },
    { value: 'MySQL', label: 'MySQL' },
  ];

  const filteredTechnologyOptions: { value: string; label: string }[] = [];

  const [id, setId] = useState<string | null>(null);
  const [titlePage, setTitlePage] = useState('Create Work');
  const [titleButton, setTitleButton] = useState('Add');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');
  const [statusForm, setStatusForm] = useState<StatusForm>('create');
  const [titleInputFileButton, setTitleInputFileButton] =
    useState('Current image');
  const [image, setImage] = useState<string>('');
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (_id) {
      setId(_id);
      setStatusForm('details');
      setTitlePage('Details Portfolio');
      getWork(_id);
    }
  }, []);

  const getWork = async (id: string) => {
    setRequestStatus('loading');
    try {
      const { data } = await getWorkById(id);
      if (!data) throw new Error('Error fetching work');
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
      });
      setRequestStatus('success');
    } catch (error) {
      console.error(error);
      alert('Error fetching work');
      setRequestStatus('failed');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      const checked = e.target.checked;
      setWork((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }
    setWork((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name} is required`,
      }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { valid, filePath, newName } = verifyImage(file);
      if (valid) {
        setImageFile(file);
        //setImage(newName);
        setImageFilename(filePath);
        setErrors((prev) => ({
          ...prev,
          image: '',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          image: 'Invalid file type',
        }));
      }
    }
  };

  const handleRemoveImage = () => {
    setImage('');
    setImageFilename(null);
    setRemoveImage(true);
    setWork((prev) => ({
      ...prev,
      image: '',
    }));
    setErrors((prev) => ({
      ...prev,
      image: '',
    }));
  };

  const handleCancelEdit = () => {
    setStatusForm('details');
    setTitlePage('Details Study');
    getWork(id as string);
    setErrors({
      title: '',
      url: '',
      repoUrl: '',
      originRepo: '',
      publicRepo: '',
      image: '',
      order: '',
      status: '',
      technologies: '',
    });
    setRequestStatus('init');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return;
  };

  return (
    <div className={styles.FormContainer}>
      <h2 className='titleForm'>{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form
          className='lg:grid lg:grid-cols-2 px-2 gap-x-3 mx-auto w-full max-w-[600px] lg:max-w-[900px]'
          onSubmit={handleSubmit}
        >
          <div>
            <Input
              placeholder='Title'
              name='title'
              id='title'
              type='text'
              value={work.title}
              errorMessage={errors.title}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.title}
              readonly={statusForm === 'details'}
            />

            <Input
              placeholder='Url'
              name='url'
              id='url'
              type='url'
              value={work.url}
              errorMessage={errors.url}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.url}
              readonly={statusForm === 'details'}
            />

            <Input
              placeholder='Repository Url'
              name='repoUrl'
              id='repoUrl'
              type='url'
              value={work.repoUrl}
              errorMessage={errors.repoUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.repoUrl}
              readonly={statusForm === 'details'}
            />
            <InputSelect
              name='originRepo'
              placeholder='Origin Repository'
              value={work.originRepo}
              options={originRepositoryOptions}
              onChange={handleChange}
              disabled={statusForm === 'details' || requestStatus === 'loading'}
            />
            <InputCheck
              id='publicRepo'
              name='Is Public'
              checked={work.publicRepo}
              requestStatus={requestStatus}
              readonly={statusForm === 'details' || requestStatus === 'loading'}
            />
          </div>
          <div>
            <InputSelect
              name='status'
              placeholder='Status'
              value={work.status}
              options={statusWorkOptions}
              onChange={handleChange}
              disabled={statusForm === 'details' || requestStatus === 'loading'}
            />

            <div className='lg:mt-[30px] lg:mb-[28px]'>
              <InputSelect
              name='technologiesSelect'
              placeholder='Select   Technologies'
              value={null}
              options={filteredTechnologyOptions}
              onChange={handleChange}
              disabled={statusForm === 'details' || requestStatus === 'loading'}
            />
            </div>

            <TextArea
              id='technologies'
              name='Techonogies'
              value={work.technologies}
              placeholder='Technologies'
              requestStatus={requestStatus}
              readonly={true}
            />
          </div>
          <div className='lg:col-span-2'>
            <InputFile
              titleInputFileButton={titleInputFileButton}
              imageFilename={imageFilename}
              classes='md:col-span-2'
              disabled={statusForm === 'details'}
              removeImage={!removeImage ? handleRemoveImage : undefined}
              onChange={handleFileChange}
            />
          </div>
          <div className='col-span-2 grid-cols-2 grid gap-3 w-full max-w-[400px] mx-auto'>
            {statusForm !== 'details' && (
              <ButtonSubmit title={titleButton} requestStatus={requestStatus} />
            )}
            {statusForm === 'details' && (
              <ButtonSecondary
                title='Edit'
                onClick={() => {
                  setStatusForm('edit');
                  setTitlePage('Edit Study');
                  setTitleButton('Update');
                }}
              />
            )}
            {statusForm !== 'edit' && (
              <ButtonLight
                title='Cancel / Back'
                onClick={() => router.back()}
              />
            )}
            {statusForm === 'edit' && (
              <ButtonLight title='Cancel' onClick={handleCancelEdit} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
