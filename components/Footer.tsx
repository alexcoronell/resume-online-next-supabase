import styles from '../styles/footer.module.css'

export default function Footer() {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer className={styles.Footer}>
            {year} - Built by Alex Coronell
        </footer>
    )
}