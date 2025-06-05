'use client';
import { useState, useEffect, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

/* Components */
import { Input } from '@/components/ui/form/Input';
import { InputSelect } from '@/components/ui/form/InputSelect';
import { InputFile } from '@/components/ui/form/InputFile';
import { InputCheck } from '@/components/ui/form/InputCheck';
import { TextArea } from '@/components/ui/form/TextArea';
import { ButtonSubmit } from '@/components/ui/form/ButtonSubmit';
import { ButtonSecondary } from '@/components/shared/buttons/button-secondary';
import { ButtonLight } from '../../shared/buttons/button-light';

/* Models */
import { Experience } from '@/core/models/Experience.interface';
import { ExperienceFunction } from '@/core/models/ExperienceFunction';

/* Services */
import {
  getExperienceById,
  addExperience,
  updateExperience,
} from '@/core/services/experience.service';

/* DTO's */
import {
  CreateExperienceDto,
  UpdateExperienceDto,
} from '@/core/dtos/Experience.dto';
import {
  CreateExperienceFunctionDto,
  UpdateExperienceFunctionDto,
} from '@/core/dtos/ExperienceFunction.dto';

/* Types */
import type { RequestStatus } from '@/core/types/RequestStatus.type';
import { StatusForm } from '@/core/types/StatusForm.type';

/* Styles */
import styles from '@/styles/formContainer.module.css';

interface ExperienceFormProps {
  _id?: string | null;
}

interface RemoveOptions {
  indexToRemove?: number; // Opcional: Remove By Index
  idToRemove?: string; // Opcional: Remove By ID
}

export function ExperiencesForm({ _id = null }: ExperienceFormProps) {
  const router = useRouter();

  const [experience, setExperience] = useState<
    CreateExperienceDto | UpdateExperienceDto
  >({
    nameBusiness: '',
    position: '',
    place: '',
    since: '',
    until: '',
    current: false,
  });

  const [experienceFunctions, setExperienceFunctions] = useState<
    ExperienceFunction[]
  >([]);
  const [experienceFunctionsToRemove, setExperienceFunctionsToRemove] = useState<
    ExperienceFunction[]
  >([]);
  const [currentExperienceFunction, setCurrentExperienceFunction] =
    useState('');

  const [errors, setErrors] = useState({
    nameBusiness: '',
    position: '',
    place: '',
    since: '',
    until: '',
    current: '',
  });

  const [id, setId] = useState<string | null>(null);
  const [titlePage, setTitlePage] = useState('Create Experience');
  const [titleButton, setTitleButton] = useState('Add');
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init');
  const [statusForm, setStatusForm] = useState<StatusForm>('create');

  useEffect(() => {
    if (_id) {
      setId(_id);
      setStatusForm('details');
      setTitlePage('Details Study');
      getExperience(_id);
    }
  }, []);

  const getExperience = async (id: string) => {
    setRequestStatus('loading');
    try {
      const response = await getExperienceById(id);
      if (!response || !response.data)
        throw new Error('Error fetching experience');
      const experienceData = response.data;
      setExperience({
        nameBusiness: experienceData.nameBusiness,
        position: experienceData.position,
        place: experienceData.place,
        since: experienceData.since,
        until: experienceData.until,
        current: experienceData.current,
      });
      setRequestStatus('success');
    } catch (error) {
      setRequestStatus('failed');
      alert('Error fetching Experience');
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      const checked = e.target.checked;
      setExperience((prev) => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }
    setExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleChangeCurrentFunction = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setCurrentExperienceFunction(value);
  };

  const addExperienceFunction = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    console.log(e);
    if (e.key === 'Enter') {
      if (currentExperienceFunction.trim() !== '') {
        const newExperienceFunction: CreateExperienceFunctionDto = {
          functionDetail: currentExperienceFunction,
        };
        setExperienceFunctions((prev) => [...prev, newExperienceFunction]);
        setCurrentExperienceFunction('');
      }
    }
  };

  const deleteExperienceFunction = (options: RemoveOptions) => {
    let updatedFunctions = experienceFunctions;
    if (typeof options.indexToRemove === 'number') {
      // Delete by index
      updatedFunctions = experienceFunctions.filter(
        (_, index) => index !== options.indexToRemove
      );
    } else if (typeof options.idToRemove === 'string') {
      // Delete by ID
      const experienceToRemove = experienceFunctions.filter(item => item.id === options.idToRemove);
      setExperienceFunctionsToRemove((prev) => [...prev, ...experienceToRemove]);
      updatedFunctions = experienceFunctions.filter(
        (func) => func.id !== options.idToRemove
      );
    } else {
      return;
    }

    // Actualizar el estado con el nuevo array
    setExperienceFunctions(updatedFunctions);
  };

  const handleCancelEdit = () => {
    setStatusForm('details');
    setTitlePage('Details Experience');
    getExperience(id as string);
    setErrors({
      nameBusiness: '',
      position: '',
      place: '',
      since: '',
      until: '',
      current: '',
    });
    setRequestStatus('init');
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
    console.log(experience);
    console.log(experienceFunctions);
  };

  return (
    <div className={styles.FormContainer}>
      <h2 className='titleForm'>{titlePage}</h2>
      <div className={styles.FormContainer__box}>
        <form
          onSubmit={handleSubmit}
          className='w-full px-2 max-w-[500px] lg:max-w-[950px] lg:grid lg:grid-cols-2 lg:gap-x-6'
        >
          <div className='lg:grid lg:grid-cols-2 lg:gap-x-3'>
            <h3>Basic Information</h3>
            <Input
              placeholder='Name Bussiness'
              name='nameBusiness'
              classes='col-span-2'
              id='nameBusiness'
              type='text'
              value={experience.nameBusiness}
              errorMessage={errors.nameBusiness}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.nameBusiness}
              readonly={statusForm === 'details'}
            />

            <Input
              placeholder='Position'
              name='position'
              classes='col-span-2'
              id='position'
              type='text'
              value={experience.position}
              errorMessage={errors.position}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.position}
              readonly={statusForm === 'details'}
            />

            <Input
              placeholder='Place'
              name='place'
              classes='col-span-2'
              id='place'
              type='text'
              value={experience.place}
              errorMessage={errors.place}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.place}
              readonly={statusForm === 'details'}
            />
            <Input
              placeholder='Since'
              name='since'
              classes='col-span-2'
              id='since'
              type='date'
              value={experience.since}
              errorMessage={errors.since}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.since}
              readonly={statusForm === 'details'}
            />

            <Input
              placeholder='Until'
              name='until'
              classes='col-span-2'
              id='until'
              type='date'
              value={experience.until}
              errorMessage={errors.until}
              onChange={handleChange}
              onBlur={handleBlur}
              requestStatus={requestStatus}
              validField={!errors.until}
              readonly={statusForm === 'details'}
            />

            <InputCheck
              name='current'
              placeholder='Current'
              checked={experience.current}
              classes='col-span-2'
              onChange={handleChange}
              requestStatus={requestStatus}
              readonly={statusForm === 'details'}
            />
          </div>

          <div>
            <h3>Functions</h3>
            <TextArea
              placeholder='Function'
              id='function'
              name='function'
              value={currentExperienceFunction}
              onChange={handleChangeCurrentFunction}
              onKeyUp={addExperienceFunction}
              requestStatus={'init'}
            />

            <div className='pb-6'>
              {experienceFunctions.length === 0 ? (
                <p>No experience functions.</p>
              ) : (
                <ul>
                  {experienceFunctions.map((func, index) => (
                    <li
                      className='w-full flex items-center justify-between py-1'
                      key={func.id || index}
                    >
                      {func.functionDetail} ({!func.id && `New`})
                      <button
                        type='button'
                        className='text-red'
                        onClick={() =>
                          deleteExperienceFunction({ indexToRemove: index })
                        }
                      >
                        X
                      </button>
                      {func.id && (
                        <button
                          type='button'
                          onClick={() =>
                            deleteExperienceFunction({ idToRemove: func.id })
                          }
                        >
                          X
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
                  setTitlePage('Edit Experience');
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
