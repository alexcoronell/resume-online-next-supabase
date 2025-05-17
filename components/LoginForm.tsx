'use client';
import { useState } from 'react';
import { ChangeEvent } from 'react';

import SectionPage from '@/components/SectionPage';
import Input from '@/components/ui/form/Input';
import ButtonSubmit from './ui/form/ButtonSubmit';

import { RequestStatus } from '@/core/types/RequestStatus.type';

/* Styles */
import styles from '../styles/login-form.module.css';

export default function LoginForm() {
  const [email, setEmail] = useState({
    field: '',
    validate: true,
    errorMessage: '',
  });
  const [password, setPassword] = useState({
    field: '',
    validate: true,
    errorMessage: '',
  });
  const requestStatus: RequestStatus = 'init';

  const regularExpressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target as HTMLInputElement;
    const newEmail = newValue.value;
    const validate = regularExpressions.email.test(newEmail);
    setEmail((prevState: any) => ({ ...prevState, field: newEmail, validate }));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target as HTMLInputElement;
    const newPassword = newValue.value;
    const validate = newPassword.length > 0 ? true : false;
    setPassword((prevState: any) => ({
      ...prevState,
      field: newPassword,
      validate,
    }));
  };

  const titlePage = 'Login';
  return (
    <div className={styles.LoginForm}>
      <form>
        <Input
          name='Email'
          id='emailLogin'
          type='email'
          value={email.field}
          onChange={onChangeEmail}
          requestStatus={requestStatus}
          validField={email.validate}
        />
        <Input
          name='Password'
          id='passwordLogin'
          type='password'
          value={password.field}
          onChange={onChangePassword}
          requestStatus={requestStatus}
          validField={password.validate}
        />

        <ButtonSubmit title='Send' requestStatus={requestStatus} />
      </form>
    </div>
  );
}
