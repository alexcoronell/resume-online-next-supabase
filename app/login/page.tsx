import SectionPage from '@/components/SectionPage'
import LoginForm from '@/components/LoginForm'

/* Styles */
import styles from '../../styles/login-page.module.css'

export default async function LoginPage() {
  const titlePage = 'Login'
  return (
    <SectionPage titlePage={titlePage}>
      <div className={styles.LoginPage}>
        <LoginForm />
      </div>
    </SectionPage>
  )
}
