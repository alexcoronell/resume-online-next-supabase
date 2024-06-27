"use client";

import styles from '../styles/formContact.module.css'

export default function FormContact() {
  return (
    <article className={styles.FormContact}>
      <form>
        <div className={styles.formgroup}>
          <label htmlFor="name">
            <input type="text" name="name" id="name" placeholder="name" />
            <span>Name</span>
          </label>
        </div>
        <div className='flex gap-3'>
        <div className={styles.formgroup}>
          <label htmlFor="email">
            <input type="email" name="email" id="email" placeholder="email" />
            <span>Email</span>
          </label>
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="phone">
            <input type="text" name="phone" id="phone" placeholder="phone" />
            <span>Phone</span>
          </label>
        </div>
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="message">
            <textarea name="message" id="message" placeholder="message" rows={4} ></textarea>
            <span>Message</span>
          </label>
        </div>
        <button className={styles.btnSubmit}>Send</button>
      </form>
    </article>
  );
}
