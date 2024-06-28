"use client";
import { useState } from "react";

/* Components */
import { FlowbiteCheckCircleOutline } from "./ui/FlowbiteCheckCircleOutline";
import { FlowbiteCloseCircleOutline } from "./ui/FlowbiteCloseCircleOutline";
import { SvgSpinnersBlocksWave } from "./ui/SvgSpinnersBlocksWave";

/* Models */
import { Message } from "@/core/models/Message.interface";

import { sendMessage } from "@/core/services/sendMessage.service";

/* Styles */
import styles from "../styles/formContact.module.css";

type RequestStatus = "init" | "loading" | "success" | "failed";
type ResponseMessage =
  | "Thank you for your message"
  | "The message couldn't be sent. Try again later";

export default function FormContact() {
  const [name, setName] = useState({ field: "", validate: true });
  const [email, setEmail] = useState({ field: "", validate: true });
  const [phone, setPhone] = useState({ field: "", validate: true });
  const [message, setMessage] = useState({ field: "", validate: true });
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>(
    "Thank you for your message"
  );
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("init");

  const regularExpressions = {
    name: /^([A-ZÁÉÍÓÚ][a-zñáéíóú]+[\s]*)+$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const onChangeName = (e: Event) => {
    const newValue = e.target as HTMLInputElement;
    const newName = newValue.value;
    checkValidateName();
    setName((prevState) => ({ ...prevState, field: newName }));
  };

  const onChangeEmail = (e: Event) => {
    let newValue = e.target as HTMLInputElement;
    const newEmail = newValue.value;
    const validate = regularExpressions.email.test(newEmail);
    setEmail((prevState) => ({ ...prevState, field: newEmail, validate }));
  };

  const onChangePhone = (e: Event) => {
    const newValue = e.target as HTMLInputElement;
    const newPhone = newValue.value;
    setPhone((prevState) => ({ ...prevState, field: newPhone }));
  };

  const onChangeMessage = (e: Event) => {
    const newValue = e.target as HTMLInputElement;
    const newMessage = newValue.value;
    setMessage((prevState) => ({ ...prevState, field: newMessage }));
  };

  const cleanForm = () => {
    setName((prevState) => ({ ...prevState, field: "", validate: true }));
    setEmail((prevState) => ({ ...prevState, field: "", validate: true }));
    setPhone((prevState) => ({ ...prevState, field: "", validate: true }));
    setMessage((prevState) => ({ ...prevState, field: "", validate: true }));
  };

  const checkValidateName = (): boolean => {
    const nameValidate = regularExpressions.name.test(name.field);
    setName((prevState) => ({ ...prevState, validate: nameValidate }));
    if (nameValidate) {
      return true;
    } else {
      return false;
    }
  };

  const checkValidateEmail = (): boolean => {
    const emailValidate = regularExpressions.email.test(email.field);
    setEmail((prevState) => ({ ...prevState, validate: emailValidate }));
    if (emailValidate) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (!checkValidateName() && !checkValidateEmail()) return;
    setRequestStatus("loading");
    const newMessage: Message = {
      name: name.field.trim(),
      email: email.field.trim(),
      phone: phone.field.trim(),
      message: message.field.trim(),
    };
    const res = await sendMessage(newMessage);
    if (res) {
      setRequestStatus("success");
      setResponseMessage("Thank you for your message");
      cleanForm();
    } else {
      setRequestStatus("failed");
      setResponseMessage("The message couldn't be sent. Try again later");
    }
    setTimeout(() => {
      setRequestStatus("init");
    }, 5000);
  };

  return (
    <article className={styles.FormContact + " special-shadow"}>
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
              disabled={requestStatus === "loading"}
            />
            <span>Name</span>
          </label>
          <p
            className={`text-xs absolute text-red ${
              !name.validate ? "" : "hidden"
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
                disabled={requestStatus === "loading"}
              />
              <span>Email</span>
            </label>
            <p
              className={`text-xs absolute text-red ${
                !email.validate ? "" : "hidden"
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
                value={phone.field}
                id="phone"
                placeholder="phone"
                onChange={onChangePhone}
                disabled={requestStatus === "loading"}
              />
              <span>Phone</span>
            </label>
          </div>
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="message">
            <textarea
              name="message"
              value={message.field}
              id="message"
              placeholder="message"
              rows={4}
              onChange={onChangeMessage}
              disabled={requestStatus === "loading"}
            ></textarea>
            <span>Message</span>
          </label>
        </div>
        <button
          className={styles.btnSubmit}
          disabled={requestStatus === "loading"}
        >
          Send
        </button>
        <p
          className={`${
            requestStatus === "success" ? "" : "hidden"
          } absolute text-center py-2 bg-primary mx-auto text-background left-[20%] w-[60%] text-sm opacity-50 bottom-[-50px]`}
        >
          {responseMessage}
        </p>
        <p
          className={`${
            requestStatus === "failed" ? "" : "hidden"
          } absolute text-center py-2 bg-[#ec5353] mx-auto text-background left-[15%] w-[70%] text-sm opacity-50 bottom-[-50px]`}
        >
          {responseMessage}
        </p>
      </form>

      {requestStatus !== "init" && (
        <div className={styles.AlertMessage}>
          {requestStatus === "loading" && (
            <SvgSpinnersBlocksWave className="size-[150px] text-primary" />
          )}

          {requestStatus !== "loading" && (
            <div className={styles.AlertMessage__box + " special-shadow"}>
              {requestStatus === "success" && (
                <FlowbiteCheckCircleOutline className="size-[100px] text-primary" />
              )}
              {requestStatus === "failed" && (
                <FlowbiteCloseCircleOutline className="size-[100px] text-red" />
              )}

              <h4
                className={`${
                  requestStatus === "failed" ? "text-red" : "text-primary"
                }`}
              >
                {responseMessage}
              </h4>
              <button
                onClick={() => setRequestStatus("init")}
                className={`${
                  requestStatus === "failed" ? "btn-error" : "btn-primary"
                }`}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
