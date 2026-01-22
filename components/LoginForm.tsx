'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { createClient } from '@/utils/supabase/client'

import SectionPage from '@/components/SectionPage'
import { Input } from '@/components/ui/form/Input'
import { ButtonSubmit } from './ui/form/ButtonSubmit'

import type { RequestStatus } from '@/core/types/RequestStatus.type'

/* Styles */
import styles from '../styles/login-form.module.css'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState({
    field: '',
    validate: true,
    errorMessage: '',
  })
  const [password, setPassword] = useState({
    field: '',
    validate: true,
    errorMessage: '',
  })
  const requestStatus: RequestStatus = 'init'

  const regularExpressions = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target as HTMLInputElement
    const newEmail = newValue.value
    const validate = regularExpressions.email.test(newEmail)
    setEmail((prevState: any) => ({ ...prevState, field: newEmail, validate }))
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target as HTMLInputElement
    const newPassword = newValue.value
    // biome-ignore lint/complexity/noUselessTernary: <explanation>
    const validate = newPassword.length > 0 ? true : false
    setPassword((prevState: any) => ({
      ...prevState,
      field: newPassword,
      validate,
    }))
  }

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (!email.validate || !password.validate) {
      return
    }

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: email.field,
      password: password.field,
    })

    if (error) {
      alert('ERROR IN LOGIN')
      console.log(error)
    } else {
      router.push('/admin')
    }
  }

  const titlePage = 'Login'
  return (
    <div className={`${styles.LoginForm} special-shadow`}>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Email"
          name="Email"
          id="emailLogin"
          type="email"
          value={email.field}
          onChange={onChangeEmail}
          requestStatus={requestStatus}
          validField={email.validate}
        />
        <Input
          placeholder="Password"
          name="Password"
          id="passwordLogin"
          type="password"
          value={password.field}
          onChange={onChangePassword}
          requestStatus={requestStatus}
          validField={password.validate}
        />

        <ButtonSubmit title="Send" requestStatus={requestStatus} />
      </form>
    </div>
  )
}
