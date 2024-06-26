export default function Footer() {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer>
            {year} - Built by Alex Coronell
        </footer>
    )
}