'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/* Components */
import { Input } from '@/components/ui/form/Input';
import { InputSelect } from '@/components/ui/form/InputSelect';
import { InputFile } from '@/components/ui/form/InputFile';
import { InputCheck } from '@/components/ui/form/InputCheck';
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit';
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary';
import { ButtonLight } from '../../shared/buttons/button-light';

/* Models */
import { Institute } from '@/core/models/Institute.interface';

/* Services */
import {
  getTrainingById,
  addTraining,
  updateTraining,
} from '@/core/services/training.service';
import { getInstitutes as fetchInstitutes } from '@/core/services/institute.service';
import { uploadImage, verifyImage } from '@/helpers/uploadImage';
import deleteImage from '@/helpers/deleteImages';

/* DTO's */
import { CreateTrainingDto, UpdateTrainingDto } from '@/core/dtos/Training.dto';

/* Data Options */
import { months } from '@/core/data/months.options';

/* Types */
import type { RequestStatus } from '@/core/types/RequestStatus.type';
import { StatusForm } from '@/core/types/StatusForm.type';

/* Styles */
import styles from '@/styles/formContainer.module.css';

interface TrainingFormProps {
  _id?: string | null;
}

export function TrainingForm({ _id = null }: TrainingFormProps) {
  const router = useRouter();
  const [training, setTraining] = useState<
    CreateTrainingDto | UpdateTrainingDto
  >({
    title: '',
    englishTitle: '',
    institute: null,
    year: 2025,
    month: 1,
    image: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    englishTitle: '',
    institute: '',
  });

  const [institutes, setInstitutes] = useState<
    { value: string; label: string }[]
  >([]);
  const [id, setId] = useState<string | null>(null);
  const [titlePage, setTitlePage] = useState('Create Training');
  const [titleButton, setTitleButton] = useState('Add');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');
  const [statusForm, setStatusForm] = useState<StatusForm>('create');
  const [titleInputFileButton, setTitleInputFileButton] =
    useState('Current image');
  const [image, setImage] = useState<string>('');
  const [imageFilename, setImageFilename] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const bucketName = 'trainings';

  useEffect(() => {
    getInstitutes();
    if (_id) {
      setId(_id);
      setStatusForm('details');
      setTitlePage('Details Portfolio');
      getTraining(_id);
    }
  }, []);

  const getInstitutes = async () => {
    const { institutes: data } = await fetchInstitutes();
    const institutes = data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(institutes);
  };

  const getTraining = async (id: string) => {
    setRequestStatus('loading');
    try {
      const { training: data, imageUrl } = await getTrainingById(id);
      if (!data) throw new Error('Error fetching training');
      setTraining({ ...data });
      setRequestStatus('success');
      setCurrentImage(data.image as string);
      const imageName = data?.image?.toString().split('/')[1];
      setImageFilename(imageName as string);
      setImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert('Error fetching training');
      setRequestStatus('failed');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTraining((prev) => ({
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
    setTraining((prev) => ({
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
    setTitlePage('Details Work');
    getTraining(id as string);
    setErrors({
      title: '',
      englishTitle: '',
      institute: '',
    });
    setRequestStatus('init');
  };

  const manageImage = async () => {
    let fullPathImage = null;
    if (imageFile) {
      const { data, error } = await uploadImage(
        imageFile,
        bucketName,
        imageFilename as string
      );
      if (error) {
        alert('Error uploading image');
        console.error('Error uploading image:', error);
        throw new Error(error.message);
      }
      const { fullPath } = data;
      fullPathImage = fullPath;
    }
    if (removeImage && currentImage) {
      const { error } = await deleteImage(bucketName, currentImage);
      if (error) {
        alert('Error deleting image');
        console.error('Error deleting image:', error);
        throw new Error(error.message);
      }
      setRemoveImage(false);
    }
    return fullPathImage;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      title: training.title.trim() === '' ? 'Title is required' : '',
      englishTitle:
        training.englishTitle === '' ? 'English title is required' : '',
      institute: !training.institute ? 'Institute is required' : '',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
    setRequestStatus('loading');
    try {
      const filePath = await manageImage();
      const dto: CreateTrainingDto | UpdateTrainingDto = {
        title: training.title,
        englishTitle: training.englishTitle,
        institute: training.institute,
        year: training.year,
        month: training.month,
        image: filePath || training.image
      }
      if (statusForm === 'create') {
        addTraining(dto)
          .then((res) => {
            if (!res) throw new Error('Error adding training');
            setRequestStatus('success');
            setTraining({
              title: '',
              englishTitle: '',
              institute: null,
              year: 2025,
              month: 1,
              image: '',
            });
            setErrors({
              title: '',
              englishTitle: '',
              institute: '',
            });
            alert('Work added successfully');
            router.push('/admin/trainings');
          })
          .catch((error) => {
            setRequestStatus('failed');
            alert(error.message);
            console.log(error);
          });
      } else if (statusForm === 'edit') {
        updateTraining(id as string, dto)
          .then((res) => {
            if (!res) throw new Error('Error updating Work');
            setRequestStatus('success');
            alert('Word updated successfully');
            setStatusForm('details');
            setTitlePage('Details Work');
            setErrors({
              title: '',
              englishTitle: '',
              institute: '',
            });
          })
          .catch((error) => {
            setRequestStatus('failed');
            alert('Error updating work');
            console.log(error);
          });
      }
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
          className='px-2 mx-auto w-full max-w-[700px] lg:max-w-[900px] lg:grid lg:grid-cols-2 gap-x-3'
          onSubmit={handleSubmit}
        >
          <Input
            placeholder='Spanish Title'
            name='title'
            id='title'
            type='text'
            value={training.title}
            errorMessage={errors.title}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.title}
            readonly={statusForm === 'details'}
          />

          <Input
            placeholder='English Title'
            name='englishTitle'
            id='englishTitle'
            type='text'
            value={training.englishTitle}
            errorMessage={errors.englishTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            requestStatus={requestStatus}
            validField={!errors.englishTitle}
            readonly={statusForm === 'details'}
          />
          <div className='md:grid md:grid-cols-2 gap-x-3 lg:col-span-2 lg:grid-cols-3'>
            <InputSelect
              name='institute'
              placeholder='Institute'
              classes='md:col-span-2 lg:col-span-1'
              value={training.institute as unknown as string}
              options={institutes}
              onChange={handleChange}
              disabled={statusForm === 'details' || requestStatus === 'loading'}
            />

            <Input
              placeholder='Year'
              name='year'
              id='year'
              type='number'
              value={training.year}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              readonly={statusForm === 'details'}
            />

            <InputSelect
              name='month'
              placeholder='Month'
              value={training.month as number}
              options={months}
              onChange={handleChange}
              disabled={statusForm === 'details' || requestStatus === 'loading'}
            />
          </div>

          <InputFile
            titleInputFileButton={titleInputFileButton}
            imageFilename={imageFilename}
            classes='md:col-span-2'
            disabled={statusForm === 'details'}
            removeImage={!removeImage ? handleRemoveImage : undefined}
            onChange={handleFileChange}
          />
          <div className='col-span-2 grid-cols-2 grid gap-3 w-full max-w-[400px] mx-auto'>
            {statusForm !== 'details' && (
              <ButtonSubmit title={titleButton} requestStatus={requestStatus} />
            )}
            {statusForm === 'details' && (
              <ButtonSecondary
                title='Edit'
                onClick={() => {
                  setStatusForm('edit');
                  setTitlePage('Edit Work');
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
