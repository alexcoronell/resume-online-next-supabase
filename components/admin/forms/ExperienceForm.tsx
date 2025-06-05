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
import {
  getExperienceFunctions,
  addExperienceFunctions as createExperienceFunctions,
  deleteExperienceFunction,
} from '@/core/services/experience-functions.service';

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
  const [experienceFunctionsToRemove, setExperienceFunctionsToRemove] =
    useState<ExperienceFunction[]>([]);
  const [currentExperienceFunction, setCurrentExperienceFunction] =
    useState('');

  const [errors, setErrors] = useState({
    nameBusiness: '',
    position: '',
    place: '',
    since: '',
    until: '',
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
      setTitlePage('Details Experience');
      getData(_id);
    }
  }, []);

  const getData = (id: Experience['id']) => {
    getExperienceById(id)
      .then((response) => {
        const { data } = response;
        setExperience(data);
        return data.id;
      })
      .then(getExperienceFunctions)
      .then((response) => {
        const { data } = response;
        setExperienceFunctions(data as ExperienceFunction[]);
      })
      .catch((e) => {
        console.error('Error fetching Data ', e);
        alert('Error fetching Data');
      });
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

  const deleteCurrentExperienceFunction = (options: RemoveOptions) => {
    let updatedFunctions = experienceFunctions;
    if (typeof options.indexToRemove === 'number') {
      // Delete by index
      updatedFunctions = experienceFunctions.filter(
        (_, index) => index !== options.indexToRemove
      );
    } else if (typeof options.idToRemove === 'string') {
      // Delete by ID
      const experienceToRemove = experienceFunctions.filter(
        (item) => item.id === options.idToRemove
      );
      setExperienceFunctionsToRemove((prev) => [
        ...prev,
        ...experienceToRemove,
      ]);
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
    getData(id as string);
    setErrors({
      nameBusiness: '',
      position: '',
      place: '',
      since: '',
      until: '',
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

  const resetForm = () => {
    setExperience({
      nameBusiness: '',
      position: '',
      place: '',
      since: '',
      until: '',
      current: false,
    });

    setErrors({
      nameBusiness: '',
      position: '',
      place: '',
      since: '',
      until: '',
    });

    setExperienceFunctions([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      nameBusiness:
        experience.nameBusiness.trim() === ''
          ? 'Name Business is required'
          : '',
      position: experience.position.trim() === '' ? 'Position is required' : '',
      place: experience.place.trim() === '' ? 'Place is required' : '',
      since: experience.since.trim() === '' ? 'Since Date is required' : '',
      until:
        experience.until && !experience.current ? 'Until Date is required' : '',
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
    setRequestStatus('loading');
    const dto: CreateExperienceDto | UpdateExperienceDto = {
      nameBusiness: experience.nameBusiness,
      position: experience.position,
      place: experience.place,
      since: experience.since,
      until: experience.current ? null : experience.until,
      current: experience.current,
    };
    if (statusForm === 'create') {
      addExperience(dto)
        .then((response) => {
          if (experienceFunctions.length === 0) return;
          const { data } = response;
          const newFunctions: CreateExperienceFunctionDto[] =
            experienceFunctions.map((item) => ({
              experienceId: data.id,
              functionDetail: item.functionDetail,
            }));
          createExperienceFunctions(newFunctions);
        })
        .then(() => {
          alert('Experience added');
          setRequestStatus('success');
          resetForm();
        })
        .catch((e) => {
          console.error(e);
          setRequestStatus('failed');
        });
    } else {
      updateExperience(id as string, dto)
        .then(() => {
          if (experienceFunctionsToRemove.length === 0) return;
          const ids = experienceFunctionsToRemove.map((item) => item.id);
          deleteExperienceFunction(ids);
        })
        .then(() => {
          if (experienceFunctions.length === 0) return;
          const filteredFunctions = experienceFunctions.filter(
            (item) => !item.id
          );
          const newFunctions: CreateExperienceFunctionDto[] = filteredFunctions.map(item => ({
            functionDetail: item.functionDetail,
            experienceId: id as string
          }))
          createExperienceFunctions(newFunctions);
        })
        .then(() => {
          resetForm();
          setRequestStatus('success');
          alert('Experience was updated');
        })
        .then(() => {
          getData(id as string);
        })
        .catch((e) => {
          console.error(e);
          alert('Experience could not be updated');
          setRequestStatus('failed');
        });
    }
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
            <h3 className='mb-0'>Basic Information</h3>
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
              id='until'
              type='date'
              classes={experience.current ? 'opacity-0' : ''}
              value={experience.until as string}
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
            <h3 className='mb-4'>Functions</h3>
            <TextArea
              placeholder='Function'
              id='function'
              name='function'
              value={currentExperienceFunction}
              onChange={handleChangeCurrentFunction}
              onKeyUp={addExperienceFunction}
              requestStatus={'init'}
              readonly={statusForm === 'details' || requestStatus === 'loading'}
            />

            <div className='pb-6'>
              {experienceFunctions.length === 0 ? (
                <p>No experience functions.</p>
              ) : (
                <ul className='max-h-[300px] border border-primary rounded-2xl p-3 overflow-y-scroll'>
                  {experienceFunctions.map((func, index) => (
                    <li
                      className='w-full flex items-center justify-between py-1 gap-x-6 text-sm'
                      key={func.id || index}
                    >
                      {func.functionDetail}
                      {func.id ? (
                        <button
                          type='button'
                          className='text-red'
                          onClick={() =>
                            deleteCurrentExperienceFunction({
                              idToRemove: func.id,
                            })
                          }
                          disabled={
                            statusForm === 'details' ||
                            requestStatus === 'loading'
                          }
                        >
                          X
                        </button>
                      ) : (
                        <button
                          type='button'
                          className='text-red'
                          onClick={() =>
                            deleteCurrentExperienceFunction({
                              indexToRemove: index,
                            })
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
