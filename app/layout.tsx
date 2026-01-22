import { Roboto } from 'next/font/google'

/* Components */
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import './globals.css'
import styles from '../styles/body.module.css'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Alex Coronell | Fullstack Developer',
  description: 'Fullstack Developer in Angular, Astro, React, NestJS and more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.Body}>
        <Header />
        <main className="Main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
