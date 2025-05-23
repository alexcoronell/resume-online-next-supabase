'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/form/Input';
import { TextArea } from '@/components/ui/form/TextArea';
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit';
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary';
import { ButtonLight } from '@/components/shared/buttons/button-light';

import { UpdateProfileDto } from '@/core/dtos/Profile.dto';

import type { RequestStatus } from '@/core/types/RequestStatus.type';
import { StatusForm } from '@/core/types/StatusForm.type';

import { getProfile, updateProfile } from '@/core/services/profile.service';

import styles from '@/styles/formContainer.module.css';

import { Profile } from '@/core/models/Profile.interface';

export function ProfileForm() {
  const [profile, setProfile] = useState<Profile>({
    id: 1,
    firstname: '',
    lastname: '',
    title: '',
    email: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    title: '',
    email: '',
    description: '',
    image: '',
  });

  const [id, setId] = useState<number | null>(null);
  const [titlePage, setTitlePage] = useState('Details Profile');
  const [titleButton, setTitleButton] = useState('Add');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');
  const [statusForm, setStatusForm] = useState<StatusForm>('details');

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    setRequestStatus('loading');
    try {
      const data = await getProfile();
      setProfile(data);
      setRequestStatus('success');
      setId(data.id);
      console.log('Profile data:', data);
      console.log('Profile ID:', id);
    } catch (error) {
      setRequestStatus('failed');
      alert('Error fetching profile');
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrors((prev) => ({
        ...prev,
        [name]: `${name} is required`,
      }));
    }
  };

  return (
    <div className={styles.FormContainer}>
      <h2 className='titleForm'>{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form>
          <div>IMAGE</div>
          <Input
            placeholder='Firstname'
            name='firstname'
            classes='col-span-2'
            id='firstname'
            type='text'
            value={profile.firstname}
            errorMessage={errors.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.firstname}
            readonly={statusForm === 'details'}
          />
          <Input
            placeholder='Lastname'
            name='lastname'
            classes='col-span-2'
            id='lastname'
            type='text'
            value={profile.lastname}
            errorMessage={errors.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.lastname}
            readonly={statusForm === 'details'}
          />
          <Input
            placeholder='Title'
            name='title'
            classes='col-span-2'
            id='title'
            type='text'
            value={profile.title}
            errorMessage={errors.title}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.title}
            readonly={statusForm === 'details'}
          />
          <Input
            placeholder='Email'
            name='email'
            classes='col-span-2'
            id='email'
            type='email'
            value={profile.email}
            errorMessage={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.email}
            readonly={statusForm === 'details'}
          />
          <TextArea
            placeholder='Description'
            name='description'
            classes='col-span-2'
            id='description'
            value={profile.description}
            errorMessage={errors.description}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.description}
            readonly={statusForm === 'details'}
            rows={8}
          />
        </form>
      </div>
    </div>
  );
}
