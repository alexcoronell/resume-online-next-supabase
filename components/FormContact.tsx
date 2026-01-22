'use client'
import { useState } from 'react'
import { ChangeEvent } from 'react'

/* Components */
import { FlowbiteCheckCircleOutline } from './ui/FlowbiteCheckCircleOutline'
import { FlowbiteCloseCircleOutline } from './ui/FlowbiteCloseCircleOutline'
import { SvgSpinnersBlocksWave } from './ui/SvgSpinnersBlocksWave'

/* Models */
import { Message } from '@/core/models/Message.interface'

import { sendMessage } from '@/core/services/sendMessage.service'

/* Styles */
import styles from '../styles/formContact.module.css'

type RequestStatus = 'init' | 'loading' | 'success' | 'failed'
type ResponseMessage =
  | 'Thank you for your message'
  | "The message couldn't be sent. Try again later"

export default function FormContact() {
  const [name, setName] = useState({ field: '', validate: true })
  const [email, setEmail] = useState({ field: '', validate: true })
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>(
    'Thank you for your message'
  )
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('init')

  const regularExpressions = {
    name: /^([A-ZÁÉÍÓÚ][a-zñáéíóú]+[\s]*)+$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target as HTMLInputElement
    const newName = newValue.value
    checkValidateName()
    setName(prevState => ({ ...prevState, field: newName }))
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target as HTMLInputElement
    const newEmail = newValue.value
    const validate = regularExpressions.email.test(newEmail)
    setEmail(prevState => ({ ...prevState, field: newEmail, validate }))
  }

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target as HTMLInputElement
    setPhone(newPhone.value)
  }

  const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target as HTMLTextAreaElement
    setMessage(newMessage.value)
  }

  const cleanForm = () => {
    setName(prevState => ({ ...prevState, field: '', validate: true }))
    setEmail(prevState => ({ ...prevState, field: '', validate: true }))
    setPhone('')
    setMessage('')
  }

  const checkValidateName = (): boolean => {
    const nameValidate = regularExpressions.name.test(name.field)
    setName(prevState => ({ ...prevState, validate: nameValidate }))
    if (nameValidate) {
      return true
    } else {
      return false
    }
  }

  const checkValidateEmail = (): boolean => {
    const emailValidate = regularExpressions.email.test(email.field)
    setEmail(prevState => ({ ...prevState, validate: emailValidate }))
    if (emailValidate) {
      return true
    } else {
      return false
    }
  }

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    if (!checkValidateName() && !checkValidateEmail()) return
    setRequestStatus('loading')
    const newMessage: Message = {
      name: name.field.trim(),
      email: email.field.trim(),
      phone: phone.trim(),
      message: message.trim(),
    }
    const res = await sendMessage(newMessage)
    if (res) {
      setRequestStatus('success')
      setResponseMessage('Thank you for your message')
      cleanForm()
    } else {
      setRequestStatus('failed')
      setResponseMessage("The message couldn't be sent. Try again later")
    }
    setTimeout(() => {
      setRequestStatus('init')
    }, 5000)
  }

  return (
    <article className={styles.FormContact + ' special-shadow'}>
      <form onSubmit={onSubmit} className={styles.Form}>
        <div className={styles.formgroup}>
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              value={name.field}
              id="name"
              placeholder="name"
              onChange={onChangeName}
              onBlur={checkValidateName}
              disabled={requestStatus === 'loading'}
            />
            <span>Name</span>
          </label>
          <p
            className={`absolute text-xs text-red ${
              !name.validate ? '' : 'hidden'
            }`}
          >
            Name not valid or required
          </p>
        </div>
        <div className="lg:flex lg:gap-3">
          <div className={styles.formgroup}>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                value={email.field}
                id="email"
                placeholder="email"
                onChange={onChangeEmail}
                onBlur={checkValidateEmail}
                disabled={requestStatus === 'loading'}
              />
              <span>Email</span>
            </label>
            <p
              className={`absolute text-xs text-red ${
                !email.validate ? '' : 'hidden'
              }`}
            >
              Email not valid or required
            </p>
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="phone">
              <input
                type="text"
                name="phone"
                value={phone}
                id="phone"
                placeholder="phone"
                onChange={onChangePhone}
                disabled={requestStatus === 'loading'}
              />
              <span>Phone</span>
            </label>
          </div>
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="message">
            <textarea
              name="message"
              value={message}
              id="message"
              placeholder="message"
              rows={4}
              onChange={onChangeMessage}
              disabled={requestStatus === 'loading'}
            ></textarea>
            <span>Message</span>
          </label>
        </div>
        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={requestStatus === 'loading'}
        >
          Send
        </button>
        <p
          className={`${
            requestStatus === 'success' ? '' : 'hidden'
          } absolute bottom-[-50px] left-[20%] mx-auto w-[60%] bg-primary py-2 text-center text-sm text-background opacity-50`}
        >
          {responseMessage}
        </p>
        <p
          className={`${
            requestStatus === 'failed' ? '' : 'hidden'
          } absolute bottom-[-50px] left-[15%] mx-auto w-[70%] bg-[#ec5353] py-2 text-center text-sm text-background opacity-50`}
        >
          {responseMessage}
        </p>
      </form>

      {requestStatus !== 'init' && (
        <div className={styles.AlertMessage}>
          {requestStatus === 'loading' && (
            <SvgSpinnersBlocksWave className="size-[150px] text-primary" />
          )}

          {requestStatus !== 'loading' && (
            <div className={styles.AlertMessage__box + ' special-shadow'}>
              {requestStatus === 'success' && (
                <FlowbiteCheckCircleOutline className="size-[100px] text-primary" />
              )}
              {requestStatus === 'failed' && (
                <FlowbiteCloseCircleOutline className="size-[100px] text-red" />
              )}

              <h4
                className={`${
                  requestStatus === 'failed' ? 'text-red' : 'text-primary'
                }`}
              >
                {responseMessage}
              </h4>
              <button
                onClick={() => setRequestStatus('init')}
                className={`${
                  requestStatus === 'failed' ? 'btn-error' : 'btn-primary'
                }`}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
