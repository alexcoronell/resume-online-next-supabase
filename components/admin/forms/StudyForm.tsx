'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/form/Input';
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit';
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary';
import { ButtonLight } from '../../shared/buttons/button-light';

import { CreateStudyDto, UpdateStudyDto } from '@/core/dtos/Study.dto';
import type { RequestStatus } from '@/core/types/RequestStatus.type';
import { StatusForm } from '@/core/types/StatusForm.type';

import { addStudy, getStudyById } from '@/core/services/study.service';

import styles from '@/styles/formContainer.module.css';

interface StudyFormProps {
  _id?: string | null;
}

export function StudyForm({ _id = null }: StudyFormProps) {
  const router = useRouter();
  const [study, setStudy] = useState<CreateStudyDto | UpdateStudyDto>({
    title: '',
    institute: '',
    place: '',
    since: 2000,
    until: 2000,
    current: false,
  });

  const [errors, setErrors] = useState({
    title: '',
    institute: '',
    place: '',
    since: '',
    until: '',
  });

  const [id, setId] = useState<string | null>(null);
  const [titlePage, setTitlePage] = useState('Create Study');
  const [titleButton, setTitleButton] = useState('Add');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');
  const [statusForm, setStatusForm] = useState<StatusForm>('create');

  useEffect(() => {
    console.log(_id);
    if (_id) {
      setId(_id);
      setStatusForm('details');
      setTitlePage('Details Study');
      getStudy(_id);
    }
  }, []);

  const getStudy = async (id: string) => {
    setRequestStatus('loading');
    try {
      const studyData = await getStudyById(id);
      if (!studyData) throw new Error('Error fetching study');
      setStudy({
        title: studyData.title,
        institute: studyData.institute,
        place: studyData.place,
        since: studyData.since,
        until: studyData.until,
        current: studyData.current,
      });
      setRequestStatus('success');
    } catch (error) {
      setRequestStatus('failed');
      alert('Error fetching study');
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudy((prev) => ({
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      title: study.title.trim() === '' ? 'Title is required' : '',
      institute: study.institute.trim() === '' ? 'Institute is required' : '',
      place: study.place.trim() === '' ? 'Place is required' : '',
      since: study.since < 1950 ? 'Since year is invalid' : '',
      until: (study.until ?? 0) < 1950 ? 'Until year is invalid' : '',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
    // Submit the form
    if (statusForm === 'create') {
      setRequestStatus('loading');
      addStudy(study)
        .then((res) => {
          if (!res) throw new Error('Error adding study');
          setRequestStatus('success');
          alert('Study added successfully');
          router.push('/admin/studies');
        })
        .catch((error) => {
          setRequestStatus('failed');
          alert('Error adding study');
          console.log(error);
        });
      // Reset the form
      setStudy({
        title: '',
        institute: '',
        place: '',
        since: 2000,
        until: 2000,
        current: false,
      });
      setErrors({
        title: '',
        institute: '',
        place: '',
        since: '',
        until: '',
      });
    }
  };

  return (
    <div className={styles.FormContainer}>
      <h2 className='titleForm'>{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form
          className='grid col-span-2 px-2 gap-x-3 mx-auto max-w-[600px]'
          onSubmit={handleSubmit}
        >
          <Input
            placeholder='Title'
            name='title'
            classes='col-span-2'
            id='title'
            type='text'
            value={study.title}
            errorMessage={errors.title}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.title}
          />
          <Input
            placeholder='Institute'
            name='institute'
            id='institute'
            type='text'
            value={study.institute}
            errorMessage={errors.institute}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.institute}
          />
          <Input
            placeholder='Place'
            name='place'
            id='place'
            type='text'
            value={study.place}
            errorMessage={errors.place}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.place}
          />
          <Input
            placeholder='Since'
            name='since'
            id='since'
            type='number'
            value={study.since.toString()}
            errorMessage={errors.since}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.since}
          />
          <Input
            placeholder='Until'
            name='until'
            id='until'
            type='number'
            value={(study.until ?? 0).toString()}
            errorMessage={errors.until}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.until}
          />
          <div className='col-span-2 grid-cols-2 grid gap-3 w-full max-w-[400px] mx-auto'>
            {
              statusForm !== 'details' && (
                <ButtonSubmit
                  title={titleButton}
                  requestStatus={requestStatus}
                />
              )
            }
            <ButtonLight title='Cancel / Back' onClick={() => router.back()} />
          </div>
        </form>
      </div>
    </div>
  );
}
