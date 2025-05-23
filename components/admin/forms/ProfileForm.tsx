'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/form/Input';
import { TextArea } from '@/components/ui/form/TextArea';
import { InputFile } from '@/components/ui/form/InputFile';
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit';
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary';
import { ButtonLight } from '@/components/shared/buttons/button-light';

import { UpdateProfileDto } from '@/core/dtos/Profile.dto';

import type { RequestStatus } from '@/core/types/RequestStatus.type';
import { StatusForm } from '@/core/types/StatusForm.type';

import { getProfile, updateProfile } from '@/core/services/profile.service';
import { uploadImage, verifyImage } from '@/helpers/uploadImage';
import deleteImage from '@/helpers/deleteImages';

import styles from '@/styles/formContainer.module.css';

import { Profile } from '@/core/models/Profile.interface';

export function ProfileForm() {
  const router = useRouter();
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
  const [image, setImage] = useState<string>('');
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [titlePage, setTitlePage] = useState('Details Profile');
  const [titleButton, setTitleButton] = useState('Add');
  const [titleInputFileButton, setTitleInputFileButton] =
    useState('Current image');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');
  const [statusForm, setStatusForm] = useState<StatusForm>('details');
  const bucketName = 'personalData';

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    setRequestStatus('loading');
    try {
      const { profile, imageUrl } = await getProfile();
      setProfile(profile);
      setCurrentImage(profile.image);
      const imageName = profile.image.toString().split('/')[1];
      setImageFilename(imageName);
      setImage(imageUrl);
      setRequestStatus('success');
      setId(profile.id);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { valid, filePath, newName } = verifyImage(file);
      if (valid) {
        setImageFile(file);
        setImage(newName);
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
    setProfile((prev) => ({
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
    setTitlePage('Details Institute');
    get();
    setErrors({
      firstname: '',
      lastname: '',
      title: '',
      email: '',
      description: '',
      image: '',
    });
    setRemoveImage(false);
    setRequestStatus('init');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRequestStatus('loading');
    const dto: UpdateProfileDto = {
      firstname: profile.firstname,
      lastname: profile.lastname,
      title: profile.title,
      email: profile.email,
      description: profile.description,
      image: removeImage ? '' : (currentImage as string),
    };
    try {
      if (imageFile) {
        const { data, error } = await uploadImage(
          imageFile,
          bucketName,
          imageFilename as string
        );
        console.log("data image", data);
        if (error) {
          alert('Error uploading image');
          console.error('Error uploading image:', error);
          throw new Error(error.message);
        }
        setProfile((prev) => ({
          ...prev,
          image: data?.fullPath as string,
        }));
      }
      const { data, error } = await updateProfile(dto);
      if (error) {
        throw new Error(error.message);
      }
      setProfile((prev) => ({
        ...prev,
        ...data[0],
      }));

      if (removeImage && currentImage) {
        const { error } = await deleteImage(bucketName, currentImage);
        if (error) {
          alert('Error deleting image');
          console.error('Error deleting image:', error);
        }
      }
      setImageFilename(data[0].image.toString().split('/')[1]);
      setRequestStatus('success');
      setStatusForm('details');
      setTitlePage('Details Profile');
      setTitleButton('Add');
      setTitleInputFileButton('Current image');
    } catch (error) {
      setRequestStatus('failed');
      alert('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className={styles.FormContainer}>
      <h2 className='titleForm'>{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form
          className='w-full md:grid md:grid-cols-2 gap-3 max-w-[650px] mx-auto'
          onSubmit={handleSubmit}
        >
          <div className='w-full max-w-[300px] max-h-[300px] overflow-hidden rounded-full border-2 border-primary mb-6'>
            {image && (
              <Image
                src={image}
                alt={
                  profile.firstname + ' ' + profile.lastname + ' profile image'
                }
                width={300}
                height={300}
                priority={true}
                className='profileImage'
              />
            )}
          </div>
          <div>
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
          </div>
          <h5 className='px-1'>Profile Image</h5>
          <InputFile
            titleInputFileButton={titleInputFileButton}
            imageFilename={imageFilename}
            classes='md:col-span-2'
            disabled={statusForm === 'details'}
            removeImage={!removeImage ? handleRemoveImage : undefined}
          />
          <TextArea
            placeholder='Description'
            name='description'
            classes='md:col-span-2'
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
          <div className='col-span-2 grid-cols-2 grid gap-3 w-full max-w-[400px] mx-auto'>
            {statusForm !== 'details' && (
              <ButtonSubmit title={titleButton} requestStatus={requestStatus} />
            )}
            {statusForm === 'details' && (
              <ButtonSecondary
                title='Edit'
                type='button'
                onClick={() => {
                  setStatusForm('edit');
                  setTitlePage('Edit Study');
                  setTitleButton('Update');
                  setTitleInputFileButton('Upload image');
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
