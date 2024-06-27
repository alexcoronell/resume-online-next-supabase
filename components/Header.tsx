"use client"
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/header.module.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  const menu = [
    {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Portfolio',
      url: '/portfolio'
    },
    {
      title: 'Studies',
      url: '/studies'
    },
    {
      title: 'Training',
      url: '/training'
    },
    {
      title: 'Experiences',
      url: '/experiences'
    },
    {
      title: 'Contact',
      url: '/contact'
    },
  ]

  return (
    <header className={styles.Header}>
      <button onClick={handleClick}>Open</button>
      <nav id='menu' className={isOpen ? 'right-0' : 'right-[-100%]'}>
        <div>
          <button onClick={handleClick} id='closeMenuBtn'>Close</button>
        </div>
        <ul>
          {
            menu.map((item, index) => (
              <li key={index}>
                <Link onClick={handleClick} href={item.url}>{item.title}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}
